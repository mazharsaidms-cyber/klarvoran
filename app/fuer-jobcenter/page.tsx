import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, FactStat } from "@/components/Card";
import { CertificateFacts } from "@/components/CertificateFacts";
import { CertificateSeal } from "@/components/CertificateSeal";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import { coachingModules, totalUe } from "@/lib/content/modules";
import { siteConfig } from "@/lib/site-config";
import { BrandTransitionNote } from "@/components/BrandTransitionNote";

export const metadata: Metadata = {
  title: "Für Jobcenter & Agentur für Arbeit",
  description:
    "AVGS-Coaching nach § 45 SGB III bei KlarVoran: zugelassene Maßnahme, Zielgruppe, Ablauf, Zulassungsdaten und Ansprechpartner für Vermittlungsfachkräfte.",
  alternates: { canonical: "/fuer-jobcenter" },
};

export default function FuerJobcenterPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/fachkraefte-kooperationspartner", label: "Für Institutionen" }, { href: "/fuer-jobcenter", label: "Jobcenter & Agentur für Arbeit" }]} />

      <Section tone="navy" className="pt-12">
        <Eyebrow tone="white">Für Jobcenter & Agentur für Arbeit</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
          AZAV-zugelassene Maßnahme für die Gutschein- und Teilnahmeabstimmung
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Hier finden Vermittlungsfachkräfte die wesentlichen Angaben zur zugelassenen Maßnahme, zur Zielgruppe,
          zur Durchführung und zu den vorhandenen Zulassungsnachweisen – kompakt für die Prüfung eines Gutscheins
          und der individuellen Passung.
        </p>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">Maßnahme auf einen Blick</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
          {siteConfig.measure.title}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          <FactStat value={`${totalUe} UE`} label="à 45 Minuten" />
          <FactStat value="8 Wochen" label="Maximale Laufzeit" />
          <FactStat value="1:1" label="Einzelcoaching" />
          <FactStat value="§ 45 SGB III" label="Rechtsgrundlage" />
        </div>
        <dl className="mt-8 grid gap-4 rounded-[var(--radius-md)] border border-navy-100 bg-white p-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Maßnahmezulassung", `${siteConfig.measure.approvalFrom} – ${siteConfig.measure.approvalTo}`],
            ["Maßnahmezertifikat", siteConfig.measure.certificateNumber],
            ["Veranstaltungs-ID", siteConfig.measure.eventId],
            ["Anbieter-ID", siteConfig.measure.providerId],
            ["Terminrhythmus", siteConfig.measure.schedule],
            ["Durchführungszeiten", siteConfig.measure.serviceHours],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-semibold text-navy">{label}</dt>
              <dd className="mt-1 text-navy-600">{value}</dd>
            </div>
          ))}
        </dl>
        <Button href={siteConfig.measure.baHref} external variant="text" className="mt-5">
          Offiziellen Eintrag bei der Bundesagentur für Arbeit ansehen →
        </Button>
        {/* Maßnahmezeichen direkt bei der eigenen AVGS-Maßnahme (CERTQUA-Vorgabe). */}
        <div className="mt-8">
          <CertificateSeal
            seal="massnahme"
            caption="Individuelles Bewerbungscoaching nach § 45 SGB III (Zugelassene Maßnahme nach AZAV)"
          />
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Zulassung</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">AZAV-Zulassung &amp; Zertifizierung</h2>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[280px_1fr]">
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

      <Section tone="tint">
        <Eyebrow tone="navy">Zielgruppe & Inhalte</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Für wen die Maßnahme geeignet ist</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Zielgruppe</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Arbeitsuchende bzw. von Arbeitslosigkeit bedrohte Personen mit Unterstützungsbedarf bei beruflicher
              Orientierung, im Bewerbungsprozess oder bei der Integration. Verständliche Sprache und praktische
              Unterstützung bei digitalen Bewerbungswegen gehören zum Ansatz. Ob die vorhandenen Deutschkenntnisse
              für das deutschsprachige Coaching ausreichen, wird im Erstgespräch individuell geklärt.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Maßnahmeziel</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Aktivierung und nachhaltige Integration in Arbeit oder Ausbildung durch individuelles Coaching:
              nachvollziehbar dokumentiert und anhand der vereinbarten beruflichen Ziele überprüft.
            </p>
          </Card>
        </div>
        <div className="mt-8 overflow-x-auto rounded-[var(--radius-md)] border border-navy-100">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-navy-50 text-navy">
                <th scope="col" className="px-4 py-3 font-semibold">Modul</th>
                <th scope="col" className="px-4 py-3 font-semibold">Inhalt</th>
                <th scope="col" className="px-4 py-3 text-right font-mono font-semibold">UE</th>
              </tr>
            </thead>
            <tbody>
              {coachingModules.map((m) => (
                <tr key={m.id} className="border-t border-navy-100 text-navy-600">
                  <td className="px-4 py-3 font-medium text-navy">{m.title}</td>
                  <td className="px-4 py-3">{m.institutionOutcome}</td>
                  <td className="px-4 py-3 text-right font-mono">{m.ue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Ablauf & Durchführung</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Von der Gutscheinprüfung bis zum Abschluss</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Durchführungsform</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Präsenz in der {siteConfig.presenceLocation.street}, {siteConfig.presenceLocation.zip}{" "}
              {siteConfig.presenceLocation.city}, alternativ online oder hybrid. Der Standort ist ebenerdig;
              öffentliche Parkmöglichkeiten befinden sich in der Nähe. Keine Hausbesuche.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Dokumentation</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Sitzungsdokumentation nach jeder Einheit, laufende Anwesenheitsdokumentation, Abschlussbericht und
              Teilnahmebescheinigung mit Maßnahmebezeichnung, Zeitraum, Umfang und Inhalten.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Offizieller BA-Eintrag</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Die Maßnahme ist im Portal „Coaching und Aktivierung“ der Bundesagentur für Arbeit veröffentlicht.
              Veranstaltungs-ID: {siteConfig.measure.eventId}.
            </p>
            <Button href={siteConfig.measure.baHref} external variant="text" className="mt-3">
              BA-Eintrag öffnen →
            </Button>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Ansprechpartner für die Abstimmung</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              {siteConfig.founder}, Gründer und Ansprechpartner für Gutscheinprüfungen, Teilnahmeabstimmungen und Rückfragen zur
              Maßnahme – erreichbar über Kontaktformular, Telefon oder E-Mail.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">Gutscheinabstimmung oder Rückfrage</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Passung klären oder Rückfrage stellen</h2>
          <p className="mt-4 text-white/70">
            Ob Gutscheinprüfung, Rückfrage zur Maßnahme oder Klärung der individuellen Passung – schreiben Sie uns
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
