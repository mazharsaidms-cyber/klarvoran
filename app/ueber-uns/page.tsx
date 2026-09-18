import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { CtaSection } from "@/components/CtaSection";
import { ContextGraphic } from "@/components/ContextGraphic";
import { CoachProfile } from "@/components/CoachProfile";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "KlarVoran verbindet persönliche Begleitung mit klaren Strukturen, damit Menschen berufliche Anforderungen verstehen und selbstständig handeln können.",
  alternates: { canonical: "/ueber-uns" },
};

const values = [
  { title: "Verlässlichkeit", text: "Klare Zielvereinbarungen und Termine, auf die du dich verlassen kannst." },
  { title: "Respekt", text: "Du wirst ernst genommen – unabhängig von deiner Ausgangslage." },
  { title: "Professionalität", text: "Strukturierte Durchführung nach definierten Modulen, vollständig dokumentiert." },
  { title: "Integrationsorientierung", text: "Jeder Schritt zielt auf deine nachhaltige berufliche Perspektive." },
  { title: "Eigenverantwortung", text: "Du entwickelst Lösungen, die du selbst anwenden und weiterführen kannst." },
];

export default function UeberUnsPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/ueber-uns", label: "Über uns" }]} />
      <Section tone="white" className="pt-12">
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
          KlarVoran arbeitet mit klaren Abläufen und verlässlichen Qualitätsstandards. Gegründet und fachlich
          geleitet wird KlarVoran von Mazhar Said. Welche Leistungen, Zuständigkeiten und personellen Ressourcen
          für einen konkreten Auftrag eingesetzt werden, wird vor Beginn verbindlich vereinbart.
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
            <li key={item} className="flex gap-3 rounded-[var(--radius-md)] border border-navy-100 bg-white p-4 text-sm text-navy-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" aria-hidden="true" />
              {item}
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title}>
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
        title="Lerne uns im kostenlosen Erstgespräch kennen"
        description="Ganz unverbindlich klären wir, ob und wie wir dich unterstützen können."
      />
    </>
  );
}
