import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertificateFacts } from "@/components/CertificateFacts";
import { CertificateSeal } from "@/components/CertificateSeal";
import { ContactForm } from "@/components/ContactForm";
import { InstitutionCard, type InstitutionTarget } from "@/components/InstitutionCard";
import { BrandTransitionNote } from "@/components/BrandTransitionNote";
import { ContextGraphic } from "@/components/ContextGraphic";
import { InstitutionDownload } from "@/components/InstitutionDownload";

export const metadata: Metadata = {
  title: "Für Institutionen & Kooperationspartner",
  description:
    "KlarVoran für Jobcenter, Agentur für Arbeit, soziale Einrichtungen, Bildungsträger, Kommunen und öffentliche Auftraggeber: Gutscheinabstimmung, Kooperation oder Auftrag.",
  alternates: { canonical: "/fachkraefte-kooperationspartner" },
};

const audiences: InstitutionTarget[] = [
  {
    title: "Jobcenter & Agentur für Arbeit",
    text: "AVGS, § 45 SGB III, Maßnahmezulassung, Zielgruppe, Ablauf und Ansprechpartner für Gutscheinprüfung und Teilnahmeabstimmung.",
    href: "/fuer-jobcenter",
    cta: "Zur Seite für Jobcenter / Agentur für Arbeit",
  },
  {
    title: "Soziale Einrichtungen & Beratungsstellen",
    text: "Externe Coaching- und Workshopangebote, berufliche Orientierung und Kooperationsmöglichkeiten für Ihre Klientinnen und Klienten.",
    href: "/fuer-soziale-einrichtungen",
    cta: "Zur Seite für soziale Einrichtungen",
  },
  {
    title: "Bildungsträger & Kooperationspartner",
    text: "Unteraufträge, Dozenteneinsätze oder abgestimmte Vertretung – mit klaren Zuständigkeiten und Praxis in Jobcoaching und Bewerbungsmanagement.",
    href: "/fuer-bildungstraeger",
    cta: "Zur Seite für Bildungsträger",
  },
  {
    title: "Kommunen & öffentliche Auftraggeber",
    text: "Klar abgegrenzte Bildungs-, Coaching- und Workshopaufträge für regionale Projekte und Vorhaben.",
    href: "/fuer-kommunen",
    cta: "Zur Seite für Kommunen",
  },
];

export default function FachkraeftePage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/fachkraefte-kooperationspartner", label: "Für Institutionen" }]} />
      <Section tone="navy" className="pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.7fr]">
          <div>
            <Eyebrow tone="white">Für Institutionen & Kooperationspartner</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
              Verlässliche Coaching- und Bildungsleistungen für Ihre Institution
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Wählen Sie den Bereich, der zu Ihrem Anliegen passt. Dort finden Sie die relevanten Angaben zu
              Zulassung, Durchführung, Kooperation, Dokumentation und Kontakt.
            </p>
          </div>
          <ContextGraphic
            variant="cooperation"
            title="Klare Zuständigkeiten und abgestimmte Zusammenarbeit mit Institutionen"
            className="hidden lg:block"
          />
        </div>
      </Section>

      <Section tone="tint">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <InstitutionCard key={a.href} target={a} headingLevel={2} />
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <Eyebrow>Downloads</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Die wichtigsten Angaben zum Mitnehmen</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
          Zwei kompakte Faktenblätter für Ihre interne Abstimmung. Die eigene AVGS-Maßnahme und individuell
          vereinbarte Kooperationen sind bewusst getrennt dargestellt.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <InstitutionDownload kind="jobcenter" />
          <InstitutionDownload kind="cooperation" />
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Zulassung</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Trägerdaten im Überblick</h2>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[280px_1fr]">
          {/* Ausschließlich das Trägerzeichen – kein pauschales Maßnahmesiegel. */}
          <CertificateSeal
            seal="traeger"
            caption="Trägerzertifikat – ausgestellt auf die bisherige Trägerbezeichnung"
          />
          <div>
            <CertificateFacts />
            <BrandTransitionNote className="mt-4" />
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">Kooperationsanfrage</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Teilnahme abstimmen oder Kooperation anfragen</h2>
          <p className="mt-4 text-white/70">
            Ob Gutscheinprüfung, Rückfrage zur Maßnahme oder Anfrage als Kooperationspartner – schreiben Sie uns
            direkt. Wir melden uns in der Regel innerhalb von 1–2 Werktagen zurück.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl rounded-[var(--radius-lg)] bg-white p-6 sm:p-8">
          <ContactForm formal />
        </div>
      </Section>
    </>
  );
}
