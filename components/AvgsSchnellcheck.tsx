"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitAvgsCheck } from "@/app/avgs/actions";
import { initialActionState } from "@/lib/server/action-state";
import { evaluateAvgsCheck, type AvgsAnswers } from "@/lib/avgs-logic";
import { siteConfig } from "@/lib/site-config";
import { StepProgress } from "./StepProgress";
import { RadioGroupField, TextField, PrivacyNotice, HoneypotField } from "./form-fields";
import { Button } from "./Button";
import { StatusMessage } from "./StatusMessage";

const STEP_LABELS = ["AVGS-Status", "Situation", "Ergebnis & Kontakt"];

type DraftAnswers = Partial<AvgsAnswers>;

function hasAllAnswers(answers: DraftAnswers): answers is AvgsAnswers {
  return Boolean(answers.status && answers.traeger && answers.anliegen && answers.form);
}

export function AvgsSchnellcheck() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<DraftAnswers>({ form: "unsicher" });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [state, formAction, pending] = useActionState(submitAvgsCheck, initialActionState);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const result = hasAllAnswers(answers) ? evaluateAvgsCheck(answers) : null;

  const canContinue =
    (step === 1 && Boolean(answers.status)) ||
    (step === 2 && Boolean(answers.traeger) && Boolean(answers.anliegen));

  function next() {
    if (!canContinue) return;
    setStep((s) => Math.min(s + 1, 3));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  if (state.status === "success" || state.status === "dev-success") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-navy-100 bg-white p-6 sm:p-8">
        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-navy outline-none">
          Danke, deine Angaben sind bei uns angekommen.
        </h2>
        <div className="mt-4">
          <StatusMessage state={state} />
        </div>
        <p className="mt-4 text-sm text-navy-600">
          Du erreichst uns in der Zwischenzeit auch direkt telefonisch unter{" "}
          <a href={siteConfig.contact.phoneHref} className="font-semibold text-navy underline underline-offset-2">
            {siteConfig.contact.phoneDisplay}
          </a>{" "}
          oder per{" "}
          <a href={siteConfig.contact.whatsappHref()} className="font-semibold text-navy underline underline-offset-2">
            WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-navy-100 bg-white p-6 sm:p-8">
      <StepProgress current={step} total={3} labels={STEP_LABELS} />

      {step === 1 && (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-navy outline-none">
            Hast du bereits einen AVGS?
          </h2>
          <p className="mt-2 text-sm text-navy-600">
            Der Aktivierungs- und Vermittlungsgutschein wird von Jobcenter oder Agentur für Arbeit ausgestellt.
          </p>
          <div className="mt-5">
            <RadioGroupField
              legend="Dein AVGS-Status"
              name="status"
              required
              value={answers.status}
              onChange={(v) => setAnswers((a) => ({ ...a, status: v as AvgsAnswers["status"] }))}
              options={[
                { value: "hat_avgs", label: "Ich habe bereits einen AVGS" },
                { value: "moechte_beantragen", label: "Ich möchte einen beantragen" },
                { value: "unsicher", label: "Ich bin unsicher" },
              ]}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-navy outline-none">
            Wer ist zuständig und wobei brauchst du Unterstützung?
          </h2>
          <div className="mt-5">
            <RadioGroupField
              legend="Zuständige Stelle"
              name="traeger"
              required
              value={answers.traeger}
              onChange={(v) => setAnswers((a) => ({ ...a, traeger: v as AvgsAnswers["traeger"] }))}
              options={[
                { value: "jobcenter", label: "Jobcenter" },
                { value: "arbeitsagentur", label: "Agentur für Arbeit" },
                { value: "andere_unsicher", label: "Andere / unsicher" },
              ]}
            />
          </div>
          <div className="mt-7 border-t border-navy-100 pt-6">
            <RadioGroupField
              legend="Dein Anliegen"
              name="anliegen"
              required
              value={answers.anliegen}
              onChange={(v) => setAnswers((a) => ({ ...a, anliegen: v as AvgsAnswers["anliegen"] }))}
              options={[
                { value: "bewerbungsunterlagen", label: "Bewerbungsunterlagen" },
                { value: "berufliche_orientierung", label: "Berufliche Orientierung" },
                { value: "ausbildungsplatz", label: "Ausbildungsplatz finden" },
                { value: "vorstellungsgespraech", label: "Vorstellungsgespräch" },
                { value: "anderes", label: "Etwas anderes" },
              ]}
            />
          </div>
        </div>
      )}

      {step === 3 && result && (
        <form action={formAction} className="space-y-5" aria-busy={pending}>
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-navy outline-none">
            {result.headline}
          </h2>
          <p className="text-sm leading-relaxed text-navy-600">{result.message}</p>
          <p className="text-xs italic text-navy-600/80">{result.disclaimer}</p>

          <input type="hidden" name="status" value={answers.status} />
          <input type="hidden" name="traeger" value={answers.traeger} />
          <input type="hidden" name="anliegen" value={answers.anliegen} />
          <input type="hidden" name="format" value={answers.form} />
          <HoneypotField />

          <div className="grid gap-4 border-t border-navy-100 pt-5 sm:grid-cols-2">
            <TextField
              id="name"
              label="Name"
              required
              autoComplete="name"
              error={state.fieldErrors?.name}
            />
            <TextField
              id="email"
              label="E-Mail"
              type="email"
              required
              autoComplete="email"
              error={state.fieldErrors?.email}
            />
            <TextField
              id="phone"
              label="Telefon (optional)"
              type="tel"
              autoComplete="tel"
              className="sm:col-span-2"
              error={state.fieldErrors?.phone}
            />
          </div>

          <PrivacyNotice />
          <StatusMessage state={state} />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button type="button" variant="ghost" onClick={back} disabled={pending}>
              Zurück
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Wird gesendet…" : "Angaben senden"}
            </Button>
          </div>
        </form>
      )}

      {step < 3 && (
        <div className="mt-8 flex justify-between border-t border-navy-100 pt-6">
          <Button type="button" variant="ghost" onClick={back} disabled={step === 1}>
            Zurück
          </Button>
          <Button type="button" onClick={next} disabled={!canContinue}>
            Weiter
          </Button>
        </div>
      )}
    </div>
  );
}
