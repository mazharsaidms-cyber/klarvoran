import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeistungCard } from "@/components/LeistungCard";
import { Button } from "@/components/Button";
import { participantLeistungen, institutionalLeistungen } from "@/lib/content/leistungen";
import { QuickPoints } from "@/components/QuickPoints";

export const metadata: Metadata = pageMetadata(
  "Leistungen – Coaching, Workshops & Kooperationen",
  "Vier Zugänge zu KlarVoran: AVGS-Bewerbungscoaching, privates Jobcoaching, Workshops und Gruppenformate sowie Kooperationen für Institutionen.",
  "/leistungen",
);

export default function LeistungenPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/leistungen", label: "Leistungen" }]} />
      <Section tone="navy" spacing="hero" className="kv-hero">
        <Eyebrow tone="white">Leistungen</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
          Coaching, Workshops und Zusammenarbeit mit KlarVoran
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Vergleiche die Angebote und wähle den passenden Weg für dich oder deine Institution.
        </p>
        <QuickPoints onDark items={[
          { icon: "orientation", label: "Einzelcoaching" },
          { icon: "social", label: "Workshops" },
          { icon: "provider", label: "Kooperation" },
        ]} />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="#coaching" onDark>Coaching für mich</Button>
          <Button href="#institutionen" variant="secondary" onDark>Angebote für Institutionen</Button>
        </div>
      </Section>

      <Section tone="tint" id="coaching">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">Einzelcoaching für dich</h2>
        <p className="mb-6 mt-4 max-w-2xl text-navy-600">AVGS-Coaching ist an einen passenden Gutschein und die Bewilligung gebunden. Für privat finanziertes Coaching vereinbaren wir Umfang und Kosten vor der Buchung. Ein Erstgespräch kannst du in beiden Fällen ohne Gutschein anfragen.</p>
        <ul className="service-grid grid gap-6 sm:grid-cols-2">
          {participantLeistungen.map((l) => (
            <LeistungCard key={l.id} leistung={l} />
          ))}
        </ul>
        <Button href="/avgs#schnellcheck" variant="text" className="mt-6">AVGS-Weg und Schnellcheck ansehen →</Button>
      </Section>

      <Section tone="white" id="institutionen">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">Für Ihre Institution</h2>
        <p className="mb-6 mt-4 max-w-2xl text-navy-600">Sie möchten Personen weiterempfehlen oder ein Angebot beauftragen? AVGS-Teilnahme, Workshops und direkte Aufträge haben unterschiedliche Voraussetzungen und werden passend abgestimmt.</p>
        <ul className="service-grid grid gap-6 sm:grid-cols-2">
          {institutionalLeistungen.map((l) => (
            <LeistungCard key={l.id} leistung={l} />
          ))}
        </ul>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow tone="white">Der passende nächste Schritt</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">So geht es passend weiter</h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col items-start rounded-[var(--radius-md)] border border-white/15 bg-white p-6 text-navy">
              <h3 className="text-lg font-bold">Du suchst Unterstützung?</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Im kostenlosen Erstgespräch klären wir deine Situation und welches Coachingformat dazu passt.
              </p>
              <div className="mt-auto pt-5"><Button href="/termin">Erstgespräch anfragen</Button></div>
            </div>
            <div className="flex flex-col items-start rounded-[var(--radius-md)] border border-white/15 bg-white p-6 text-navy">
              <h3 className="text-lg font-bold">Sie vertreten eine Institution?</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Wählen Sie den passenden Bereich für Gutscheinabstimmung, Kooperation, Unterauftrag oder Auftrag.
              </p>
              <div className="mt-auto pt-5"><Button href="/fachkraefte-kooperationspartner" variant="secondary">
                Zum institutionellen Bereich
              </Button></div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
