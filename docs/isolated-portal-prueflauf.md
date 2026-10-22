# Getrennter Portal-Prüflauf für KlarVoran

Dieser Aufbau dient nur dem noch offenen, durchgehenden Bedienlauf mit erfundenen Daten. Die produktive Website behält ohne zusätzliche Umgebungsvariablen ihre feste Zuordnung zu `www.klarvoran.de` und zur Haupt-App. In der Haupt-App dürfen Testkopien weiterhin nicht als verbindliche Nachweise freigegeben werden.

## Vor einem Test-Deployment

1. Eine **getrennte Vercel-Preview-Bereitstellung** mit eigener URL verwenden; `www.klarvoran.de` bleibt unverändert. Im Vercel-Preview-Kontext `PORTAL_BACKEND_ORIGIN` auf `https://klarvoran-gesamt-restore-20261021.mazhar-said-ms.chatgpt.site` und `PORTAL_PUBLIC_ORIGIN` auf genau diese HTTPS-Preview-Origin setzen. Andere Backend-Origins werden vom Code abgelehnt.
2. Für Preview `PORTAL_EMAIL_ENABLED=true`, einen eigenen `PORTAL_GATEWAY_KEY`, einen eigenen `PORTAL_BACKEND_BEARER` für die isolierte Site, den Resend-Schlüssel und die vorhandene Absenderadresse setzen. `PORTAL_TEST_RECIPIENTS` enthält nur ausdrücklich für den Test bestimmte eigene E-Mail-Adressen, kommasepariert. Preview versendet weder Einladung noch Code an andere Adressen. **Keine Geheimnisse in Git, PRs, Screenshots oder diesen Prüfbericht übernehmen.**
3. In der getrennten Sites-App den passenden Gateway-Key und `PORTAL_EMAIL_ORIGIN` auf die Preview-Origin setzen. Die dortige Portal-Brücke muss den **eigenen** Bearer akzeptieren. Werte der Haupt-App nicht kopieren oder ändern.
4. Eine ausschließlich fiktive Akte und einen eindeutig als Simulation gekennzeichneten Nachweisweg in der getrennten App vorbereiten. Dokumentenprüfung in der Haupt-App und im späteren Echtdatenbetrieb behält ihre Sperre für `TEST`/`Fiktiv`-Dateien. Nicht die normale Prüfentscheidung durch Umbenennung fiktiver Dokumente umgehen.

## Einmaliger Bedienlauf

Coach- und Teilnehmerzugang über die Preview-Origin anmelden, jeweils nur mit freigegebener Testadresse. Startfreigabe der simulierten Akte, individuellen UE-Plan, vergangenen Termin, Coach-Speicherung, einzelne Anwesenheitsbestätigung, Abschluss, Archiv und Export samt Originaldateien in **demselben** Fall prüfen. Rollenansichten, PDF-Versionen, Auditereignisse und Summen abgleichen. Beim Abschluss Testumgebung und Versionsstände festhalten; fiktive Freigaben niemals in die Haupt-App übernehmen.

**Stand 22.10.2026:** Der Produktionsgateway zeigt im Quellstand noch fest auf die Haupt-App. Die getrennte Restore-App besitzt keine eigene Website-Portal-Preview; deshalb ist dieser gehostete Gesamtpfad noch nicht positiv belegt. Dieser Quelländerungssatz bereitet ausschließlich die getrennte Preview-Konfiguration mit festem Backend-Allowlist und Empfänger-Allowlist vor. Die Vercel-Detailansicht für das Team `klar-voran` meldet aktuell `403`; die Preview-Umgebungswerte sind noch nicht eingerichtet.
