#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const QUERY_HEADERS = ["suchanfragen", "häufigste suchanfragen", "query", "top queries", "search query"];
const HEADER_NAMES = {
  clicks: ["klicks", "clicks"],
  impressions: ["impressionen", "impressions"],
  ctr: ["ctr", "durchschnittliche ctr"],
  position: ["position", "durchschnittliche position", "average position"],
};

function parseRows(input) {
  const text = input.replace(/^\uFEFF/, "");
  const firstLine = text.split(/\r?\n/, 1)[0];
  const delimiter = (firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length ? ";" : ",";
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(cell); cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
    } else cell += char;
  }
  if (quoted) throw new Error("CSV enthält ein nicht geschlossenes Anführungszeichen.");
  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function number(value) {
  const raw = String(value || "").trim().replace(/[%\s]/g, "");
  if (!raw) return 0;
  const normalized = raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : raw;
  const result = Number(normalized);
  if (!Number.isFinite(result)) throw new Error(`Ungültiger Zahlenwert: ${value}`);
  return result;
}

function key(value) {
  return value.toLocaleLowerCase("de-DE").trim().replace(/\s+/g, " ");
}

export function parseSearchConsoleCsv(text) {
  const [header, ...data] = parseRows(text);
  if (!header) throw new Error("Die CSV-Datei ist leer.");
  const columns = header.map(key);
  const index = (aliases) => columns.findIndex((name) => aliases.includes(name));
  const field = {
    query: index(QUERY_HEADERS),
    clicks: index(HEADER_NAMES.clicks),
    impressions: index(HEADER_NAMES.impressions),
    ctr: index(HEADER_NAMES.ctr),
    position: index(HEADER_NAMES.position),
  };
  if (Object.values(field).some((value) => value < 0)) {
    throw new Error("Erwartet wird der CSV-Export des Search-Console-Tabs „Suchanfragen“ mit Klicks, Impressionen, CTR und Position.");
  }
  return data.filter((row) => row[field.query]?.trim()).map((row) => ({
    query: row[field.query].trim(),
    clicks: number(row[field.clicks]),
    impressions: number(row[field.impressions]),
    ctr: number(row[field.ctr]),
    position: number(row[field.position]),
  }));
}

export function classify(query) {
  const q = key(query);
  const local = /frankfurt|main[\s-]?taunus|hofheim|kriftel|höchst|zeilsheim|flörsheim|rhein[\s-]?main/.test(q);
  if (/klarvoran|ms coaching|mazhar said/.test(q)) return "Marke";
  if (local && /avgs|aktivierungs.*vermittlungsgutschein/.test(q)) return "AVGS lokal";
  if (local && /job[\s-]?coaching|bewerbungs|coaching/.test(q)) return "Coaching lokal";
  if (/avgs|bewerbungs|job[\s-]?coaching/.test(q)) return "Überregional";
  return "Sonstige";
}

export function recommendation(row) {
  if (row.impressions < 5) return "Erst mehr Daten sammeln";
  if (row.clicks === 0 && row.position <= 20) return "Suchtreffer und passende Zielseite prüfen";
  if (row.position > 20) return "Inhalt und interne Links der Zielseite prüfen";
  if (row.ctr < 3) return "Titel und Beschreibung mit Suchabsicht abgleichen";
  return "Beobachten und passende Anfragen zählen";
}

function escapeCell(text) { return String(text).replaceAll("|", "\\|").replaceAll("\n", " "); }
function german(value, digits = 0) { return value.toLocaleString("de-DE", { maximumFractionDigits: digits }); }

export function report(current, previous = [], label = "aktueller Export") {
  const earlier = new Map(previous.map((row) => [key(row.query), row]));
  const categories = ["AVGS lokal", "Coaching lokal", "Überregional", "Marke", "Sonstige"];
  const totals = (items, category) => items.filter((row) => classify(row.query) === category)
    .reduce((sum, row) => ({ clicks: sum.clicks + row.clicks, impressions: sum.impressions + row.impressions }), { clicks: 0, impressions: 0 });
  const rows = current.filter((row) => row.impressions >= 5).sort((a, b) => {
    const weight = (row) => (classify(row.query) === "AVGS lokal" ? 3 : classify(row.query) === "Coaching lokal" ? 2 : 1) * row.impressions * (row.clicks ? 0.5 : 1);
    return weight(b) - weight(a);
  });
  const lines = [
    `# KlarVoran SEO-Cockpit – ${label}`,
    "",
    "Quelle: CSV-Export aus Google Search Console. Die Zeilen sind nur die sichtbaren Suchanfragen, keine vollständige Markt- oder Besucherstatistik.",
    "",
    "| Suchgruppe | Impressionen | Klicks | Voriger Export: Impressionen |",
    "| --- | ---: | ---: | ---: |",
    ...categories.map((category) => {
      const now = totals(current, category);
      const before = totals(previous, category);
      return `| ${category} | ${german(now.impressions)} | ${german(now.clicks)} | ${previous.length ? german(before.impressions) : "–"} |`;
    }),
    "",
    "| Suchanfrage | Gruppe | Impressionen | Klicks | CTR | Ø-Position | Veränderung Impressionen | Nächster Prüfpunkt |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |",
  ];
  for (const row of rows) {
    const old = earlier.get(key(row.query));
    const change = old ? `${row.impressions - old.impressions >= 0 ? "+" : ""}${german(row.impressions - old.impressions)}` : "–";
    lines.push(`| ${escapeCell(row.query)} | ${classify(row.query)} | ${german(row.impressions)} | ${german(row.clicks)} | ${german(row.ctr, 1)} % | ${german(row.position, 1)} | ${change} | ${recommendation(row)} |`);
  }
  lines.push("", "**Auswertung:** Vergleiche nur Exporte mit gleicher Länge und demselben Suchtyp, Land und Gerät. Eine Änderung der Durchschnittsposition ist keine feste Rangfolge für alle Suchenden. Mehr Sichtbarkeit zählt erst dann als Erfolg, wenn passende Erstgespräche und bewilligte Starts folgen.", "");
  return lines.join("\n");
}

async function main(args) {
  const option = (name) => args[args.indexOf(name) + 1];
  if (!args.includes("--current") || !option("--current") || option("--current").startsWith("--")) {
    throw new Error("Aufruf: npm run seo:report -- --current suchanfragen.csv [--previous vorher.csv] [--output bericht.md]");
  }
  for (const flag of ["--previous", "--output"]) {
    if (args.includes(flag) && (!option(flag) || option(flag).startsWith("--"))) throw new Error(`${flag} benötigt einen Dateipfad.`);
  }
  const current = parseSearchConsoleCsv(await readFile(option("--current"), "utf8"));
  const previous = args.includes("--previous") ? parseSearchConsoleCsv(await readFile(option("--previous"), "utf8")) : [];
  const result = report(current, previous, new Date().toLocaleDateString("de-DE"));
  if (args.includes("--output")) await writeFile(option("--output"), result, "utf8");
  else process.stdout.write(result);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
