import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, FactStat } from "@/components/Card";
import { CertificateFacts } from "@/components/CertificateFacts";
import { CertificateSeal } from "@/components/CertificateSeal";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { BrandTransitionNote } from "@/components/BrandTransitionNote";

export const metadata: Metadata = {
  title: "Für Bildungsträger & Kooperationspartner",
  description:
    "KlarVoran übernimmt klar vereinbarte Coaching-Leistungen, Unteraufträge und Dozenteneinsätze für Bildungsträger – nach Verfügbarkeit im Rhein-Main-Gebiet, online oder hybrid.",
  alternates: { canonical: "/fuer-bildungstraeger" },
};

export default function FuerBildungstraegerPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/fachkraefte-kooperationspartner", label: "Für Institutionen" }, { href: "/fuer-bildungstraeger", label: "Bildungsträger" }]} />

      <Section tone="navy" className="pt-12">
        <Eyebrow tone="white">Für Bildungsträger & Kooperationspartner</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
          Jobcoaching und Bewerbungsmanagement – verlässlich im Unterauftrag
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          KlarVoran übernimmt klar definierte Coaching- und Bewerbungsmanagement-Module im Unterauftrag oder im
          Rahmen vereinbarter Dozenteneinsätze. Umfang, Verantwortlichkeiten, Dokumentation und Verfügbarkeit
          werden vor dem Einsatz verbindlich abgestimmt.
        </p>
      </Section>

      <Section tone="tint">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          <FactStat value="AZAV" label="Trägerzulassung vorhanden" />
          <FactStat value="Praxis" label="Jobcoaching & Bewerbungsmanagement" />
          <FactStat value="Rhein-Main" label="Einsatz nach Verfügbarkeit" />
          <FactStat value="1:1" label="Jobcoaching & Bewerbungsmanagement" />
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Einsatzmöglichkeiten</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Wie Sie mit uns zusammenarbeiten können</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Unterauftragnehmer</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Durchführung von Coaching- oder Bewerbungsmodulen innerhalb Ihrer zugelassenen Maßnahme, auf Basis
              eines klar definierten Unterauftrags.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Dozenteneinsätze &amp; Jobcoaching</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Einzelcoaching, Bewerbungsmanagement oder Gruppeneinheiten als klar vereinbarter projektbezogener
              Leistungsbaustein innerhalb Ihrer Programme.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Vertretung</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Zeitlich begrenzte Vertretung nach Verfügbarkeit und vorheriger Abstimmung von Inhalten,
              Zuständigkeiten und Dokumentation.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Dokumentation &amp; Rückmeldung</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Anwesenheiten, vereinbarte Arbeitsschritte, Ergebnisse und relevante Abweichungen werden nach den
              Vorgaben des Auftrags nachvollziehbar dokumentiert und abgestimmt zurückgemeldet.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">Erfahrung & Reichweite</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Warum KlarVoran als Partner</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Praxis in Bewerbungsmanagement und Jobcoaching</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Praxiserfahrung besteht seit November 2025 als freiberuflicher Dozent im Bewerbungsmanagement und
              Jobcoaching beim Bildungswerk der Hessischen Wirtschaft e. V. sowie 2026 beim Zentrum für
              Weiterbildung gGmbH. Hinzu kommen Erfahrungen aus berufsvorbereitenden Bildungsmaßnahmen.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Eigene AZAV-Träger- und Maßnahmezulassung</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Als eigenständig zugelassener Träger kennen wir die formalen Anforderungen an Dokumentation,
              Qualitätssicherung und Nachweisführung aus erster Hand.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Abgestimmte regionale Einsetzbarkeit</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Präsenz im Rhein-Main-Gebiet, online oder hybrid. Einsatzzeiten, Umfang, Übergaben und
              Vertretungsanforderungen werden vor Beauftragung verbindlich abgestimmt.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Zertifizierung</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              CERTQUA-zertifiziert ({siteConfig.certificate.number}), Fachbereich FB1 nach § 45 Abs. 1 SGB III.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Trägerdaten</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Zulassung im Überblick</h2>
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
          <Eyebrow tone="white">Kooperation anfragen</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Unterauftrag oder Kooperation besprechen</h2>
          <p className="mt-4 text-white/70">
            Schreiben Sie uns kurz Ihren Bedarf – Umfang, Zeitraum und Art des Einsatzes. Wir melden uns in der
            Regel innerhalb von 1–2 Werktagen zurück.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl rounded-[var(--radius-lg)] bg-white p-6 sm:p-8">
          <ContactForm formal defaultRequestType="unterauftrag" />
        </div>
      </Section>
    </>
  );
}
