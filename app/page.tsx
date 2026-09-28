import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/Section";
import { Button } from "@/components/Button";
import { TrustBar } from "@/components/TrustBar";
import { LeistungCard } from "@/components/LeistungCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaSection } from "@/components/CtaSection";
import { CertificateSeal } from "@/components/CertificateSeal";
import { Card } from "@/components/Card";
import { ServiceStructuredData } from "@/components/StructuredData";
import { VisualIcon } from "@/components/VisualIcon";
import { VisualSteps, type VisualStep } from "@/components/VisualSteps";
import { ContextGraphic } from "@/components/ContextGraphic";
import { CoachProfile } from "@/components/CoachProfile";
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

const values = [
  { title: "Verständlichkeit", icon: "system" as const, text: "Anforderungen werden so erklärt, dass du sie einordnen und praktisch umsetzen kannst." },
  { title: "Respekt", icon: "respect" as const, text: "Deine Ausgangslage wird ernst genommen, ohne dich auf Schwierigkeiten zu reduzieren." },
  { title: "Eigenverantwortung", icon: "responsibility" as const, text: "Du übernimmst vereinbarte Schritte zunehmend selbst und erkennst deinen Fortschritt." },
  { title: "Dranbleiben", icon: "progress" as const, text: "Rückschläge werden ausgewertet, damit du deine Strategie anpassen und weitergehen kannst." },
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
              <strong className="font-semibold text-white">KlarVoran</strong> ist ein nach § 178 SGB III (AZAV)
              zugelassener Bildungsträger. Unser Schwerpunkt liegt auf individuellem Job- und Bewerbungscoaching,
              das genau auf deine Bedürfnisse abgestimmt ist.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              Wir begleiten dich Schritt für Schritt auf deinem Weg in Arbeit oder Ausbildung. Bei uns lernst du
              nicht nur in der Theorie, sondern setzt direkt konkrete Schritte um – so gewinnst du die Sicherheit,
              um deine berufliche Zukunft anschließend selbstbewusst und eigenständig zu gestalten.
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
            caption="Trägerzertifikat – ausgestellt auf Mazhar Said – KlarVoran"
          />
          <div>
            <h2 className="text-xl font-bold text-navy sm:text-2xl">Zulassung transparent erklärt</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-600">
              Das individuelle Bewerbungscoaching ist als Maßnahme nach § 45 SGB III zugelassen. Mit einem
              passenden und bewilligten Aktivierungs- und Vermittlungsgutschein (AVGS) übernimmt der zuständige
              Kostenträger die Kosten vollständig.
            </p>
            <Button href="/dokumente/CERTQUA.pdf" external variant="text" className="mt-4">
              Zertifikat Trägerzulassung (PDF) →
            </Button>
          </div>
        </div>
      </Section>

      {/* Inhalte der früheren Über-uns-Seite sind hier zusammengeführt. */}
      <Section id="ueber-uns" tone="white" className="scroll-mt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Über KlarVoran</Eyebrow>
            <h2 className="mt-4 max-w-xl text-3xl font-bold text-navy sm:text-4xl">
              Lebenslage verstehen. Berufliche Handlungsfähigkeit aufbauen.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
              KlarVoran verbindet aufmerksames Zuhören mit einer klaren, praktischen Vorgehensweise. Wir helfen dir,
              deine Situation einzuordnen, Anforderungen zu verstehen und konkrete Schritte umzusetzen – bis du
              mit passenden Werkzeugen selbstständig weitergehen kannst.
            </p>
            <p className="mt-5 max-w-xl text-sm italic leading-relaxed text-navy-600">
              Gute Begleitung macht nicht abhängig: Sie schafft Verständnis, stärkt Handlungssicherheit und wird
              mit jedem selbstständig übernommenen Schritt weniger nötig.
            </p>
          </div>
          <ContextGraphic
            variant="cooperation"
            title="KlarVoran verbindet persönliche Begleitung mit verlässlichen Strukturen"
          />
        </div>
      </Section>

      <Section id="gruender" tone="tint" className="scroll-mt-24">
        <Eyebrow tone="navy">Gründer &amp; fachliche Leitung</Eyebrow>
        <p className="mt-4 max-w-3xl leading-relaxed text-navy-600">
          Mazhar Said hat KlarVoran gegründet und verantwortet die fachliche Arbeit. Sein Profil verbindet Erfahrung
          im Bewerbungsmanagement und Jobcoaching mit strukturiertem Arbeiten aus dem Rechts- und Notariatsbereich,
          pädagogischer Praxis sowie einem Verständnis für Arbeitswelt und Vertrieb.
        </p>
        <div className="mt-8">
          <CoachProfile />
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Qualitätsverständnis</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Was Qualität für uns bedeutet</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Klare Zielvereinbarungen",
            "Strukturierte Durchführung nach definierten Modulen",
            "Vollständige und nachvollziehbare Dokumentation",
            "Überprüfbare Zielschritte",
            "Regelmäßige Überprüfung und Weiterentwicklung unserer Prozesse",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-[var(--radius-md)] border border-navy-100 bg-navy-50 p-4 text-sm text-navy-600">
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

      <Section tone="tint">
        <Eyebrow tone="navy">Werte</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Wofür wir stehen</h2>
        <div className="icon-card-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title}>
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700">
                <VisualIcon name={value.icon} />
              </span>
              <h3 className="font-semibold text-navy">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{value.text}</p>
            </Card>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-navy-600">
          Wer berufliche Aufgaben selbst bewältigen kann, gewinnt Handlungsspielraum. Damit möchten wir zu besseren
          Zugängen in Arbeit und Ausbildung und zu mehr gesellschaftlicher Teilhabe beitragen.
        </p>
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
