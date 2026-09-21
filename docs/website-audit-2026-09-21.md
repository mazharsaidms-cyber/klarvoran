# KlarVoran: Website-Audit vom 21.09.2026

## Stand und Geltungsbereich

Die Korrekturen wurden auf `codex/klarvoran-final-audit-2026-09-21` vorbereitet und sind in [PR #10](https://github.com/mazharsaidms-cyber/klarvoran/pull/10) nachvollziehbar. Der PR-Verlauf dokumentiert die Übernahme in die öffentliche Website. Bereits vorhandene, unveröffentlichte Verbesserungen wurden erhalten und in diesen Prüfstand einbezogen.

Geprüft wurden der Quellcode aller 16 Inhaltsseiten, gemeinsame Komponenten, Formulare, Metadaten, Weiterleitungen, Downloads und die lokale Produktionsausgabe. Die öffentliche Website wurde ergänzend im Browser und anhand ihrer HTTP-Antworten geprüft. Nach erfolgreicher Anmeldung wurden auch alle 16 korrigierten Inhaltsseiten in der Vercel-Vorschau im Desktop-Browser durchgesehen. Die Darstellungsmatrix wurde anschließend für alle 16 Seiten in sieben echten Chromium-CSS-Viewports geprüft; Einzelheiten und Grenzen stehen unten. Dieser Bericht ist keine WCAG-Zertifizierung, kein umfassender Penetrationstest und keine rechtliche Begutachtung.

## Wesentliche Befunde und Korrekturen

| Bereich / Kategorie | Befund und Auswirkung | Korrektur im Entwurf |
|---|---|---|
| Positionierung / Marketing | Der Nutzen musste aus mehreren Abschnitten zusammengesetzt werden. | Startseite benennt Bildungsträger, Job- und Bewerbungscoaching ausdrücklich. Leistungen und erste Handlungsmöglichkeiten sind konkreter formuliert. |
| Teilnehmer / UX | Umfang, Kosten und Ablauf des AVGS-Angebots waren nicht ausreichend früh zusammen sichtbar. | Früher Faktenblock: persönliches 1:1, 32 UE à 45 Minuten, acht Wochen, Kostenübernahme nur mit passendem bewilligtem AVGS. Hybrid wird erklärt; Kontakt auch ohne vorhandenen Gutschein. |
| AVGS-Schnellcheck / Fehler | Die Entscheidungslogik erzeugte nächste Schritte, die Oberfläche zeigte die dazugehörigen Handlungsbuttons nicht an. | Passende Buttons für das jeweilige Ergebnis werden angezeigt. Kontaktdaten bleiben freiwillig; sie sind keine Voraussetzung für das Ergebnis. |
| Institutionen / Marketing | Teilweise abstrakte oder auf die Seitenstruktur bezogene Aussagen statt konkreter Leistungen. | Sachliche Angaben zu Durchführung und Dokumentation; soziale Einrichtungen erhalten eine verständlichere Beschreibung der passenden Zielgruppen. Institutionelle Ansprache bleibt von der Teilnehmeransprache getrennt. |
| Karten / Inkonsistenz | Unterschiedliche Textlängen verschoben Überschriften, Beschreibungen und Handlungszeilen benachbarter Karten. | Gemeinsame Subgrid-Zeilen für vergleichbare Leistungs-, Institutions-, Text-, Icon- und Downloadkarten, ohne starre Texthöhen. |
| Design-Tokens / technischer Fehler | Karten-Schatten waren als CSS-Variablen vorhanden, aber nicht im Tailwind-Theme registriert. Die zugehörigen Utility-Klassen wurden nicht erzeugt. | Schatten-Tokens korrekt registriert; erzeugte Produktions-CSS enthält die Klassen. |
| Tastatur / Barrierearmut | Normale Textlinks hatten keinen durchgehend definierten Fokus; ein Footer-Fokus war auf hellem Grund kaum sichtbar. | Gemeinsamer sichtbarer Fokus für Links, Buttons und Accordion-Überschriften; Footer-Farbe korrigiert. |
| Touch / UX | FAQ-Zeilen und Footerlinks boten uneinheitliche Bedienflächen. | FAQ-Überschriften mindestens 44 px hoch, Footerlinks mit vergrößerten Flächen. |
| JavaScript-Ausfall / UX | Formulare und mobile Navigation boten ohne JavaScript keinen ausreichend klaren Ersatzweg. | Sichtbare Telefon-/E-Mail-Alternativen und eine einfache Navigation ohne JavaScript. Keine Behauptung, das interaktive Formular funktioniere ohne JavaScript. |
| Formularrobustheit / Technik | Im bereits vorhandenen Arbeitsstand waren Validierung, Transportfehler und gemeinsame Formularzustände verbessert worden. | Verbesserungen erhalten, Eingabegrenzen und Wiederholbarkeit durch Tests verifiziert. Ehrliche Fehlermeldung bei fehlendem Versanddienst. |
| Servergrenze / Sicherheit | Der Versandadapter war nicht ausdrücklich gegen Client-Imports geschützt; Transportfehler konnten sensible URL-Bestandteile in Logs enthalten. | `server-only` ergänzt; Protokollierung auf Fehlerkategorie beschränkt. |
| Bilder / Performance | Mehrere Bilder erhielten unnötig Ladepriorität; Größenangaben waren nicht überall auf den Container abgestimmt. | Priorität auf das wichtige Startseitenbild konzentriert, aktuelle Next.js-Preload-API und passendere Bildgrößen. Vorhandene Fotos bleiben erhalten. |
| SEO / Technik | Metadaten und Seitenprüfung waren im vorhandenen Arbeitsstand vereinheitlicht worden; einzelne Details waren noch inkonsistent. | Zentrale Metadaten und Prüfskript erhalten; deutscher Breadcrumb-Name und sichere JSON-LD-Ausgabe ergänzt. |
| Dokumentation / Fehler | README behauptete Formularfunktion ohne JavaScript und vollständige Produktionsreife. | An tatsächliches Verhalten und nachgewiesene Prüfungen angepasst. |

Die gestalterischen Änderungen beheben funktionale Inkonsistenzen. Farbwelt, Bildmaterial, Seiten-URLs, Kontaktdaten, Maßnahmedaten und Zulassungsunterlagen wurden erhalten. Es wurden keine Teamgrößen, Kapazitäten, Vermittlungsquoten, Testimonials oder Erfolgsgarantien ergänzt.

## Seiten und Nutzerwege

| Seite | Aufgabe für Besucher | Prüfung / Änderung |
|---|---|---|
| `/` | Angebot, Zielgruppe und nächsten Schritt schnell verstehen | Klarere Einordnung, kompakte Vertrauenselemente, konsistente Leistungs- und Institutionskarten |
| `/leistungen` | Passendes Angebot finden | Konkretere Übersicht, Teilnehmer- und Institutionsangebote unterscheidbar, vergleichbare Kartenstruktur |
| `/avgs` | Förderung, Leistung, Ablauf und Kontakt verstehen | Umfang/Kosten früh sichtbar, Hybrid erklärt, klare Einstiege, Schnellcheck mit passenden nächsten Schritten |
| `/leistungen/einzelcoaching` | Privates Coaching und Anfrageweg verstehen | Vergleichbare Karten ausgerichtet; Abgrenzung zum geförderten Angebot erhalten |
| `/leistungen/workshops` | Workshopangebot und Anfrageweg verstehen | Konsistente Karten und Bildgrößen; keine erfundenen Termine oder Kapazitäten |
| `/fachkraefte-kooperationspartner` | Richtigen institutionellen Bereich erreichen | Zielgruppeneinstiege, Download- und Kontaktwege, gemeinsame Kartenstruktur |
| `/fuer-jobcenter` | Maßnahme und Anbieter fachlich einordnen | Daten, Struktur, Dokumentation, Downloads und sachlicher Kontaktweg geprüft |
| `/fuer-bildungstraeger` | Mögliche Zusammenarbeit beurteilen | Leistungen, Abläufe und Anfrageweg; konsistente Karten |
| `/fuer-soziale-einrichtungen` | Eignung für Klienten und Zusammenarbeit einschätzen | Konkretere Zielgruppenbeschreibung ohne pauschale Defizitzuschreibung |
| `/fuer-kommunen` | Kooperationsmöglichkeiten einordnen | Angebots- und Kontaktlogik, konsistente Karten |
| `/ueber-uns` | Ansprechpartner, Arbeitsweise und Glaubwürdigkeit kennenlernen | Persönliche Begleitung und Teilhabe verständlicher; bestätigte Erfahrungsdaten erhalten |
| `/faq` | Einzelne offene Fragen schnell klären | Thematische Gruppen, semantisches Accordion und größere Touch-Flächen |
| `/kontakt` | Passenden Kontaktweg wählen | Kontaktwege, Adressunterscheidung, Labels, Validierung, Fehlerzustand und Ersatzkontakt geprüft |
| `/termin` | Erstgespräch anfragen | Terminanfrage bleibt von bestätigter Buchung unterscheidbar; Formularzustände und Ersatzkontakt geprüft |
| `/impressum` | Anbieter identifizieren | Erreichbarkeit und technische Struktur geprüft; keine rechtliche Freigabe behauptet |
| `/datenschutz` | Verarbeitung und externe Dienste nachvollziehen | Erreichbarkeit und technische Struktur geprüft; keine neuen Tracker oder eingebetteten Drittanbieter ergänzt |

Die Seitenstruktur bleibt erhalten. AVGS-Coaching erhält in PR #11 einen eigenen Hauptmenüpunkt und einen ständig sichtbaren mobilen Schnellzugriff. Spezifische Institutionsseiten erfüllen unterschiedliche Informationsbedürfnisse und wurden deshalb nicht zusammengelegt. Frankfurt bleibt Geschäfts-/Postanschrift; bestätigte Präsenztermine werden dem Durchführungsort Kriftel zugeordnet. Regionale Bezüge nennen Frankfurt und Main-Taunus sinnvoll im Angebotskontext, ohne zusätzliche Ortslisten oder Doorway-Seiten.

Für den Fünf-Sekunden-Test beantwortet der neue Einstieg inhaltlich: Bildungsträger; Job- und Bewerbungscoaching; Menschen auf dem Weg in Arbeit oder Ausbildung; persönliche, strukturierte Unterstützung; Erstgespräch bzw. Angebot ansehen. Ob reale Erstbesucher diese Informationen in fünf Sekunden erfassen, ist damit noch nicht empirisch bewiesen.

## Nachgewiesene technische Prüfungen

| Prüfung | Ergebnis am 21.09.2026 |
|---|---|
| `npm test` | 21 Tests erfolgreich: AVGS-Logik, Eingaben, Rate-Limit, Downloadangaben und Formularrobustheit |
| `npm run lint` | Erfolgreich |
| `npx tsc --noEmit` | Erfolgreich |
| `npm run build` | Erfolgreicher Produktions-Build mit statisch vorgerenderten Inhaltsseiten |
| `npm run test:site-build` | 16 Inhaltsseiten, 716 Referenzen geprüft; u. a. eine H1 je Seite, Metadaten, Canonicals, interne Links/Anker, JSON-LD, Bildattribute und Formularlabels |
| `npm run test:seo-downloads:local` | Sechs zentrale bzw. lokale SEO-Seiten und beide institutionellen PDF-Antworten erfolgreich; Dateien bytegenau verglichen |
| `npm run test:http-security` | HTTP-Header, echte 404-Antwort mit `noindex`, drei bestehende 308-Weiterleitungen und alle drei Formular-Endpunkte erfolgreich geprüft |
| `npm audit --json` | Keine bekannten Schwachstellen im aufgelösten Abhängigkeitsstand gemeldet; keine Garantie für unbekannte Schwachstellen |
| Suche nach Secrets | Keine Treffer der verwendeten Secret-Muster in 98 geprüften Quell-/Clientdateien; heuristische Prüfung, keine Vollständigkeitsgarantie |
| HTTPS / Header öffentlich | Konfigurierte Schutz-Header auch in der öffentlichen HTTP-Antwort vorgefunden |

Der HTTP-Test startet einen eigenen Produktionsserver mit explizit deaktivierten Versanddiensten. Er prüft fremde Origins, Honeypot, ungültige E-Mail, fehlenden Versanddienst, Rate-Limit und eine Anfrage oberhalb des konfigurierten 64-kB-Limits. Es wurden dadurch keine echten Anfragen an KlarVoran versendet.

Stichproben rechnerischer Kontraste: Fließtext-Navy auf Weiß 8,37:1; Weiß auf Button-Rot 5,99:1; halbtransparentes Weiß im dunklen Footer 5,02:1. Diese Werte ersetzen keine Prüfung aller Zustände und Farbkombinationen.

## Sicherheits- und Betriebsgrenzen

- Server Actions validieren Eingaben serverseitig. Die lokal ausgeführten HTTP-Tests bestätigen die Ablehnung fremder Origins im getesteten Next.js-Produktionsaufbau. Sie ersetzen keine Prüfung beliebiger Proxy-Konfigurationen.
- Das Rate-Limit ist speicherbegrenzt und arbeitet pro Serverinstanz. Für instanzübergreifenden Schutz bei Serverless-Skalierung ist ein gemeinsamer Store oder eine passend konfigurierte Firewall erforderlich. Ein zusätzlicher Dienst wurde nicht ohne geklärte Betriebs- und Datenschutzkonfiguration eingeführt.
- Die CSP behält `script-src 'self' 'unsafe-inline'` für die vorhandene statische Next.js-Ausgabe. Das ist eine verbleibende Einschränkung. Nonces würden in Next.js dynamisches Rendering erfordern; eine solche Architekturänderung ist gesondert zu bewerten ([Next.js-Dokumentation](https://nextjs.org/docs/app/guides/content-security-policy)). Inline-Eventhandler bleiben durch `script-src-attr 'none'` gesperrt.
- Der verwendete Client-IP-Header setzt die Vercel-Vertrauensgrenze voraus. Vercel beschreibt das Überschreiben von `x-forwarded-for` zur Vermeidung von Spoofing; bei anderem Hosting muss diese Annahme erneut geprüft werden ([Vercel-Dokumentation](https://vercel.com/docs/headers/request-headers)).
- Es wurden keine Uploads, Benutzeranmeldung, Tracking-Skripte oder neuen externen Einbettungen hinzugefügt. Eine Conversion-Messung ist derzeit nicht implementiert; das Audit behauptet keine gemessene Verbesserung von Anfragen oder Abschlüssen.
- Der Versandadapter meldet eine Annahme durch den konfigurierten Dienst. Das belegt noch keine Zustellung im Empfängerpostfach. Konfiguration, Absenderdomain, Zustellbarkeit und tatsächlicher Eingang bleiben getrennte Betriebsprüfungen.

## Ergänzende Browserprüfung vor Veröffentlichung

Die geschützte Vorschau wurde am 21.09.2026 nach erfolgreicher Anmeldung in Chromium bei einem Viewport von 1363 × 936 px geprüft:

- Alle 16 Inhaltsseiten geöffnet und visuell durchgesehen; kein horizontales Überlaufen in dieser Desktop-Ansicht beobachtet.
- Gemeinsame Navigation, Header, Footer, Handlungsaufforderungen und verwandte Karten auf Ausrichtung und Lesbarkeit geprüft. Gemessene Höhen benachbarter Leistungskarten stimmen je Reihe überein; die Höhe bleibt vom Inhalt abhängig.
- Den AVGS-Schnellcheck bis zum Ergebnis durchlaufen: Auswahl, Schrittwechsel, Fokus auf die Ergebnisüberschrift und passende Kontaktlinks funktionieren. Das Ergebnis benötigt keine persönlichen Kontaktdaten.
- Institutionelle Anfrage und Terminanfrage ohne Pflichtangaben geprüft: Absenden wird verhindert, der Fokus liegt auf dem ersten erforderlichen Feld. Dasselbe Verhalten auf der Kontaktseite bestätigt. Keine echte Anfrage versendet.
- FAQ per Enter geöffnet und geschlossen; Antwort sichtbar und Tastaturfokus erkennbar.
- Profilverlinkung von der Startseite nach `/ueber-uns#gruender` geprüft. Startseiten-, Workshop- und Profilbilder laden in der sichtbaren Ansicht.
- Keine der Vorschau zuzuordnenden Warnungen oder Fehler in der erfassten Anwendungskonsole. Browser-Erweiterungs- und frühere Anmeldeprotokolle zählen nicht als Websitefehler.

## Ergänzung: Navigation, Bewegung und responsive Abnahme

Die Änderungen in [PR #11](https://github.com/mazharsaidms-cyber/klarvoran/pull/11) greifen den ausdrücklichen Wunsch nach einer Menüleiste und einem eigenen AVGS-Menüpunkt auf. Ab 1024 px erscheint die vollständige, zweizeilige Desktop-Navigation. Darunter bleiben AVGS-Coaching, Leistungen und Kontakt direkt sichtbar; ab 640 px auch der Institutionseinstieg. Ein beschrifteter Menübutton öffnet die übrigen Links. Die vorhandene URL `/avgs` wird weiterverwendet.

Nach Sichtung von Improfy wurden kurze, einmalige Einblendungen beim Scrollen ergänzt, passend zur bestehenden roten und dunkelblauen KlarVoran-Gestaltung. Es gibt keine zusätzliche Animationsbibliothek, Dauerschleifen oder verzögerte Hero-Inhalte. Inhalte sind ohne JavaScript sichtbar. Formulare und Rechtstexte bleiben ausgenommen; `prefers-reduced-motion`, Druckdarstellung und Tastaturfokus erhalten sofort sichtbare Inhalte. Headerlogos laden unmittelbar statt erst bei Lazy-Loading-Auslösung.

**Responsive-Matrix: 112 gerenderte Ansichten.** Jede der 16 Inhaltsseiten wurde in 1440, 1280, 1024, 768, 430, 390 und 360 px breiten, 900 px hohen Same-Origin-Frames in einer isolierten Vorschau geladen. Dadurch greifen reale CSS-Media-Queries in Chromium. Die Messwerte sind in [responsive-qa-2026-09-21.json](responsive-qa-2026-09-21.json) festgehalten. Die Vorschau-Hilfsdateien und deren ausschließlich dort erlaubtes Same-Origin-Framing werden nicht in die Produktionswebsite übernommen.

- Kein horizontales Überlaufen sichtbarer Seiteninhalte und keine abgeschnittenen Überschriften in den 112 Ansichten.
- AVGS in jeder Breite direkt in der Navigation erreichbar; sichtbare Header-Bedienflächen mindestens 44 px hoch.
- Ergänzende visuelle Stichproben des Startseitenheaders in allen sieben Breiten sowie mobiler Kontaktkarten, Formularfelder und Footer. Die 1440-px-Ansicht ist breiter als das verfügbare Browserfenster; die Geometrieprüfung erfasst dennoch die gesamte Framebreite.
- Bei 360 px öffnet das Menü, Escape schließt es, und der direkte AVGS-Link führt zur vorhandenen Seite mit korrekter Aktivmarkierung. Leeres Absenden auf der Kontaktseite wird durch die Pflichtfeldprüfung verhindert.
- Bewusst außerhalb positionierte, unsichtbare Honeypot-Felder wurden anhand des Quellcodes als erwartete Ausnahme bewertet. Sie erzeugen keinen horizontalen Scrollbereich. Unsichtbare Screenreader-Überschriften zählen nicht als visuell abgeschnittene Texte.

Das sind Browser-Viewports, keine sieben physischen Geräte. Die vollständige Geometriematrix und ergänzende visuelle/interaktive Stichproben sind keine Behauptung, jede denkbare Interaktion in jeder Browserengine geprüft zu haben.

## Performance und Felddaten

Die öffentliche Website wurde am 21.09.2026 mit [PageSpeed Insights](https://pagespeed.web.dev/analysis/https-www-klarvoran-de/r4ul9hjw65?form_factor=desktop) gemessen. Diese Basismessung bezieht sich auf PR #10 vor der Menü-/Animationsveröffentlichung:

| Laborprofil | Performance | Barrierefreiheit / Best Practices / SEO | LCP | CLS | TBT |
|---|---:|---|---:|---:|---:|
| Mobil | 99 | 100 / 100 / 100 | 2,3 s | 0 | 20 ms |
| Desktop | 100 | 100 / 100 / 100 | 0,5 s | 0 | 10 ms |

Die Feldsektion meldet in beiden Profilen **„Keine Daten“**. Daher liegt kein belastbarer CrUX-Nachweis für LCP, INP und CLS echter Besucher vor. TBT ist ein Laborwert und kein gemessener INP. Fehlende Felddaten lassen sich nicht durch wiederholte Labortests oder die Google-Unternehmensprofil-Bestätigung erzeugen. Google beschreibt die Feldmessung als rollierendes 28-Tage-Fenster mit ausreichender Datenbasis ([Chrome-Dokumentation](https://developer.chrome.com/docs/crux/guides/pagespeed-insights)). Es wurde dafür kein neuer Tracker installiert.

## Tatsächlicher Versandtest und Konfiguration

Am 21.09.2026 um 19:46 UTC wurde auf ausdrücklichen Nutzerauftrag genau eine gekennzeichnete Testanfrage über das öffentliche Kontaktformular abgesendet: `KV-20260921-K01`, Rückantwortadresse `info@klarvoran.de`. Die Anwendung meldete einen Übermittlungsfehler und erhielt die Eingaben. **Kein erfolgreicher Versand und kein Postfacheingang nachgewiesen.** Der Vercel-Request ist vorhanden; sein HTTP-200-Status beschreibt die Server-Action-Antwort, nicht eine erfolgreiche E-Mail-Zustellung.

Vercel enthält Resend-Konfigurationsnamen für Production und Preview. Vorhandensein allein belegt weder einen gültigen Schlüssel noch eine verifizierte Absenderdomain. Außerdem heißen zwei bestehende Variablen `LEAD_RECIPIENT_EMAIL` und `NEXT_PUBLIC_EMAIL`, während der Code bisher nur `LEAD_INBOX_EMAIL` bzw. `NEXT_PUBLIC_CONTACT_EMAIL` auswertete. Beide bisherigen Konfigurationsnamen werden jetzt als nachrangige Alternativen unterstützt. Das ist eine belegte Kompatibilitätskorrektur, aber noch kein Nachweis der eigentlichen Versandursache. Ablehnungen durch den Versanddienst protokollieren künftig ausschließlich den HTTP-Status, keine Anfragen, Schlüssel oder vollständigen Providerantworten.

Die vom Nutzer erwähnte Google-Videobestätigung betrifft das Unternehmensprofil; der Website-Versand läuft über Resend. Anbieterfreigabe und Postfacheingang bleiben getrennt zu prüfen.

## Noch offene ergänzende Prüfungen

| Priorität | Offen | Abnahmekriterium |
|---|---|---|
| Hoch | Tatsächliche Formularzustellung | Je Formular eine ausdrücklich freigegebene Testanfrage über die produktive Versandkonfiguration und bestätigten Eingang prüfen |
| Mittel | Core-Web-Vitals-Felddaten | Verfügbarkeit geprüft: derzeit keine CrUX-Daten; erneut beurteilen, sobald ausreichend echte Besucherdaten vorhanden sind |
| Mittel | Vollständige Barrierearmut | Tastaturpfade, Vergrößerung, Screenreader, Fehlermeldungen und Kontraste systematisch auf der korrigierten Ausgabe prüfen |
| Mittel | Cross-Browser | Relevante Seiten und Formulare zusätzlich in Firefox und Safari sowie auf echten Mobilgeräten testen |
| Nach Lastentwicklung | Verteilter Missbrauchsschutz | Instanzübergreifendes Limit mit geeigneter Infrastruktur nachweisen, falls die reale Nutzung es erfordert |

Die sieben Breiten wurden über die oben dokumentierte isolierte Frame-Prüfansicht abgedeckt. Die weiterhin offenen Punkte werden nicht als bestanden gewertet.

## Freigabe

Der Nutzer hat am 21.09.2026 ausdrücklich die Veröffentlichung der vollständigen Website beauftragt. Technische Prüfungen und die dokumentierte Desktop-Prüfung sind erfolgreich abgeschlossen. PR #10 wurde auf `main` veröffentlicht. Der Nutzerauftrag umfasst ebenso die hier dokumentierten Folgeänderungen aus PR #11. Der veröffentlichte Stand wird zusätzlich über die öffentliche Domain geprüft. Die oben genannten offenen Prüfungen bleiben bestehen und werden durch eine Veröffentlichung nicht automatisch als bestanden gewertet.
