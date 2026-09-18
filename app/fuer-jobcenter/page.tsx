import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, FactStat } from "@/components/Card";
import { CertificateFacts } from "@/components/CertificateFacts";
import { CertificateSeal } from "@/components/CertificateSeal";
import { ContactForm } from "@/components/ContactForm";
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
          AZAV-zugelassene Maßnahme für Ihre AVGS-Zuweisung
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Hier finden Vermittlungsfachkräfte die wesentlichen Angaben zur zugelassenen Maßnahme, zur Zielgruppe,
          zur Durchführung und zu den vorhandenen Zulassungsnachweisen – kompakt für die Prüfung einer
          AVGS-Zuweisung.
        </p>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">Maßnahme auf einen Blick</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
          Individuelles Bewerbungscoaching nach § 45 SGB III
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          <FactStat value={`${totalUe} UE`} label="à 45 Minuten" />
          <FactStat value="8 Wochen" label="Maximale Laufzeit" />
          <FactStat value="1:1" label="Einzelcoaching" />
          <FactStat value="§ 45 SGB III" label="Rechtsgrundlage" />
        </div>
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
              Orientierung, im Bewerbungsprozess oder bei der Integration – ausdrücklich auch bei eingeschränkten
              Deutschkenntnissen oder fehlender Digitalkompetenz.
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
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Von der Zuweisung bis zum Abschluss</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Durchführungsform</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Präsenz ausschließlich in den {siteConfig.presenceLocation.name} ({siteConfig.presenceLocation.region}),
              alternativ online oder hybrid. Keine Hausbesuche.
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
            <h3 className="font-semibold text-navy">Meldekanal</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              {siteConfig.name} ist auf KURSNET / arbeitsagentur.de als zugelassener Träger gelistet.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Ansprechpartner für Zuweisung</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              {siteConfig.founder}, Gründer und Ansprechpartner für Gutschein-Zuweisungen und Rückfragen zur
              Maßnahme – erreichbar über Kontaktformular, Telefon oder E-Mail.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">Zuweisung oder Rückfrage</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Teilnehmende zuweisen oder Rückfrage stellen</h2>
          <p className="mt-4 text-white/70">
            Ob Zuweisung, Rückfrage zur Maßnahme oder Prüfung der Passung – schreiben Sie uns direkt. Wir melden
            uns zeitnah zurück.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl rounded-[var(--radius-lg)] bg-white p-6 sm:p-8">
          <ContactForm formal />
        </div>
      </Section>
    </>
  );
}
