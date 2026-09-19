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
  "Diese Einschätzung ist eine erste Orientierung von KlarVoran und ersetzt keine verbindliche Entscheidung deines Jobcenters oder deiner Agentur für Arbeit.";

/**
 * Regelbasierte, bewusst vorsichtige Einschätzung – keine Rechtsberatung und keine
 * Anspruchszusage. Dient der Vorqualifizierung vor dem kostenlosen Erstgespräch.
 */
export function evaluateAvgsCheck(answers: AvgsAnswers): AvgsResult {
  const concernNote =
    answers.anliegen === "anderes"
      ? "Dein konkretes Anliegen ordnen wir im Erstgespräch gemeinsam ein."
      : `Dein ausgewähltes Thema „${avgsAnliegenLabels[answers.anliegen]}“ gehört zu den Punkten, die wir im Erstgespräch auf die Passung zur Maßnahme prüfen.`;

  const formNote =
    answers.form === "praesenz_kriftel"
      ? "Präsenztermine finden nach Bestätigung in der Taunusstraße 52 in Kriftel statt."
      : answers.form === "online"
        ? "Ein Online-Coaching ist bei uns möglich."
        : answers.form === "hybrid"
          ? "Eine Kombination aus Präsenz- und Online-Terminen ist bei uns möglich."
          : "Die passende Form (Präsenz, online oder hybrid) klären wir gemeinsam im Erstgespräch.";

  if (answers.status === "hat_avgs") {
    return {
      headline: "Du hast bereits einen AVGS – sehr gut.",
      message: `Damit ist eine wichtige Voraussetzung erfüllt. Im kostenlosen Erstgespräch prüfen wir, ob dein Gutschein gültig ist und zu unserer Maßnahme passt. ${concernNote} Anschließend klären wir die nächsten Schritte. ${formNote}`,
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
        ? "Sprich dein Anliegen bei deiner nächsten Beratung im Jobcenter aktiv an."
        : answers.traeger === "arbeitsagentur"
          ? "Sprich dein Anliegen bei deiner nächsten Beratung in der Agentur für Arbeit aktiv an."
          : "Kläre zunächst, ob Jobcenter oder Agentur für Arbeit für dich zuständig ist – wir helfen dir dabei.";

    return {
      headline: "Einen AVGS kannst du aktiv beantragen.",
      message: `${traegerNote} ${concernNote} Wir erklären dir im kostenlosen Erstgespräch die nächsten Schritte zur Beantragung. ${formNote}`,
      primaryCtaLabel: "AVGS-Leitfaden ansehen",
      primaryCtaHref: "/avgs#leitfaden",
      secondaryCtaLabel: "Erstgespräch anfragen",
      secondaryCtaHref: "/termin",
      disclaimer: DISCLAIMER,
    };
  }

  return {
    headline: "Kein Problem – das klären wir gemeinsam.",
    message: `Ob und wie du einen AVGS bekommst, muss nicht vorab feststehen. ${concernNote} Im kostenlosen, unverbindlichen Erstgespräch schauen wir uns deine Situation an und sagen dir ehrlich, ob und wie wir dich unterstützen können. ${formNote}`,
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
