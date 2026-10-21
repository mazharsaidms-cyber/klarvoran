'use client';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './document-workflow.module.css';

type Kind='signature'|'privacy_receipt'|'consent';
const purposes={contract:'Maßnahmevertrag',coaching_plan:'Zielvereinbarung und Coachingplan',privacy_notice:'Datenschutzhinweise',privacy_consent:'Gesonderte freiwillige Einwilligung',attendance:'Anwesenheit einer Sitzung',other:'Sonstige gemeinsame Unterlage'} as const;
type Purpose=keyof typeof purposes;
type Session={id:string;date:string;startTime:string;endTime:string;pauseMinutes:number;format:string;performedUe:number};
type Snapshot=({source:'text';body:string}|{source:'attendance';rows:Session[]}|{source:'document';fileName:string;version:number}) & {purpose?:Purpose;participant?:{id:string;name:string};coach?:{signedName:string;declaration:string}};
type Action={id:string;action:string;actorName:string;signedName:string;note:string;createdAt:string};
type Item={id:string;title:string;kind:Kind;snapshot:Snapshot;snapshotSha256:string;declaration:string;createdByName:string;createdAt:string;actions:Action[];sourceIssue:string|null};
type Doc={id:string;title:string;status:string;currentVersion:number;participantVisible?:boolean;versions?:{contentType?:string}[]};
type Props={participantId:string;participant:boolean;apiRoot?:string;documents?:Doc[]};
const labels:Record<Kind,string>={signature:'Unterschrift',privacy_receipt:'Empfang der Datenschutzhinweise',consent:'Gesonderte freiwillige Einwilligung'};
const coachDeclaration='Ich habe diese Fassung geprüft und unterschreibe sie als Coach mit meinem eingegebenen Namen elektronisch.';
function status(item:Item){if(item.actions.some(a=>a.action==='withdraw'))return 'Widerrufen';const first=item.actions[0];if(item.sourceIssue&&first&&['sign','acknowledge'].includes(first.action))return 'Bestätigt · frühere Fassung';return first?({sign:'Unterschrieben',acknowledge:'Kenntnisnahme bestätigt',decline:'Klärung gewünscht',cancel:'Zurückgezogen'}[first.action]??first.action):item.sourceIssue?'Neue Fassung erforderlich':'Offen';}
function when(value:string){return new Intl.DateTimeFormat('de-DE',{dateStyle:'medium',timeStyle:'short',timeZone:'Europe/Berlin'}).format(new Date(value));}
function errorText(e:unknown){return e instanceof Error?e.message:'Die Aktion konnte nicht gespeichert werden.';}
async function json<T>(url:string,init:RequestInit={}){const r=await fetch(url,{...init,cache:'no-store',credentials:'same-origin'});const d=await r.json().catch(()=>({})) as {error?:string};if(!r.ok)throw new Error(d.error||'Die Verbindung ist gerade nicht verfügbar.');return d as T;}

