import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { CtaSection } from "@/components/CtaSection";
import { ContextGraphic } from "@/components/ContextGraphic";
import { CoachProfile } from "@/components/CoachProfile";
import { VisualIcon } from "@/components/VisualIcon";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "KlarVoran verbindet persönliche Begleitung mit klaren Strukturen, damit Menschen berufliche Anforderungen verstehen und selbstständig handeln können.",
  alternates: { canonical: "/ueber-uns" },
};

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
      <Section tone="white" className="kv-hero pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Über uns</Eyebrow>
            <h1 className="mt-4 max-w-xl text-3xl font-bold text-navy sm:text-4xl">
              Lebenslage verstehen. Berufliche Handlungsfähigkeit aufbauen.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
              KlarVoran verbindet aufmerksames Zuhören mit einer klaren, praktischen Vorgehensweise. Wir helfen dir,
              deine Situation einzuordnen, Anforderungen zu verstehen und konkrete Schritte umzusetzen – bis du
              mit passenden Werkzeugen selbstständig weitergehen kannst.
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
          KlarVoran verbindet lebensweltnahe Ansprache, arbeitsmarktbezogene Fachlichkeit und klare
          Qualitätsstandards in einem eigenen Framework. Gegründet und fachlich geleitet von Mazhar Said – aus der
          Praxis entwickelt und in einer verbindlichen Methodik systematisiert.
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
            "Strukturierte Durchführung nach definierten Modulen",
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
          Durchführung orientiert sich am individuellen Unterstützungsbedarf innerhalb der zugelassenen
          Maßnahmestruktur und bleibt gegenüber Kostenträgern nachvollziehbar dokumentiert.
        </p>
      </Section>

      <Section tone="white">
        <Eyebrow>Werte</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Wofür wir stehen</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
      </Section>

      <CtaSection
        title="KlarVoran im kostenlosen Erstgespräch kennenlernen"
        description="Ganz unverbindlich klären wir, ob und wie wir dich unterstützen können."
      />
    </>
  );
}
