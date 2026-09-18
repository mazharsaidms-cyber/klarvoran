# KlarVoran — Website

Produktionsreife Website für **KlarVoran – Mazhar Said** (AZAV-zugelassener Bildungsträger, Frankfurt am Main). Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.

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
| `NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | Kontaktangaben (Header, Footer, Kontaktseite) | Fällt auf die Angaben von Mazhars Visitenkarte zurück |
| `NEXT_PUBLIC_BOOKING_URL` | Externe Kalender-Buchungsseite auf `/termin` | Es wird ausschließlich das Terminanfrage-Formular angezeigt |
| `RESEND_API_KEY` **oder** `FORM_WEBHOOK_URL` | Tatsächlicher Versand der drei Formulare (Kontakt, Termin, AVGS-Schnellcheck) | In Development: Anfragen werden in die Server-Konsole geloggt (klar als Development gekennzeichnet). In Production: Formulare melden ehrlich "aktuell nicht übermittelbar" und verweisen auf Telefon/E-Mail/WhatsApp — es wird nie ein Erfolg vorgetäuscht. |

## Checks

```bash
npm run lint        # ESLint (Next Core Web Vitals + TypeScript)
npx tsc --noEmit     # TypeScript-Typecheck
npm test             # Unit-Tests (AVGS-Entscheidungslogik + Formular-Validierung)
npm run build        # Produktions-Build, alle Seiten statisch vorgerendert
```

Alle vier Checks sind aktuell grün.

## Architektur

- **`lib/site-config.ts`** — zentrale Konfiguration (Kontakt, Adresse, Zertifikatsdaten, Navigation). Einziger Ort, an dem operative Daten gepflegt werden.
- **`lib/content/*`** — Inhalte (Module, Ablaufschritte, FAQ, Coach-Profil) getrennt von der Darstellung.
- **`lib/avgs-logic.ts`** — reine, testbare Entscheidungslogik für den AVGS-Schnellcheck (keine Anspruchszusage, nur Orientierung).
- **`lib/server/*`** — Validierung (Zod), Rate-Limiting-Schnittstelle, Lead-Versand-Adapter (Resend/Webhook/Dev-Fallback).
- **`app/*/actions.ts`** — Next.js Server Actions je Formular. Formulare funktionieren dadurch auch ohne JavaScript (Progressive Enhancement) und werden bei vorhandenem JavaScript um Lade-/Erfolgs-/Fehlerzustände ergänzt.
- **`components/*`** — wiederverwendbare UI-Bausteine (Header, Footer, Buttons, Karten, Stepper, Formularfelder, AVGS-Schnellcheck, FAQ-Accordion u. a.).

## Design-System

Tokens in `app/globals.css`: Navy `#1b222e` (dominant), Rot (`--color-red` `#ec1c23`) ausschließlich als Button-/Badge-Hintergrund und für Icons/große fette Akzente, **niemals als Fließtextfarbe** (Kontrast auf Weiß ~4.4:1, unter der WCAG-AA-Schwelle von 4.5:1). Für rote Textakzente (aktiver Nav-Link, Badge-Beschriftung, Hover-Zustände) gilt `--color-red-700` (`#a51116`, ~7.8:1 Kontrast). Radien in vier Stufen (`--radius-sm/md/lg/full`). Schrift: Manrope (Headlines/Fließtext), JetBrains Mono ausschließlich für Kennzahlen/Zertifikatsnummern.

## Deployment

- **Repository:** [github.com/edgegraphics17/klarvoran](https://github.com/edgegraphics17/klarvoran) — Änderungen auf `main` werden automatisch über Vercel bereitgestellt.
- **Produktion:** [www.klarvoran.de](https://www.klarvoran.de) (Vercel, Team `work-3716s-projects`).
- **Vorschau-URLs:** Projektspezifische `*.vercel.app`-Aliase bleiben zusätzlich aktiv.

## Launch-Audit (durchgeführt)

Vor der Kundenübergabe wurde die Seite gegen neun Prüf-Linsen (Content, UX, SEO, Performance, Barrierefreiheit, Responsive, Architektur, Recht, Gesamteindruck) auditiert. Gefundene und behobene Probleme:

| Befund | Ort | Fix |
|---|---|---|
| Rot als Fließtext (`text-red`) unterschritt WCAG-AA-Kontrast (~4.4:1 statt 4.5:1) | Eyebrow-Badges sitehinweit, aktiver Nav-Link, Breadcrumb-/Link-Hover | Auf `text-red-700` (~7.8:1) umgestellt |
| Eyebrow-Label auf der dunklen CTA-Sektion nutzte Rot auf Navy (~2.1:1, deutlicher Fail) | `CtaSection` | Nutzt jetzt die geteilte `Eyebrow`-Komponente im weißen Ton |
| Mobiles Menü: Fokus ging beim Öffnen/Schließen verloren | `Header` | Fokus springt beim Öffnen auf den ersten Link, bei Escape/Schließen zurück auf den Menü-Button |
| Fehlende Security-Header (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) | `next.config.ts` | Baseline-Header ergänzt, `X-Powered-By` deaktiviert |
| Domain in Metadaten/Sitemap zeigte auf einen Platzhalter | `lib/site-config.ts` | Auf die bestätigte Produktions-Domain `klarvoran.de` umgestellt |

Nicht gefunden (positiv geprüft): erfundene Fakten/Testimonials/Zahlen, defekte interne Links, fehlende/doppelte Überschriftenebenen, offene `npm audit`-Schwachstellen, zu kleine Touch-Targets bei primären CTAs (56px), fehlende Alt-Texte bei bedeutungstragenden Bildern.

**Nicht automatisiert geprüft** (kein CI/Lighthouse/axe-core-Setup in diesem Projekt): Feld-Performance-Daten (CrUX), automatisierter Screenreader-Durchlauf, Cross-Browser-Test außerhalb von Chromium. Manuell stichprobenartig verifiziert stattdessen: Kontrastwerte, Tastaturfokus, Konsolenausgabe, Response-Header — alle unauffällig.

## Bekannte externe Restschritte

- E-Mail-/CRM-Dienst für den Lead-Versand konfigurieren (`RESEND_API_KEY` oder `FORM_WEBHOOK_URL`) — ohne diesen laufen Kontakt-, Termin- und AVGS-Schnellcheck-Anfragen aktuell ins Leere (ehrlich kommuniziert, aber nicht zustellbar).
- Kontaktdaten (Telefon, E-Mail) von Mazhar final bestätigen lassen (siehe `.env.example`) — Defaults stammen von der Visitenkarte.
- Optional: externe Kalenderbuchung (`NEXT_PUBLIC_BOOKING_URL`) einrichten, falls gewünscht.
- Impressum/Datenschutz vor Veröffentlichung durch eine rechtliche Prüfung gegenlesen lassen.
- Offiziellen BA-Maßnahmeeintrag und Kontaktdaten bei Änderungen mit `lib/site-config.ts` abgleichen.
