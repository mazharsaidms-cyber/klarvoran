"use client";

import { useEffect, useRef, useState } from "react";
import { createAvgsRequest, type AvgsRequestGoal } from "@/lib/avgs-anfrage";
import type { AvgsAnliegen, AvgsTraeger } from "@/lib/avgs-logic";
import { Button } from "./Button";
import { RadioGroupField } from "./form-fields";

const fieldClass = "w-full rounded-[var(--radius-sm)] border border-navy-600/65 bg-white px-4 py-2.5 text-base text-navy placeholder:text-navy-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";
const questions = [
  { key: "situation", label: "Wie ist deine berufliche Situation gerade?", hint: "Zum Beispiel beschäftigt, Vertrag endet, arbeitsuchend oder auf Ausbildungssuche.", placeholder: "Beschreibe deine aktuelle Situation in ein bis zwei Sätzen.", step: 1 },
  { key: "experience", label: "Welche Erfahrungen und Stärken bringst du mit? (optional)", hint: "Berufserfahrung, Ausbildung oder Aufgaben, die dir bereits gut gelingen.", placeholder: "Was hast du bisher gemacht und was kannst du gut?", step: 1 },
  { key: "detail", label: "Was ist schwierig und wie wirkt sich das auf deine Suche aus?", hint: "Nenne möglichst eine konkrete Aufgabe oder ein Beispiel.", placeholder: "Was gelingt noch nicht oder wo weißt du nicht weiter?", step: 2 },
  { key: "efforts", label: "Was hast du bisher versucht und was kam dabei heraus?", hint: "Bewerbungen, Stellensuche oder bisherige Hilfen. Wenn du noch nicht angefangen hast, kannst du das so schreiben.", placeholder: "Welche Schritte hast du unternommen? Was bleibt noch offen?", step: 2 },
  { key: "support", label: "Wobei brauchst du persönliche Unterstützung?", hint: "Was möchtest du gemeinsam bearbeiten und warum hilft dir dabei individuelle Rückmeldung? Vergleiche andere Hilfen nur, wenn du sie tatsächlich kennst.", placeholder: "Welche Unterstützung brauchst du für deinen nächsten beruflichen Schritt?", step: 3 },
  { key: "results", label: "Was möchtest du danach selbstständiger können?", hint: "Zum Beispiel passende Stellen auswählen, Bewerbungen versenden oder Gespräche vorbereiten.", placeholder: "Welche konkreten Ergebnisse möchtest du erreichen?", step: 3 },
] as const;
type AnswerKey = (typeof questions)[number]["key"];
const emptyAnswers: Record<AnswerKey, string> = { situation: "", experience: "", detail: "", efforts: "", support: "", results: "" };

