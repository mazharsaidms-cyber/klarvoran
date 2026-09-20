export type CoachingModule = {
  id: number;
  title: string;
  ue: number;
  summary: string;
  focus: string[];
  outcome: string;
  institutionOutcome: string;
};

export const coachingModules: CoachingModule[] = [
  {
    id: 1,
    title: "Standortbestimmung & Zielplanung",
    ue: 6,
    summary:
      "Wir klären, wo du gerade stehst – und wo es hingehen soll. Analyse deiner Erfahrungen und Qualifikationen, Stärken und Rahmenbedingungen.",
    focus: [
      "Analyse bisheriger Erfahrungen und Qualifikationen",
      "Stärken- und Kompetenzanalyse",
      "Klärung von Interessen und Rahmenbedingungen",
      "Realistische berufliche Perspektiven entwickeln",
    ],
    outcome: "Dokumentierte berufliche Zielsetzung und dein individueller Coaching-Plan.",
    institutionOutcome: "Dokumentierte berufliche Zielsetzung und individueller Coaching-Plan.",
  },
  {
    id: 2,
    title: "Bewerbungsunterlagen & Selbstpräsentation",
    ue: 10,
    summary:
      "Du überarbeitest Lebenslauf und Anschreiben für konkrete Stellen – einschließlich Online-Bewerbungen und einer klaren Darstellung deines bisherigen Werdegangs.",
    focus: [
      "Erstellung und Optimierung von Lebenslauf und Anschreiben",
      "Digitale Tools zur Erstellung der Unterlagen",
      "Anpassung an konkrete Stellenanforderungen",
      "Vorbereitung deiner Selbstvorstellung",
    ],
    outcome: "Ein aktueller, bewerbungsfähiger Lebenslauf und eine Anschreiben-Vorlage, die du selbst anpassen kannst.",
    institutionOutcome: "Aktueller, bewerbungsfähiger Lebenslauf und eine selbst anpassbare Anschreiben-Vorlage.",
  },
  {
    id: 3,
    title: "Stellenrecherche & Bewerbungsstrategie",
    ue: 8,
    summary:
      "Gezielt statt planlos suchen: digitale Jobbörsen richtig nutzen, eine eigene Strategie entwickeln und den Überblick über deine Aktivitäten behalten.",
    focus: [
      "Nutzung digitaler Jobbörsen und Suchfilter",
      "Individuelle Bewerbungsstrategie",
      "Strukturierter Bewerbungsplan",
      "Dokumentation der Bewerbungsaktivitäten",
    ],
    outcome: "Deine individuelle Bewerbungsstrategie und eine Übersicht deiner Aktivitäten.",
    institutionOutcome: "Individuelle Bewerbungsstrategie und Übersicht der Bewerbungsaktivitäten.",
  },
  {
    id: 4,
    title: "Vorstellungsgespräch & Auftreten",
    ue: 8,
    summary:
      "Sicherheit für den entscheidenden Moment: typische Fragen üben, Körpersprache reflektieren und den Umgang mit Nervosität trainieren.",
    focus: [
      "Vorbereitung auf Vorstellungsgespräche",
      "Typische Fragen und passende Antworten",
      "Körpersprache und Selbstpräsentation",
      "Nachbereitung nach dem Gespräch",
    ],
    outcome: "Ein individueller Gesprächsleitfaden und mehr Sicherheit im Auftreten.",
    institutionOutcome: "Individueller Gesprächsleitfaden und mehr Sicherheit im Auftreten.",
  },
];

export const totalUe = coachingModules.reduce((sum, m) => sum + m.ue, 0);
