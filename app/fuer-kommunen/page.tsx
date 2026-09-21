import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow, Section } from "@/components/Section";
import { ContextGraphic } from "@/components/ContextGraphic";

export const metadata: Metadata = pageMetadata(
  "Für Kommunen & öffentliche Auftraggeber",
  "KlarVoran übernimmt klar abgegrenzte Bildungs-, Coaching- und Workshopaufträge für Kommunen und öffentliche Auftraggeber im Rhein-Main-Gebiet.",
  "/fuer-kommunen",
);

const services = [
  {
    title: "Bewerbungs- und Orientierungsmodule",
    text: "Praxisnahe Einheiten zu beruflicher Orientierung, Bewerbungsunterlagen, Stellensuche und Vorstellungsgesprächen.",
  },
  {
    title: "Workshops für konkrete Zielgruppen",
    text: "Abgegrenzte Gruppenformate mit vorab vereinbarten Zielen, Inhalten und Ergebnissen.",
  },
  {
    title: "Projektbezogene Coachingaufträge",
    text: "Einzel- oder Kleingruppenangebote als klar beschriebener Baustein innerhalb eines regionalen Vorhabens.",
  },
];

export default function FuerKommunenPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/fachkraefte-kooperationspartner", label: "Für Institutionen" },
          { href: "/fuer-kommunen", label: "Kommunen & öffentliche Auftraggeber" },
        ]}
      />

      <Section tone="navy" spacing="hero" className="kv-hero">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow tone="white">Für Kommunen &amp; öffentliche Auftraggeber</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
              Arbeitsmarktbezogene Workshops und Coachingbausteine für regionale Vorhaben
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              KlarVoran übernimmt Bewerbungs-, Orientierungs- und Coachingbausteine für klar definierte Zielgruppen im
              Rhein-Main-Gebiet. Ziele, Zeitraum, Zuständigkeiten, Durchführung und erforderliche Nachweise werden vor
              der Beauftragung schriftlich vereinbart.
            </p>
            <Button href="#anfrage" onDark className="mt-6">Vorhaben anfragen</Button>
          </div>
          <ContextGraphic
            variant="workshop"
            title="Abgegrenzte Workshopbausteine mit vereinbarten Zielen und Ergebnissen"
            className="hidden lg:block"
          />
        </div>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">Leistungsbausteine</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Was KlarVoran übernehmen kann</h2>
        <div className="text-card-grid mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <h3 className="font-semibold text-navy">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{service.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Zusammenarbeit</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Ein klarer Auftrag statt unklarer Zuständigkeiten</h2>
        <div className="text-card-grid mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Vorab eindeutig vereinbart</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Zielgruppe, Inhalte, Termine, Zuständigkeiten und gewünschte Nachweise werden vor der Durchführung
              abgestimmt.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Verlässlich umsetzbar</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Leistungsumfang, Zeitplan, eingesetzte Fachkraft und gegebenenfalls vereinbarte Vertretung, Räume,
              Technik und erforderliche Abstimmungen werden vor Beauftragung geprüft und transparent im Angebot
              festgehalten.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Dokumentation und Rückmeldung</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Vereinbarte Leistungen, Anwesenheiten, Ergebnisse und relevante Abweichungen werden nachvollziehbar
              dokumentiert. Form und Rhythmus der Rückmeldung richten sich nach dem Auftrag.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Klare Leistungsgrenzen</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Arbeitsmarktbezogene Leistungen werden von Therapie, Rechtsberatung und umfassender Sozialberatung
              abgegrenzt. Erforderliche Schnittstellen werden vorab benannt.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="navy" id="anfrage">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">Auftrag besprechen</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Vorhaben oder Leistungsbaustein anfragen</h2>
          <p className="mt-4 text-white/70">
            Beschreiben Sie kurz Zielgruppe, gewünschte Leistung, Zeitraum und Rahmen. Wir prüfen die Passung und
            melden uns in der Regel innerhalb von 1–2 Werktagen zurück.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl rounded-[var(--radius-lg)] bg-white p-6 sm:p-8">
          <ContactForm formal defaultRequestType="oeffentlicher_auftrag" />
        </div>
      </Section>
    </>
  );
}
