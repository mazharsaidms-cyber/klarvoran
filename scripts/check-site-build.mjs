import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const buildRoot = path.resolve('.next/server/app');
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  }));
  return results.flat();
}
const pages = new Map();
for (const file of await htmlFiles(buildRoot)) {
  const route = path.relative(buildRoot, file).replace(/\.html$/, '');
  if (route.startsWith('_')) continue;
  pages.set(route === 'index' ? '/' : `/${route}`, new JSDOM(await readFile(file, 'utf8')));
}
assert.equal(pages.size, 16, 'All public content pages must be covered');
let linkCount = 0;
for (const [route, dom] of pages) {
  const document = dom.window.document;
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: exactly one H1`);
  assert.ok(document.title.trim(), `${route}: title`);
  assert.ok(document.querySelector('meta[name="description"]')?.content, `${route}: description`);
  assert.equal(new URL(document.querySelector('link[rel="canonical"]').href).pathname, route, `${route}: canonical path`);
  assert.equal(document.querySelector('meta[property="og:title"]')?.content, document.title, `${route}: social title`);
  const ids = [...document.querySelectorAll('[id]')].map((node) => node.id);
  assert.equal(ids.length, new Set(ids).size, `${route}: no duplicate IDs`);
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) JSON.parse(script.textContent);
  for (const image of document.images) {
    assert.ok(image.hasAttribute('alt'), `${route}: image alt`);
    const url = new URL(image.getAttribute('src'), 'https://www.klarvoran.de');
    const original = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
    assert.ok((await stat(path.join('public', original))).isFile(), `${route}: image source ${original}`);
    assert.ok(image.hasAttribute('width') && image.hasAttribute('height'), `${route}: reserved image space`);
  }
  for (const link of document.querySelectorAll('a[href]')) {
    linkCount++;
    const target = new URL(link.getAttribute('href'), `https://www.klarvoran.de${route}`);
    if (link.target === '_blank') assert.ok(link.rel.includes('noopener'), `${route}: external window isolation`);
    if (target.origin !== 'https://www.klarvoran.de') continue;
    const targetPage = pages.get(target.pathname);
    if (targetPage) {
      if (target.hash) assert.ok(targetPage.window.document.getElementById(decodeURIComponent(target.hash.slice(1))), `${route}: target ${link.href}`);
    } else {
      assert.ok((await stat(path.join('public', decodeURIComponent(target.pathname)))).isFile(), `${route}: linked file`);
    }
  }
  for (const control of document.querySelectorAll('input:not([type="hidden"]),textarea,select')) {
    if (control.type === 'radio') assert.ok(control.closest('fieldset')?.querySelector('legend'), `${route}: radio group label`);
    else assert.ok(control.labels?.length, `${route}: field label`);
  }
}
for (const dom of pages.values()) dom.window.close();
console.log(`${pages.size} pages: headings, metadata, canonicals, structured data, image dimensions, form labels and ${linkCount} links passed.`);
