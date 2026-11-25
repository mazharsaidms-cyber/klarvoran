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
  title: { absolute: "AVGS-Bewerbungscoaching Frankfurt & Hofheim | KlarVoran" },
  description:
    "Du suchst ein Bewerbungscoaching mit AVGS für Frankfurt-West oder Hofheim? Kläre mit KlarVoran Förderpassung, Bewerbung und deinen nächsten Schritt.",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "AVGS-Bewerbungscoaching Frankfurt & Hofheim | KlarVoran",
    description: "Bewerbungscoaching mit AVGS für Frankfurt-West und Hofheim. Förderpassung klären und Erstgespräch anfragen.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVGS-Bewerbungscoaching Frankfurt & Hofheim | KlarVoran",
    description: "Bewerbungscoaching mit AVGS für Frankfurt-West und Hofheim. Förderpassung klären und Erstgespräch anfragen.",
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
              <Button href="/avgs#gutschein-vorhanden" onDark>
                AVGS schon erhalten? Hier starten
              </Button>
              <Button href="/fachkraefte-kooperationspartner" variant="secondary" onDark>
                Für Institutionen
              </Button>
            </div>
            <p className="mt-3 text-sm text-white/85">
              Noch keinen Gutschein? <a href="/avgs#schnellcheck" className="font-semibold underline underline-offset-4 hover:text-white">AVGS-Schnellcheck starten</a>
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80">
              Für Hofheim, Kriftel, den Main-Taunus-Kreis, Höchst, Zeilsheim und Frankfurt-West.
              Ob Präsenz, online oder hybrid zu deinem Gutschein passt, klären wir vor der Terminvereinbarung.
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
            <Button href="/avgs" variant="text" className="mt-auto pt-5">AVGS-Coaching ansehen →</Button>
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
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[var(--radius-lg)] bg-navy p-6 text-white shadow-card sm:p-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:p-11">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-white/5" />
          <div className="relative">
            <Eyebrow tone="white">Digital begleitet</Eyebrow>
            <h2 className="mt-4 max-w-lg text-2xl font-bold leading-tight sm:text-3xl">Dein Coaching. Alles im Blick.</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85">
              Auch zwischen den Gesprächen weißt du, was ansteht. Mit persönlichem Zugang für Teilnehmende und Coaches.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold" aria-label="Das kannst du im Teilnehmerbereich tun">
              <li className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-3"><VisualIcon name="calendar" className="shrink-0" />Termine sehen</li>
              <li className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-3"><VisualIcon name="document" className="shrink-0" />Unterlagen teilen</li>
              <li className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-3"><VisualIcon name="conversation" className="shrink-0" />Fragen stellen</li>
            </ul>
            <div className="mt-7 flex flex-col items-start gap-3">
              <Button href="/termin" onDark>Erstgespräch anfragen</Button>
              <Button href="/teilnehmer" variant="text" onDark>Schon dabei? Zum Teilnehmerbereich →</Button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/70">Der persönliche Zugang wird im Coaching eingerichtet.</p>
          </div>
          <div className="relative mx-auto w-full max-w-md" aria-label="Grafische Vorschau ohne persönliche Daten"><ParticipantPreview /></div>
        </div>
      </Section>

      <Section tone="tint" spacing="compact">
        <div className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-navy-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <Eyebrow>So arbeiten wir</Eyebrow>
            <h2 className="mt-3 text-xl font-bold text-navy sm:text-2xl">Verstehen. Üben. Selbst weitergehen.</h2>
            <p className="mt-3 leading-relaxed text-navy-600">Wir ordnen die Ausgangslage, erklären berufliche Anforderungen und üben konkrete Schritte, bis du sie zunehmend selbst übernehmen kannst.</p>
          </div>
          <Button href="/ueber-uns" variant="secondary" className="shrink-0">KlarVoran kennenlernen</Button>
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
