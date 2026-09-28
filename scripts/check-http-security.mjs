import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Dedicated local production process. Empty provider settings prevent real mail
// or webhook delivery, even if a developer has configured local credentials.
const base = 'http://127.0.0.1:3092';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3092'], {
  env: { ...process.env, RESEND_API_KEY: '', FORM_WEBHOOK_URL: '', NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverErrors = '';
server.stderr.on('data', data => { serverErrors += data.toString(); });

try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Local security test server did not start')), 15_000);
    server.once('error', error => { clearTimeout(timer); reject(error); });
    server.once('exit', code => { clearTimeout(timer); reject(new Error(`Server exited: ${code}`)); });
    server.stdout.on('data', data => {
      if (data.toString().includes('Ready')) { clearTimeout(timer); resolve(); }
    });
  });

  const home = await fetch(base);
  assert.equal(home.status, 200);
  for (const [name, value] of [
    ['x-content-type-options', 'nosniff'], ['x-frame-options', 'DENY'],
    ['referrer-policy', 'strict-origin-when-cross-origin'],
  ]) assert.equal(home.headers.get(name), value, name);
  const csp = home.headers.get('content-security-policy');
  for (const directive of ["form-action 'self'", "frame-ancestors 'none'", "object-src 'none'", "script-src-attr 'none'"]) {
    assert.ok(csp.includes(directive), directive);
  }
  assert.equal(home.headers.get('x-powered-by'), null);
  assert.ok(home.headers.get('strict-transport-security'));
  assert.ok(home.headers.get('permissions-policy'));

  const notFound = await fetch(`${base}/audit-nonexistent-page`);
  assert.equal(notFound.status, 404);
  assert.match(await notFound.text(), /noindex/);
  for (const [from, to] of [['/coaching-angebot', '/avgs'], ['/ablauf', '/avgs'], ['/ueber-den-coach', '/ueber-uns#gruender']]) {
    const response = await fetch(base + from, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('location'), to);
  }
  console.log('OK: security headers, 404/noindex and permanent redirects');

  const manifest = JSON.parse(await readFile('.next/server/server-reference-manifest.json', 'utf8'));
  const samples = [
    { route: '/kontakt', action: 'submitContactForm', fields: { name: 'Audit Test', email: 'audit@example.test', message: 'Lokaler Test ohne Versand.', formality: 'informal' } },
    { route: '/termin', action: 'submitAppointmentRequest', fields: { name: 'Audit Test', email: 'audit@example.test', format: 'unsicher', hasAvgs: 'unsicher' } },
    { route: '/avgs', action: 'submitAvgsCheck', fields: { name: 'Audit Test', email: 'audit@example.test', status: 'unsicher', traeger: 'andere_unsicher', anliegen: 'anderes', format: 'unsicher' } },
  ];
  async function post(sample, fields, origin = base) {
    const entry = Object.entries(manifest.node).find(([, action]) => action.exportedName === sample.action);
    assert.ok(entry, `${sample.action}: compiled action exists`);
    const data = new FormData();
    for (const [key, value] of Object.entries(fields)) data.set(`_1_${key}`, value);
    // The streamed decoder resolves referenced fields as the root arrives.
    data.set('0', JSON.stringify([{ status: 'idle', message: '' }, '$K1']));
    const response = await fetch(base + sample.route, {
      method: 'POST',
      headers: { 'Next-Action': entry[0], Origin: origin, Accept: 'text/x-component' },
      body: data,
    });
    return { status: response.status, body: await response.text() };
  }
  for (const sample of samples) {
    const crossOrigin = await post(sample, sample.fields, 'https://untrusted.example');
    assert.ok(crossOrigin.status >= 400, `${sample.route}: foreign Origin rejected`);
    const bot = await post(sample, { ...sample.fields, website: 'bot.example' });
    assert.match(bot.body, /"status":"success"/, `${sample.route}: honeypot silently acknowledged`);
    const failedDelivery = await post(sample, sample.fields);
    assert.match(failedDelivery.body, /"status":"error"/, `${sample.route}: no fake production success`);
    const invalid = await post(sample, { ...sample.fields, email: 'invalid' });
    assert.match(invalid.body, /"fieldErrors":\{"email":/, `${sample.route}: server validation`);
    let blocked;
    for (let attempt = 0; attempt < 3; attempt++) blocked = await post(sample, { ...sample.fields, email: 'invalid' });
    assert.match(blocked.body, /"status":"rate-limited"/, `${sample.route}: repeated requests blocked`);
    console.log(`OK ${sample.route}: Origin rejection, honeypot, delivery failure, validation, rate limit`);
  }
  const oversized = await post(samples[0], { ...samples[0].fields, message: 'x'.repeat(128_000) });
  assert.ok(oversized.status >= 400, 'Oversized body rejected before processing');
  console.log('OK: oversized POST rejected; no email or webhook was sent');
} catch (error) {
  if (serverErrors) process.stderr.write(serverErrors);
  throw error;
} finally {
  server.kill('SIGTERM');
}
