"use client";

import DocumentWorkflow from "../components/document-workflow";
import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./participant.module.css";
import { PARTICIPANT_CHUNK_BYTES } from "@/lib/participant-gateway-proof";
import { zoomMeetingUrlFromMessage } from "@/lib/zoom-link";

type Me = { user: { displayName: string; participantId: string | null; role: string }; cases: Array<{ id: string; name: string }>;
  capabilities: { upload: boolean }; realDataAllowed: boolean; operatingMode: "test" | "real" };
type Document = { id: string; title: string; status: string; currentVersion: number; createdAt: string;
  versions: Array<{ originalFileName: string; byteSize: number; version: number }>;
  replies: Array<{ id: string; documentVersion: number; body: string; createdAt: string }>;
  extraction: null | { status: string; data: null | { subject: string | null; deadline: string | null; requestedAction: string | null; warnings: string[] } } };
type DocumentKind = "Behördenbrief" | "Sonstiges";
type CaseMessage = { id: string; authorRole: string; body: string; createdAt: string };
type CaseProgress = { startReady: boolean; goal: string; reviewDate: string; goalSteps: Array<{ id: string; title: string; status: string; nextStep: string }>;
  appointments: Array<{ id: string; date: string; time: string; format: string; response: string }> };
type Pending = { id: string; file: File; category: DocumentKind | ""; progress: number; error: string; receipt?: string; started?: boolean };
type Phase = "loading" | "email" | "code" | "case";
const apiRoot = "/api/teilnehmer";
const maxBytes = 8 * 1024 * 1024;

