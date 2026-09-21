import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Button } from "@/components/Button";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, FactStat } from "@/components/Card";
import { CertificateSeal } from "@/components/CertificateSeal";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { BrandTransitionNote } from "@/components/BrandTransitionNote";
import { ContextGraphic } from "@/components/ContextGraphic";
import { InstitutionDownload } from "@/components/InstitutionDownload";

export const metadata: Metadata = pageMetadata(
  "Für soziale Einrichtungen & Beratungsstellen",
  "KlarVoran unterstützt soziale Einrichtungen, Wohlfahrtsverbände, Jugendprojekte und Beratungsstellen mit arbeitsmarktbezogenen Coachings und Workshops im Rhein-Main-Gebiet.",
  "/fuer-soziale-einrichtungen",
);

export default function FuerSozialeEinrichtungenPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/fachkraefte-kooperationspartner", label: "Für Institutionen" }, { href: "/fuer-soziale-einrichtungen", label: "Soziale Einrichtungen" }]} />

      <Section tone="navy" spacing="hero" className="kv-hero">
        <Eyebrow tone="white">Für soziale Einrichtungen &amp; Beratungsstellen</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
          Ein externer Coaching-Partner für Ihre Klientinnen und Klienten
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          KlarVoran ergänzt Ihre Arbeit mit individuellem Bewerbungscoaching und praxisnahen Gruppenformaten. Ziele,
          Zuständigkeiten und Rahmenbedingungen stimmen wir vorab klar mit Ihnen ab.
        </p>
            <Button href="#anfrage" onDark className="mt-6">Kooperation besprechen</Button>
      </Section>

      <Section tone="tint">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <FactStat value="1:1" label="Einzelcoaching" />
          <FactStat value="Workshops" label="Für Gruppen" />
          <FactStat value="AZAV" label="Zugelassener Träger" />
          <FactStat value="Rhein-Main" label="Präsenz, online, hybrid" />
        </div>
        <div className="mt-6 max-w-2xl">
          <h2 className="sr-only">Informationen zur Kooperation herunterladen</h2>
          <InstitutionDownload kind="cooperation" />
        </div>
      </Section>

      {/* Trägerdaten: ausschließlich das Trägerzeichen, kein Maßnahmesiegel. */}
      <Section tone="white" spacing="compact">
        <Eyebrow>Trägerdaten</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Zulassung im Überblick</h2>
        <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <CertificateSeal
            seal="traeger"
            caption="Trägerzertifikat – ausgestellt auf die bisherige Trägerbezeichnung"
          />
          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-navy-600">
              Das vorhandene Trägerzertifikat nach § 178 SGB III wurde durch {siteConfig.certificate.issuer}{" "}
              ausgestellt (Zertifikat {siteConfig.certificate.number}).
            </p>
            <BrandTransitionNote className="mt-3" />
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <ContextGraphic
            variant="conversation"
            title="Verständliche arbeitsmarktbezogene Begleitung für unterschiedliche Ausgangslagen"
            className="order-2 mx-auto w-full max-w-xs lg:order-none lg:max-w-none"
          />
          <div>
            <Eyebrow>Was wir anbieten</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
              Passend zum Bedarf Ihrer Klientinnen und Klienten
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
              Das Angebot richtet sich an Menschen, die beim Übergang in Arbeit oder Ausbildung Orientierung
              und praktische Unterstützung brauchen – darunter Jugendliche und junge Erwachsene sowie Menschen
              mit unterschiedlichen Bildungswegen und Migrationserfahrungen. Wir klären im Gespräch, welche
              beruflichen Schritte zum individuellen Bedarf passen.
            </p>
          </div>
        </div>
        <div className="text-card-grid mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Einzelcoaching</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Individuelles Bewerbungs- und Orientierungscoaching mit passendem AVGS oder im Rahmen einer
              vereinbarten Projekt- beziehungsweise Budgetkooperation. Informationen zur geförderten Teilnahme:{" "}
              <a href="/avgs" className="underline underline-offset-4 hover:text-red-700">
                AVGS-Einzelcoaching
              </a>
              .
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Verständliche, praxisnahe Workshops</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Kompakte Gruppenformate zu Bewerbung, Orientierung und digitaler Kompetenz – siehe{" "}
              <a href="/leistungen/workshops" className="underline underline-offset-4 hover:text-red-700">
                Workshops &amp; Gruppenformate
              </a>
              .
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Berufliche Orientierung & Bewerbungstraining</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Von der Standortbestimmung bis zu passenden Bewerbungsunterlagen und sicheren digitalen
              Bewerbungswegen – strukturiert und auf den vereinbarten Bedarf abgestimmt.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Direkte, verständliche Sprache</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Lebensweltnah, verständlich und kultursensibel – damit unterschiedliche Erfahrungen und
              Ausgangslagen respektvoll in die nächsten beruflichen Schritte einbezogen werden.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">Zusammenarbeit</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Wie eine Kooperation aussehen kann</h2>
        <div className="text-card-grid mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Vermittlung und Weiterempfehlung</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Sie informieren passende Klientinnen und Klienten über das Angebot. Bei vorhandenem oder geplantem
              AVGS klärt KlarVoran Gutschein, Maßnahmepassung und weitere Schritte direkt mit der Person.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Projekt- oder Budgetkooperation</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Workshops oder Coaching-Kontingente im Rahmen eigener Projektmittel oder Budgets Ihrer Einrichtung –
              Umfang und Konditionen klären wir gemeinsam.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">AZAV-Hintergrund</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Das vorhandene Trägerzertifikat nach § 178 SGB III und die zugelassene Maßnahme sind relevant, sobald
              Klientinnen und Klienten einen passenden AVGS einbringen. Die formale Umstellung auf KlarVoran
              befindet sich in Bearbeitung.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Ansprechpartner</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              {siteConfig.founder} ist der feste Ansprechpartner für Bedarfsklärung, Angebot, Abstimmung und
              Rückfragen während der Zusammenarbeit.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Verantwortung &amp; Datenschutz</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Klare Rollen und vertraulicher Umgang</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
          Ziele, Zuständigkeiten und Rückmeldewege werden vor Beginn der Zusammenarbeit vereinbart.
          Personenbezogene Rückmeldungen erfolgen nur auf einer passenden Rechtsgrundlage beziehungsweise mit der
          erforderlichen Einwilligung. Das Coaching ersetzt keine Therapie, Rechtsberatung oder umfassende
          Sozialberatung.
        </p>
      </Section>

      <Section tone="navy" id="anfrage">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">Kontakt aufnehmen</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Klientinnen und Klienten vermitteln oder Kooperation anfragen
          </h2>
          <p className="mt-4 text-white/70">
            Schreiben Sie uns kurz, worum es geht – Einzelcoaching, Workshop-Anfrage oder grundsätzliches
            Kooperationsinteresse. Wir melden uns in der Regel innerhalb von 1–2 Werktagen zurück.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl rounded-[var(--radius-lg)] bg-white p-6 sm:p-8">
          <ContactForm formal defaultRequestType="kooperation" />
        </div>
      </Section>
    </>
  );
}
