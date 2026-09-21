import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/Section";
import { Button } from "@/components/Button";
import { TrustBar } from "@/components/TrustBar";
import { LeistungCard } from "@/components/LeistungCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaSection } from "@/components/CtaSection";
import { CertificateSeal } from "@/components/CertificateSeal";
import { BrandTransitionNote } from "@/components/BrandTransitionNote";
import { Card } from "@/components/Card";
import { ServiceStructuredData } from "@/components/StructuredData";
import { VisualIcon } from "@/components/VisualIcon";
import { VisualSteps, type VisualStep } from "@/components/VisualSteps";
import { leistungen } from "@/lib/content/leistungen";
import { generalFaq } from "@/lib/content/faq";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Job- & Bewerbungscoaching Rhein-Main | KlarVoran" },
  description:
    "Job- und Bewerbungscoaching in Kriftel für Frankfurt und den Main-Taunus-Kreis. Mit AVGS oder privat, online oder hybrid. Workshops und Kooperationen.",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Job- & Bewerbungscoaching Rhein-Main | KlarVoran",
    description: "Persönliches Coaching in Kriftel für Frankfurt, Hofheim und den Main-Taunus-Kreis – alternativ online oder hybrid.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job- & Bewerbungscoaching Rhein-Main | KlarVoran",
    description: "Persönliches Coaching in Kriftel für Frankfurt, Hofheim und den Main-Taunus-Kreis – alternativ online oder hybrid.",
  },
  alternates: { canonical: "/" },
};

const methodSteps: VisualStep[] = [
  {
    title: "Verstanden werden",
    text: "Wir starten mit einem echten Gespräch und klären deine Ausgangslage, deine Ziele und deine Hürden.",
    icon: "conversation",
  },
  {
    title: "System verstehen",
    text: "Wir übersetzen Anforderungen und ordnen sie in klare, nachvollziehbare Schritte.",
    icon: "signpost",
  },
  {
    title: "Selbst handeln",
    text: "Du passt Unterlagen an, recherchierst Stellen und bereitest Gespräche zunehmend selbst vor.",
    icon: "laptop",
  },
  {
    title: "Dranbleiben",
    text: "Du machst Fortschritte sichtbar, wertest Rückschläge aus und passt deinen nächsten Schritt an.",
    icon: "progress",
  },
];

