import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { institutionalDownloads } from "./downloads";

test("Institutionelle Downloads sind eindeutige, vorhandene PDF-Dateien", () => {
  const documents = Object.values(institutionalDownloads);
  assert.equal(new Set(documents.map((document) => document.href)).size, documents.length);
  for (const document of documents) {
    assert.match(document.href, /^\/dokumente\/KlarVoran-[A-Za-z-]+\.pdf$/);
    const filename = path.join(process.cwd(), "public", document.href);
    assert.equal(readFileSync(filename).subarray(0, 5).toString(), "%PDF-");
    assert.ok(statSync(filename).size < 500_000, "Keep the one-page downloads mobile-friendly");
    assert.match(document.updatedAt, /^\d{2}\.\d{2}\.\d{4}$/);
  }
});

test("Downloads behalten einen lesbaren HTML-Informationsweg", () => {
  for (const document of Object.values(institutionalDownloads)) {
    assert.ok(document.description.length > 30);
    assert.ok(readFileSync(path.join(process.cwd(), "app", document.detailHref, "page.tsx"), "utf8"));
  }
});
