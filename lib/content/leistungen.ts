export type Leistung = {
  id: string;
  eyebrow: string;
  title: string;
  audience: string;
  summary: string;
  bullets: string[];
  price: string;
  href: string;
  ctaLabel: string;
};

export const leistungen: Leistung[] = [
  {
    id: "avgs",
    eyebrow: "Mit AVGS oder vor der Beantragung",
    title: "AVGS-Bewerbungscoaching",
    audience: "Jobcenter & Agentur für Arbeit",
    summary:
      "1:1 bei Bewerbung und beruflicher Orientierung. Auch ohne Gutschein kannst du uns anfragen.",
    bullets: [
      "32 Einheiten in bis zu 8 Wochen",
      "1:1-Einzelcoaching, keine Gruppe",
      "Zugelassene Maßnahme nach § 45 SGB III",
    ],
    price: "0 € bei passendem AVGS und bewilligter Teilnahme",
    href: "/avgs",
    ctaLabel: "AVGS-Coaching ansehen",
  },
  {
    id: "einzelcoaching",
    eyebrow: "Privat bezahlt",
    title: "Privates Job- und Bewerbungscoaching",
    audience: "Selbstzahler",
    summary:
      "Individuelle Hilfe mit schriftlichem Angebot vor der Buchung.",
    bullets: [
      "Umfang und Themen individuell abgestimmt",
      "Online, hybrid oder in Präsenz",
      "Bewerbung, Orientierung oder beides",
    ],
    price: "Transparentes Angebot vor Buchung",
    href: "/leistungen/einzelcoaching",
    ctaLabel: "Privates Coaching ansehen",
  },
  {
    id: "workshops",
    eyebrow: "Für Gruppen & Teams",
    title: "Workshops & Gruppenformate",
    audience: "Institutionen & Unternehmen",
    summary:
      "Praktische Gruppenformate für Einrichtungen, Träger und Unternehmen.",
    bullets: [
      "Halbtags-, Ganztags- oder Modulformat",
      "Themen individuell nach Bedarf",
      "Für Gruppen, vor Ort oder online",
    ],
    price: "Schriftliches Angebot vor Beauftragung",
    href: "/leistungen/workshops",
    ctaLabel: "Workshops entdecken",
  },
  {
    id: "kooperationen",
    eyebrow: "Jobcenter, Träger & Einrichtungen",
    title: "Für Institutionen",
    audience: "Kooperation & Auftrag",
    summary:
      "Informationen für Gutscheinabstimmung, Kooperation und Auftrag.",
    bullets: [
      "Zulassungsdaten und Nachweise auf einen Blick",
      "Klare Durchführung und Dokumentation",
      "Direkter Kontakt für Kooperationsanfragen",
    ],
    price: "",
    href: "/fachkraefte-kooperationspartner",
    ctaLabel: "Für Institutionen",
  },
];

export const participantLeistungen = leistungen.filter((leistung) =>
  leistung.id === "avgs" || leistung.id === "einzelcoaching",
);
export const institutionalLeistungen = leistungen.filter((leistung) =>
  leistung.id === "workshops" || leistung.id === "kooperationen",
);