export default function HomePage() {
  return (
    <>
      <ServiceStructuredData />

      {/* Hero: dunkelblauer Einstieg, weiße Überschrift, keine Fototapete. */}
      <Section tone="navy" spacing="hero" className="kv-hero">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow tone="white">Job- &amp; Bewerbungscoaching · Frankfurt &amp; Rhein-Main</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl">
              <span className="text-logo-red">Klar</span> sehen. Selbstständig handeln. Beruflich{" "}
              <span className="text-logo-red">voran</span>kommen.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              KlarVoran ist ein nach AZAV zugelassener Bildungsträger mit Schwerpunkt auf individuellem Job- und Bewerbungscoaching. Wir begleiten dich auf dem Weg in Arbeit oder Ausbildung: mit beruflicher Orientierung,
              Bewerbungsunterlagen und Gesprächstraining. Du setzt konkrete Schritte um und lernst,
              anschließend selbst weiterzumachen.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
              Persönlich in Kriftel – für Frankfurt, Hofheim und den Main-Taunus-Kreis.
              Alternativ online oder hybrid. Präsenztermine nach Vereinbarung.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/termin" size="lg" onDark>
                Kostenloses Erstgespräch anfragen
              </Button>
              <Button href="/fachkraefte-kooperationspartner" variant="secondary" size="lg" onDark>
                Angebote für Institutionen
              </Button>
            </div>
            <div className="mt-10">
              <TrustBar tone="dark" />
            </div>
          </div>

          <Image
            src="/images/team/cv-durchsicht.jpg"
            alt="Mazhar Said bespricht im Einzelcoaching Bewerbungsunterlagen mit einem Teilnehmer"
            width={1400}
            height={781}
            sizes="(min-width: 1152px) 468px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 40px)"
            className="w-full rounded-[var(--radius-lg)] border border-white/15"
            preload
          />
        </div>
      </Section>

      {/* Die Zielgruppe erkennt zuerst ihre Situation, bevor Angebote und
          formale Nachweise erklärt werden. */}
      <Section tone="tint">
        <div className="max-w-3xl">
          <Eyebrow tone="navy">Wenn gerade der Überblick fehlt</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
            Du musst nicht schon wissen, wie alles weitergeht.
          </h2>
          <p className="mt-4 leading-relaxed text-navy-600">
            Vielleicht fehlt eine klare berufliche Richtung, Bewerbungen führen bisher nicht weiter oder digitale
            und formale Anforderungen wirken unübersichtlich. Wir schauen zuerst, was hinter der Situation steckt,
            und entwickeln daraus einen realistischen nächsten Schritt.
          </p>
        </div>
        <div className="icon-card-grid mt-8 grid gap-5 sm:grid-cols-3">
          <Card>
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700">
              <VisualIcon name="orientation" />
            </span>
            <h3 className="font-semibold text-navy">Ausgangslage ordnen</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Wir halten fest, was bereits gelingt, was dich gerade bremst und welches berufliche Ziel realistisch
              ist.
            </p>
          </Card>
          <Card>
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700">
              <VisualIcon name="system" />
            </span>
            <h3 className="font-semibold text-navy">Anforderungen verstehen</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Erwartungen von Arbeitgebern, Jobcenter und digitalen Bewerbungswegen werden in klare Schritte
              übersetzt.
            </p>
          </Card>
          <Card>
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700">
              <VisualIcon name="action" />
            </span>
            <h3 className="font-semibold text-navy">Ins Handeln kommen</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Wir besprechen nicht nur, was zu tun ist. Der erste passende Schritt wird praktisch umgesetzt und
              anschließend zunehmend selbst übernommen.
            </p>
          </Card>
        </div>
      </Section>

      {/* Leistungen: dunkelblaue Fläche, weiße Zielkarten mit Invert-Hover. */}
      <Section tone="navy">
        <div className="mb-10 text-center">
          <Eyebrow tone="white">Leistungen</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Das passende Angebot für deinen nächsten Schritt</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Einzelcoaching für deine Bewerbung und berufliche Orientierung. Für Einrichtungen und Bildungsträger
            bieten wir außerdem Workshops und klar vereinbarte Coachingaufträge an.
          </p>
        </div>
        <ul className="service-grid grid gap-6 sm:grid-cols-2">
          {leistungen.map((l, i) => (
            <LeistungCard key={l.id} leistung={l} hasMassnahmeBadge={i === 0} />
          ))}
        </ul>
      </Section>

      {/* Die vier Schritte bilden eine durchgehende Lesezeile statt einer weiteren Kartenreihe. */}
      <Section tone="tint">
        <div className="mb-10">
          <Eyebrow tone="navy">Unsere Arbeitsweise</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
            Damit du deinen nächsten Schritt selbst gehen kannst.
          </h2>
          <p className="mt-3 max-w-2xl text-navy-600">
            Nicht nur gemeinsam erledigen. Lernen, es selbst zu können.
          </p>
        </div>
        <VisualSteps steps={methodSteps} />
      </Section>

      {/* Zulassungsnachweis nach Angeboten und Methode: wichtig für Vertrauen,
          ohne den Einstieg der Teilnehmenden mit Formalien zu unterbrechen. */}
      <Section tone="white" spacing="compact">
        <div className="grid items-center gap-10 lg:grid-cols-[260px_1fr]">
          <CertificateSeal
            seal="traeger"
            caption="Trägerzertifikat – ausgestellt auf die bisherige Trägerbezeichnung"
          />
          <div>
            <h2 className="text-xl font-bold text-navy sm:text-2xl">Zulassung transparent erklärt</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-600">
              Das individuelle Bewerbungscoaching ist als Maßnahme nach § 45 SGB III zugelassen. Mit einem
              passenden und bewilligten Aktivierungs- und Vermittlungsgutschein (AVGS) übernimmt der zuständige
              Kostenträger die Kosten vollständig.
            </p>
            <BrandTransitionNote className="mt-3 max-w-2xl" />
            <Button href="/dokumente/CERTQUA.pdf" external variant="text" className="mt-4">
              Zertifikat Trägerzulassung (PDF) →
            </Button>
          </div>
        </div>
      </Section>

      {/* Gründerabschnitt: ruhige weiße Lesefläche. */}
      <Section tone="white">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,220px)_1fr]">
          <div className="mx-auto w-40 sm:w-48 lg:mx-0 lg:w-full">
            <Image
              src={siteConfig.images.badge}
              alt="Mazhar Said"
              width={280}
              height={280}
              className="w-full rounded-[var(--radius-lg)]"
            />
          </div>
          <div>
            <Eyebrow>Gründer &amp; fachliche Leitung</Eyebrow>
            <blockquote className="mt-4 text-xl font-semibold leading-snug text-navy sm:text-2xl">
              „Ich bringe strukturiertes Arbeiten aus dem Rechts- und Notariatsbereich mit pädagogischer Erfahrung zusammen – damit dein
              nächster beruflicher Schritt planbar wird, statt diffus zu bleiben.“
            </blockquote>
            <p className="mt-4 text-sm text-navy-600">Mazhar Said, Gründer von KlarVoran</p>
            <Button href="/ueber-uns#gruender" variant="text" className="mt-5">
              Mehr über Mazhar erfahren →
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <div className="mb-8">
          <Eyebrow tone="navy">FAQ</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Häufige Fragen</h2>
        </div>
        <FaqAccordion items={generalFaq.slice(0, 4)} />
        <Button href="/faq" variant="text" className="mt-6">
          Alle Fragen ansehen →
        </Button>
      </Section>

      <CtaSection
        eyebrow="Nächster Schritt"
        title="Bereit für den ersten Schritt?"
        description="Im kostenlosen, unverbindlichen Erstgespräch klären wir deine Situation – ganz gleich, ob du schon einen AVGS hast oder noch unsicher bist."
      />
    </>
  );
}
