import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { CtaSection } from "@/components/CtaSection";
import { siteConfig } from "@/lib/site-config";
import { ContextGraphic } from "@/components/ContextGraphic";

export const metadata: Metadata = {
  title: "Privates Job- und Bewerbungscoaching",
  description:
    "Privates Job- und Bewerbungscoaching bei KlarVoran – individuell vereinbarter Umfang, online, hybrid oder in Präsenz in Kriftel im Rhein-Main-Gebiet.",
  alternates: { canonical: "/leistungen/einzelcoaching" },
};

const steps = [
  {
    title: "Ausgangslage klären",
    text: "Wir hören zunächst zu: Erfahrungen, Ziele, bisherige Bewerbungen und die reale Situation dahinter.",
  },
  {
    title: "Plan statt Standardprogramm",
    text: "Daraus entsteht ein individueller Plan – nur die Themen, die für deinen nächsten Schritt wirklich relevant sind.",
  },
  {
    title: "Gemeinsam umsetzen",
    text: "Unterlagen, Stellensuche, Gesprächstraining oder Orientierung – wir arbeiten die vereinbarten Schritte konkret durch.",
  },
  {
    title: "Selbstständig weitergehen",
    text: "Du gehst mit einer klaren Struktur, eigenen Unterlagen und Werkzeugen weiter, die du selbst anwenden kannst.",
  },
];

export default function EinzelcoachingPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/leistungen", label: "Leistungen" }, { href: "/leistungen/einzelcoaching", label: "1:1-Coaching" }]} />
      <Section tone="navy" className="pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow tone="white">1:1-Coaching · Selbstzahler</Eyebrow>
            <h1 className="mt-4 max-w-xl text-3xl font-bold text-white sm:text-4xl">
              Privates Job- und Bewerbungscoaching – auch ohne AVGS
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Du möchtest deine Bewerbung verbessern, dich beruflich neu orientieren oder ein Gespräch gezielt
              vorbereiten? Im privaten Einzelcoaching legen wir Themen, Umfang und Format passend zu deiner
              Situation fest – unabhängig von Jobcenter, Agentur für Arbeit oder einem Gutschein.
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
              Für alle, die gezielte Unterstützung bei Bewerbung, beruflicher Orientierung oder Vorstellungsgesprächen
              suchen – unabhängig von Jobcenter oder Agentur für Arbeit.
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
              Nach dem kostenlosen Kennenlerngespräch erhältst du vor einer Buchung ein transparentes Angebot mit
              vereinbartem Umfang, Format und Gesamtpreis. Die Anfrage selbst ist unverbindlich.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Ablauf</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">So läuft dein Coaching ab</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-[var(--radius-md)] border border-navy-100 bg-white p-5">
              <span className="font-mono text-sm font-semibold text-red-700">{i + 1}</span>
              <h3 className="mt-1 font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaSection
        eyebrow="Nächster Schritt"
        title="Unverbindliches Kennenlerngespräch vereinbaren"
        description="Wir klären deine Situation, deinen Bedarf und den passenden Umfang – ganz ohne Verpflichtung."
        secondaryLabel="Alle Leistungen ansehen"
        secondaryHref="/leistungen"
      />
    </>
  );
}
