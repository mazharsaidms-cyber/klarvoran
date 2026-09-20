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

// Die Methode in vier Schritten – Symbole laut Kundenvorgabe:
// Gespräch, Wegweiser, Laptop, nächster Schritt.
const methodSteps = [
  {
    title: "Verstanden werden",
    text: "Wir starten mit einem echten Gespräch und klären deine Ausgangslage, deine Ziele und deine Hürden.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 5.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4.2 3.4a.5.5 0 0 1-.8-.4V6.5a1 1 0 0 1 1-1Z" />
        <path d="M8 9.5h8M8 12.5h5" />
      </svg>
    ),
  },
  {
    title: "System verstehen",
    text: "Wir übersetzen Anforderungen und ordnen sie in klare, nachvollziehbare Schritte.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 21V3" />
        <path d="M6 4.5h11l-2.5 3 2.5 3H6" />
        <path d="M6 12.5h8l-2 2.5 2 2.5H6" />
      </svg>
    ),
  },
  {
    title: "Selbst handeln",
    text: "Du passt Unterlagen an, recherchierst Stellen und bereitest Gespräche zunehmend selbst vor.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="5" width="16" height="10" rx="1" />
        <path d="M2.5 18.5h19" />
      </svg>
    ),
  },
  {
    title: "Dranbleiben",
    text: "Du machst Fortschritte sichtbar, wertest Rückschläge aus und passt deinen nächsten Schritt an.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 20h5v-4h5v-4h5V8h3" />
        <path d="M18.5 5.5 21 8l-2.5 2.5" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <ServiceStructuredData />

      {/* Hero: dunkelblauer Einstieg, weiße Überschrift, keine Fototapete. */}
      <Section tone="navy" className="pt-14 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow tone="white">Job- &amp; Bewerbungscoaching · Frankfurt &amp; Rhein-Main</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Klar sehen. Selbstständig handeln. Beruflich vorankommen.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              KlarVoran hilft dir, berufliche Ziele zu klären, Bewerbungen überzeugend umzusetzen und Anforderungen
              von Arbeitgebern und Kostenträgern zu verstehen. Im persönlichen Coaching arbeitest du an konkreten
              nächsten Schritten – so, dass du sie anschließend selbst weiterführen kannst.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
              Persönlich in Kriftel – für Frankfurt, Hofheim und den Main-Taunus-Kreis.
              Alternativ online oder hybrid. Präsenztermine nach Vereinbarung.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="w-full rounded-[var(--radius-lg)] border border-white/15"
            priority
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
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Card>
            <h3 className="font-semibold text-navy">Ausgangslage ordnen</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Wir halten fest, was bereits gelingt, was dich gerade bremst und welches berufliche Ziel realistisch
              ist.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Anforderungen verstehen</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Erwartungen von Arbeitgebern, Jobcenter und digitalen Bewerbungswegen werden in klare Schritte
              übersetzt.
            </p>
          </Card>
          <Card>
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
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Vier Wege. Ein gemeinsamer Anspruch.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Individuelle Unterstützung, Gruppenformate und institutionelle Zusammenarbeit führen über
            unterschiedliche Zugänge zum selben Ziel: berufliche Handlungsfähigkeit.
          </p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leistungen.map((l, i) => (
            <LeistungCard key={l.id} leistung={l} hasMassnahmeBadge={i === 0} />
          ))}
        </ul>
      </Section>

      {/* Die Methode in 4 Schritten: ruhige Lesefläche, echte Icons + HTML-Text. */}
      <Section tone="tint">
        <div className="mb-10">
          <Eyebrow tone="navy">Das KlarVoran-Framework</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
            Verstanden werden. System verstehen. Selbst handeln. Dranbleiben.
          </h2>
          <p className="mt-3 max-w-2xl text-navy-600">
            Nicht nur gemeinsam erledigen. Lernen, es selbst zu können.
          </p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-navy-100 bg-white p-6 shadow-card"
            >
              <span className="text-btn-red" aria-hidden="true">
                {step.icon}
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-navy-600">
                Schritt {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-bold text-navy">{step.title}</h3>
              <p className="text-sm leading-relaxed text-navy-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Zulassungsnachweis nach Angeboten und Methode: wichtig für Vertrauen,
          ohne den Einstieg der Teilnehmenden mit Formalien zu unterbrechen. */}
      <Section tone="white" className="py-12 sm:py-14">
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
