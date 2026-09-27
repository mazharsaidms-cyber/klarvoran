// Publicly listed flyer downloads. Older fact sheets remain at their original URLs for existing links.
export const institutionalDownloads = {
  participantFlyer: {
    title: "AVGS-Coaching: Infos für dich",
    description: "Einfach erklärt: Was du im Coaching machst, wie der AVGS funktioniert und wie du Kontakt aufnimmst.",
    href: "/dokumente/KlarVoran-Teilnehmerflyer-CERTQUA.pdf",
    detailHref: "/avgs",
    updatedAt: "27.09.2026",
  },
  jobcenterFlyer: {
    title: "AVGS-Einzelcoaching: Maßnahmenübersicht",
    description: "Die AVGS-Maßnahme mit Zielgruppe, vier Modulen, Durchführung und Zulassungsdaten auf einer Seite.",
    href: "/dokumente/KlarVoran-Massnahmeflyer-Jobcenter-BA-CERTQUA.pdf",
    detailHref: "/fuer-jobcenter",
    updatedAt: "27.09.2026",
  },
  educationFlyer: {
    title: "Coachingbausteine für Bildungsträger",
    description: "Coachingmodule, Dozenteneinsätze und Bedingungen für eine Zusammenarbeit im Unterauftrag.",
    href: "/dokumente/KlarVoran-Kooperationsflyer-Bildungstraeger-CERTQUA.pdf",
    detailHref: "/fuer-bildungstraeger",
    updatedAt: "27.09.2026",
  },
  socialFlyer: {
    title: "Coaching für soziale Einrichtungen",
    description: "AVGS-Weitervermittlung und direkt vereinbarte Coaching- oder Workshopangebote im Überblick.",
    href: "/dokumente/KlarVoran-Kooperationsflyer-Soziale-Einrichtungen-CERTQUA.pdf",
    detailHref: "/fuer-soziale-einrichtungen",
    updatedAt: "27.09.2026",
  },
} as const;

export type InstitutionalDownloadKind = keyof typeof institutionalDownloads;
