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
    title: "Kostenloses Erstgespräch",
    description:
      "Wir klären deine Ziele, deinen Unterstützungsbedarf und – bei Online- oder Hybrid-Coaching – die technischen Voraussetzungen.",
  },
  {
    id: 3,
    title: "Gutscheinprüfung & Start",
    description:
      "Liegt ein AVGS vor, prüfen wir Gültigkeit, Förderziel und Kostenträger. Wenn noch keiner vorliegt, erklären wir dir die Beantragung. Das Coaching beginnt erst nach geklärter Förderung und Aufnahme.",
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
