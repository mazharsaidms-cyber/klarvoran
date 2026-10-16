"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./participant.module.css";
import { PARTICIPANT_CHUNK_BYTES } from "@/lib/participant-gateway-proof";

type Me = { user: { displayName: string; participantId: string | null; role: string }; cases: Array<{ id: string; name: string }>;
  capabilities: { upload: boolean }; realDataAllowed: false; operatingMode: "test" };
type Document = { id: string; title: string; status: string; currentVersion: number; createdAt: string;
  versions: Array<{ originalFileName: string; byteSize: number; version: number }>;
  replies: Array<{ id: string; documentVersion: number; body: string; createdAt: string }>;
  extraction: null | { status: string; data: null | { subject: string | null; deadline: string | null; requestedAction: string | null; warnings: string[] } } };
type DocumentKind = "Behördenbrief" | "Sonstiges";
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
        if (!controller.signal.aborted) { setMe(identity); setDocuments(result.documents); setPhase("case"); }
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
      setMe(null); setDocuments([]); setPending([]); setCode(""); setTestConfirmed(false); setPhase("email");
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
    } catch (caught) { setError(messageOf(caught)); }
    finally { setBusy(""); }
  }
  async function logout() {
    setBusy("logout"); setError("");
    try {
      await post("/auth/sign-out", {});
      setMe(null); setDocuments([]); setPending([]); setCode(""); setEmail(""); setTestConfirmed(false); setPhase("email"); setNotice("Du bist abgemeldet.");
    } catch (caught) { setError(messageOf(caught)); }
    finally { setBusy(""); }
  }
  async function refresh() {
    setBusy("refresh"); setError("");
    try { const identity = await api<Me>("/me"); const result = await api<{ documents: Document[] }>("/documents"); setMe(identity); setDocuments(result.documents); }
    catch (caught) { handleError(caught); }
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
          await post("/upload/start", { id: entry.id, fileName: entry.file.name, byteSize: entry.file.size, title, checksum: hash, testDataConfirmed: true });
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
    <div className={styles.heading}><p className={styles.eyebrow}>KlarVoran · Dein Teilnehmerbereich</p><h1>{phase === "case" ? "Deine persönliche Akte" : "Einfach zu deiner Akte"}</h1><p>{phase === "case" ? `Hallo ${me?.user.displayName || ""}. Hier findest du deine Dokumente und freigegebenen Hinweise.` : "Du brauchst nur deine E-Mail-Adresse. Wir schicken dir einen Bestätigungscode."}</p></div>
    <div className={styles.testNotice}><strong>Wir testen noch.</strong> Bitte verwende ausschließlich erfundene Angaben und Testdokumente. Echte Behördenbriefe bitte noch nicht hochladen.</div>
    {!configured && <div className={styles.notice} role="status">Der Teilnehmerzugang wird noch eingerichtet. KlarVoran informiert dich, sobald du deine Einladung nutzen kannst.</div>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    {phase === "loading" ? <p role="status">Dein Zugang wird geprüft …</p> : phase !== "case" ? <div className={styles.loginGrid}>
      <section className={styles.card} aria-labelledby="login-title"><p className={styles.step}>{phase === "code" ? "Schritt 2 von 3" : "Schritt 1 von 3"}</p><h2 id="login-title">{phase === "code" ? "Code eingeben" : "Mit E-Mail anmelden"}</h2>
        {phase === "code" ? <form onSubmit={event => void signIn(event)}><p>Gib den sechsstelligen Code aus der E-Mail an <strong>{email.trim()}</strong> ein. Er gilt fünf Minuten.</p><label htmlFor="participant-code">Bestätigungscode</label><input ref={codeInput} id="participant-code" name="code" value={code} onChange={event => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required className={styles.codeInput} /><button className={styles.primary} disabled={Boolean(busy) || code.length !== 6}>{busy === "sign-in" ? "Anmeldung läuft …" : "Meine Akte öffnen"}</button><div className={styles.inlineActions}><button className={styles.linkButton} type="button" disabled={Boolean(busy)} onClick={() => void requestCode()}>Code erneut senden</button><button className={styles.linkButton} type="button" disabled={Boolean(busy)} onClick={() => { setPhase("email"); setCode(""); setError(""); setNotice(""); setResendAt(0); }}>E-Mail ändern</button></div></form>
          : <form onSubmit={event => void requestCode(event)}><p>Nutze die E-Mail-Adresse, mit der du eingeladen wurdest.</p><label htmlFor="participant-email">Deine E-Mail-Adresse</label><input id="participant-email" name="email" type="email" autoComplete="email" inputMode="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} required disabled={Boolean(busy) || !configured} /><button className={styles.primary} disabled={Boolean(busy) || !configured}>{busy === "code-send" ? "Code wird angefordert …" : "Code per E-Mail erhalten"}</button><small>Kein Passwort. Kein ChatGPT-Konto nötig.</small></form>}
      </section><aside className={styles.card}><h2>So geht’s</h2><ol className={styles.steps}><li><span>1</span><div><strong>E-Mail eingeben</strong><p>Dein Zugang wurde vorher für dich freigegeben.</p></div></li><li><span>2</span><div><strong>Code bestätigen</strong><p>Den Code findest du in deinem E-Mail-Postfach.</p></div></li><li><span>3</span><div><strong>Eigene Akte öffnen</strong><p>Dateien hochladen und freigegebene Hinweise ansehen.</p></div></li></ol></aside>
    </div> : <>
      <div className={styles.toolbar}><span><strong>{ownCase?.name || "Deine Akte"}</strong> · Nur dein eigener Bereich</span><div><button className={styles.secondary} disabled={Boolean(busy)} onClick={() => void refresh()}>Aktualisieren</button><button className={styles.secondary} disabled={Boolean(busy)} onClick={() => void logout()}>Abmelden</button></div></div>
      {!ownCase ? <p className={styles.error}>Deine Akte ist noch nicht verfügbar. Bitte melde dich bei KlarVoran.</p> : <section className={styles.card} aria-labelledby="upload-title"><p className={styles.step}>Foto oder Datei → Prüfen → Senden</p><h2 id="upload-title">Dokumente hochladen</h2><p>Wähle eine PDF-Datei oder ein Foto aus. Du kannst bis zu 20 Dateien mit jeweils höchstens 8 MB senden.</p>
        <input ref={fileInput} className={styles.hidden} type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" multiple onChange={event => { selectFiles(event.target.files); event.target.value = ""; }} />
        <button className={styles.secondary} disabled={Boolean(busy) || !me?.capabilities.upload} onClick={() => fileInput.current?.click()}>Fotos oder Dateien auswählen</button>
        {pending.length > 0 && <><ul className={styles.files}>{pending.map(entry => <li key={entry.id}><div><strong>{entry.file.name}</strong><small>{formatSize(entry.file.size)} · {entry.receipt ? "Angekommen" : busy === "upload" && entry.progress ? `${entry.progress}% übertragen` : "Zum Senden ausgewählt"}</small>{!entry.receipt && <label className={styles.documentKind}>Was für eine Unterlage ist das?<select aria-label={`Dokumentart für ${entry.file.name}`} value={entry.category} disabled={Boolean(busy) || entry.started} onChange={event => setPending(current => current.map(item => item.id === entry.id ? { ...item, category: event.target.value as DocumentKind | "" } : item))}><option value="">Bitte auswählen</option><option value="Behördenbrief">Brief von Agentur, Jobcenter oder anderer Behörde</option><option value="Sonstiges">Andere Unterlage</option></select></label>}{entry.error && <span className={styles.fileError}>{entry.error}</span>}{entry.receipt && <small>Bestätigung: {entry.receipt}</small>}</div><button className={styles.linkButton} disabled={Boolean(busy)} aria-label={`${entry.file.name} aus der Auswahl entfernen`} onClick={() => setPending(current => current.filter(item => item.id !== entry.id))}>{entry.receipt ? "Auswahl schließen" : "Entfernen"}</button></li>)}</ul>{waiting > 0 && <><label className={styles.checkbox}><input type="checkbox" checked={testConfirmed} disabled={Boolean(busy)} onChange={event => setTestConfirmed(event.target.checked)} />Ich bestätige: Alle ausgewählten Dateien enthalten nur erfundene Testdaten.</label><button className={styles.primary} disabled={Boolean(busy) || !testConfirmed || pending.some(entry => !entry.receipt && !entry.category) || !me?.capabilities.upload} onClick={() => void upload()}>{busy === "upload" ? "Dateien werden gesendet …" : `${waiting === 1 ? "Datei" : `${waiting} Dateien`} senden`}</button></>}</>}
        {!me?.capabilities.upload && <p className={styles.error}>Die Dateiablage ist gerade nicht verfügbar. Bitte versuche es später erneut.</p>}
      </section>}
      <section className={styles.card} aria-labelledby="documents-title"><div className={styles.documentHeading}><h2 id="documents-title">Deine Dokumente</h2><span>{documents.length}</span></div>{documents.length === 0 ? <p>Hier erscheinen deine angekommenen Dateien und die Dokumente, die für dich freigegeben werden.</p> : <ul className={styles.documents}>{documents.map(document => <li key={document.id}><div className={styles.documentHeading}><div><strong>{document.title}</strong><p>{formatDate(document.createdAt)} · {statusLabel(document.status)}</p></div><button className={styles.secondary} disabled={Boolean(busy)} onClick={() => void download(document)}>{busy === `download:${document.id}` ? "Wird geöffnet …" : "Datei herunterladen"}</button></div>{document.replies?.length > 0 && <div className={styles.reply}><strong>Antwort von KlarVoran</strong>{document.replies.map(reply => <div key={reply.id}><small>{formatDate(reply.createdAt)} · zum Dokumentstand {reply.documentVersion}</small><p>{reply.body}</p></div>)}</div>}{document.extraction?.status === "reviewed" && document.extraction.data ? <div className={styles.hints}><strong>Geprüfte Hinweise</strong>{document.extraction.data.subject && <p>{document.extraction.data.subject}</p>}{document.extraction.data.deadline && <p>Frist: <strong>{document.extraction.data.deadline}</strong></p>}{document.extraction.data.requestedAction && <p>Nächster Schritt: {document.extraction.data.requestedAction}</p>}{document.extraction.data.warnings?.map((warning, index) => <p key={index}>{warning}</p>)}</div> : !document.replies?.length && <p className={styles.muted}>Eine persönliche Antwort erscheint hier, sobald das Dokument geprüft wurde. Bei einer dringenden Frist melde dich bitte direkt.</p>}</li>)}</ul>}</section>
    </>}
    <aside className={styles.help}><strong>Du brauchst Unterstützung?</strong><p>Wir helfen dir Schritt für Schritt. <a href="tel:+491779548140">0177 9548140 anrufen</a></p><p>Halte deinen Bestätigungscode geheim. Melde dich auf gemeinsam genutzten Geräten nach dem Hochladen ab.</p><a href="/teilnehmer/datenschutz">Datenschutz im Teilnehmerbereich</a></aside>
  </section>;
}

function messageOf(caught: unknown) { return caught instanceof Error ? caught.message : "Die Verbindung ist unterbrochen. Bitte versuche es erneut."; }
function formatSize(size: number) { return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`; }
function formatDate(value: string) { return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeZone: "Europe/Berlin" }).format(new Date(value)); }
function statusLabel(status: string) { return ({ uploaded: "Angekommen", review_pending: "Prüfung offen", reviewed: "Geprüft", approved: "Freigegeben", rejected: "Rückfrage erforderlich" } as Record<string, string>)[status] || "Angekommen"; }
