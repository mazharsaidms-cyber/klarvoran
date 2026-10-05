import type { AvgsAnliegen } from "./avgs-logic";
import { siteConfig } from "./site-config";

export type AvgsRequestGoal = "arbeit" | "ausbildung" | "orientierung";

export type AvgsRequestAnswers = {
  goal: AvgsRequestGoal;
  need: AvgsAnliegen;
  detail: string;
  name: string;
};

const goalSentence: Record<AvgsRequestGoal, string> = {
  arbeit: "ich möchte eine passende Arbeit finden.",
  ausbildung: "ich möchte einen passenden Ausbildungsplatz finden.",
  orientierung: "ich möchte eine realistische berufliche Richtung für mich finden.",
};

const needSentence: Record<AvgsAnliegen, string> = {
  bewerbungsunterlagen: "Dabei brauche ich besonders Unterstützung bei meinen Bewerbungsunterlagen.",
  berufliche_orientierung: "Dabei brauche ich besonders Unterstützung dabei, meine Möglichkeiten zu ordnen und nächste Schritte zu planen.",
  ausbildungsplatz: "Dabei brauche ich besonders Unterstützung bei der Suche nach einem Ausbildungsplatz und bei Bewerbungen.",
  vorstellungsgespraech: "Dabei brauche ich besonders Unterstützung bei der Vorbereitung auf Vorstellungsgespräche.",
  anderes: "Dabei brauche ich persönliche Unterstützung bei meinen nächsten beruflichen Schritten.",
};

export function createAvgsRequest(answers: AvgsRequestAnswers): string {
  const detail = answers.detail.trim().replace(/\s+/g, " ").slice(0, 280);
  const name = answers.name.trim().replace(/\s+/g, " ").slice(0, 80) || "[Dein Name]";

  return [
    "Betreff: Bitte um Prüfung eines AVGS für individuelles Bewerbungscoaching",
    "Guten Tag,",
    `${goalSentence[answers.goal]} ${needSentence[answers.need]}`,
    ...(detail ? [`Zu meiner Situation: ${detail}`] : []),
    "Ich möchte mit Ihnen besprechen, ob ein individuelles Bewerbungscoaching bei KlarVoran zu meinem Bedarf passt und ob dafür ein Aktivierungs- und Vermittlungsgutschein (AVGS) infrage kommt. Das Angebot umfasst 32 Unterrichtseinheiten in bis zu acht Wochen.",
    `Informationen zum Angebot: ${siteConfig.url}/avgs`,
    "Bitte teilen Sie mir mit, wie ich weiter vorgehen kann. Gern erläutere ich meinen Bedarf in einem Beratungsgespräch.",
    `Mit freundlichen Grüßen\n${name}`,
  ].join("\n\n");
}
