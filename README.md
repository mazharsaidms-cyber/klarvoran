# KlarVoran — Website

Website für **KlarVoran – Mazhar Said** (AZAV-zugelassener Bildungsträger, Frankfurt am Main). Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.

Prüfumfang, Korrekturen und offene Abnahmepunkte stehen im [Website-Audit vom 21.09.2026](docs/website-audit-2026-09-21.md).

## Setup

```bash
npm install
cp .env.example .env.local   # Werte prüfen/anpassen, siehe unten
npm run dev
```

Website läuft danach unter [http://localhost:3000](http://localhost:3000).

## Environment-Variablen

Siehe [`./.env.example`](./.env.example) für alle Variablen mit Erklärung. Kurzfassung:

| Variable | Zweck | Ohne Konfiguration |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Kanonische Domain (SEO, Sitemap, OG) | Fällt auf `https://www.klarvoran.de` zurück (bestätigte Produktions-Domain) |
| `NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | Kontaktangaben (Header, Footer, Kontaktseite) | Fällt auf die bestätigten KlarVoran-Kontaktdaten zurück |
| `NEXT_PUBLIC_BOOKING_URL` | Externe Kalender-Buchungsseite auf `/termin` | Es wird ausschließlich das Terminanfrage-Formular angezeigt |
| `RESEND_API_KEY` **oder** `FORM_WEBHOOK_URL` | Tatsächlicher Versand der drei Formulare (Kontakt, Termin, AVGS-Schnellcheck) | In Development: datensparsamer Hinweis ohne Anfrageinhalte; kein echter Versand. In Production: Formulare melden "aktuell nicht übermittelbar" und verweisen auf Telefon/E-Mail/WhatsApp. |

## Checks

```bash
npm run lint        # ESLint (Next Core Web Vitals + TypeScript)
npx tsc --noEmit     # TypeScript-Typecheck
npm test             # Unit-Tests (AVGS-Logik, Formular-Validierung und Rate-Limit)
npm run build        # Produktions-Build, alle Seiten statisch vorgerendert
npm run test:site-build          # Seitenstruktur, Metadaten, Links, Bilder und Formularlabels
npm run test:seo-downloads:local # Lokale SEO-Angaben und PDF-Antworten des Builds
npm run test:http-security      # HTTP-Header, Server Actions und Fehlerszenarien
```

Diese Checks wurden am 21.09.2026 erfolgreich ausgeführt. Sie ersetzen keine vollständige visuelle Prüfung, keine Feldmessung der Core Web Vitals und keinen Test der tatsächlichen E-Mail-Zustellung. Der HTTP-Sicherheitstest startet einen eigenen lokalen Produktionsserver und deaktiviert dessen Versanddienste ausdrücklich.

## Architektur

- **`lib/site-config.ts`** — zentrale Konfiguration (Kontakt, Adresse, Zertifikatsdaten, Navigation). Einziger Ort, an dem operative Daten gepflegt werden.
- **`lib/content/*`** — Inhalte (Module, Ablaufschritte, FAQ, Coach-Profil) getrennt von der Darstellung.
- **`lib/avgs-logic.ts`** — reine, testbare Entscheidungslogik für den AVGS-Schnellcheck (keine Anspruchszusage, nur Orientierung).
- **`lib/server/*`** — Validierung (Zod), Rate-Limiting-Schnittstelle, Lead-Versand-Adapter (Resend/Webhook/Dev-Fallback).
- **`app/*/actions.ts`** — Next.js Server Actions je Formular. Die Formulare nutzen JavaScript und gemeinsame Lade-/Erfolgs-/Fehlerzustände über `useLeadForm`. Ohne JavaScript zeigen sie Telefon und E-Mail als Kontaktmöglichkeiten an.
- **`components/*`** — wiederverwendbare UI-Bausteine (Header, Footer, Buttons, Karten, Stepper, Formularfelder, AVGS-Schnellcheck, FAQ-Accordion u. a.).

## Design-System

Tokens in `app/globals.css`: Navy `#1b222e` (dominant), Markenrot `#ec1c23` für dekorative Akzente. Buttons verwenden `--color-btn-red` (`#c5161d`, Weiß darauf ~5.99:1). Für rote Textakzente auf hellen Flächen gilt `--color-red-700` (`#a51116`). Karten-Schatten sind als Tailwind-Theme-Tokens registriert. Verwandte Karten teilen sich ab 640 px ihre Inhaltszeilen über CSS Subgrid; ihre Höhe bleibt inhaltsabhängig. Radien in vier Stufen (`--radius-sm/md/lg/full`). Schrift: Manrope (Headlines/Fließtext), JetBrains Mono ausschließlich für Kennzahlen/Zertifikatsnummern.

## Deployment

### Institutionelle Downloads pflegen

Die einseitigen PDFs unter `public/dokumente/KlarVoran-*.pdf` sind versionierte Website-Assets.
`npm run docs:build` erzeugt sie aus den bestätigten Daten in `lib/site-config.ts`,
den Modulen in `lib/content/modules.ts` und dem Downloadverzeichnis `lib/content/downloads.ts`.
Der Generator lädt dieselben lokalen Umgebungsdateien wie Next.js; Kontaktangaben vor Veröffentlichung
mit der produktiven Konfiguration abgleichen. Bei Datenänderungen auch `updatedAt` im Downloadverzeichnis
aktualisieren, PDFs neu erzeugen und beide Seiten visuell prüfen.

Für die lokale PDF-Erzeugung: Python mit `reportlab` und `pypdf`, dazu DejaVu Sans und DejaVu Sans Bold.
Optional `PDF_PYTHON` und `PDF_FONT_DIR` setzen. Die fertigen PDFs sind statisch; Vercel benötigt kein Python.
Die Downloads ergänzen HTML-Inhalte; die PDFs sind nicht als PDF/UA-zertifiziert ausgezeichnet.

Nach `npm run build` prüft `npm run test:seo-downloads:local` die sechs geänderten Seiten
einschließlich kanonischer URLs, lokaler Metadaten und Downloadlinks. Beide PDF-Antworten
werden bytegenau mit den visuell geprüften Dateien verglichen. Für einen Live-Check:
`SITE_QA_URL=https://www.klarvoran.de npm run test:seo-downloads`.

### Vercel

- **Repository:** [github.com/mazharsaidms-cyber/klarvoran](https://github.com/mazharsaidms-cyber/klarvoran) — Änderungen auf `main` werden automatisch über Vercel bereitgestellt.
- **Produktion:** [www.klarvoran.de](https://www.klarvoran.de) (Vercel, Team `klar-voran`).
- **Vorschau-URLs:** Projektspezifische `*.vercel.app`-Aliase bleiben zusätzlich aktiv.

## Frühere Korrekturen

Vor der Kundenübergabe wurde die Seite gegen neun Prüf-Linsen (Content, UX, SEO, Performance, Barrierefreiheit, Responsive, Architektur, Recht, Gesamteindruck) auditiert. Gefundene und behobene Probleme:

| Befund | Ort | Fix |
|---|---|---|
| Rot als Fließtext (`text-red`) unterschritt WCAG-AA-Kontrast (~4.4:1 statt 4.5:1) | Eyebrow-Badges sitehinweit, aktiver Nav-Link, Breadcrumb-/Link-Hover | Auf `text-red-700` (~7.8:1) umgestellt |
| Eyebrow-Label auf der dunklen CTA-Sektion nutzte Rot auf Navy (~2.1:1, deutlicher Fail) | `CtaSection` | Nutzt jetzt die geteilte `Eyebrow`-Komponente im weißen Ton |
| Mobiles Menü: Fokus ging beim Öffnen/Schließen verloren | `Header` | Fokus springt beim Öffnen auf den ersten Link, bei Escape/Schließen zurück auf den Menü-Button |
| Fehlende Security-Header (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) | `next.config.ts` | Baseline-Header ergänzt, `X-Powered-By` deaktiviert |
| Domain in Metadaten/Sitemap zeigte auf einen Platzhalter | `lib/site-config.ts` | Auf die bestätigte Produktions-Domain `www.klarvoran.de` umgestellt |

Die aktuelle Testabdeckung und ihre Grenzen sind im oben verlinkten Audit dokumentiert. Frühere Stichproben gelten nicht als vollständige Abnahme neuer Änderungen.

## Extern zu überwachen

- Resend- beziehungsweise Webhook-Konfiguration und tatsächliche Formularzustellung bei Änderungen am Vercel-Projekt kontrollieren. Ohne Versanddienst zeigt die Website keinen falschen Erfolg, sondern verweist auf Telefon, E-Mail und WhatsApp.
- Für ein instanzübergreifendes Rate-Limit in einer größeren Serverless-Skalierung ist ein externer, datenschutzrechtlich geprüfter Store erforderlich. Der aktuelle Schutz arbeitet pro Instanz, ist speicherbegrenzt und mit Honeypot sowie strenger Validierung kombiniert.
- Impressum und Datenschutz bei Änderungen von Dienstleistern, Rechtsform oder Verarbeitung durch eine qualifizierte rechtliche Stelle gegenlesen lassen.
- Offiziellen BA-Maßnahmeeintrag, Zulassungsunterlagen und Kontaktdaten bei Änderungen mit `lib/site-config.ts` abgleichen.
- Vollständige manuelle Cross-Browser-Prüfungen außerhalb von Chromium bei größeren Layout- oder Framework-Änderungen wiederholen.
