import type { AvgsAnliegen } from "./avgs-logic";
import { siteConfig } from "./site-config";

export type AvgsRequestGoal = "arbeit" | "ausbildung" | "orientierung";

export type AvgsRequestAnswers = {
  goal: AvgsRequestGoal;
  need: AvgsAnliegen;
  detail: string;
  name: string;
  situation?: string;
  experience?: string;
  efforts?: string;
  support?: string;
  results?: string;
};

const goalSentence: Record<AvgsRequestGoal, string> = {
  arbeit: "Mein Ziel ist, eine passende Arbeit zu finden.",
  ausbildung: "Mein Ziel ist, einen passenden Ausbildungsplatz zu finden.",
  orientierung: "Mein Ziel ist, eine realistische berufliche Richtung für mich zu finden.",
};

const needSentence: Record<AvgsAnliegen, string> = {
  bewerbungsunterlagen: "Dabei brauche ich besonders Unterstützung bei meinen Bewerbungsunterlagen.",
  berufliche_orientierung: "Dabei brauche ich besonders Unterstützung dabei, meine Möglichkeiten zu ordnen und nächste Schritte zu planen.",
  ausbildungsplatz: "Dabei brauche ich besonders Unterstützung bei der Suche nach einem Ausbildungsplatz und bei Bewerbungen.",
  vorstellungsgespraech: "Dabei brauche ich besonders Unterstützung bei der Vorbereitung auf Vorstellungsgespräche.",
  anderes: "Dabei brauche ich persönliche Unterstützung bei meinen nächsten beruflichen Schritten.",
};

export function createAvgsRequest(answers: AvgsRequestAnswers): string {
  const clean = (value: string | undefined, limit = 700) =>
    (value || "").trim().replace(/\s+/g, " ").slice(0, limit);
  const detail = clean(answers.detail);
  const name = clean(answers.name, 80) || "[Dein Name]";
  const situation = clean(answers.situation);
  const experience = clean(answers.experience);
  const efforts = clean(answers.efforts);
  const support = clean(answers.support);
  const results = clean(answers.results);

  return [
    "Betreff: Antrag auf einen AVGS für individuelles Job- und Bewerbungscoaching",
    "Guten Tag,",
    "ich beantrage einen Aktivierungs- und Vermittlungsgutschein für ein individuelles Job- und Bewerbungscoaching bei KlarVoran.",
    `${goalSentence[answers.goal]} ${needSentence[answers.need]}`,
    `Meine aktuelle berufliche Situation: ${situation || "[Aktuelle berufliche Situation ergänzen]"}`,
    ...(experience ? [`Meine Erfahrungen und Stärken: ${experience}`] : []),
    `Was mir derzeit Schwierigkeiten bereitet: ${detail || "[Konkrete Schwierigkeit und ihre Auswirkung auf die Stellensuche ergänzen]"}`,
    `Meine bisherigen Schritte und deren Ergebnis: ${efforts || "[Bisherige Bemühungen und Ergebnis ergänzen; auch angeben, wenn noch keine Schritte erfolgt sind]"}`,
    `Wobei ich individuelle Begleitung benötige: ${support || "[Konkrete praktische Unterstützung und Grund für Einzelbegleitung ergänzen]"}`,
    `Was ich mit dem Coaching erreichen möchte: ${results || "[Konkrete Ergebnisse und Aufgaben ergänzen, die ich danach selbstständiger bewältigen möchte]"}`,
    `Informationen zum Angebot: ${siteConfig.url}/avgs`,
    "Bitte prüfen Sie meinen individuellen Unterstützungsbedarf und die Ausstellung eines entsprechenden Gutscheins. Gern erläutere ich meine Situation in einem Beratungsgespräch und bespreche mit Ihnen, welche Unterstützung dafür geeignet ist.",
    `Mit freundlichen Grüßen\n${name}`,
  ].join("\n\n");
}
