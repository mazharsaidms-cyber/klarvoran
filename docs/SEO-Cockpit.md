# KlarVoran SEO-Cockpit

Dieses lokale Werkzeug liest den CSV-Export der **Suchanfragen** aus Google Search Console, ordnet regionale AVGS-Suchen ein und nennt prüfbare nächste Schritte. Es greift nicht auf Google zu, speichert keine Zugangsdaten und verspricht keine Position.

## Monatlicher Ablauf

1. In Search Console die Property `https://www.klarvoran.de/` öffnen. Unter **Leistung** einen Zeitraum wählen, etwa die letzten 28 Tage; Suchtyp **Web** und Land **Deutschland** beibehalten.
2. Im Tab **Suchanfragen** über **Exportieren** die CSV-Datei speichern. Für einen Vergleich den vorigen Zeitraum mit denselben Filtern exportieren.
3. Im Projekt ausführen:

```bash
npm run seo:report -- --current /pfad/zu/suchanfragen.csv --previous /pfad/zu/vorher.csv --output /pfad/zu/seo-bericht.md
```

`--previous` und `--output` sind optional. Ohne `--output` erscheint der Bericht im Terminal. Die CSV-Dateien und Berichte gehören wegen der privaten Kontodaten nicht ins öffentliche Git-Repository.

## Entscheidungen

- Einblendungen ohne Klick bei passender Position: Suchtreffer, Überschrift und Zielseite prüfen.
- Schwache Position: Inhalt und interne Links der betreffenden Zielseite prüfen; eine neue Stadtseite nur mit eigenständigem Nutzen und tatsächlich passendem Angebot.
- Klicks ohne Anfragen: Kontaktweg und Nutzerführung prüfen.
- Anfragen ohne passende Gutscheine: Förderziel, Region, Format und Bewilligungsweg erklären.

Die Search Console zeigt Durchschnittswerte, keine dauerhafte Platzierung. Änderungen erst nach mehreren Wochen und vergleichbaren Zeiträumen bewerten. Zusätzlich manuell zählen: qualifizierte Erstgespräche, passende AVGS, Bewilligungen und tatsächliche Starts.
