// Website links and the PDF generator share this manifest.
export const institutionalDownloads = {
  jobcenter: {
    title: "Maßnahmenblatt für Jobcenter & Agentur für Arbeit",
    description: "Zielgruppe, Module, Umfang, Durchführungsort und Zulassungsdaten – kompakt für Gutscheinprüfung und Teilnahmeabstimmung.",
    href: "/dokumente/KlarVoran-Massnahmenblatt-AVGS.pdf",
    detailHref: "/fuer-jobcenter",
    updatedAt: "27.09.2026",
  },
  cooperation: {
    title: "Kooperationsblatt für Träger & Einrichtungen",
    description: "Leistungsbausteine, Arbeitsweise und Rahmenbedingungen für Unteraufträge, Workshops und abgestimmte Kooperationen.",
    href: "/dokumente/KlarVoran-Kooperationsblatt.pdf",
    detailHref: "/fuer-bildungstraeger",
    updatedAt: "27.09.2026",
  },
  participantFlyer: {
    title: "Flyer für Teilnehmende",
    description: "Einfach erklärt: Was du im Coaching machst, wie der AVGS funktioniert und wie du Kontakt aufnimmst.",
    href: "/dokumente/KlarVoran-Teilnehmerflyer-CERTQUA.pdf",
    detailHref: "/avgs",
    updatedAt: "27.09.2026",
  },
  jobcenterFlyer: {
    title: "Flyer für Jobcenter & Agentur für Arbeit",
    description: "Die AVGS-Maßnahme mit Zielgruppe, vier Modulen, Durchführung und Zulassungsdaten auf einer Seite.",
    href: "/dokumente/KlarVoran-Massnahmeflyer-Jobcenter-BA-CERTQUA.pdf",
    detailHref: "/fuer-jobcenter",
    updatedAt: "27.09.2026",
  },
  educationFlyer: {
    title: "Flyer für Bildungsträger",
    description: "Coachingmodule, Dozenteneinsätze und Bedingungen für eine Zusammenarbeit im Unterauftrag.",
    href: "/dokumente/KlarVoran-Kooperationsflyer-Bildungstraeger-CERTQUA.pdf",
    detailHref: "/fuer-bildungstraeger",
    updatedAt: "27.09.2026",
  },
  socialFlyer: {
    title: "Flyer für soziale Einrichtungen",
    description: "AVGS-Weitervermittlung und direkt vereinbarte Coaching- oder Workshopangebote im Überblick.",
    href: "/dokumente/KlarVoran-Kooperationsflyer-Soziale-Einrichtungen-CERTQUA.pdf",
    detailHref: "/fuer-soziale-einrichtungen",
    updatedAt: "27.09.2026",
  },
} as const;

export type InstitutionalDownloadKind = keyof typeof institutionalDownloads;
