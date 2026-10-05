"use client";

import { useRef, useState } from "react";
import { createAvgsRequest, type AvgsRequestGoal } from "@/lib/avgs-anfrage";
import type { AvgsAnliegen, AvgsTraeger } from "@/lib/avgs-logic";
import { Button } from "./Button";
import { RadioGroupField } from "./form-fields";

export function AvgsAnfrageAssistent({ need, traeger }: { need: AvgsAnliegen; traeger: AvgsTraeger }) {
  const [goal, setGoal] = useState<AvgsRequestGoal | "">(
    need === "ausbildungsplatz" ? "ausbildung" : need === "berufliche_orientierung" ? "orientierung" : "",
  );
  const [detail, setDetail] = useState("");
  const [name, setName] = useState("");
  const [draft, setDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const draftRef = useRef<HTMLTextAreaElement>(null);

  function generate() {
    if (!goal) return;
    setDraft(createAvgsRequest({ goal, need, detail, name }));
    setCopyStatus("");
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
      <h3 className="text-lg font-bold text-navy">Deine AVGS-Anfrage vorbereiten</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">
        Du hast oben bereits dein Anliegen angegeben. Ergänze dein Ziel und erstelle daraus eine Nachricht für deine
        Vermittlungsfachkraft. Du kannst diesen Schritt überspringen und uns direkt kontaktieren.
      </p>
      {traeger === "andere_unsicher" && (
        <p className="mt-3 rounded-[var(--radius-sm)] bg-navy-50 p-3 text-sm text-navy-600">
          Du bist bei der zuständigen Stelle noch unsicher? Kläre vor dem Versenden, ob Jobcenter oder Agentur für Arbeit
          deine Ansprechstelle ist.
        </p>
      )}
      <div className="mt-5 space-y-5">
        <RadioGroupField
          legend="Was ist dein nächstes Ziel?"
          name="anfrage-ziel"
          value={goal}
          onChange={(value) => setGoal(value as AvgsRequestGoal)}
          options={[
            { value: "arbeit", label: "Arbeit finden" },
            { value: "ausbildung", label: "Ausbildung finden" },
            { value: "orientierung", label: "Berufliche Richtung finden" },
          ]}
        />
        <div>
          <label htmlFor="anfrage-detail" className="mb-1.5 block text-sm font-semibold text-navy">
            Was ist dabei bisher schwierig? (optional)
          </label>
          <textarea
            id="anfrage-detail"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            maxLength={280}
            rows={3}
            placeholder="Zum Beispiel: Ich habe mich beworben, aber bisher keine Rückmeldung erhalten."
            className="w-full rounded-[var(--radius-sm)] border border-navy-600/65 bg-white px-4 py-2.5 text-base text-navy placeholder:text-navy-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          />
          <p className="mt-1 text-xs text-navy-600">Bitte keine Gesundheitsdaten oder Aktenzeichen eingeben.</p>
        </div>
        <div>
          <label htmlFor="anfrage-name" className="mb-1.5 block text-sm font-semibold text-navy">Dein Name (optional)</label>
          <input
            id="anfrage-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={80}
            className="w-full rounded-[var(--radius-sm)] border border-navy-600/65 bg-white px-4 py-2.5 text-base text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          />
        </div>
        <Button type="button" onClick={generate} disabled={!goal}>
          {draft ? "Vorlage neu erstellen" : "Vorlage erstellen"}
        </Button>
      </div>

      {draft && (
        <div className="mt-6 rounded-[var(--radius-md)] border border-navy-100 bg-navy-50 p-4 sm:p-5">
          <p className="mb-3 text-xs leading-relaxed text-navy-600">
            Wenn du die Angaben oben änderst, erstelle die Vorlage erneut. Dabei wird dein bearbeiteter Text ersetzt.
          </p>
          <label htmlFor="anfrage-entwurf" className="block text-sm font-semibold text-navy">Deine Nachricht – vor dem Versenden prüfen und ändern</label>
          <textarea
            ref={draftRef}
            id="anfrage-entwurf"
            value={draft}
            onChange={(event) => { setDraft(event.target.value); setCopyStatus(""); }}
            rows={15}
            spellCheck
            className="mt-3 w-full rounded-[var(--radius-sm)] border border-navy-600/65 bg-white p-4 text-sm leading-relaxed text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button type="button" onClick={copyDraft} disabled={!draft.trim()}>Text kopieren</Button>
            <span role="status" aria-live="polite" className="text-sm text-navy-600">{copyStatus}</span>
          </div>
        </div>
      )}
      <p className="mt-4 text-xs leading-relaxed text-navy-600">
        Der Assistent verschickt deine Angaben nicht. Ob ein AVGS ausgestellt wird, entscheidet deine Vermittlungsfachkraft.
        Das Coaching beginnt erst nach Prüfung des Gutscheins und schriftlicher Bewilligung.
      </p>
    </div>
  );
}
