import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeistungCard } from "@/components/LeistungCard";
import { CtaSection } from "@/components/CtaSection";
import { leistungen } from "@/lib/content/leistungen";

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

      <div className="relative h-48 w-full overflow-hidden sm:h-64 lg:h-80">
        <Image
          src={"/images/team/cv-durchsicht.jpg"}
          alt="Bewerbungsunterlagen werden im Coaching gemeinsam geprüft"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Section tone="tint">
        <ul className="grid gap-6 sm:grid-cols-2">
          {leistungen.map((l) => (
            <LeistungCard key={l.id} leistung={l} headingLevel={2} />
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <Eyebrow tone="navy">Gemeinsamer Ansatz</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Eine Methode, unterschiedliche Zugänge</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
          Wir hören zuerst zu, klären die reale Ausgangslage und machen Anforderungen verständlich. Anschließend
          werden die nächsten Schritte gemeinsam umgesetzt, bis Teilnehmende sie zunehmend selbst übernehmen und
          mit einer klaren Struktur weitergehen können.
        </p>
      </Section>

      <CtaSection
        eyebrow="Unsicher, welche Leistung passt?"
        title="Lass uns kurz miteinander sprechen"
        description="Im kostenlosen Erstgespräch klären wir, welches Coachingformat zu deiner Situation passt."
      />
    </>
  );
}
