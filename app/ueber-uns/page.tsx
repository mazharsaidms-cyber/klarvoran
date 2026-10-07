import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { CtaSection } from "@/components/CtaSection";
import { ContextGraphic } from "@/components/ContextGraphic";
import { CoachProfile } from "@/components/CoachProfile";
import { VisualIcon } from "@/components/VisualIcon";
import { Button } from "@/components/Button";

export const metadata: Metadata = pageMetadata(
  "Über uns",
  "KlarVoran verbindet persönliche Begleitung mit klaren Strukturen, damit Menschen berufliche Anforderungen verstehen und selbstständig handeln können.",
  "/ueber-uns",
);

const values = [
  { title: "Verständlichkeit", icon: "system" as const, text: "Anforderungen werden so erklärt, dass du sie einordnen und praktisch umsetzen kannst." },
  { title: "Respekt", icon: "respect" as const, text: "Deine Ausgangslage wird ernst genommen, ohne dich auf Schwierigkeiten zu reduzieren." },
  { title: "Eigenverantwortung", icon: "responsibility" as const, text: "Du übernimmst vereinbarte Schritte zunehmend selbst und erkennst deinen Fortschritt." },
  { title: "Dranbleiben", icon: "progress" as const, text: "Rückschläge werden ausgewertet, damit du deine Strategie anpassen und weitergehen kannst." },
];

export default function UeberUnsPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/ueber-uns", label: "Über uns" }]} />
      <Section tone="white" spacing="hero" className="kv-hero">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Über uns</Eyebrow>
            <h1 className="mt-4 max-w-xl text-3xl font-bold text-navy sm:text-4xl">
              Wer hinter KlarVoran steht und wie wir arbeiten
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
              KlarVoran wurde von Mazhar Said gegründet. Unser Schwerpunkt ist berufliche Orientierung und
              Bewerbungscoaching: im Einzelcoaching und in Angeboten für Institutionen. Aufmerksames Zuhören,
              verständliche Erklärungen und praktische Übungen helfen Menschen, zunehmend selbstständig zu handeln.
            </p>
          </div>
          <ContextGraphic
            variant="cooperation"
            title="KlarVoran verbindet persönliche Begleitung mit verlässlichen Strukturen"
          />
        </div>
      </Section>

      <Section id="gruender" tone="white" className="scroll-mt-24">
        <Eyebrow>Gründer &amp; fachliche Leitung</Eyebrow>
        <p className="mt-4 max-w-3xl leading-relaxed text-navy-600">
          Mazhar Said hat KlarVoran gegründet und verantwortet die fachliche Arbeit. Seine Erfahrung im
          Bewerbungsmanagement und Jobcoaching verbindet er mit strukturiertem Arbeiten aus dem Rechts- und
          Notariatsbereich sowie Erfahrung in der Arbeitswelt und im Vertrieb. Im Mittelpunkt stehen verständliche
          Erklärungen, praktische Übungen und klare berufliche Ziele.
        </p>
        <div className="mt-10">
          <CoachProfile />
        </div>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">Qualitätsverständnis</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Was Qualität für uns bedeutet</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Klare Zielvereinbarungen",
            "Strukturierte Durchführung im vereinbarten Rahmen",
            "Vollständige und nachvollziehbare Dokumentation",
            "Überprüfbare Zielschritte",
            "Regelmäßige Überprüfung und Weiterentwicklung unserer Prozesse",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-[var(--radius-md)] border border-navy-100 bg-white p-4 text-sm text-navy-600">
              <span className="shrink-0 text-red-700" aria-hidden="true"><VisualIcon name="quality" /></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-navy-600">
          Zur Qualitätssicherung gehören Teilnehmerfeedback, dokumentierte Prozessprüfungen und festgelegte
          Managementbewertungen. Erkenntnisse werden ausgewertet und in konkrete Verbesserungen überführt. Die
          AVGS-Durchführung orientiert sich am individuellen Unterstützungsbedarf innerhalb der zugelassenen
          Maßnahmestruktur. Bei Workshops und anderen Aufträgen werden Inhalte, Umfang und Dokumentation vorab
          mit der beauftragenden Institution vereinbart.
        </p>
        <Button href="/dokumente/CERTQUA.pdf" external variant="text" className="mt-4">Trägerzulassung ansehen (PDF) →</Button>
      </Section>

      <Section tone="white">
        <Eyebrow>Werte</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Wofür wir stehen</h2>
        <div className="icon-card-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.title}>
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700">
                <VisualIcon name={v.icon} />
              </span>
              <h3 className="font-semibold text-navy">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{v.text}</p>
            </Card>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm italic leading-relaxed text-navy-600">
          Gute Begleitung macht nicht abhängig: Sie schafft Verständnis, stärkt Handlungssicherheit und wird mit
          jedem selbstständig übernommenen Schritt weniger nötig.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-600">
          Wer berufliche Aufgaben selbst bewältigen kann, gewinnt Handlungsspielraum. Damit möchten wir zu
          besseren Zugängen in Arbeit und Ausbildung und zu mehr gesellschaftlicher Teilhabe beitragen.
        </p>
      </Section>

      <CtaSection
        title="KlarVoran im kostenlosen Erstgespräch kennenlernen"
        description="Ganz unverbindlich klären wir, ob und wie wir dich unterstützen können."
        secondaryLabel="Zusammenarbeit als Institution"
        secondaryHref="/fachkraefte-kooperationspartner"
      />
    </>
  );
}
