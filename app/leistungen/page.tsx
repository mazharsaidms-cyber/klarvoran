import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeistungCard } from "@/components/LeistungCard";
import { Button } from "@/components/Button";
import { leistungen } from "@/lib/content/leistungen";
import { ContextGraphic } from "@/components/ContextGraphic";

const frameworkSteps = [
  { number: "01", title: "Verstanden werden", text: "Ausgangslage und Ziel klären." },
  { number: "02", title: "System verstehen", text: "Anforderungen nachvollziehen." },
  { number: "03", title: "Selbst handeln", text: "Den nächsten Schritt selbst üben." },
  { number: "04", title: "Dranbleiben", text: "Fortschritt erkennen und anpassen." },
];

export const metadata: Metadata = {
  title: "Leistungen – Coaching, Workshops & Kooperationen",
  description:
    "Vier Zugänge zu KlarVoran: AVGS-Bewerbungscoaching, privates Jobcoaching, Workshops und Gruppenformate sowie Kooperationen für Institutionen.",
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/leistungen", label: "Leistungen" }]} />
      <Section tone="navy" className="pt-12">
        <Eyebrow tone="white">Leistungen</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
          Vier Wege zu beruflicher Handlungsfähigkeit
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          KlarVoran bietet vier klar getrennte Zugänge: gefördertes Einzelcoaching mit AVGS, privates Jobcoaching,
          praxisnahe Gruppenformate und Zusammenarbeit mit Institutionen. Format, Umfang und Finanzierung richten
          sich nach dem jeweiligen Bedarf.
        </p>
      </Section>

      <Section tone="white" className="py-10 sm:py-12">
        <ContextGraphic
          variant="application"
          title="Bewerbungsunterlagen prüfen, Anforderungen verstehen und nächste Schritte planen"
          className="mx-auto max-w-3xl"
        />
      </Section>

      <Section tone="tint">
        <ul className="grid gap-6 sm:grid-cols-2">
          {leistungen.map((l) => (
            <LeistungCard key={l.id} leistung={l} headingLevel={2} />
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <Eyebrow tone="navy">Das KlarVoran-Framework</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Eine Methode, unterschiedliche Zugänge</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
          Wir hören zuerst zu, erklären die Anforderungen verständlich und üben den nächsten Schritt praktisch.
          So kannst du ihn zunehmend selbst übernehmen.
        </p>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {frameworkSteps.map((step) => (
            <li key={step.number} className="rounded-[var(--radius-md)] border border-navy-100 bg-navy-50 p-5 transition-colors duration-200 hover:border-red/30 motion-reduce:transition-none">
              <span className="font-mono text-sm font-bold text-red-700" aria-hidden="true">{step.number}</span>
              <h3 className="mt-2 font-semibold text-navy">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow tone="white">Der passende nächste Schritt</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">So geht es passend weiter</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-white/15 bg-white p-6 text-navy">
              <h3 className="text-lg font-bold">Du suchst Unterstützung?</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Im kostenlosen Erstgespräch klären wir deine Situation und welches Coachingformat dazu passt.
              </p>
              <Button href="/termin" className="mt-5">Erstgespräch anfragen</Button>
            </div>
            <div className="rounded-[var(--radius-md)] border border-white/15 bg-white p-6 text-navy">
              <h3 className="text-lg font-bold">Sie vertreten eine Institution?</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Wählen Sie den passenden Bereich für Gutscheinabstimmung, Kooperation, Unterauftrag oder Auftrag.
              </p>
              <Button href="/fachkraefte-kooperationspartner" variant="secondary" className="mt-5">
                Zum institutionellen Bereich
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
