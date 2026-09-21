# KlarVoran: Website-Audit vom 21.09.2026

## Stand und Geltungsbereich

Die Korrekturen liegen auf `codex/klarvoran-final-audit-2026-09-21` und im [Entwurf von PR #10](https://github.com/mazharsaidms-cyber/klarvoran/pull/10). Sie sind noch nicht in die öffentliche Website übernommen. Bereits vorhandene, unveröffentlichte Verbesserungen wurden erhalten und in diesen Prüfstand einbezogen.

Geprüft wurden der Quellcode aller 16 Inhaltsseiten, gemeinsame Komponenten, Formulare, Metadaten, Weiterleitungen, Downloads und die lokale Produktionsausgabe. Die öffentliche Website wurde ergänzend im Browser und anhand ihrer HTTP-Antworten geprüft. Eine vollständige visuelle Abnahme der korrigierten Vorschau und der sieben geforderten Bildschirmbreiten ist noch offen. Dieser Bericht ist keine WCAG-Zertifizierung, kein umfassender Penetrationstest und keine rechtliche Begutachtung.

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

Die bestehende Navigation bleibt erhalten. Spezifische Institutionsseiten erfüllen unterschiedliche Informationsbedürfnisse und wurden deshalb nicht zusammengelegt. Frankfurt bleibt Geschäfts-/Postanschrift; bestätigte Präsenztermine werden dem Durchführungsort Kriftel zugeordnet. Regionale Bezüge nennen Frankfurt und Main-Taunus sinnvoll im Angebotskontext, ohne zusätzliche Ortslisten oder Doorway-Seiten.

Für den Fünf-Sekunden-Test beantwortet der neue Einstieg inhaltlich: Bildungsträger; Job- und Bewerbungscoaching; Menschen auf dem Weg in Arbeit oder Ausbildung; persönliche, strukturierte Unterstützung; Erstgespräch bzw. Angebot ansehen. Ob reale Erstbesucher diese Informationen in fünf Sekunden erfassen, ist damit noch nicht empirisch bewiesen.

## Nachgewiesene technische Prüfungen

| Prüfung | Ergebnis am 21.09.2026 |
|---|---|
| `npm test` | 21 Tests erfolgreich: AVGS-Logik, Eingaben, Rate-Limit, Downloadangaben und Formularrobustheit |
| `npm run lint` | Erfolgreich |
| `npx tsc --noEmit` | Erfolgreich |
| `npm run build` | Erfolgreicher Produktions-Build mit statisch vorgerenderten Inhaltsseiten |
| `npm run test:site-build` | 16 Inhaltsseiten, 604 Referenzen geprüft; u. a. eine H1 je Seite, Metadaten, Canonicals, interne Links/Anker, JSON-LD, Bildattribute und Formularlabels |
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

## Offene Endabnahme

| Priorität | Offen | Abnahmekriterium |
|---|---|---|
| Hoch | Visuelle Abnahme der korrigierten Vorschau | Jede Inhaltsseite im Browser ansehen; keine abgeschnittenen Inhalte, überlagerten Bedienelemente oder abweichenden Kartenlinien; Navigation und Fokus nachvollziehbar |
| Hoch | Responsive-Matrix | 1440, 1280, 1024, 768, 430, 390 und 360 px tatsächlich rendern; Navigation, Formulare, Karten, Footer, Textumbrüche und horizontales Scrollen je Breite prüfen |
| Hoch | Tatsächliche Formularzustellung | Je Formular eine ausdrücklich freigegebene Testanfrage über die produktive Versandkonfiguration und bestätigten Eingang prüfen |
| Mittel | Core Web Vitals | LCP, INP und CLS anhand belastbarer Labormessungen und verfügbarer Felddaten beurteilen; aus Quellcode oder Build-Erfolg keine Werte ableiten |
| Mittel | Vollständige Barrierearmut | Tastaturpfade, Vergrößerung, Screenreader, Fehlermeldungen und Kontraste systematisch auf der korrigierten Ausgabe prüfen |
| Mittel | Cross-Browser | Relevante Seiten und Formulare zusätzlich in Firefox und Safari sowie auf echten Mobilgeräten testen |
| Nach Lastentwicklung | Verteilter Missbrauchsschutz | Instanzübergreifendes Limit mit geeigneter Infrastruktur nachweisen, falls die reale Nutzung es erfordert |

Die Vercel-Vorschau wurde erfolgreich gebaut, verlangt aber eine Anmeldung. Die Sichtprüfung hängt vom Zugang zu dieser Vorschau ab. Der bereitgestellte Browser bot bislang keine dokumentierte Einstellung für die sieben angeforderten Viewportbreiten. Eine Desktop-Stichprobe darf deshalb nicht als vollständige Responsive-Prüfung ausgewiesen werden.

## Freigabe

Technische Prüfungen und nachvollziehbare Korrekturen sind vorhanden. Der Status lautet **zur Prüfung vorbereitet**, nicht vollständig visuell abgenommen oder bereits veröffentlicht. Eine Übernahme auf `main` veröffentlicht über Vercel und erfolgt erst nach Freigabe des konkreten Entwurfs und Klärung der offenen Abnahmepunkte.
