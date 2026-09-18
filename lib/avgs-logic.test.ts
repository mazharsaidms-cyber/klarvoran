import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluateAvgsCheck, type AvgsAnswers } from "./avgs-logic";

const base: AvgsAnswers = {
  status: "unsicher",
  traeger: "andere_unsicher",
  anliegen: "anderes",
  form: "unsicher",
};

test("hat_avgs führt direkt zur Terminbuchung", () => {
  const result = evaluateAvgsCheck({ ...base, status: "hat_avgs" });
  assert.equal(result.primaryCtaHref, "/termin");
  assert.match(result.headline, /bereits einen AVGS/);
  assert.match(result.message, /Gutschein gültig ist und zu unserer Maßnahme passt/);
  assert.doesNotMatch(result.message, /nichts im Wege/);
});

test("moechte_beantragen verweist auf den Leitfaden", () => {
  const result = evaluateAvgsCheck({ ...base, status: "moechte_beantragen", traeger: "jobcenter" });
  assert.equal(result.primaryCtaHref, "/avgs#leitfaden");
  assert.match(result.message, /Jobcenter/);
});

test("unsicher führt zum Erstgespräch, nie zu einer Sackgasse", () => {
  const result = evaluateAvgsCheck({ ...base, status: "unsicher" });
  assert.equal(result.primaryCtaHref, "/termin");
  assert.ok(result.primaryCtaLabel.length > 0);
});

test("Ergebnis enthält immer einen vorsichtigen Disclaimer (keine Anspruchszusage)", () => {
  for (const status of ["hat_avgs", "moechte_beantragen", "unsicher"] as const) {
    const result = evaluateAvgsCheck({ ...base, status });
    assert.match(result.disclaimer, /keine verbindliche/);
  }
});

test("Präsenzform wird im Ergebnistext berücksichtigt", () => {
  const result = evaluateAvgsCheck({ ...base, status: "hat_avgs", form: "praesenz_kriftel" });
  assert.match(result.message, /Taunusstraße 52/);
});

test("ausgewähltes Anliegen wird im Ergebnis sichtbar berücksichtigt", () => {
  const result = evaluateAvgsCheck({ ...base, anliegen: "bewerbungsunterlagen" });
  assert.match(result.message, /Bewerbungsunterlagen/);
});
