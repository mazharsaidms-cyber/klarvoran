import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { CtaSection } from "@/components/CtaSection";
import { siteConfig } from "@/lib/site-config";
import { ContextGraphic } from "@/components/ContextGraphic";
import { VisualSteps, type VisualStep } from "@/components/VisualSteps";
import { VisualIcon } from "@/components/VisualIcon";
import { QuickPoints } from "@/components/QuickPoints";

export const metadata: Metadata = pageMetadata(
  "Privates Job- und Bewerbungscoaching",
  "Privates Job- und Bewerbungscoaching bei KlarVoran – individuell vereinbarter Umfang, online, hybrid oder in Präsenz in Kriftel im Rhein-Main-Gebiet.",
  "/leistungen/einzelcoaching",
);

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
      <Section tone="navy" spacing="hero" className="kv-hero">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow tone="white">Privates Job- und Bewerbungscoaching</Eyebrow>
            <h1 className="mt-4 max-w-xl text-3xl font-bold text-white sm:text-4xl">
              Persönliches Coaching für deinen nächsten Schritt
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Wir arbeiten gezielt an deinem Thema. Vor der Buchung erhältst du ein schriftliches Angebot mit Umfang und Gesamtpreis.
            </p>
            <QuickPoints onDark items={[
              { icon: "orientation", label: "Orientierung" },
              { icon: "document", label: "Bewerbung" },
              { icon: "conversation", label: "Gesprächstraining" },
            ]} />
            <Button href="/termin" onDark className="mt-6">Kostenloses Erstgespräch anfragen</Button>
          </div>
          <ContextGraphic
            variant="conversation"
            title="Individuelles Coaching-Gespräch mit verständlichen nächsten Schritten"
          />
        </div>
      </Section>

      <Section tone="tint">
        <div className="text-card-grid grid gap-6 sm:grid-cols-2">
          <Card>
            <h2 className="flex items-center gap-3 text-lg font-bold text-navy"><VisualIcon name="orientation" className="text-red-700" />Für wen?</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Für ein konkretes Bewerbungsthema, eine Entscheidung oder ein bevorstehendes Gespräch – unabhängig von Jobcenter oder Agentur für Arbeit.
            </p>
          </Card>
          <Card>
            <h2 className="flex items-center gap-3 text-lg font-bold text-navy"><VisualIcon name="location" className="text-red-700" />Format</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Online, hybrid oder in Präsenz in der {siteConfig.presenceLocation.street} in{" "}
              {siteConfig.presenceLocation.city}. Anzahl und Länge der Einheiten werden vor der Buchung festgelegt.
            </p>
          </Card>
          <Card>
            <h2 className="flex items-center gap-3 text-lg font-bold text-navy"><VisualIcon name="document" className="text-red-700" />Themen</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Standortbestimmung, Unterlagen, Stellensuche und Gespräche – nach Bedarf.
            </p>
          </Card>
          <Card>
            <h2 className="flex items-center gap-3 text-lg font-bold text-navy"><VisualIcon name="quality" className="text-red-700" />Kosten</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Nach dem kostenlosen Erstgespräch erhältst du ein schriftliches Angebot mit dem vereinbarten Umfang
              und dem vollständigen Gesamtpreis. Kosten entstehen erst, wenn du das Angebot annimmst.
            </p>
          </Card>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-navy-600">
          Förderung zuerst prüfen? Informiere dich über das <a href="/avgs" className="font-semibold underline underline-offset-4">AVGS-Coaching</a>. Ohne Gutschein musst du dich nicht automatisch für private Bezahlung entscheiden.
        </p>
      </Section>

      <Section tone="white">
        <Eyebrow>Ablauf</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">So läuft dein Coaching ab</h2>
        <div className="mt-6"><VisualSteps steps={steps} /></div>
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
