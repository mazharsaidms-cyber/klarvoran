import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { CtaSection } from "@/components/CtaSection";
import { siteConfig } from "@/lib/site-config";
import { ContextGraphic } from "@/components/ContextGraphic";
import { VisualSteps, type VisualStep } from "@/components/VisualSteps";

export const metadata: Metadata = {
  title: "Privates Job- und Bewerbungscoaching",
  description:
    "Privates Job- und Bewerbungscoaching bei KlarVoran – individuell vereinbarter Umfang, online, hybrid oder in Präsenz in Kriftel im Rhein-Main-Gebiet.",
  alternates: { canonical: "/leistungen/einzelcoaching" },
};

const steps: VisualStep[] = [
  {
    icon: "conversation",
    title: "Ausgangslage klären",
    text: "Wir hören zunächst zu: Erfahrungen, Ziele, bisherige Bewerbungen und die reale Situation dahinter.",
  },
  {
    icon: "signpost",
    title: "Schwerpunkte festlegen",
    text: "Daraus entsteht ein klarer Plan mit den Themen, die für deinen nächsten beruflichen Schritt wirklich relevant sind.",
  },
  {
    icon: "laptop",
    title: "Gemeinsam umsetzen",
    text: "Unterlagen, Stellensuche, Gesprächstraining oder Orientierung – wir arbeiten die vereinbarten Schritte konkret durch.",
  },
  {
    icon: "progress",
    title: "Selbst handeln und dranbleiben",
    text: "Du gehst mit einer klaren Struktur und Werkzeugen weiter, die du selbst anwenden und bei Rückschlägen anpassen kannst.",
  },
];

export default function EinzelcoachingPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/leistungen", label: "Leistungen" }, { href: "/leistungen/einzelcoaching", label: "Privates Coaching" }]} />
      <Section tone="navy" className="kv-hero pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow tone="white">Privates Job- und Bewerbungscoaching</Eyebrow>
            <h1 className="mt-4 max-w-xl text-3xl font-bold text-white sm:text-4xl">
              Privates Job- und Bewerbungscoaching für deinen konkreten nächsten Schritt
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Du brauchst gezielte Unterstützung bei deiner Bewerbung, beruflichen Orientierung oder der
              Vorbereitung auf ein Vorstellungsgespräch? Im privaten Einzelcoaching vereinbaren wir genau die
              Themen, die du jetzt brauchst. Vor der Buchung erhältst du ein schriftliches Angebot mit Umfang und
              Gesamtpreis.
            </p>
          </div>
          <ContextGraphic
            variant="conversation"
            title="Individuelles Coaching-Gespräch mit verständlichen nächsten Schritten"
          />
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <h2 className="text-lg font-bold text-navy">Für wen?</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Für Menschen, die ein konkretes Bewerbungsthema, eine berufliche Entscheidung oder ein bevorstehendes
              Vorstellungsgespräch gezielt bearbeiten möchten – unabhängig von Jobcenter oder Agentur für Arbeit.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-navy">Format</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Online, hybrid oder in Präsenz in der {siteConfig.presenceLocation.street} in{" "}
              {siteConfig.presenceLocation.city}. Anzahl und Länge der Einheiten werden vor der Buchung festgelegt.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-navy">Themen</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Standortbestimmung, Bewerbungsunterlagen, Stellensuche oder Vorstellungsgespräch – einzeln oder als
              zusammenhängendes Programm.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-navy">Kosten</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Nach dem kostenlosen Erstgespräch erhältst du ein schriftliches Angebot mit dem vereinbarten Umfang
              und dem vollständigen Gesamtpreis. Kosten entstehen erst, wenn du das Angebot annimmst.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Ablauf</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">So läuft dein Coaching ab</h2>
        <div className="mt-8"><VisualSteps steps={steps} /></div>
      </Section>

      <CtaSection
        eyebrow="Nächster Schritt"
        title="Kostenloses Erstgespräch anfragen"
        description="Wir klären deine Situation, deinen Bedarf und den passenden Umfang – ganz ohne Verpflichtung."
        secondaryLabel="Alle Leistungen ansehen"
        secondaryHref="/leistungen"
      />
    </>
  );
}