class PortalError extends Error { constructor(message: string, public readonly status: number) { super(message); } }
async function api<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${apiRoot}${path}`, { ...options, cache: "no-store", credentials: "same-origin" });
  const value = await response.json().catch(() => ({})) as T & { error?: string };
  if (!response.ok) throw new PortalError(value.error || "Die Verbindung ist gerade unterbrochen. Bitte versuche es erneut.", response.status);
  return value;
}
function post<T>(path: string, body: unknown) { return api<T>(path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }); }

export default function ParticipantPortal({ configured }: { configured: boolean }) {
  const [phase, setPhase] = useState<Phase>(configured ? "loading" : "email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [me, setMe] = useState<Me | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<CaseMessage[]>([]);
  const [messageBody, setMessageBody] = useState("");
  const [messageConfirmed, setMessageConfirmed] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageNotice, setMessageNotice] = useState("");
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [caseProgress, setCaseProgress] = useState<CaseProgress | null>(null);
  const [progressError, setProgressError] = useState("");
  const [pending, setPending] = useState<Pending[]>([]);
  const [testConfirmed, setTestConfirmed] = useState(false);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [resendAt, setResendAt] = useState(0);
  const codeInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!configured) return;
    const controller = new AbortController();
    (async () => {
      try {
        const identity = await api<Me>("/me", { signal: controller.signal });
        if (identity.user.role !== "participant") throw new PortalError("Dieser Zugang gehört zum Coachbereich. Öffne klarvoran.de/coach.", 403);
        const result = await api<{ documents: Document[] }>("/documents", { signal: controller.signal });
        if (!controller.signal.aborted) { setMe(identity); setDocuments(result.documents); setPhase("case");
          const ownId = identity.cases.find(item => item.id === identity.user.participantId)?.id;
          if (ownId) { void loadMessages(ownId, controller.signal); void loadProgress(controller.signal); }
        }
      } catch (caught) {
        if (controller.signal.aborted) return;
        if (!(caught instanceof PortalError && caught.status === 401)) setError(messageOf(caught));
        setPhase("email");
      }
    })();
    return () => controller.abort();
  }, [configured]);
  useEffect(() => { if (phase === "code") codeInput.current?.focus(); }, [phase]);

  function handleError(caught: unknown) {
    setError(messageOf(caught));
    if (caught instanceof PortalError && [401, 403].includes(caught.status)) {
      setMe(null); setDocuments([]); setMessages([]); setMessagesLoaded(false); setCaseProgress(null); setProgressError(""); setPending([]); setCode(""); setTestConfirmed(false); setPhase("email");
    }
  }

  async function requestCode(event?: FormEvent) {
    event?.preventDefault();
    if (Date.now() < resendAt) { setError("Bitte warte eine Minute, bevor du einen neuen Code anforderst."); return; }
    setBusy("code-send"); setError(""); setNotice("");
    try {
      await post("/auth/email-otp/send-verification-otp", { email: email.trim(), type: "sign-in" });
      setCode(""); setPhase("code"); setResendAt(Date.now() + 60_000);
      setNotice("Wenn dein Zugang freigegeben ist, erhältst du den Code per E-Mail. Prüfe auch den Spam-Ordner.");
    } catch (caught) { setError(messageOf(caught)); }
    finally { setBusy(""); }
  }
  async function signIn(event: FormEvent) {
    event.preventDefault(); setBusy("sign-in"); setError(""); setNotice("");
    try {
      await post("/auth/sign-in/email-otp", { email: email.trim(), otp: code });
      const identity = await api<Me>("/me");
      if (identity.user.role !== "participant") throw new PortalError("Dieser Zugang gehört zum Coachbereich. Öffne klarvoran.de/coach.", 403);
      const result = await api<{ documents: Document[] }>("/documents");
      setCode(""); setMe(identity); setDocuments(result.documents); setPhase("case");
      const ownId = identity.cases.find(item => item.id === identity.user.participantId)?.id;
      if (ownId) { void loadMessages(ownId); void loadProgress(); }
    } catch (caught) { setError(messageOf(caught)); }
    finally { setBusy(""); }
  }
  async function logout() {
    setBusy("logout"); setError("");
    try {
      await post("/auth/sign-out", {});
      setMe(null); setDocuments([]); setMessages([]); setMessagesLoaded(false); setCaseProgress(null); setProgressError(""); setMessageBody(""); setMessageConfirmed(false); setPending([]); setCode(""); setEmail(""); setTestConfirmed(false); setPhase("email"); setNotice("Du bist abgemeldet.");
    } catch (caught) { setError(messageOf(caught)); }
    finally { setBusy(""); }
  }
  async function refresh() {
    setBusy("refresh"); setError("");
    try { const identity = await api<Me>("/me"); const result = await api<{ documents: Document[] }>("/documents"); setMe(identity); setDocuments(result.documents);
      const ownId = identity.cases.find(item => item.id === identity.user.participantId)?.id;
      if (ownId) await Promise.all([loadMessages(ownId), loadProgress()]);
    }
    catch (caught) { handleError(caught); }
    finally { setBusy(""); }
  }
  async function loadMessages(participantId: string, signal?: AbortSignal) {
    try {
      const result = await api<{ messages: CaseMessage[] }>(`/messages?participantId=${encodeURIComponent(participantId)}`, { signal });
      if (!signal?.aborted) { setMessages(result.messages); setMessagesLoaded(true); setMessageError(""); }
    } catch (caught) {
      if (!signal?.aborted) setMessageError(messageOf(caught));
    }
  }
  async function loadProgress(signal?: AbortSignal) {
    try {
      const result = await api<CaseProgress>("/progress", { signal });
      if (!signal?.aborted) { setCaseProgress(result); setProgressError(""); }
    } catch (caught) {
      if (!signal?.aborted) { setCaseProgress(null); setProgressError(messageOf(caught)); }
    }
  }
  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    if (!ownCase || !messageConfirmed || messageBody.trim().length < 2 || busy) return;
    setBusy("message"); setMessageError(""); setMessageNotice("");
    try {
      await post("/messages", { participantId: ownCase.id, body: messageBody, [me?.operatingMode === "real" ? "realDataConfirmed" : "testDataConfirmed"]: true });
      setMessageBody(""); setMessageConfirmed(false); setMessageNotice("Deine Nachricht wurde gesendet.");
      await loadMessages(ownCase.id);
    } catch (caught) { setMessageError(messageOf(caught)); }
    finally { setBusy(""); }
  }
  function selectFiles(files: FileList | null) {
    if (!files) return;
    const selected = [...files];
    if (pending.length + selected.length > 20) { setError("Bitte wähle insgesamt höchstens 20 Dateien aus."); return; }
    if (selected.some(file => file.size < 1 || file.size > maxBytes || !/\.(pdf|jpe?g|png)$/i.test(file.name) || file.name.length > 160)) {
      setError("Bitte wähle PDF-, JPG- oder PNG-Dateien bis jeweils 8 MB aus. Sehr lange Dateinamen bitte vorher kürzen."); return;
    }
    const additions = selected.filter(file => !pending.some(entry => entry.file.name === file.name && entry.file.size === file.size && entry.file.lastModified === file.lastModified));
    setPending(current => [...current, ...additions.map(file => ({ id: crypto.randomUUID(), file, category: "" as const, error: "", progress: 0 }))]); setError(""); setNotice("");
  }
  function updatePending(id: string, changes: Partial<Pending>) { setPending(current => current.map(entry => entry.id === id ? { ...entry, ...changes } : entry)); }
  async function upload() {
    if (!testConfirmed || !me?.capabilities.upload) return;
    if (pending.some(entry => !entry.receipt && !entry.category)) { setError("Bitte wähle für jede Datei eine Dokumentart aus."); return; }
    setBusy("upload"); setError(""); setNotice("");
    let delivered = 0;
    try {
      for (const entry of pending.filter(item => !item.receipt)) {
        updatePending(entry.id, { error: "", progress: 0, started: true });
        try {
          const bytes = await entry.file.arrayBuffer();
          const hash = [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map(byte => byte.toString(16).padStart(2, "0")).join("");
          const title = entry.file.name.replace(/\.[^.]+$/, "").slice(0, 160) || "Dokument";
          await post("/upload/start", { id: entry.id, fileName: entry.file.name, byteSize: entry.file.size, title, checksum: hash, [me?.operatingMode === "real" ? "realDataConfirmed" : "testDataConfirmed"]: true });
          const chunkCount = Math.ceil(entry.file.size / PARTICIPANT_CHUNK_BYTES);
          for (let part = 0; part < chunkCount; part++) {
            await api(`/upload/chunk?id=${entry.id}&part=${part}`, { method: "POST", headers: { "content-type": "application/octet-stream" }, body: entry.file.slice(part * PARTICIPANT_CHUNK_BYTES, (part + 1) * PARTICIPANT_CHUNK_BYTES) });
            updatePending(entry.id, { progress: Math.round(90 * (part + 1) / chunkCount) });
          }
          const receipt = await post<{ documentId?: string }>("/upload/finish", { id: entry.id, category: entry.category });
          if (!receipt.documentId) throw new Error("Die Datei konnte noch nicht bestätigt werden. Bitte erneut senden.");
          updatePending(entry.id, { progress: 100, receipt: receipt.documentId }); delivered++;
        } catch (caught) { updatePending(entry.id, { error: messageOf(caught) }); throw caught; }
      }
      const result = await api<{ documents: Document[] }>("/documents"); setDocuments(result.documents);
      setNotice(delivered === 1 ? "Deine Datei ist angekommen und steht unten in deiner Akte." : `${delivered} Dateien sind angekommen und stehen unten in deiner Akte.`);
    } catch (caught) { handleError(caught); }
    finally { setBusy(""); }
  }
  async function download(document: Document) {
    setBusy(`download:${document.id}`); setError("");
    try {
      const response = await fetch(`${apiRoot}/file?documentId=${encodeURIComponent(document.id)}`, { cache: "no-store", credentials: "same-origin" });
      if (!response.ok) { const result = await response.json().catch(() => ({})) as { error?: string }; throw new PortalError(result.error || "Die Datei konnte nicht geöffnet werden.", response.status); }
      if (!response.headers.get("content-type")?.startsWith("application/octet-stream")) throw new Error("Die Datei konnte nicht sicher geöffnet werden.");
      const blob = await response.blob(), url = URL.createObjectURL(blob), anchor = window.document.createElement("a");
      anchor.href = url; anchor.download = document.versions.find(version => version.version === document.currentVersion)?.originalFileName || "Dokument"; anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (caught) { handleError(caught); }
    finally { setBusy(""); }
  }

  const ownCase = me?.cases.find(item => item.id === me.user.participantId);
  const waiting = pending.filter(item => !item.receipt).length;
  return <section className={styles.portal} aria-label="Dein KlarVoran-Teilnehmerbereich">
    {phase === "case" && me?.operatingMode === "test" && <div className={styles.testNotice}><strong>Wir testen noch.</strong> Bitte verwende ausschließlich erfundene Angaben und Testdokumente. Echte Behördenbriefe bitte noch nicht hochladen.</div>}
    {!configured && <div className={styles.notice} role="status">Der Teilnehmerzugang wird noch eingerichtet. KlarVoran informiert dich, sobald du deine Einladung nutzen kannst.</div>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    {phase === "loading" ? <p role="status">Dein Zugang wird geprüft …</p> : phase !== "case" ? <div className={styles.loginGrid}>
      <div className={styles.loginIntro}>
        <span className={styles.loginTag}>DEIN PERSÖNLICHER BEREICH</span>
        <h1>Alles für dein Coaching. An einem Ort.</h1>
        <p>Unterlagen bestätigen, Termine sehen und KlarVoran schreiben.</p>
        <div className={styles.loginIllustration} aria-hidden="true">
          <span className={styles.illustrationMark}>K<span>V</span></span>
          <span className={styles.illustrationLine} />
          <span className={styles.illustrationDot} />
          <span className={styles.illustrationDot} />
        </div>
        <span className={styles.loginTrust}>Nur mit deiner Einladung zugänglich</span>
      </div>
      <section className={`${styles.card} ${styles.loginCard}`} aria-labelledby="login-title"><span className={styles.loginStep}>{phase === "code" ? "SCHRITT 2 / 2" : "SCHRITT 1 / 2"}</span><h2 id="login-title">{phase === "code" ? "Code eingeben" : "Jetzt anmelden"}</h2>
        {phase === "code" ? <form onSubmit={event => void signIn(event)}><p>Gib den sechsstelligen Code aus der E-Mail an <strong>{email.trim()}</strong> ein. Er gilt fünf Minuten.</p><label htmlFor="participant-code">Bestätigungscode</label><input ref={codeInput} id="participant-code" name="code" value={code} onChange={event => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required className={styles.codeInput} /><button className={styles.primary} disabled={Boolean(busy) || code.length !== 6}>{busy === "sign-in" ? "Anmeldung läuft …" : "Meine Akte öffnen"}</button><div className={styles.inlineActions}><button className={styles.linkButton} type="button" disabled={Boolean(busy)} onClick={() => void requestCode()}>Code erneut senden</button><button className={styles.linkButton} type="button" disabled={Boolean(busy)} onClick={() => { setPhase("email"); setCode(""); setError(""); setNotice(""); setResendAt(0); }}>E-Mail ändern</button></div></form>
          : <form onSubmit={event => void requestCode(event)}><p>Gib die E-Mail-Adresse aus deiner Einladung ein.</p><label htmlFor="participant-email">Deine E-Mail-Adresse</label><input id="participant-email" name="email" type="email" autoComplete="email" inputMode="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} required disabled={Boolean(busy) || !configured} /><button className={styles.primary} disabled={Boolean(busy) || !configured}>Code anfordern <span aria-hidden="true">→</span></button><small>Ohne Passwort · <a href="/teilnehmer/datenschutz">Datenschutzinformation</a></small></form>}
      </section>
    </div> : <>
      <div className={styles.toolbar}><span>Angemeldet als <strong>{me?.user.displayName}</strong></span><div><button className={styles.secondary} disabled={Boolean(busy)} onClick={() => void refresh()}>Aktualisieren</button><button className={styles.secondary} disabled={Boolean(busy)} onClick={() => void logout()}>Abmelden</button></div></div>
      <div className={styles.dashboardHero}>
        <div className={styles.heroCopy}><span className={styles.heroEyebrow}>DEINE AKTE</span><h1>Hallo {me?.user.displayName}.</h1><p>Was möchtest du als Nächstes tun?</p>
          {ownCase && <div className={styles.heroActions}><a className={styles.heroPrimary} href="#aufgaben">Unterlagen prüfen <span aria-hidden="true">→</span></a><a className={styles.heroSecondary} href="#dokument-senden">Dokument senden</a></div>}
        </div>
        <div className={styles.heroAppointment}><PortalGlyph kind="calendar" /><span>NÄCHSTER TERMIN</span>{caseProgress?.appointments[0] ? <><strong>{formatDate(caseProgress.appointments[0].date)}</strong><small>{caseProgress.appointments[0].time} Uhr · {caseProgress.appointments[0].format}</small></> : <><strong>Noch offen</strong><small>Hier erscheint dein nächster Termin.</small></>}</div>
      </div>
      {ownCase && <nav className={styles.quickActions} aria-label="Schnell zu"><a href="#aufgaben"><span className={styles.quickIcon}><PortalGlyph kind="signature" /></span><span><strong>Unterschriften</strong><small>Unterlagen prüfen</small></span><span aria-hidden="true">↗</span></a><a href="#nachrichten"><span className={styles.quickIcon}><PortalGlyph kind="message" /></span><span><strong>Nachrichten</strong><small>KlarVoran schreiben</small></span><span aria-hidden="true">↗</span></a><a href="#dokument-senden"><span className={styles.quickIcon}><PortalGlyph kind="upload" /></span><span><strong>Dokument senden</strong><small>Foto oder PDF hochladen</small></span><span aria-hidden="true">↗</span></a></nav>}
      <div className={styles.workspaceGrid}>
      {ownCase && <div id="aufgaben" className={styles.anchorSection}><DocumentWorkflow key={ownCase.id} participantId={ownCase.id} participant apiRoot={apiRoot} operatingMode={me!.operatingMode} /></div>}
      {ownCase && <section className={`${styles.card} ${styles.planCard}`} aria-labelledby="progress-title">
        <h2 id="progress-title" className={styles.sectionHeading}><PortalGlyph kind="calendar" />Mein Coachingplan</h2>
        {progressError && <p className={styles.error} role="alert">Die nächsten Schritte sind gerade nicht verfügbar. Bitte aktualisiere die Seite.</p>}
        {caseProgress?.appointments.length && caseProgress.startReady !== true ? <p className={styles.planNote}>Der nächste Termin ist vorläufig. KlarVoran bestätigt dir den Coachingstart.</p> : null}
        {caseProgress?.goal ? <><span className={styles.planLabel}>GEMEINSAMES ZIEL</span><p className={styles.planGoal}>{caseProgress.goal}</p></> : <p>Deine Ziele legen wir gemeinsam fest.</p>}
        {(caseProgress?.goal || (caseProgress?.appointments.length ?? 0) > 1) && <details className={styles.progressDetails}><summary>Zielschritte und weitere Termine</summary>
          {caseProgress?.goal && <>
            {caseProgress.goalSteps.length > 0 && <ul className={styles.progressList}>{caseProgress.goalSteps.map(step => <li key={step.id}><strong>{step.title}</strong><small>{step.status}{step.nextStep ? ` · Nächster Schritt: ${step.nextStep}` : ""}</small></li>)}</ul>}
            {caseProgress.reviewDate && <small>Zielüberprüfung: {formatDate(caseProgress.reviewDate)}</small>}</>}
          {(caseProgress?.appointments.length ?? 0) > 1 && <><h3>Weitere Termine</h3><ul className={styles.progressList}>{caseProgress!.appointments.slice(1).map(item => <li key={item.id}><strong>{formatDate(item.date)} · {item.time} Uhr</strong><small>{item.format} · Terminabstimmung: {item.response}</small></li>)}</ul></>}
        </details>}
      </section>}
      </div>
      <div className={styles.workspaceGrid}>
      {ownCase && <section id="nachrichten" className={styles.card} aria-labelledby="messages-title">
        <div className={styles.documentHeading}><h2 id="messages-title" className={styles.sectionHeading}><PortalGlyph kind="message" />Nachrichten</h2><button className={styles.secondary} type="button" disabled={Boolean(busy)} onClick={() => void loadMessages(ownCase.id)}>Aktualisieren</button></div>
        {messageError && <p className={styles.error} role="alert">{messageError}</p>}
        {messageNotice && <p className={styles.notice} role="status">{messageNotice}</p>}
        <div aria-live="polite">{!messagesLoaded && !messageError ? <p>Nachrichten werden geladen …</p> : messagesLoaded && !messages.length ? <p>Noch keine Nachrichten zu deiner Akte.</p> : <ul className={styles.messages}>{messages.map(message => { const zoomUrl = zoomMeetingUrlFromMessage(message.body); return <li key={message.id}><small>{message.authorRole === "participant" ? "Du" : "KlarVoran"} · {formatDate(message.createdAt)}</small><p>{message.body}</p>{zoomUrl && <a className={`${styles.secondary} ${styles.zoomLink}`} href={zoomUrl} target="_blank" rel="noopener noreferrer" aria-label="Zoom-Termin in neuem Tab öffnen">Zoom-Termin öffnen ↗</a>}</li>; })}</ul>}</div>
        <form onSubmit={event => void sendMessage(event)}>
          <label htmlFor="participant-message">Deine Nachricht an KlarVoran</label>
          <textarea id="participant-message" className={styles.messageInput} value={messageBody} onChange={event => setMessageBody(event.target.value)} minLength={2} maxLength={2000} required placeholder="Deine Frage oder dein Hinweis …" />
          <label className={styles.checkbox}><input type="checkbox" checked={messageConfirmed} onChange={event => setMessageConfirmed(event.target.checked)} />{me?.operatingMode === "real" ? "Ich habe die Nachricht vor dem Senden geprüft." : "Diese Nachricht enthält nur erfundene Testdaten."}</label>
          <button className={styles.primary} type="submit" disabled={Boolean(busy) || !messageConfirmed || messageBody.trim().length < 2}>{busy === "message" ? "Wird gesendet …" : "Nachricht senden"}</button>
          <small>Nachrichten bleiben in dieser Akte und werden nicht per E-Mail verschickt.</small>
        </form>
      </section>}
      {!ownCase ? <p className={styles.error}>Deine Akte ist noch nicht verfügbar. Bitte melde dich bei KlarVoran.</p> : <section id="dokument-senden" className={`${styles.card} ${styles.uploadCard}`} aria-labelledby="upload-title"><h2 id="upload-title" className={styles.sectionHeading}><PortalGlyph kind="upload" />Dokument senden</h2><p>Wähle ein gut lesbares Foto oder eine PDF.</p>
        <input ref={fileInput} className={styles.hidden} type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" multiple onChange={event => { selectFiles(event.target.files); event.target.value = ""; }} />
        <button className={styles.uploadPick} disabled={Boolean(busy) || !me?.capabilities.upload} onClick={() => fileInput.current?.click()}><PortalGlyph kind="upload" /><strong>Foto oder Datei auswählen</strong><small>PDF, JPG oder PNG · bis zu 8 MB pro Datei</small></button>
        {pending.length > 0 && <><ul className={styles.files}>{pending.map(entry => <li key={entry.id}><div><strong>{entry.file.name}</strong><small>{formatSize(entry.file.size)} · {entry.receipt ? "Angekommen" : busy === "upload" && entry.progress ? `${entry.progress}% übertragen` : "Zum Senden ausgewählt"}</small>{!entry.receipt && <label className={styles.documentKind}>Was für eine Unterlage ist das?<select aria-label={`Dokumentart für ${entry.file.name}`} value={entry.category} disabled={Boolean(busy) || entry.started} onChange={event => setPending(current => current.map(item => item.id === entry.id ? { ...item, category: event.target.value as DocumentKind | "" } : item))}><option value="">Bitte auswählen</option><option value="Behördenbrief">Brief von Agentur, Jobcenter oder anderer Behörde</option><option value="Sonstiges">Andere Unterlage</option></select></label>}{entry.error && <span className={styles.fileError}>{entry.error}</span>}{entry.receipt && <small>Bestätigung: {entry.receipt}</small>}</div><button className={styles.linkButton} disabled={Boolean(busy)} aria-label={`${entry.file.name} aus der Auswahl entfernen`} onClick={() => setPending(current => current.filter(item => item.id !== entry.id))}>{entry.receipt ? "Auswahl schließen" : "Entfernen"}</button></li>)}</ul>{waiting > 0 && <><label className={styles.checkbox}><input type="checkbox" checked={testConfirmed} disabled={Boolean(busy)} onChange={event => setTestConfirmed(event.target.checked)} />{me?.operatingMode === "real" ? "Ich habe alle ausgewählten Dateien vor dem Senden geprüft." : "Ich bestätige: Alle ausgewählten Dateien enthalten nur erfundene Testdaten."}</label><button className={styles.primary} disabled={Boolean(busy) || !testConfirmed || pending.some(entry => !entry.receipt && !entry.category) || !me?.capabilities.upload} onClick={() => void upload()}>{busy === "upload" ? "Dateien werden gesendet …" : `${waiting === 1 ? "Datei" : `${waiting} Dateien`} senden`}</button></>}</>}
        {!me?.capabilities.upload && <p className={styles.error}>Die Dateiablage ist gerade nicht verfügbar. Bitte versuche es später erneut.</p>}
      </section>}
      </div>
      <section id="meine-dokumente" className={styles.card} aria-labelledby="documents-title"><div className={styles.documentHeading}><h2 id="documents-title" className={styles.sectionHeading}><PortalGlyph kind="folder" />Deine Dokumente</h2><span>{documents.length}</span></div>{documents.length === 0 ? <p>Hier erscheinen deine Dateien und freigegebenen Unterlagen.</p> : <ul className={styles.documents}>{documents.map(document => <li key={document.id}><div className={styles.documentHeading}><div><strong>{document.title}</strong><p>{formatDate(document.createdAt)} · {statusLabel(document.status)}</p></div><button className={styles.secondary} disabled={Boolean(busy)} onClick={() => void download(document)}>{busy === `download:${document.id}` ? "Wird geöffnet …" : "Datei herunterladen"}</button></div>{document.replies?.length > 0 && <div className={styles.reply}><strong>Antwort von KlarVoran</strong>{document.replies.map(reply => <div key={reply.id}><small>{formatDate(reply.createdAt)} · zum Dokumentstand {reply.documentVersion}</small><p>{reply.body}</p></div>)}</div>}{document.extraction?.status === "reviewed" && document.extraction.data ? <div className={styles.hints}><strong>Geprüfte Hinweise</strong>{document.extraction.data.subject && <p>{document.extraction.data.subject}</p>}{document.extraction.data.deadline && <p>Frist: <strong>{document.extraction.data.deadline}</strong></p>}{document.extraction.data.requestedAction && <p>Nächster Schritt: {document.extraction.data.requestedAction}</p>}{document.extraction.data.warnings?.map((warning, index) => <p key={index}>{warning}</p>)}</div> : !document.replies?.length && <p className={styles.muted}>Noch keine Antwort. Bei dringender Frist bitte direkt melden.</p>}</li>)}</ul>}</section>
    </>}
    <aside className={styles.help}><strong>Du brauchst Unterstützung?</strong><p>Wir helfen dir Schritt für Schritt. <a href="tel:+491779548140">0177 9548140 anrufen</a></p><p>Halte deinen Bestätigungscode geheim. Melde dich auf gemeinsam genutzten Geräten nach dem Hochladen ab.</p><a href="/teilnehmer/datenschutz">Datenschutz im Teilnehmerbereich</a></aside>
  </section>;
}

function messageOf(caught: unknown) { return caught instanceof Error ? caught.message : "Die Verbindung ist unterbrochen. Bitte versuche es erneut."; }

function PortalGlyph({ kind }: { kind: "calendar" | "signature" | "message" | "upload" | "folder" }) {
  const paths = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M8 15h3" /></>,
    signature: <><path d="M4 20h16M5 15l9-9 4 4-9 9H5v-4Z" /><path d="m12 8 4 4" /></>,
    message: <><path d="M20 11a8 8 0 0 1-8 8 9 9 0 0 1-4-.9L4 20l1.9-4A8 8 0 1 1 20 11Z" /><path d="M8 11h8M8 14h5" /></>,
    upload: <><path d="M12 16V4m-4 4 4-4 4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
    folder: <><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3V7Z" /><path d="M3 10h18" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>;
}
function formatSize(size: number) { return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`; }
function formatDate(value: string) { return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeZone: "Europe/Berlin" }).format(new Date(value)); }
function statusLabel(status: string) { return ({ uploaded: "Angekommen", review_pending: "Prüfung offen", reviewed: "Geprüft", approved: "Freigegeben", rejected: "Rückfrage erforderlich" } as Record<string, string>)[status] || "Angekommen"; }

