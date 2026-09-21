import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeistungCard } from "@/components/LeistungCard";
import { Button } from "@/components/Button";
import { leistungen } from "@/lib/content/leistungen";
import { VisualSteps, type VisualStep } from "@/components/VisualSteps";

const frameworkSteps: VisualStep[] = [
  { icon: "conversation", title: "Verstanden werden", text: "Ausgangslage und Ziel klären." },
  { icon: "signpost", title: "System verstehen", text: "Anforderungen nachvollziehen." },
  { icon: "laptop", title: "Selbst handeln", text: "Den nächsten Schritt selbst üben." },
  { icon: "progress", title: "Dranbleiben", text: "Fortschritt erkennen und anpassen." },
];

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
          KlarVoran bietet vier klar getrennte Zugänge: gefördertes Einzelcoaching mit AVGS, privates Jobcoaching,
          praxisnahe Gruppenformate und Zusammenarbeit mit Institutionen. Format, Umfang und Finanzierung richten
          sich nach dem jeweiligen Bedarf.
        </p>
      </Section>

      <Section tone="tint">
        <ul className="service-grid grid gap-6 sm:grid-cols-2">
          {leistungen.map((l) => (
            <LeistungCard key={l.id} leistung={l} headingLevel={2} />
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <Eyebrow tone="navy">Unsere Arbeitsweise</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Eine Methode, unterschiedliche Zugänge</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
          Wir hören zuerst zu, erklären die Anforderungen verständlich und üben den nächsten Schritt praktisch.
          So kannst du ihn zunehmend selbst übernehmen.
        </p>
        <div className="mt-8"><VisualSteps steps={frameworkSteps} /></div>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow tone="white">Der passende nächste Schritt</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">So geht es passend weiter</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
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
