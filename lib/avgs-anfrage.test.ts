import assert from "node:assert/strict";
import test from "node:test";
import { createAvgsRequest } from "./avgs-anfrage";

test("uses only the supplied individual facts for a personal application", () => {
  const text = createAvgsRequest({ goal: "arbeit", need: "berufliche_orientierung", name: "Mina Beispiel", situation: "Mein Vertrag ist ausgelaufen.", experience: "Ich habe Erfahrung im Hotelbereich.", detail: "Ich weiß nicht, welche weiteren Arbeitgeber passen.", efforts: "Ich habe Bewerbungen versendet, bisher ohne neue Stelle.", support: "Ich möchte meine Erfahrungen gemeinsam auswerten und passende Arbeitgeber finden.", results: "Ich möchte passende Stellen künftig selbst auswählen." });
  for (const fact of ["Mein Vertrag ist ausgelaufen.", "Erfahrung im Hotelbereich", "welche weiteren Arbeitgeber passen", "Bewerbungen versendet", "Erfahrungen gemeinsam auswerten", "Stellen künftig selbst auswählen"]) assert.ok(text.includes(fact));
  assert.match(text, /ich beantrage einen Aktivierungs- und Vermittlungsgutschein/);
  assert.match(text, /Bitte prüfen Sie meinen individuellen Unterstützungsbedarf/);
  assert.match(text, /Mina Beispiel$/);
  assert.doesNotMatch(text, /Langzeitarbeitslosigkeit|Gruppenmaßnahme|Erstgespräch|Eigenmotivation|garantiert|schont Ihr Budget|32 Unterrichtseinheiten/);
});

test("missing facts are visible placeholders, not invented history", () => {
  const text = createAvgsRequest({ goal: "ausbildung", need: "ausbildungsplatz", detail: "", name: "" });
  assert.match(text, /Ausbildungsplatz zu finden/);
  assert.match(text, /\[Aktuelle berufliche Situation ergänzen\]/);
  assert.match(text, /\[Bisherige Bemühungen und Ergebnis ergänzen/);
  assert.match(text, /\[Konkrete praktische Unterstützung/);
  assert.match(text, /\[Konkrete Ergebnisse/);
  assert.match(text, /\[Dein Name\]$/);
  assert.doesNotMatch(text, /Meine Erfahrungen und Stärken|bereits beworben|keine Rückmeldung|telefonisch/);
});

test("orientation and interview preparation produce different concerns", () => {
  const common = { detail: "Ich brauche Unterstützung.", name: "" };
  const orientation = createAvgsRequest({ ...common, goal: "orientierung", need: "berufliche_orientierung" });
  const interview = createAvgsRequest({ ...common, goal: "arbeit", need: "vorstellungsgespraech" });
  assert.match(orientation, /berufliche Richtung/);
  assert.doesNotMatch(orientation, /Vorstellungsgespräche/);
  assert.match(interview, /Vorbereitung auf Vorstellungsgespräche/);
  assert.doesNotMatch(interview, /berufliche Richtung/);
});

test("normalizes free text without truncating at the previous 280 character limit", () => {
  const detail = "Eine konkrete berufliche Schwierigkeit. ".repeat(12);
  const text = createAvgsRequest({ goal: "arbeit", need: "anderes", detail, name: "  Mina\nBeispiel  ", efforts: "  Noch\n keine Bewerbungen.  " });
  assert.ok(text.includes(detail.trim()));
  assert.match(text, /Noch keine Bewerbungen\./);
  assert.match(text, /Mina Beispiel$/);
});
