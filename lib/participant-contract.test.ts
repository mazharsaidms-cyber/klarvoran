import assert from 'node:assert/strict';
import { test } from 'node:test';
import { participantContractDraft, participantContractPlaceholderIssue } from './participant-contract';

test('contract draft follows each approved UE count and requires completion', () => {
  for (const ue of [2, 15, 20, 32]) {
    const draft = participantContractDraft('Fiktive Person', ue);
    assert.match(draft, new RegExp(`Gesamtumfang: ${ue} UE\\b`));
    assert.ok(participantContractPlaceholderIssue(draft));
    const filled = draft.replace('[Geburtsdatum ergänzen]', '01.01.1990')
      .replace('[Anschrift ergänzen]', 'Teststraße 1, 00000 Testort')
      .replace('[online / Präsenz / hybrid eintragen]', 'online')
      .replace('[AVGS-Termin- und Fristvorgaben ergänzen]', 'Individuelle Vorgaben aus dem Gutschein')
      .replace('[Ort und Datum ergänzen]', 'Testort, 23.10.2026');
    assert.equal(participantContractPlaceholderIssue(filled), null);
  }
  assert.throws(() => participantContractDraft('Fiktive Person', 33));
});
