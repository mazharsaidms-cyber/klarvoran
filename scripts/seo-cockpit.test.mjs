import assert from "node:assert/strict";
import test from "node:test";
import { classify, parseSearchConsoleCsv, recommendation, report } from "./seo-cockpit.mjs";

test("verarbeitet einen deutschen Search-Console-Export mit Semikolon und Dezimalkomma", () => {
  const rows = parseSearchConsoleCsv("\uFEFFHäufigste Suchanfragen;Klicks;Impressionen;CTR;Position\r\n\"avgs coaching frankfurt\";0;43;0 %;11,8\r\n");
  assert.deepEqual(rows, [{ query: "avgs coaching frankfurt", clicks: 0, impressions: 43, ctr: 0, position: 11.8 }]);
  assert.equal(classify(rows[0].query), "AVGS lokal");
  assert.equal(recommendation(rows[0]), "Suchtreffer und passende Zielseite prüfen");
  assert.match(report(rows, []), /avgs coaching frankfurt \| AVGS lokal \| 43 \| 0/);
});

test("verarbeitet englische Exporte und lehnt das falsche Search-Console-Tab ab", () => {
  const rows = parseSearchConsoleCsv('Top queries,Clicks,Impressions,CTR,Position\n"job coaching frankfurt",2,20,10%,8.5\n');
  assert.equal(classify(rows[0].query), "Coaching lokal");
  assert.equal(rows[0].position, 8.5);
  assert.throws(() => parseSearchConsoleCsv("Pages,Clicks,Impressions,CTR,Position\n/avgs,2,20,10%,8.5\n"), /Suchanfragen/);
});
