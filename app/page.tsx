import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/Section";
import { Button } from "@/components/Button";
import { TrustBar } from "@/components/TrustBar";
import { CtaSection } from "@/components/CtaSection";
import { Card } from "@/components/Card";
import { ServiceStructuredData } from "@/components/StructuredData";
import { VisualIcon } from "@/components/VisualIcon";
import { ParticipantPreview } from "@/components/ParticipantPreview";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Jobcoaching Hofheim & Frankfurt-West | KlarVoran" },
  description:
    "Jobcoaching für Hofheim und Frankfurt-West: 1:1 in Kriftel, online oder hybrid. AVGS-Bewerbungshilfe und Angebote für Institutionen.",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Jobcoaching Hofheim & Frankfurt-West | KlarVoran",
    description: "Persönliches Coaching in Kriftel für Hofheim, Höchst, Zeilsheim und den Main-Taunus-Kreis – alternativ online oder hybrid.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobcoaching Hofheim & Frankfurt-West | KlarVoran",
    description: "Persönliches Coaching in Kriftel für Hofheim, Höchst, Zeilsheim und den Main-Taunus-Kreis – alternativ online oder hybrid.",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <ServiceStructuredData />

      <Section tone="navy" spacing="hero" className="kv-hero kv-home-hero">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow tone="white">Job- &amp; Bewerbungscoaching · Frankfurt-West &amp; Main-Taunus-Kreis</Eyebrow>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
              <span className="text-logo-red">Klar</span> sehen. Selbstständig handeln. Beruflich{" "}
              <span className="text-logo-red">voran</span>kommen.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Du suchst Arbeit oder eine Ausbildung? Wir finden gemeinsam deinen nächsten Schritt.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="/leistungen#coaching" onDark>
                Ich suche Coaching
              </Button>
              <Button href="/fachkraefte-kooperationspartner" variant="secondary" onDark>
                Für Institutionen
              </Button>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80">
              Persönlich in Kriftel – für Hofheim und den Main-Taunus-Kreis sowie Höchst, Zeilsheim
              und den Frankfurter Westen. Auch online oder hybrid. Präsenztermine nach Vereinbarung.
            </p>
            <div className="mt-5">
              <TrustBar tone="dark" />
            </div>
          </div>

          <Image
            src="/images/team/cv-durchsicht.jpg"
            alt="Mazhar Said bespricht im Einzelcoaching Bewerbungsunterlagen mit einem Teilnehmer"
            width={1400}
            height={781}
            sizes="(min-width: 1152px) 468px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 40px)"
            className="kv-home-photo w-full rounded-[var(--radius-lg)] border border-white/15"
            preload
          />
        </div>
      </Section>

      <Section tone="tint">
        <div className="max-w-2xl">
          <Eyebrow tone="navy">Dein Weg zu KlarVoran</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
            Welcher Weg passt zu deiner Anfrage?
          </h2>
          <p className="mt-4 leading-relaxed text-navy-600">
            Ob du selbst den nächsten beruflichen Schritt angehen möchtest oder für eine Einrichtung anfragst: Wähle den passenden Einstieg.
          </p>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card className="flex flex-col items-start">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700">
              <VisualIcon name="orientation" />
            </span>
            <h3 className="text-xl font-bold text-navy">Ich suche Coaching</h3>
            <p className="mt-3 leading-relaxed text-navy-600">
              Für Bewerbung, Ausbildung oder berufliche Orientierung – mit AVGS oder als privates Coaching.
            </p>
            <Button href="/leistungen#coaching" variant="text" className="mt-auto pt-5">Angebote für mich ansehen →</Button>
          </Card>
          <Card className="flex flex-col items-start">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700">
              <VisualIcon name="provider" />
            </span>
            <h3 className="text-xl font-bold text-navy">Wir vertreten eine Institution</h3>
            <p className="mt-3 leading-relaxed text-navy-600">
              Für Gutscheinabstimmung, Workshops oder eine Zusammenarbeit mit klaren Zuständigkeiten und Nachweisen.
            </p>
            <Button href="/fachkraefte-kooperationspartner" variant="text" className="mt-auto pt-5">Bereich für Institutionen öffnen →</Button>
          </Card>
        </div>
      </Section>

      <Section tone="white" spacing="compact">
        <div className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-navy-100 bg-navy-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <Eyebrow>So arbeiten wir</Eyebrow>
            <h2 className="mt-3 text-xl font-bold text-navy sm:text-2xl">Verstehen. Üben. Selbst weitergehen.</h2>
            <p className="mt-3 leading-relaxed text-navy-600">Wir ordnen die Ausgangslage, erklären berufliche Anforderungen und üben konkrete Schritte, bis du sie zunehmend selbst übernehmen kannst.</p>
          </div>
          <Button href="/ueber-uns" variant="secondary" className="shrink-0">KlarVoran kennenlernen</Button>
        </div>
      </Section>

      <Section tone="tint" spacing="compact">
        <div className="grid items-center gap-6 rounded-[var(--radius-lg)] border border-navy-100 bg-white p-5 shadow-card sm:p-7 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <Eyebrow>Für bestehende Teilnehmende</Eyebrow>
            <h2 className="mt-3 text-xl font-bold text-navy sm:text-2xl">Dein Teilnehmerbereich</h2>
            <p className="mt-3 max-w-lg leading-relaxed text-navy-600">Termine, Unterlagen und Nachrichten an einem Ort – für Teilnehmende mit Einladung.</p>
            <Button href="/teilnehmer" className="mt-5">Teilnehmerbereich öffnen</Button>
          </div>
          <div className="mx-auto w-full max-w-sm" aria-label="Grafische Vorschau ohne persönliche Daten"><ParticipantPreview /></div>
        </div>
      </Section>

      <CtaSection
        eyebrow="Nächster Schritt"
        title="Bereit für den ersten Schritt?"
        description="Im kostenlosen, unverbindlichen Erstgespräch klären wir deine Situation – ganz gleich, ob du schon einen AVGS hast oder noch unsicher bist."
        secondaryLabel="Für Institutionen"
        secondaryHref="/fachkraefte-kooperationspartner"
      />
    </>
  );
}
