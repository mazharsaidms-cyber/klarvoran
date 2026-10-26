"use client";

import { useEffect, useState, type FormEvent } from "react";
import styles from "../teilnehmer/participant.module.css";
import DocumentWorkflow from "../components/document-workflow";
import CoachMessages from "../components/coach-messages";
import CoachUpload from "../components/coach-upload";
import { VisualIcon } from "@/components/VisualIcon";

type Me = { user: { displayName: string; role: string }; cases: Array<{ id: string; name: string; status: string }>; operatingMode: "test" | "real" };
type Document = { id: string; participantId: string; title: string; category: string; status: string;
  currentVersion: number; participantVisible: boolean; deletionStatus?: string; updatedAt: string; versions: Array<{ version: number; originalFileName: string; byteSize: number; contentType: string }> };
type CoachSchedule = { participantId: string; revision: number; startReady: boolean;
  appointments: Array<{ id: string; date: string; time: string; plannedUe: number; moduleId: string;
    format: string; status: string; documentable: boolean }>;
  sessions: Array<{ id: string; appointmentId: string; date: string; attendance: string; performedUe: number;
    topic: string; result: string; nextStep: string }> };
type Phase = "loading" | "email" | "code" | "cases";
const apiRoot = "/api/teilnehmer";

class PortalError extends Error { constructor(message: string, public readonly status: number) { super(message); } }
async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiRoot}${path}`, { ...init, cache: "no-store", credentials: "same-origin" });
  const data = await response.json().catch(() => ({})) as T & { error?: string };
  if (!response.ok) throw new PortalError(data.error || "Die Verbindung ist gerade unterbrochen. Bitte versuche es erneut.", response.status);
  return data;
}
function post<T>(path: string, data: unknown, method = "POST") {
  return api<T>(path, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
}
function errorText(error: unknown) { return error instanceof Error ? error.message : "Ein Fehler ist aufgetreten."; }
function statusLabel(value: string) {
  return ({ uploaded: "Hochgeladen", review_pending: "Prüfung offen", reviewed: "Geprüft", approved: "Freigegeben", rejected: "Abgelehnt" } as Record<string, string>)[value] ?? value;
}
function documentNumber(document: Document) {
  const casePart = document.participantId.toUpperCase().replace(/[^A-Z0-9-]/g, "-");
  const documentPart = document.id.toUpperCase().replace(/[^A-Z0-9-]/g, "-");
  return `KV-${casePart}-ORIG-${documentPart}-V${String(document.currentVersion).padStart(3, "0")}`;
}

export default function CoachPortal({ configured }: { configured: boolean }) {
  const [phase, setPhase] = useState<Phase>(configured ? "loading" : "email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [me, setMe] = useState<Me | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selected, setSelected] = useState("");
  const [schedule, setSchedule] = useState<CoachSchedule | null>(null);
  const [sessionAppointment, setSessionAppointment] = useState("");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [resendAt, setResendAt] = useState(0);
  const activeCase = me?.cases.find(item => item.id === selected);
  const caseDocuments = documents.filter(item => item.participantId === selected);

  useEffect(() => {
    if (!configured) return;
    const controller = new AbortController();
    (async () => {
      try {
        const identity = await api<Me>("/me", { signal: controller.signal });
        if (identity.user.role !== "coach") throw new PortalError("Dieser Zugang gehört zum Teilnehmerbereich.", 403);
        const result = await api<{ documents: Document[] }>("/documents", { signal: controller.signal });
        if (!controller.signal.aborted) { setMe(identity); setDocuments(result.documents); setSelected(identity.cases[0]?.id ?? ""); setPhase("cases"); }
      } catch (caught) {
        if (controller.signal.aborted) return;
        if (!(caught instanceof PortalError && caught.status === 401)) setError(errorText(caught));
        setPhase("email");
      }
    })();
    return () => controller.abort();
  }, [configured]);

  useEffect(() => {
    if (phase !== "cases" || !selected) return;
    const controller = new AbortController();
    api<CoachSchedule>(`/coach-sessions?participantId=${encodeURIComponent(selected)}`, { signal: controller.signal })
      .then(value => { if (!controller.signal.aborted) setSchedule(value); })
      .catch(caught => { if (!controller.signal.aborted) setError(errorText(caught)); });
    return () => controller.abort();
  }, [phase, selected]);

  async function requestCode(event: FormEvent) {
    event.preventDefault();
    if (Date.now() < resendAt) { setError("Bitte warte eine Minute, bevor du einen neuen Code anforderst."); return; }
    setBusy("send"); setError(""); setNotice("");
    try {
      await post("/auth/email-otp/send-verification-otp", { email: email.trim(), type: "sign-in" });
      setCode(""); setPhase("code"); setResendAt(Date.now() + 60_000);
      setNotice("Wenn dein Zugang freigegeben ist, erhältst du den Code per E-Mail.");
    } catch (caught) { setError(errorText(caught)); }
    finally { setBusy(""); }
  }
  async function signIn(event: FormEvent) {
    event.preventDefault(); setBusy("login"); setError(""); setNotice("");
    try {
      await post("/auth/sign-in/email-otp", { email: email.trim(), otp: code });
      const identity = await api<Me>("/me");
      if (identity.user.role !== "coach") throw new PortalError("Dieser Zugang gehört zum Teilnehmerbereich.", 403);
      const result = await api<{ documents: Document[] }>("/documents");
      setCode(""); setMe(identity); setDocuments(result.documents); setSchedule(null); setSelected(identity.cases[0]?.id ?? ""); setPhase("cases");
    } catch (caught) { setError(errorText(caught)); }
    finally { setBusy(""); }
  }
  async function refresh() {
    setBusy("refresh"); setError("");
    try {
      const identity = await api<Me>("/me");
      if (identity.user.role !== "coach") throw new PortalError("Dieser Zugang gehört zum Teilnehmerbereich.", 403);
      const result = await api<{ documents: Document[] }>("/documents");
      setMe(identity); setDocuments(result.documents);
      if (!identity.cases.some(item => item.id === selected)) setSelected(identity.cases[0]?.id ?? "");
      if (selected && identity.cases.some(item => item.id === selected)) {
        setSchedule(await api<CoachSchedule>(`/coach-sessions?participantId=${encodeURIComponent(selected)}`));
      }
    } catch (caught) { setError(errorText(caught)); if (caught instanceof PortalError && [401, 403].includes(caught.status)) { setMe(null); setPhase("email"); } }
    finally { setBusy(""); }
  }
  async function markReviewed(document: Document) {
    setBusy(document.id); setError(""); setNotice("");
    try {
      await post("/documents", { documentId: document.id, action: "mark_reviewed" }, "PATCH");
      const result = await api<{ documents: Document[] }>("/documents");
      setDocuments(result.documents); setNotice("Das Dokument wurde als geprüft markiert.");
    } catch (caught) { setError(errorText(caught)); if (caught instanceof PortalError && [401, 403].includes(caught.status)) setPhase("email"); }
    finally { setBusy(""); }
  }
  async function setVisibility(document: Document) {
    setBusy(document.id); setError("");
    try { await post("/documents", {documentId:document.id,action:"set_visibility",participantVisible:!document.participantVisible}, "PATCH");
      const result=await api<{documents:Document[]}>("/documents"); setDocuments(result.documents);
    } catch(caught) {setError(errorText(caught));} finally {setBusy("");}
  }
  async function download(document: Document) {
    setBusy(document.id); setError("");
    try {
      const response = await fetch(`${apiRoot}/file?documentId=${encodeURIComponent(document.id)}`, { cache: "no-store", credentials: "same-origin" });
      if (!response.ok) { const data = await response.json().catch(() => ({})) as { error?: string }; throw new PortalError(data.error || "Datei konnte nicht geladen werden.", response.status); }
      const blob = await response.blob();
      if (blob.size === 0) throw new PortalError("Die Datei ist leer und konnte nicht heruntergeladen werden.", 502);
      const filename = response.headers.get("content-disposition")?.match(/filename\*=UTF-8''([^;]+)/)?.[1];
      const name = filename ? decodeURIComponent(filename) : document.versions[0]?.originalFileName ?? "Dokument";
      const url = URL.createObjectURL(blob), link = window.document.createElement("a");
      link.href = url; link.download = name; window.document.body.append(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setNotice(`Datei vom Server geladen (${blob.size.toLocaleString("de-DE")} Bytes). Prüfe den Downloadordner deines Browsers.`);
    } catch (caught) { setError(errorText(caught)); }
    finally { setBusy(""); }
  }
  async function saveSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !schedule || !sessionAppointment) return;
    const form = new FormData(event.currentTarget);
    setBusy("session"); setError(""); setNotice("");
    try {
      await post("/coach-sessions", {
        participantId: selected, appointmentId: sessionAppointment, attendance: "Anwesend",
        endTime: String(form.get("endTime") ?? ""), pauseMinutes: Number(form.get("pauseMinutes") ?? 0),
        performedUe: Number(form.get("performedUe") ?? 0), topic: String(form.get("topic") ?? ""),
        result: String(form.get("result") ?? ""), nextStep: String(form.get("nextStep") ?? ""),
        expectedRevision: schedule.revision, [me?.operatingMode === "real" ? "realDataConfirmed" : "testDataConfirmed"]: form.get("dataConfirmed") === "on",
      });
      setSchedule(await api<CoachSchedule>(`/coach-sessions?participantId=${encodeURIComponent(selected)}`));
      setSessionAppointment(""); setNotice("Die Sitzung wurde gespeichert und die UE wurden aktualisiert.");
    } catch (caught) { setError(errorText(caught)); }
    finally { setBusy(""); }
  }
  async function logout() {
    setBusy("logout"); setError("");
    try { await post("/auth/sign-out", {}); setMe(null); setDocuments([]); setSchedule(null); setEmail(""); setCode(""); setPhase("email"); setNotice("Du bist abgemeldet."); }
    catch (caught) { setError(errorText(caught)); }
    finally { setBusy(""); }
  }

  return <section className={styles.portal} aria-label="KlarVoran Coachbereich">
    {phase === "cases" && me?.operatingMode === "test" && <div className={styles.testNotice}>Testbetrieb: Bitte ausschließlich erfundene Angaben und Testdokumente verwenden.</div>}
    {!configured && <p className={styles.error} role="alert">Der E-Mail-Zugang ist noch nicht eingerichtet. Bitte wende dich an KlarVoran.</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    {phase === "loading" ? <p role="status">Dein Zugang wird geprüft …</p> : phase !== "cases" ? <div className={styles.loginGrid}>
      <div className={styles.loginIntro}>
        <span className={styles.loginTag}>DEIN COACHBEREICH</span>
        <h1>Deine Fälle. Deine nächsten Schritte.</h1>
        <p>Eine Akte auswählen und direkt zu Unterlagen, Nachrichten oder Terminen gehen.</p>
        <div className={styles.coachPreview} aria-hidden="true">
          <div className={styles.coachPreviewTop}><span><VisualIcon name="quality" /> KlarVoran</span><span>Coach</span></div>
          <div className={styles.coachPreviewCase}><span className={styles.coachPreviewAvatar}><VisualIcon name="social" /></span><span><strong>Ausgewählte Akte</strong><small>Alles an einem Ort</small></span><span className={styles.coachPreviewDot} /></div>
          <div className={styles.coachPreviewTiles}><span><VisualIcon name="document" /> Unterlagen</span><span><VisualIcon name="conversation" /> Nachrichten</span><span><VisualIcon name="calendar" /> Termine</span></div>
        </div>
        <span className={styles.loginTrust}>Nur für freigegebene Coaches</span>
      </div>
      <section className={`${styles.card} ${styles.loginCard}`} aria-labelledby="coach-login-title">
        <span className={styles.loginStep}>SCHRITT {phase === "code" ? "2" : "1"} / 2</span>
        <h2 id="coach-login-title">{phase === "code" ? "Code eingeben" : "Jetzt anmelden"}</h2>
        {phase === "email" ? <form onSubmit={requestCode}>
          <p>Gib die E-Mail-Adresse aus deiner Einladung ein.</p>
          <label htmlFor="coach-email">Deine E-Mail-Adresse</label><input id="coach-email" type="email" required autoComplete="email" inputMode="email" maxLength={254} disabled={!!busy || !configured} value={email} onChange={event => setEmail(event.target.value)} />
          <button className={styles.primary} disabled={!configured || !!busy}>{busy === "send" ? "Code wird gesendet …" : "Code anfordern →"}</button>
          <small>Ohne Passwort · Zugang nur mit Einladung</small>
        </form> : <form onSubmit={signIn}>
          <p>Gib den sechsstelligen Code aus der E-Mail an <strong>{email.trim()}</strong> ein. Er gilt fünf Minuten.</p>
          <label htmlFor="coach-code">Bestätigungscode</label><input id="coach-code" className={styles.codeInput} type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required autoComplete="one-time-code" value={code} onChange={event => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} />
          <button className={styles.primary} disabled={!!busy || code.length !== 6}>{busy === "login" ? "Anmeldung läuft …" : "Coachbereich öffnen →"}</button>
          <button type="button" className={styles.linkButton} disabled={!!busy} onClick={() => { setPhase("email"); setCode(""); setError(""); setNotice(""); }}>E-Mail-Adresse ändern</button>
        </form>}
      </section>
    </div> : null}
    {phase === "cases" && me && <>
      <div className={styles.toolbar}><strong>Angemeldet: {me.user.displayName}</strong><div><button className={styles.secondary} disabled={!!busy} onClick={() => void refresh()}>Aktualisieren</button><button className={styles.secondary} disabled={!!busy} onClick={() => void logout()}>Abmelden</button></div></div>
      <div className={styles.dashboardHero}>
        <div className={styles.heroCopy}><span className={styles.heroEyebrow}>DEIN ARBEITSBEREICH</span><h1>{activeCase ? activeCase.name : "Deine Akten im Blick"}</h1><p>{activeCase ? "Wähle unten, was du für diesen Fall erledigen möchtest." : "Wähle eine Akte, sobald sie dir zugewiesen wurde."}</p></div>
        <div className={styles.heroAppointment}><VisualIcon name="signpost" /><span>NÄCHSTER SCHRITT</span><strong>{activeCase ? !schedule || schedule.participantId !== selected ? "Stand wird geladen" : schedule.startReady ? "Coaching begleiten" : "Start prüfen" : "Akte auswählen"}</strong><small>{activeCase ? !schedule || schedule.participantId !== selected ? "Die Angaben zur Akte werden abgerufen." : schedule.startReady ? `${schedule.appointments.length} Termine · ${caseDocuments.length} Dateien` : "Startnachweise und Coachingplan ansehen" : "Deine zugewiesenen Fälle erscheinen hier."}</small></div>
      </div>
      {me.cases.length === 0 ? <p className={styles.card}>Dir ist derzeit keine Akte zugewiesen.</p> : <section className={styles.card}><h2>Akte wählen</h2><label className={styles.documentKind}>Zugewiesene Akte<select value={selected} onChange={event => { setSchedule(null); setSelected(event.target.value); }}>{me.cases.map(item => <option key={item.id} value={item.id}>{item.name} · {item.status}</option>)}</select></label></section>}
      {selected && <nav className={styles.coachNav} aria-label="Direkt zum Arbeitsbereich">
        <a href="#coach-unterlagen"><span className={styles.quickIcon}><VisualIcon name="document" /></span><span><strong>Unterlagen</strong><small>Prüfen &amp; bestätigen</small></span><span aria-hidden="true">→</span></a>
        <a href="#coach-nachrichten"><span className={styles.quickIcon}><VisualIcon name="conversation" /></span><span><strong>Nachrichten</strong><small>Im Austausch bleiben</small></span><span aria-hidden="true">→</span></a>
        <a href="#coach-termine"><span className={styles.quickIcon}><VisualIcon name="calendar" /></span><span><strong>Termine</strong><small>Sitzungen dokumentieren</small></span><span aria-hidden="true">→</span></a>
        <a href="#coach-dateien"><span className={styles.quickIcon}><VisualIcon name="laptop" /></span><span><strong>Dateien</strong><small>Hochladen &amp; ansehen</small></span><span aria-hidden="true">→</span></a>
      </nav>}
      {selected && <div id="coach-unterlagen" className={styles.coachAnchor}><DocumentWorkflow key={`sign-${selected}`} participantId={selected} participant={false} apiRoot={apiRoot} documents={documents.filter(d => d.participantId === selected)} operatingMode={me.operatingMode} /></div>}
      {selected && <div id="coach-nachrichten" className={styles.coachAnchor}><CoachMessages key={`messages-${selected}`} participantId={selected} operatingMode={me.operatingMode} /></div>}
      {selected && <section id="coach-termine" className={`${styles.card} ${styles.coachAnchor}`}><h2 className={styles.sectionHeading}><VisualIcon name="calendar" />Termine &amp; Sitzungsnotizen</h2><details className={styles.help}><summary>Was gehört in diese Notiz?</summary><p>Diese Notizen bleiben im Coachbereich. Anwesenheiten stellst du oben gesondert zur Unterschrift bereit. Gemeinsame Gesprächsergebnisse kannst du dort als eigenen Dokumenttext freigeben.</p></details>
        {!schedule || schedule.participantId !== selected ? <p>Termine werden geladen …</p> : <>
          {!schedule.startReady && <p className={styles.testNotice}>Sitzungsdokumentation gesperrt: Startnachweise und vereinbarter Coachingplan müssen zuerst fachlich freigegeben sein.</p>}
          {schedule.appointments.length === 0 ? <p>Für diese Akte sind noch keine Termine geplant.</p> :
            <ul className={styles.documents}>{schedule.appointments.map(item => {
              const existing = schedule.sessions.find(session => session.appointmentId === item.id);
              return <li key={item.id}><strong>{item.date} · {item.time} · {item.plannedUe} UE</strong>
                <small>{item.format} · Modul {item.moduleId} · {item.status}</small>
                {existing && <p>{existing.attendance} · {existing.performedUe} Ist-UE · {existing.topic}: {existing.result}</p>}
                {!existing && <div className={styles.inlineActions}><button className={styles.secondary} type="button"
                  disabled={!item.documentable || !!busy} onClick={() => setSessionAppointment(item.id)}>Sitzung dokumentieren</button></div>}
              </li>;
            })}</ul>}
          {sessionAppointment && (() => {
            const appointment = schedule.appointments.find(item => item.id === sessionAppointment);
            if (!appointment?.documentable) return null;
            return <form className={styles.sessionForm} onSubmit={saveSession}>
              <h3>Sitzung vom {appointment.date}, {appointment.time}</h3>
              <p>Erfasse die tatsächlich durchgeführte Sitzung erst nach ihrem Ende. Fehlzeiten werden gesondert geklärt.</p>
              <label>Ende<input name="endTime" type="time" required /></label>
              <label>Pause in Minuten<input name="pauseMinutes" type="number" min="0" max="180" step="5" defaultValue="0" required /></label>
              <label>Geleistete UE<select name="performedUe" required defaultValue={Math.min(2, appointment.plannedUe)}>
                {Array.from({ length: appointment.plannedUe }, (_, index) => index + 1).map(value => <option key={value} value={value}>{value} UE</option>)}
              </select></label>
              <label>Thema<textarea name="topic" maxLength={2000} required /></label>
              <label>Ergebnis<textarea name="result" maxLength={2000} required /></label>
              <label>Nächster Schritt<textarea name="nextStep" maxLength={2000} required /></label>
              <label className={styles.checkbox}><input name="dataConfirmed" type="checkbox" required /> {me.operatingMode === "real" ? "Ich habe die Sitzungsangaben vor dem Speichern geprüft." : "Diese Angaben sind vollständig erfunden und dienen nur dem Praxistest."}</label>
              <div className={styles.inlineActions}><button className={styles.primary} disabled={!!busy}>Sitzung speichern</button>
                <button className={styles.secondary} type="button" onClick={() => setSessionAppointment("")}>Abbrechen</button></div>
            </form>;
          })()}
        </>}
      </section>}
      {selected && <div id="coach-dateien" className={styles.coachAnchor}><CoachUpload key={`upload-${selected}`} participantId={selected} onUploaded={refresh} operatingMode={me.operatingMode} /></div>}
      {selected && <section className={styles.card}><div className={styles.documentHeading}><div><h2>Dokumente</h2><p>Nur Dokumente der ausgewählten Akte.</p></div><span>{documents.filter(item => item.participantId === selected).length}</span></div>
        {documents.filter(item => item.participantId === selected).length === 0 ? <p>Für diese Akte sind noch keine Dokumente vorhanden.</p> : <ul className={styles.documents}>{documents.filter(item => item.participantId === selected).map(item => <li key={item.id}>
          <strong>{item.title}</strong><small>{item.category} · Version {item.currentVersion} · {statusLabel(item.status)}</small>
          <small>Dokument-Nr. {documentNumber(item)} · {item.participantVisible?"Für Teilnehmer sichtbar":"Intern"}</small>
          {item.deletionStatus && item.deletionStatus !== "active" && <small>Löschanfrage in Prüfung – Änderungen gesperrt.</small>}
          <div className={styles.inlineActions}><button className={styles.secondary} disabled={!!busy || (item.deletionStatus !== undefined && item.deletionStatus !== "active")} onClick={() => void setVisibility(item)}>{item.participantVisible?"Intern setzen":"Für Teilnehmer sichtbar machen"}</button><button className={styles.secondary} disabled={!!busy} onClick={() => void download(item)}>Datei herunterladen</button>
            {(item.status === "uploaded" || item.status === "review_pending") && <button className={styles.secondary} disabled={!!busy || (item.deletionStatus !== undefined && item.deletionStatus !== "active")} onClick={() => void markReviewed(item)}>Als geprüft markieren</button>}</div>
        </li>)}</ul>}
      </section>}
    </>}
    <aside className={styles.help}>Bei Fragen erreichst du KlarVoran unter <a href="tel:+491779548140">0177 9548140</a>. Melde dich auf gemeinsam genutzten Geräten nach der Arbeit ab.</aside>
  </section>;
}
