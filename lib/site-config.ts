function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, "");
}

const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+49 177 9548140";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? digitsOnly(phoneDisplay);

export const siteConfig = {
  // KlarVoran ist die öffentliche Trägerbezeichnung.
  name: "KlarVoran",
  legalName: "KlarVoran – Mazhar Said",
  transitionNote:
    "KlarVoran ist die aktuelle Trägerbezeichnung. Die formale Anpassung der vorhandenen Zulassungsunterlagen befindet sich in Bearbeitung.",
  founder: "Mazhar Said",
  claim: "Der schnellste Weg zur Arbeit",
  tagline: "Coaching, Workshops und berufliche Orientierung",
  description:
    "KlarVoran bietet in Frankfurt und im Rhein-Main-Gebiet individuelles AVGS-Bewerbungscoaching nach § 45 SGB III, privates Jobcoaching, Workshops und Kooperationen mit Institutionen.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.klarvoran.de",
  locale: "de_DE",

  contact: {
    phoneDisplay,
    phoneHref: `tel:${digitsOnly(phoneDisplay).replace(/^0/, "+49")}`,
    email: process.env.NEXT_PUBLIC_EMAIL ?? "info@klarvoran.de",
    whatsappNumber,
    whatsappHref: (message?: string) =>
      `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`,
  },

  // Ladungsfähige Geschäfts- und Postanschrift des Trägers. Keine Coachingräume.
  address: {
    company: "KlarVoran – Mazhar Said",
    street: "Kolberger Weg 23",
    zip: "65931",
    city: "Frankfurt am Main",
    country: "Deutschland",
    note: "Geschäfts- und Postanschrift – keine Coachingtermine vor Ort.",
    mapsQuery: encodeURIComponent("Kolberger Weg 23, 65931 Frankfurt am Main"),
  },

  // Offiziell veröffentlichter Durchführungsort der zugelassenen Maßnahme.
  presenceLocation: {
    name: "Kriftel Workspaces",
    region: "Kriftel, Main-Taunus-Kreis",
    street: "Taunusstraße 52",
    zip: "65830",
    city: "Kriftel",
    note: "Präsenztermine finden ausschließlich nach vorheriger Terminbestätigung statt.",
    mapsQuery: encodeURIComponent("Taunusstraße 52, 65830 Kriftel"),
  },

  certificate: {
    holderName: "Mazhar Said – MS Coaching",
    number: "26-20859-T",
    issuer: "CERTQUA",
    issuerFull:
      "CERTQUA – Gesellschaft der Deutschen Wirtschaft zur Förderung und Zertifizierung von Qualitätssicherungssystemen in der Beruflichen Bildung mbH, Bonn",
    legalBasis: "§ 178 SGB III",
    field: "FB1 – Maßnahmen zur Aktivierung und beruflichen Eingliederung nach § 45 Abs. 1 Satz 1 Nr. 1–5 SGB III",
    validFrom: "24.07.2026",
    validTo: "23.07.2031",
    pdfHref: "/dokumente/CERTQUA.pdf",
  },

  measure: {
    title: "Persönliches 1:1-Coaching für Ihren Weg in Arbeit oder Ausbildung",
    certificateNumber: "2026M101485-10001",
    approvalFrom: "24.07.2026",
    approvalTo: "23.07.2029",
    eventId: "408480349",
    providerId: "312424",
    duration: "32 UE in 8 Wochen",
    schedule: "In der Regel zwei Termine pro Woche mit jeweils 2 UE",
    serviceHours: "Montag bis Donnerstag, 08:00–17:30 Uhr",
    baHref:
      "https://web.arbeitsagentur.de/coachingundaktivierung/suche/aktivierungsangebot/408480349?mz=SA%2001&uk=ort&pg=0&dff=1,3&at=liste&mna=8&ort=Kriftel_8.4683_50.0828",
  },

  // Externe Kalender-Integration (z. B. Cal.com/Calendly). Wenn nicht gesetzt, wird
  // ausschließlich das Terminanfrage-Formular verwendet.
  booking: {
    url: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  },

  images: {
    badge: "/images/mazhar-badge.png",
  },

  nav: [
    { href: "/", label: "Startseite" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/fachkraefte-kooperationspartner", label: "Für Institutionen" },
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/faq", label: "FAQ" },
    { href: "/kontakt", label: "Kontakt" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