export function AvgsAnfrageAssistent({ need, traeger }: { need: AvgsAnliegen; traeger: AvgsTraeger }) {
  const [goal, setGoal] = useState<AvgsRequestGoal | "">(need === "ausbildungsplatz" ? "ausbildung" : need === "berufliche_orientierung" ? "orientierung" : "");
  const [answers, setAnswers] = useState(emptyAnswers);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [draft, setDraft] = useState("");
  const [generatedFrom, setGeneratedFrom] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const currentAnswers = JSON.stringify({ goal, need, traeger, ...answers, name });
  const stale = Boolean(draft && generatedFrom !== currentAnswers);
  const missing = questions.filter((question) => question.key !== "experience" && !answers[question.key].trim());

  useEffect(() => {
    if (generatedFrom) draftRef.current?.focus();
  }, [generatedFrom]);

  function moveTo(next: number) {
    setStep(next);
    headingRef.current?.focus();
  }

  function generate() {
    if (!goal) return;
    setDraft(createAvgsRequest({ goal, need, ...answers, name }));
    setGeneratedFrom(currentAnswers);
    setCopyStatus("");
    draftRef.current?.focus();
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopyStatus("Text kopiert. Du kannst ihn jetzt in eine Nachricht einfügen.");
    } catch {
      draftRef.current?.focus();
      draftRef.current?.select();
      setCopyStatus("Kopieren war nicht möglich. Der Text ist markiert; du kannst ihn selbst kopieren.");
    }
  }

  return (
    <div className="mt-7 border-t border-navy-100 pt-6">
      <h3 ref={headingRef} tabIndex={-1} className="text-lg font-bold text-navy outline-none">Deinen persönlichen AVGS-Antrag vorbereiten</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">
        Beschreibe deine Situation in eigenen Worten. Daraus entsteht ein Entwurf für deine Vermittlungsfachkraft.
        Kurze Antworten reichen. Du kannst den Entwurf bearbeiten oder uns direkt kontaktieren.
      </p>
      {traeger === "andere_unsicher" && <p className="mt-3 text-sm text-navy-600">Kläre vor dem Versenden, ob Jobcenter oder Agentur für Arbeit für dich zuständig ist.</p>}
      <p className="mt-4 text-xs text-navy-600">Deine Antworten bleiben in diesem Browser und werden nicht an KlarVoran gesendet. Bitte keine Gesundheitsdaten oder Aktenzeichen eingeben.</p>
      <p role="status" aria-live="polite" className="mt-5 text-sm font-semibold text-navy">Schritt {step} von 3 · {step === 1 ? "Situation und Ziel" : step === 2 ? "Schwierigkeiten und bisherige Schritte" : "Unterstützung und Ergebnisse"}</p>
      <div className="mt-4 space-y-5">
        {step === 1 && <RadioGroupField legend="Was ist dein nächstes Ziel?" name="anfrage-ziel" value={goal} onChange={(value) => { setGoal(value as AvgsRequestGoal); setCopyStatus(""); }} options={[{ value: "arbeit", label: "Arbeit finden" }, { value: "ausbildung", label: "Ausbildung finden" }, { value: "orientierung", label: "Berufliche Richtung finden" }]} />}
        {questions.filter((question) => question.step === step).map((question) => (
          <div key={question.key}>
            <label htmlFor={`anfrage-${question.key}`} className="mb-1.5 block text-sm font-semibold text-navy">{question.label}</label>
            <p id={`anfrage-${question.key}-hint`} className="mb-2 text-xs leading-relaxed text-navy-600">{question.hint}</p>
            <textarea id={`anfrage-${question.key}`} aria-describedby={`anfrage-${question.key}-hint`} value={answers[question.key]} onChange={(event) => { setAnswers((previous) => ({ ...previous, [question.key]: event.target.value })); setCopyStatus(""); }} maxLength={700} rows={3} placeholder={question.placeholder} className={fieldClass} />
          </div>
        ))}
        {step === 3 && <div><label htmlFor="anfrage-name" className="mb-1.5 block text-sm font-semibold text-navy">Dein Name (optional)</label><input id="anfrage-name" type="text" autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setCopyStatus(""); }} maxLength={80} className={fieldClass} /></div>}
        <div className="flex flex-wrap justify-between gap-3">
          <Button type="button" variant="ghost" onClick={() => moveTo(step - 1)} disabled={step === 1}>Frage zurück</Button>
          {step < 3 ? <Button type="button" onClick={() => moveTo(step + 1)} disabled={!goal}>Nächste Fragen</Button> : <Button type="button" onClick={generate} disabled={!goal}>{draft ? "Entwurf neu erstellen" : "Persönlichen Entwurf erstellen"}</Button>}
        </div>
      </div>
      {draft && <div className="mt-6 rounded-[var(--radius-md)] border border-navy-100 bg-navy-50 p-4 sm:p-5">
        {missing.length > 0 && <div className="mb-4 text-sm text-navy-600"><p className="font-semibold text-navy">Diese Angaben fehlen noch in deinen Antworten:</p><ul className="mt-2 list-disc space-y-1 pl-5">{missing.map((question) => <li key={question.key}><button type="button" onClick={() => moveTo(question.step)} className="text-left underline underline-offset-2">{question.label}</button></li>)}</ul><p className="mt-2">Ergänze sie oben oder ersetze die eckigen Klammern direkt im Text.</p></div>}
        {stale && <p role="status" className="mb-3 text-sm font-semibold text-navy">Du hast Antworten geändert. Erstelle den Entwurf in Schritt 3 erneut. Dabei wird dein bearbeiteter Text ersetzt.</p>}
        <label htmlFor="anfrage-entwurf" className="block text-sm font-semibold text-navy">Dein Antrag – vor dem Versenden prüfen und ändern</label>
        <textarea ref={draftRef} id="anfrage-entwurf" value={draft} onChange={(event) => { setDraft(event.target.value); setCopyStatus(""); }} rows={17} spellCheck className="mt-3 w-full rounded-[var(--radius-sm)] border border-navy-600/65 bg-white p-4 text-sm leading-relaxed text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy" />
        <p className="mt-3 text-xs leading-relaxed text-navy-600">Übernimm nur zutreffende Angaben und ersetze alle eckigen Klammern. Eine fachliche Stellungnahme von KlarVoran wird bei Bedarf nach einem persönlichen Austausch separat erstellt.</p>
        <div className="mt-3 flex flex-wrap items-center gap-3"><Button type="button" onClick={copyDraft} disabled={!draft.trim() || stale}>Text kopieren</Button><span role="status" aria-live="polite" className="text-sm text-navy-600">{copyStatus}</span></div>
      </div>}
      <p className="mt-4 text-xs leading-relaxed text-navy-600">Der Entwurf wird nicht automatisch eingereicht. Prüfe ihn und sende ihn selbst an deine zuständige Stelle. Ob ein AVGS ausgestellt und deine Teilnahme bewilligt wird, entscheidet Jobcenter oder Agentur für Arbeit.</p>
    </div>
  );
}