export default function DocumentWorkflow({participantId,participant,apiRoot='/api/portal',documents=[]}:Props){
  const [data,setData]=useState<{requests:Item[];sessions:Session[]}|null>(null);
  const [error,setError]=useState(''),[notice,setNotice]=useState(''),[loading,setLoading]=useState(false);
  const refresh=useCallback(async(signal?:AbortSignal)=>{const next=await json<{requests:Item[];sessions:Session[]}>(`${apiRoot}/document-requests?participantId=${encodeURIComponent(participantId)}`,{signal});if(!signal?.aborted)setData(next);},[apiRoot,participantId]);
  useEffect(()=>{const c=new AbortController();void refresh(c.signal).catch(e=>{if(!c.signal.aborted)setError(errorText(e));});return()=>c.abort();},[refresh]);
  async function reload(){setLoading(true);setError('');try{await refresh();}catch(e){setError(errorText(e));}finally{setLoading(false);}}
  async function update(body:Record<string,unknown>){setError('');setNotice('');await json(`${apiRoot}/document-requests`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});setNotice('Gespeichert. Die Entscheidung bleibt dieser Fassung zugeordnet.');try{await refresh();}catch{setError('Gespeichert, aber die Ansicht konnte nicht aktualisiert werden. Bitte neu laden.');}}
  const open=data?.requests.filter(r=>!r.actions.length&&!r.sourceIssue).length??0;
  return <section className={styles.panel} aria-label="Unterlagen und Unterschriften">
    <div className={styles.heading}><div><p className={styles.eyebrow}>Gemeinsam dokumentieren</p><h2>{participant?'Lesen & unterschreiben':'Unterlagen & Unterschriften'}</h2></div><button type="button" className={styles.secondary} disabled={loading} onClick={()=>void reload()}>Aktualisieren</button></div>
    <p>{participant?'Hier findest du die Unterlagen für dich. Lies die vollständige Fassung und entscheide selbst. Deine Antwort und eine PDF-Kopie bleiben in deiner Akte.':'Verträge, gemeinsame Pläne, Datenschutz und Anwesenheiten: Stelle eine geprüfte Fassung bereit und verfolge die persönliche Antwort des Teilnehmers.'}</p>
    <p className={styles.hint}>Testbetrieb · Nur fiktive Daten. Elektronische Bestätigung mit eingegebenem Namen; keine qualifizierte Signatur.</p>
    {!participant&&<AuditGuide/>}
    {error&&<p role="alert" className={styles.error}>{error}</p>}{notice&&<p role="status" className={styles.notice}>{notice}</p>}
    {!participant&&data&&<Composer participantId={participantId} sessions={data.sessions} documents={documents} onSave={update}/>}
    {!data&&!error&&<p>Unterlagen werden geladen …</p>}
    {data&&<><p className={styles.count}>{open} offen · {data.requests.length} Unterlagen</p>{!data.requests.length&&<p className={styles.empty}>{participant?'Du hast zurzeit keine Unterlagen zur Unterschrift.':'Noch keine Unterlage bereitgestellt.'}</p>}
      <div className={styles.list}>{[...data.requests].sort((a,b)=>Number(Boolean(a.actions.length||a.sourceIssue))-Number(Boolean(b.actions.length||b.sourceIssue))).map(item=><RequestCard key={item.id} item={item} participant={participant} apiRoot={apiRoot} onSave={update}/>)}</div></>}
  </section>;
}
function Composer({participantId,sessions,documents,onSave}:{participantId:string;sessions:Session[];documents:Doc[];onSave:(body:Record<string,unknown>)=>Promise<void>}){
  const [source,setSource]=useState('text'),[purpose,setPurpose]=useState<Purpose>('contract'),[kind,setKind]=useState<Kind>('signature'),[busy,setBusy]=useState(false),[error,setError]=useState(''),[formKey,setFormKey]=useState(0);
  function choosePurpose(value:Purpose){setPurpose(value);setKind(value==='privacy_notice'?'privacy_receipt':value==='privacy_consent'?'consent':'signature');if(value==='attendance')setSource('attendance');else if(source==='attendance')setSource('text');}
  const eligible=documents.filter(d=>d.participantVisible&&['reviewed','approved'].includes(d.status)&&d.versions?.some(v=>v.contentType==='application/pdf'));
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(busy)return;const form=event.currentTarget,f=new FormData(form);setBusy(true);setError('');
    const doc=eligible.find(d=>d.id===f.get('documentId'));
    try{await onSave({action:'create',participantId,source,purpose,kind,title:f.get('title'),body:f.get('body'),documentId:doc?.id,documentVersion:doc?.currentVersion,sessionIds:f.getAll('sessionIds'),signedName:f.get('signedName'),contentReviewed:f.get('contentReviewed')==='on',testDataConfirmed:f.get('testDataConfirmed')==='on'});setFormKey(k=>k+1);}catch(e){setError(errorText(e));}finally{setBusy(false);}}
  return <details className={styles.composer}><summary>Unterlage bereitstellen</summary><form key={formKey} onSubmit={submit}><fieldset disabled={busy}>
    <label>Unterlagentyp<select value={purpose} onChange={e=>choosePurpose(e.target.value as Purpose)}>{Object.entries(purposes).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
    <div className={styles.grid}><label>Quelle<select value={source} disabled={purpose==='attendance'} onChange={e=>setSource(e.target.value)}>{purpose==='attendance'?<option value="attendance">Eine dokumentierte Sitzung</option>:<><option value="text">Vollständigen Dokumenttext eingeben</option><option value="document">Geprüfte PDF aus der Akte</option></>}</select></label>
    <label>Art der Bestätigung<select value={kind} disabled={purpose!=='other'} onChange={e=>setKind(e.target.value as Kind)}>{Object.entries(labels).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label></div>
    <label>Titel<input name="title" required minLength={3} maxLength={140} placeholder={source==='attendance'?'Anwesenheitsnachweis – Sitzung am …':'z. B. Coachingvertrag oder gemeinsamer Coachingplan'}/></label>
    {source==='text'&&<label>Vollständiger Text für den Teilnehmer<textarea name="body" required minLength={30} maxLength={12000} rows={10} placeholder="Hier den gesamten geprüften Dokumenttext eintragen. Interne Notizen gehören nicht hierher."/></label>}
    {source==='document'&&<><label>Freigegebene PDF<select name="documentId" required defaultValue=""><option value="">Bitte wählen</option>{eligible.map(d=><option key={d.id} value={d.id}>{d.title} · Version {d.currentVersion}</option>)}</select></label><small>Hier erscheinen geprüfte PDF-Dateien, die in der E-Akte für den Teilnehmer sichtbar sind. Die ausgewählte Version wird festgehalten.</small></>}
    {source==='attendance'&&<fieldset className={styles.sessions}><legend>Eine abgeschlossene Anwesenheit auswählen</legend>{!sessions.length&&<p>Noch keine abgeschlossene, zeitlich plausible Sitzung vorhanden. Dokumentiere zuerst die durchgeführte Sitzung und aktualisiere anschließend diesen Bereich.</p>}{sessions.map(s=><label className={styles.check} key={s.id}><input type="radio" name="sessionIds" value={s.id} required/><span>{s.date} · {s.startTime}–{s.endTime} · {s.format} · {s.performedUe} UE · {s.pauseMinutes} Min. Pause · Anwesend</span></label>)}<small>Coach und Teilnehmer unterschreiben jede Sitzung einzeln. Interne Themen, Ergebnisse und nächste Schritte werden nicht übernommen.</small></fieldset>}
    {kind==='privacy_receipt'&&<p className={styles.hint}>Der Teilnehmer bestätigt den Erhalt der Hinweise. Eine zusätzliche Datenverarbeitung wird damit nicht erlaubt.</p>}
    {kind==='consent'&&<p className={styles.hint}>Beschreibe Zweck, Umfang und Widerruf dieser freiwilligen Einwilligung ausdrücklich im Dokument. Eine Ablehnung ist möglich.</p>}
    <label>Dein vollständiger Name als Coach<input name="signedName" autoComplete="off" required minLength={3} maxLength={120}/></label>
    <label className={styles.check}><input type="checkbox" name="contentReviewed" required/><span>{kind==='signature'?coachDeclaration:'Ich habe diese Fassung und die Art der Bestätigung geprüft und stelle sie als Coach bereit.'}</span></label>
    <label className={styles.check}><input type="checkbox" name="testDataConfirmed" required/><span>Diese Unterlage enthält ausschließlich erfundene Testdaten.</span></label>
    <p className={styles.hint}>Mit dem Bereitstellen wird die Fassung festgeschrieben. Korrekturen werden als neue Unterlage bereitgestellt.</p>
    {error&&<p className={styles.error} role="alert">{error}</p>}<button type="submit" disabled={busy} className={styles.primary}>{busy?'Wird bereitgestellt …':'Geprüfte Fassung bereitstellen'}</button>
  </fieldset></form></details>;
}
function RequestCard({item,participant,apiRoot,onSave}:{item:Item;participant:boolean;apiRoot:string;onSave:(body:Record<string,unknown>)=>Promise<void>}){
  const [expanded,setExpanded]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[pdfUrl,setPdfUrl]=useState('');
  const objectUrl=useRef('');
  useEffect(()=>()=>{if(objectUrl.current)URL.revokeObjectURL(objectUrl.current);},[]);
  const state=status(item),pending=!item.actions.length,canWithdraw=participant&&item.kind==='consent'&&item.actions.some(a=>a.action==='sign')&&!item.actions.some(a=>a.action==='withdraw');
  const pdfReady=item.snapshot.source!=='document'||Boolean(pdfUrl);
  async function loadPdf(){setBusy(true);setError('');try{const r=await fetch(`${apiRoot}/document-requests/file?requestId=${encodeURIComponent(item.id)}`,{cache:'no-store',credentials:'same-origin'});if(!r.ok){const d=await r.json().catch(()=>({})) as {error?:string};throw Error(d.error||'Die PDF konnte nicht geöffnet werden.');}const blob=await r.blob();if(!blob.size)throw Error('Die PDF ist leer.');if(objectUrl.current)URL.revokeObjectURL(objectUrl.current);objectUrl.current=URL.createObjectURL(new Blob([blob],{type:'application/pdf'}));setPdfUrl(objectUrl.current);}catch(e){setError(errorText(e));}finally{setBusy(false);}}
  async function submit(event:FormEvent<HTMLFormElement>,action:string){event.preventDefault();if(busy)return;const f=new FormData(event.currentTarget);setBusy(true);setError('');try{await onSave({action,requestId:item.id,snapshotSha256:item.snapshotSha256,signedName:f.get('signedName'),note:f.get('note'),confirmed:f.get('confirmed')==='on',testDataConfirmed:f.get('testDataConfirmed')==='on'});if(objectUrl.current){URL.revokeObjectURL(objectUrl.current);objectUrl.current='';setPdfUrl('');}}catch(e){setError(errorText(e));}finally{setBusy(false);}}
  return <article className={styles.request}>
    <button type="button" className={styles.requestHead} aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}><span><small>{labels[item.kind]}</small><strong>{item.title}</strong><small>Bereitgestellt am {when(item.createdAt)}</small></span><span className={pending&&!item.sourceIssue?styles.open:styles.badge}>{state}</span><span aria-hidden="true">{expanded?'−':'+'}</span></button>
    {expanded&&<div className={styles.requestBody}>
      {item.snapshot.participant&&<p><strong>Teilnehmende Person: {item.snapshot.participant.name}</strong>{item.snapshot.purpose&&<> · {purposes[item.snapshot.purpose]}</>}</p>}
      {item.sourceIssue&&<p className={pending?styles.error:styles.hint}>{pending?item.sourceIssue:"Die Quelle wurde inzwischen geändert. Diese Bestätigung gilt nur für die hier festgehaltene frühere Fassung. Für die aktuelle Fassung ist eine neue Bestätigung erforderlich."}</p>}
      {item.snapshot.source==='text'&&<div className={styles.documentText}>{item.snapshot.body}</div>}
      {item.snapshot.source==='attendance'&&<Attendance rows={item.snapshot.rows}/>}
      {item.snapshot.source==='document'&&<p><strong>{item.snapshot.fileName}</strong> · Festgehaltene Version {item.snapshot.version}. Öffne die PDF, bevor du bestätigst.</p>}
      <div className={styles.actions}><button type="button" className={styles.secondary} disabled={busy||Boolean(item.sourceIssue&&pending)} onClick={()=>void loadPdf()}>{pdfUrl?'PDF neu laden':'PDF ansehen / Kopie laden'}</button>{pdfUrl&&<a className={styles.secondary} href={pdfUrl} download={`KlarVoran_${item.id}.pdf`}>PDF herunterladen</a>}</div>
      {pdfUrl&&<object className={styles.pdf} data={pdfUrl} type="application/pdf" aria-label={`Vollständige PDF: ${item.title}`}><p>Dein Browser zeigt die PDF hier nicht an. Nutze „PDF herunterladen“, um sie vollständig zu lesen.</p></object>}
      {item.snapshot.coach&&<div className={styles.proof}><strong>Coach: {item.snapshot.coach.signedName}</strong><p>{item.snapshot.coach.declaration}</p><small>{when(item.createdAt)} · Konto: {item.createdByName}</small></div>}
      {item.actions.map(a=><div className={styles.proof} key={a.id}><strong>{({sign:'Unterschrieben',acknowledge:'Kenntnisnahme bestätigt',decline:'Klärung gewünscht',cancel:'Zurückgezogen',withdraw:'Einwilligung widerrufen'} as Record<string,string>)[a.action]}</strong><p>{a.signedName||a.actorName} · {when(a.createdAt)}</p>{a.note&&<p>{a.note}</p>}</div>)}
      {error&&<p role="alert" className={styles.error}>{error}</p>}
      {participant&&pending&&!item.sourceIssue&&<form onSubmit={e=>void submit(e,item.kind==='privacy_receipt'?'acknowledge':'sign')}><fieldset disabled={busy||!pdfReady}>
        <label>Dein vollständiger Name<input name="signedName" required minLength={3} maxLength={120} autoComplete="name"/></label>
        <label className={styles.check}><input type="checkbox" name="confirmed" required/><span>{item.declaration}</span></label>
        <TestCheck/>
        <button className={styles.primary} type="submit">{busy?'Wird gespeichert …':item.kind==='privacy_receipt'?'Kenntnisnahme bestätigen':item.kind==='consent'?'Freiwillig einwilligen & unterschreiben':'Elektronisch unterschreiben'}</button>
      </fieldset>{!pdfReady&&<p>Bitte zuerst die vollständige PDF öffnen und lesen.</p>}</form>}
      {pending&&<details className={styles.alternative}><summary>{participant?'Etwas stimmt nicht? Klärung anfordern':'Offene Unterlage zurückziehen'}</summary><form onSubmit={e=>void submit(e,participant?'decline':'cancel')}><fieldset disabled={busy}><label>{participant?'Was möchtest du klären?':'Grund für das Zurückziehen'}<textarea name="note" required minLength={3} maxLength={1000}/></label><TestCheck/><button className={styles.secondary} type="submit">{participant?'Klärung anfordern – ohne Unterschrift':'Unterlage zurückziehen'}</button></fieldset></form></details>}
      {canWithdraw&&<details className={styles.alternative}><summary>Einwilligung widerrufen</summary><form onSubmit={e=>void submit(e,'withdraw')}><fieldset disabled={busy}><label>Hinweis (freiwillig)<textarea name="note" maxLength={1000}/></label><label className={styles.check}><input name="confirmed" type="checkbox" required/><span>Ich widerrufe diese Einwilligung mit Wirkung für die Zukunft.</span></label><TestCheck/><button className={styles.secondary} type="submit">Widerruf speichern</button></fieldset></form></details>}
      <small className={styles.hash}>Fassung {item.id}<br/>Prüfsumme {item.snapshotSha256}</small>
    </div>}
  </article>;
}
function TestCheck(){return <label className={styles.check}><input type="checkbox" name="testDataConfirmed" required/><span>Ich teste ausschließlich mit erfundenen Angaben.</span></label>;}
function AuditGuide(){return <details className={styles.composer}><summary>Welche Unterlagen gehören zu welchem Schritt?</summary><div className={styles.requestBody}>
  <p>Orientierung aus den hinterlegten QM- und Auditvorlagen. Eine gespeicherte Unterschrift bestätigt die einzelne Fassung; sie ist keine automatische Start- oder Abrechnungsfreigabe.</p>
  <div className={styles.attendance}><table><caption>Unterlagen im Coachingablauf</caption><thead><tr><th>Unterlage</th><th>Bearbeitung</th></tr></thead><tbody>
    <tr><td>AVGS / Bewilligung und Eingangsprüfung</td><td>Original ablegen und als Coach prüfen: Gültigkeit, Zeitraum, Maßnahme und bewilligter Umfang.</td></tr>
    <tr><td>Maßnahmevertrag und Ziel-/Coachingplan</td><td>Coach und Teilnehmer unterschreiben die konkrete vollständige Fassung.</td></tr>
    <tr><td>Datenschutzhinweise</td><td>Bereitstellen und Empfang dokumentieren. Der Empfang ist keine Einwilligung.</td></tr>
    <tr><td>Gesonderte freiwillige Einwilligung</td><td>Teilnehmer entscheidet zum angegebenen Zweck. Zustimmung und Widerruf bleiben nachvollziehbar.</td></tr>
    <tr><td>Anwesenheit</td><td>Je durchgeführter Sitzung: Datum, Zeit, Pause und tatsächliche UE prüfen; beide unterschreiben.</td></tr>
    <tr><td>Sitzungsnotiz</td><td>Coach dokumentiert Ziel, Inhalt, Methoden, Aufgabe und Ergebnis innerhalb von 24 Stunden. Die Vorlage verlangt keine Teilnehmerunterschrift.</td></tr>
    <tr><td>Abschlussbericht und Teilnahmebescheinigung</td><td>Coach erstellt und gibt die Unterlagen frei. Der Abschlussbericht hat ein Unterschriftsfeld für den Coach.</td></tr>
    <tr><td>Teilnehmerfeedback / Beschwerde</td><td>Feedback anbieten und Rücklauf dokumentieren; Name und Unterschrift sind im Feedback freiwillig. Beschwerden bei Bedarf bearbeiten. Angaben im angemeldeten Konto sind nicht anonym.</td></tr>
  </tbody></table></div>
  <p className={styles.hint}>Vor dem Echtbetrieb offen: Anerkennung dieses elektronischen Nachweises und Übereinstimmung von Bewilligung, Vertrag und zugelassenem Umfang. Der vorliegende Vertrag nennt fest 32 UE; ein Fall mit 20 UE benötigt dazu passende, geprüfte Unterlagen. Das flexible UE-Feld erteilt keine zusätzliche Zulassung.</p>
  <p>Interne Sitzungsnotizen und der Abschlussbericht werden nicht allein wegen ihrer Ablage zu Unterschriftsaufgaben für den Teilnehmer. Fehlzeiten bleiben separat dokumentiert und werden nicht als durchgeführte Anwesenheit unterschrieben.</p>
</div></details>;}
function Attendance({rows}:{rows:Session[]}){return <div className={styles.attendance}><table><caption>Zu bestätigende Anwesenheiten</caption><thead><tr><th>Datum</th><th>Zeit / Pause</th><th>Format</th><th>UE</th></tr></thead><tbody>{rows.map(s=><tr key={s.id}><td>{s.date}</td><td>{s.startTime}–{s.endTime}<br/><small>{s.pauseMinutes} Min. Pause</small></td><td>{s.format}</td><td>{s.performedUe}</td></tr>)}</tbody></table><p><strong>Gesamt: {rows.reduce((n,s)=>n+s.performedUe,0)} UE</strong> · 1 UE = 45 Minuten</p></div>;}
