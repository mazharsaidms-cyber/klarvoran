"use client";

import { useState } from "react";

const foreignDocumentId = "57a6bf46-3367-4cd8-8710-153fec6d63b8";
type Result = { identity: number; own: number; foreign: number; foreignType: string };

export default function DocumentAccessCheck() {
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    setResult(null);
    setMessage("");
    try {
      const options: RequestInit = { credentials: "same-origin", cache: "no-store" };
      const identity = await fetch("/api/teilnehmer/me", options);
      if (!identity.ok) { setMessage(`Anmeldung nicht verfügbar (HTTP ${identity.status}).`); return; }
      const me = await identity.json() as { user?: { role?: string } };
      if (me.user?.role !== "participant") { setMessage("Bitte mit dem Teilnehmer-Testzugang anmelden."); return; }
      const listing = await fetch("/api/teilnehmer/documents", options);
      if (!listing.ok) { setMessage(`Dokumentenliste nicht verfügbar (HTTP ${listing.status}).`); return; }
      const data = await listing.json() as { documents?: Array<{ id: string }> };
      const ownId = data.documents?.[0]?.id;
      if (!ownId) { setMessage("Kein eigenes Dokument für die Kontrollanfrage vorhanden."); return; }
      const own = await fetch(`/api/teilnehmer/file?documentId=${encodeURIComponent(ownId)}`, options);
      const ownStatus = own.status;
      await own.body?.cancel();
      const foreign = await fetch(`/api/teilnehmer/file?documentId=${foreignDocumentId}`, options);
      const foreignStatus = foreign.status;
      const foreignType = foreign.headers.get("content-type") ?? "";
      await foreign.body?.cancel();
      setResult({ identity: identity.status, own: ownStatus, foreign: foreignStatus, foreignType });
    } catch { setMessage("Die Anfrage konnte nicht abgeschlossen werden."); }
    finally { setBusy(false); }
  }

  const passed = result?.identity === 200 && result.own === 200 && result.foreign === 404 && result.foreignType.startsWith("application/json");
  return <main style={{ maxWidth: 620, margin: "4rem auto", padding: "1rem", fontFamily: "sans-serif" }}>
    <h1>Zugriffsprüfung</h1>
    <p>Nur für den laufenden Test mit erfundenen Daten. Die Prüfung zeigt HTTP-Statuswerte, keine Dateiinhalte.</p>
    <button type="button" onClick={() => void run()} disabled={busy}>{busy ? "Prüfe …" : "Prüfung starten"}</button>
    {message && <p role="status">{message}</p>}
    {result && <section aria-live="polite">
      <p>Anmeldung: HTTP {result.identity}</p>
      <p>Eigenes Dokument: HTTP {result.own}</p>
      <p>Fremdes Dokument: HTTP {result.foreign}</p>
      <p>Antworttyp beim Fremdzugriff: {result.foreignType || "kein Typ"}</p>
      <strong>{passed ? "Bestanden: fremder Beleg ist gesperrt." : "Nicht bestanden oder nicht eindeutig: bitte prüfen."}</strong>
    </section>}
    <p><a href="/teilnehmer">Zurück zur Akte</a></p>
  </main>;
}
