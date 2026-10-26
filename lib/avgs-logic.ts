export type AvgsStatus = "hat_avgs" | "moechte_beantragen" | "unsicher";
export type AvgsTraeger = "jobcenter" | "arbeitsagentur" | "andere_unsicher";
export type AvgsAnliegen =
  | "bewerbungsunterlagen"
  | "berufliche_orientierung"
  | "ausbildungsplatz"
  | "vorstellungsgespraech"
  | "anderes";
export type AvgsForm = "praesenz_kriftel" | "online" | "hybrid" | "unsicher";

export type AvgsAnswers = {
  status: AvgsStatus;
  traeger: AvgsTraeger;
  anliegen: AvgsAnliegen;
  form: AvgsForm;
};

export type AvgsResult = {
  headline: string;
  message: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  disclaimer: string;
};

const DISCLAIMER =
  "Erste Orientierung, keine verbindliche Zusage. Über den AVGS entscheidet dein Jobcenter oder deine Agentur für Arbeit.";

/**
 * Regelbasierte, bewusst vorsichtige Einschätzung – keine Rechtsberatung und keine
 * Anspruchszusage. Dient der Vorqualifizierung vor dem kostenlosen Erstgespräch.
 */
export function evaluateAvgsCheck(answers: AvgsAnswers): AvgsResult {
  const concernNote =
    answers.anliegen === "anderes"
      ? "Dein Anliegen klären wir im Erstgespräch."
      : `Dein Thema: ${avgsAnliegenLabels[answers.anliegen]}. Ob unser Coaching passt, klären wir im Erstgespräch.`;

  const formNote =
    answers.form === "praesenz_kriftel"
      ? "Präsenztermine finden nach Bestätigung in der Taunusstraße 52 in Kriftel statt."
      : answers.form === "online"
        ? "Ob Online-Coaching zum AVGS passt, klären wir im Erstgespräch."
        : answers.form === "hybrid"
          ? "Ob Präsenz und Online zum AVGS passen, klären wir im Erstgespräch."
          : "Präsenz, online oder hybrid? Das klären wir im Gespräch.";

  if (answers.status === "hat_avgs") {
    return {
      headline: "Du hast bereits einen AVGS – sehr gut.",
      message: `Im kostenlosen Erstgespräch prüfen wir, ob dein Gutschein gültig ist und zu unserer Maßnahme passt. ${concernNote} Vor dem Coaching brauchst du eine schriftliche Bewilligung. ${formNote}`,
      primaryCtaLabel: "Erstgespräch anfragen",
      primaryCtaHref: "/termin",
      secondaryCtaLabel: "Direkt per WhatsApp schreiben",
      secondaryCtaHref: "whatsapp",
      disclaimer: DISCLAIMER,
    };
  }

  if (answers.status === "moechte_beantragen") {
    const traegerNote =
      answers.traeger === "jobcenter"
        ? "Sprich dein Anliegen beim nächsten Termin im Jobcenter an."
        : answers.traeger === "arbeitsagentur"
          ? "Sprich dein Anliegen beim nächsten Termin in der Agentur für Arbeit an."
          : "Welche Stelle ist zuständig? Das klären wir gemeinsam.";

    return {
      headline: "Einen AVGS kannst du aktiv beantragen.",
      message: `${traegerNote} ${concernNote} Im kostenlosen Erstgespräch helfen wir beim nächsten Schritt. ${formNote}`,
      primaryCtaLabel: "AVGS-Leitfaden ansehen",
      primaryCtaHref: "/avgs#leitfaden",
      secondaryCtaLabel: "Erstgespräch anfragen",
      secondaryCtaHref: "/termin",
      disclaimer: DISCLAIMER,
    };
  }

  return {
    headline: "Kein Problem – das klären wir gemeinsam.",
    message: `Du brauchst noch keinen Gutschein für das kostenlose Erstgespräch. ${concernNote} ${formNote}`,
    primaryCtaLabel: "Erstgespräch anfragen",
    primaryCtaHref: "/termin",
    secondaryCtaLabel: "Direkt per WhatsApp schreiben",
    secondaryCtaHref: "whatsapp",
    disclaimer: DISCLAIMER,
  };
}

export const avgsAnliegenLabels: Record<AvgsAnliegen, string> = {
  bewerbungsunterlagen: "Bewerbungsunterlagen erstellen oder verbessern",
  berufliche_orientierung: "Berufliche Orientierung finden",
  ausbildungsplatz: "Ausbildungsplatz finden",
  vorstellungsgespraech: "Auf ein Vorstellungsgespräch vorbereiten",
  anderes: "Etwas anderes",
};
