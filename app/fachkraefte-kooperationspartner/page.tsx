import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Button } from "@/components/Button";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertificateFacts } from "@/components/CertificateFacts";
import { CertificateSeal } from "@/components/CertificateSeal";
import { ContactForm } from "@/components/ContactForm";
import { InstitutionCard, type InstitutionTarget } from "@/components/InstitutionCard";
import { ContextGraphic } from "@/components/ContextGraphic";
import { QuickPoints } from "@/components/QuickPoints";
import { InstitutionDownload } from "@/components/InstitutionDownload";

export const metadata: Metadata = pageMetadata(
  "Für Institutionen & Kooperationspartner",
  "KlarVoran für Jobcenter, Agentur für Arbeit, soziale Einrichtungen, Bildungsträger, Kommunen und öffentliche Auftraggeber: Gutscheinabstimmung, Kooperation oder Auftrag.",
  "/fachkraefte-kooperationspartner",
);

const audiences: InstitutionTarget[] = [
  {
    title: "Jobcenter & Agentur für Arbeit",
    text: "AVGS-Maßnahme, Zulassung und Teilnahmeabstimmung.",
    href: "/fuer-jobcenter",
    cta: "Maßnahmedaten ansehen",
  },
  {
    title: "Soziale Einrichtungen & Beratungsstellen",
    text: "Coaching, Workshops und Wege der Zusammenarbeit.",
    href: "/fuer-soziale-einrichtungen",
    cta: "Angebote ansehen",
  },
  {
    title: "Bildungsträger & Kooperationspartner",
    text: "Unteraufträge, Dozenteneinsätze und Vertretung.",
    href: "/fuer-bildungstraeger",
    cta: "Leistungen ansehen",
  },
  {
    title: "Kommunen & öffentliche Auftraggeber",
    text: "Coaching- und Workshopbausteine für regionale Vorhaben.",
    href: "/fuer-kommunen",
    cta: "Vorhaben ansehen",
  },
];

export default function FachkraeftePage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/fachkraefte-kooperationspartner", label: "Für Institutionen" }]} />
      <Section tone="navy" spacing="hero" className="kv-hero">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.7fr]">
          <div>
            <Eyebrow tone="white">Für Institutionen & Kooperationspartner</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
              Verlässliche Coaching- und Bildungsleistungen für Ihre Institution
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Wählen Sie Ihre Einrichtung. Dort finden Sie Leistungen, Voraussetzungen und Unterlagen für die Zusammenarbeit.
            </p>
            <QuickPoints onDark items={[
              { icon: "jobcenter", label: "AVGS-Teilnahme" },
              { icon: "social", label: "Weiterempfehlung" },
              { icon: "provider", label: "Auftrag" },
            ]} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#bereiche" onDark>Meinen Bereich wählen</Button>
              <Button href="#anfrage" onDark variant="text">Direkt anfragen →</Button>
            </div>
          </div>
          <ContextGraphic
            variant="cooperation"
            title="Klare Zuständigkeiten und abgestimmte Zusammenarbeit mit Institutionen"
            className="mx-auto w-full max-w-xs lg:max-w-none"
          />
        </div>
      </Section>

      <Section tone="tint" id="bereiche">
        <ul className="institution-grid grid gap-6 sm:grid-cols-2">
          {audiences.map((a) => (
            <InstitutionCard key={a.href} target={a} headingLevel={2} />
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <Eyebrow>Downloads</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Unterlagen für Ihre Arbeit</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
          Drei einseitige PDFs für Ihre interne Abstimmung oder zur Weitergabe: zur AVGS-Maßnahme, zur
          Zusammenarbeit mit Bildungsträgern und zu Angeboten für soziale Einrichtungen.
        </p>
        <div className="download-grid mt-6 grid gap-5 sm:grid-cols-2">
          <InstitutionDownload kind="jobcenterFlyer" />
          <InstitutionDownload kind="educationFlyer" />
          <InstitutionDownload kind="socialFlyer" />
        </div>
      </Section>

      <Section tone="tint">
        <Eyebrow>Zulassung</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Trägerdaten im Überblick</h2>
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[280px_1fr]">
          {/* Ausschließlich das Trägerzeichen – kein pauschales Maßnahmesiegel. */}
          <CertificateSeal
            seal="traeger"
            caption="Trägerzertifikat – ausgestellt auf Mazhar Said – KlarVoran"
          />
          <div>
            <CertificateFacts />
          </div>
        </div>
      </Section>

      <Section tone="navy" id="anfrage">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">Kooperationsanfrage</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Teilnahme abstimmen oder Kooperation anfragen</h2>
          <p className="mt-4 text-white/70">
            Ob Gutscheinprüfung, Rückfrage zur Maßnahme oder Anfrage als Kooperationspartner – schreiben Sie uns
            direkt. Wir melden uns in der Regel innerhalb von 1–2 Werktagen zurück.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-xl rounded-[var(--radius-lg)] bg-white p-6 sm:p-8">
          <ContactForm formal />
        </div>
      </Section>
    </>
  );
}
