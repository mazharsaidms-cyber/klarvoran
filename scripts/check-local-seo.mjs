import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Read-only smoke check; never submits a form or transmits participant data.
const base = process.env.SITE_QA_URL || "http://127.0.0.1:3091";
const decode = (text) => text.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
const documents = ["/dokumente/KlarVoran-Massnahmenblatt-AVGS.pdf", "/dokumente/KlarVoran-Kooperationsblatt.pdf"];
const pages = [
  ["/", "Job- & Bewerbungscoaching Rhein-Main | KlarVoran"],
  ["/avgs", "AVGS-Bewerbungscoaching in Kriftel | KlarVoran"],
  ["/fachkraefte-kooperationspartner", null, ...documents],
  ["/fuer-jobcenter", null, documents[0]],
  ["/fuer-bildungstraeger", null, documents[1]],
  ["/fuer-soziale-einrichtungen", null, documents[1]],
];

for (const [route, title, ...downloads] of pages) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route}: one h1`);
  assert.ok(html.includes(`rel="canonical" href="https://www.klarvoran.de${route === "/" ? "" : route}"`) ||
    html.includes(`rel="canonical" href="https://www.klarvoran.de${route}"`), `${route}: canonical`);
  if (title) {
    assert.equal(decode(html.match(/<title>(.*?)<\/title>/)?.[1] || ""), title);
    assert.ok(html.includes("Main-Taunus-Kreis") && html.includes("Hofheim") && html.includes("Kriftel"));
    assert.equal(decode(html.match(/property="og:title" content="([^"]+)"/)?.[1] || ""), title);
    assert.equal(decode(html.match(/name="twitter:title" content="([^"]+)"/)?.[1] || ""), title);
  }
  for (const download of downloads) assert.ok(html.includes(`href="${download}" download=""`), `${route}: download link`);
  console.log(`OK ${route}: heading, metadata and expected downloads`);
}

for (const href of documents) {
  const response = await fetch(new URL(href, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, href);
  assert.match(response.headers.get("content-type") || "", /application\/pdf/);
  const actual = Buffer.from(await response.arrayBuffer());
  const expected = await readFile(path.join(process.cwd(), "public", href));
  const sha = (buffer) => createHash("sha256").update(buffer).digest("hex");
  assert.equal(sha(actual), sha(expected), `${href}: deployed PDF matches the reviewed artifact`);
  console.log(`OK ${href}: PDF response, ${actual.length} bytes, exact file hash`);
}
