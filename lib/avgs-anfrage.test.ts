import assert from "node:assert/strict";
import test from "node:test";
import { createAvgsRequest } from "./avgs-anfrage";

test("uses the selected training goal and concern without asserting approval", () => {
  const text = createAvgsRequest({
    goal: "ausbildung",
    need: "ausbildungsplatz",
    detail: "",
    name: "Mina Beispiel",
  });

  assert.match(text, /Ausbildungsplatz finden/);
  assert.match(text, /Suche nach einem Ausbildungsplatz/);
  assert.match(text, /Bitte um Prüfung eines AVGS/);
  assert.match(text, /Guten Tag,\n\nich möchte/);
  assert.match(text, /ob dafür ein Aktivierungs- und Vermittlungsgutschein.*infrage kommt/);
  assert.match(text, /Mina Beispiel$/);
  assert.doesNotMatch(text, /bewilligt|garantiert|Anspruch/);
});

test("keeps optional personal information optional and respects the selected concern", () => {
  const text = createAvgsRequest({
    goal: "orientierung",
    need: "anderes",
    detail: "  Ich weiß noch nicht, welche Arbeit passt.  ",
    name: "",
  });

  assert.match(text, /berufliche Richtung/);
  assert.match(text, /persönliche Unterstützung bei meinen nächsten beruflichen Schritten/);
  assert.match(text, /Zu meiner Situation: Ich weiß noch nicht, welche Arbeit passt\./);
  assert.match(text, /\[Dein Name\]$/);
});
