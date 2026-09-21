import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema, appointmentSchema, avgsCheckSchema } from "./schemas";

test("contactSchema: gültige Eingabe (happy path) wird akzeptiert", () => {
  const result = contactSchema.safeParse({
    name: "Max Mustermann",
    email: "max@example.com",
    phone: "",
    message: "Ich habe eine Frage zum AVGS-Coaching und möchte gerne mehr erfahren.",
    website: "",
  });
  assert.equal(result.success, true);
});

test("contactSchema: institutionelle Anfrage benötigt Organisation und Anfrageart", () => {
  const result = contactSchema.safeParse({
    name: "Max Mustermann",
    email: "max@example.com",
    message: "Wir möchten eine mögliche Zusammenarbeit mit KlarVoran besprechen.",
    formality: "formal",
    website: "",
  });
  assert.equal(result.success, false);
});

test("contactSchema: vollständige institutionelle Anfrage wird akzeptiert", () => {
  const result = contactSchema.safeParse({
    name: "Max Mustermann",
    email: "max@example.com",
    message: "Wir möchten einen abgegrenzten Bewerbungsworkshop anfragen.",
    formality: "formal",
    organization: "Beispiel Bildung gGmbH",
    role: "Projektleitung",
    requestType: "workshop",
    timeframe: "ab November 2026",
    website: "",
  });
  assert.equal(result.success, true);
});

test("contactSchema: ausgefülltes Honeypot-Feld bleibt für stilles Abfangen erhalten", () => {
  const result = contactSchema.safeParse({
    name: "Bot",
    email: "bot@example.com",
    message: "Automatisierte Nachricht die eigentlich lang genug wäre.",
    website: "http://spam.example",
  });
  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.website, "http://spam.example");
});

test("contactSchema: ungültige E-Mail wird abgelehnt", () => {
  const result = contactSchema.safeParse({
    name: "Max Mustermann",
    email: "keine-email",
    message: "Ich habe eine Frage zum AVGS-Coaching und möchte gerne mehr erfahren.",
    website: "",
  });
  assert.equal(result.success, false);
});

test("appointmentSchema: gültige Eingabe (happy path) wird akzeptiert", () => {
  const result = appointmentSchema.safeParse({
    name: "Erika Musterfrau",
    email: "erika@example.com",
    phone: "0151 2345678",
    format: "praesenz_kriftel",
    hasAvgs: "ja",
    message: "",
    website: "",
  });
  assert.equal(result.success, true);
});

test("appointmentSchema: ungültiges format-Enum wird abgelehnt", () => {
  const result = appointmentSchema.safeParse({
    name: "Erika Musterfrau",
    email: "erika@example.com",
    format: "irgendwo",
    hasAvgs: "ja",
    website: "",
  });
  assert.equal(result.success, false);
});

test("avgsCheckSchema: gültige Eingabe (happy path) wird akzeptiert", () => {
  const result = avgsCheckSchema.safeParse({
    status: "unsicher",
    traeger: "jobcenter",
    anliegen: "bewerbungsunterlagen",
    format: "online",
    name: "Test Person",
    email: "test@example.com",
    phone: "",
    website: "",
  });
  assert.equal(result.success, true);
});


test("contactSchema: rejects header control characters but accepts human names", () => {
  const base = { email: "test@example.com", message: "Bitte senden Sie mir Informationen zum Coaching." };
  assert.equal(contactSchema.safeParse({ ...base, name: "Anna-Marie O’Connor" }).success, true);
  assert.equal(contactSchema.safeParse({ ...base, name: "Name\r\nBcc: other@example.com" }).success, false);
});

test("contactSchema: bounded input and multiline messages", () => {
  const base = { name: "Test Person", email: "test@example.com" };
  assert.equal(contactSchema.safeParse({ ...base, message: "Guten Tag,\nbitte kontaktieren Sie mich zum Coaching." }).success, true);
  assert.equal(contactSchema.safeParse({ ...base, message: "a".repeat(4001) }).success, false);
  assert.equal(contactSchema.safeParse({ ...base, name: "a".repeat(121), message: "Frage zum Coaching" }).success, false);
});
