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
    eyebrow: "Für Arbeitsuchende mit Gutschein",
    title: "AVGS-Bewerbungscoaching",
    audience: "Jobcenter & Agentur für Arbeit",
    summary:
      "Individuelles 1:1-Coaching nach § 45 SGB III im Rahmen unserer zugelassenen Maßnahme – mit bewilligtem AVGS für dich kostenfrei.",
    bullets: [
      "32 Einheiten in bis zu 8 Wochen",
      "1:1-Einzelcoaching, keine Gruppe",
      "Zugelassene Maßnahme nach § 45 SGB III",
    ],
    price: "0 € mit bewilligtem AVGS",
    href: "/avgs",
    ctaLabel: "AVGS-Coaching ansehen",
  },
  {
    id: "einzelcoaching",
    eyebrow: "Für Menschen ohne AVGS",
    title: "Privates Job- und Bewerbungscoaching",
    audience: "Selbstzahler",
    summary:
      "Privates Job- und Bewerbungscoaching mit individuell vereinbarten Themen, Umfang und Format – unabhängig von einem Gutschein.",
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
