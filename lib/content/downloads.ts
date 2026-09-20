// Website links and the PDF generator share this manifest.
export const institutionalDownloads = {
  jobcenter: {
    title: "Maßnahmenblatt für Jobcenter & Agentur für Arbeit",
    description: "Zielgruppe, Module, Umfang, Durchführungsort und Zulassungsdaten – kompakt für Gutscheinprüfung und Teilnahmeabstimmung.",
    href: "/dokumente/KlarVoran-Massnahmenblatt-AVGS.pdf",
    detailHref: "/fuer-jobcenter",
    updatedAt: "20.09.2026",
  },
  cooperation: {
    title: "Kooperationsblatt für Träger & Einrichtungen",
    description: "Leistungsbausteine, Arbeitsweise und Rahmenbedingungen für Unteraufträge, Workshops und abgestimmte Kooperationen.",
    href: "/dokumente/KlarVoran-Kooperationsblatt.pdf",
    detailHref: "/fuer-bildungstraeger",
    updatedAt: "20.09.2026",
  },
} as const;

export type InstitutionalDownloadKind = keyof typeof institutionalDownloads;
