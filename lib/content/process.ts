export type ProcessStep = {
  id: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Erstkontakt",
    description:
      "Du meldest dich per WhatsApp, Telefon oder über das Kontaktformular – ganz unverbindlich. Wir klären kurz dein Anliegen.",
  },
  {
    id: 2,
    title: "Gutscheinprüfung",
    description:
      "Hast du bereits einen AVGS? Wir prüfen gemeinsam Gültigkeit, Förderziel und Kostenträger. Noch keinen? Wir zeigen dir, wie du einen beantragst.",
  },
  {
    id: 3,
    title: "Kostenloses Erstgespräch",
    description:
      "Im persönlichen Gespräch klären wir deine Ziele, deinen Unterstützungsbedarf und – bei Online/Hybrid – die technischen Voraussetzungen.",
  },
  {
    id: 4,
    title: "Die 4 Coaching-Module",
    description:
      "32 Unterrichtseinheiten im Einzelcoaching in bis zu 8 Wochen – von der Standortbestimmung bis zur Vorbereitung auf dein Vorstellungsgespräch.",
  },
  {
    id: 5,
    title: "Abschluss & Bescheinigung",
    description:
      "Gemeinsame Auswertung deiner Fortschritte, Abschlussbericht und Teilnahmebescheinigung mit Maßnahme, Zeitraum und Umfang.",
  },
];
