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
      "Persönliches Job- und Bewerbungscoaching. Du kannst dich auch melden, wenn du den Gutschein erst beantragen möchtest.",
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
      "Du bezahlst das Coaching selbst. Themen, Umfang und Format werden individuell vereinbart; du erhältst vor der Buchung ein schriftliches Angebot.",
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
      "Kompakte Formate zu Bewerbung, beruflicher Orientierung und digitaler Kompetenz für Einrichtungen, Bildungsträger und Unternehmen.",
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
      "Gutscheinabstimmung, Kooperation oder Unterauftrag: passende Informationen für Vermittlungsfachkräfte, soziale Einrichtungen und Bildungsträger.",
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
