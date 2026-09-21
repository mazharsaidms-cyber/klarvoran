import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { useLeadForm } from '../components/useLeadForm.ts';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://example.test' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, FormData: dom.window.FormData, IS_REACT_ACT_ENVIRONMENT: true });
const { createRoot } = await import('react-dom/client');
const root = createRoot(document.getElementById('root'));

function TestForm({ action, formal = false }) {
  const { state, formAction, formRef, field, pending } = useLeadForm(action, formal);
  return React.createElement('form', { action: formAction, ref: formRef },
    React.createElement('input', { name: 'name', 'aria-label': 'Name', ...field('name'), 'aria-invalid': Boolean(state.fieldErrors?.name) }),
    React.createElement('textarea', { name: 'message', 'aria-label': 'Nachricht', ...field('message') }),
    React.createElement('button', { type: 'submit', disabled: pending }, 'Senden'),
    React.createElement('p', { role: 'status' }, state.message));
}

async function enter(selector, value) {
  const input = document.querySelector(selector);
  const proto = input.tagName === 'TEXTAREA' ? dom.window.HTMLTextAreaElement.prototype : dom.window.HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(input, value);
    input.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  });
}

await test('enquiry survives a server validation error and focus returns to the invalid field', async () => {
  let submitted;
  await act(async () => root.render(React.createElement(TestForm, { action: async (_previous, data) => {
    submitted = Object.fromEntries(data);
    return { status: 'error', message: 'Bitte Namen prüfen.', fieldErrors: { name: 'Bitte Namen prüfen.' } };
  } })));
  await enter('input', 'Anna Beispiel');
  await enter('textarea', 'Diese ausführliche Anfrage darf nach einem Fehler nicht verloren gehen.');
  await act(async () => document.querySelector('button').click());
  assert.equal(submitted.name, 'Anna Beispiel');
  assert.equal(document.querySelector('input').value, 'Anna Beispiel');
  assert.equal(document.querySelector('textarea').value, submitted.message);
  assert.equal(document.activeElement, document.querySelector('input'));
});

await test('network rejection is explained formally and preserves the written enquiry', async () => {
  await act(async () => root.render(React.createElement(TestForm, { formal: true, action: async () => { throw new Error('Simulated offline connection'); } })));
  await enter('textarea', 'Wir möchten einen Workshop für unsere Gruppe anfragen.');
  await act(async () => document.querySelector('button').click());
  assert.match(document.querySelector('[role="status"]').textContent, /Ihre Eingaben bleiben erhalten/);
  assert.equal(document.querySelector('textarea').value, 'Wir möchten einen Workshop für unsere Gruppe anfragen.');
  assert.equal(document.querySelector('button').disabled, false);
});

await act(async () => root.unmount());
dom.window.close();
