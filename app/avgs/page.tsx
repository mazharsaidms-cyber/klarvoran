import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FactStat } from "@/components/Card";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AvgsSchnellcheck } from "@/components/AvgsSchnellcheck";
import { FaqStructuredData } from "@/components/StructuredData";
import { CtaSection } from "@/components/CtaSection";
import { CertificateSeal } from "@/components/CertificateSeal";
import { InstitutionDownload } from "@/components/InstitutionDownload";
import { ProcessStepper } from "@/components/ProcessStepper";
import { avgsFaq } from "@/lib/content/faq";
import { processSteps } from "@/lib/content/process";
import { coachingModules, totalUe } from "@/lib/content/modules";
import { siteConfig } from "@/lib/site-config";
import { ContextGraphic } from "@/components/ContextGraphic";
import { VisualSteps, type VisualStep } from "@/components/VisualSteps";
import { VisualIcon, type IconName } from "@/components/VisualIcon";
import { QuickPoints } from "@/components/QuickPoints";

export const metadata: Metadata = {
  title: { absolute: "AVGS-Bewerbungscoaching in Kriftel | KlarVoran" },
  description:
    "AVGS-Jobcoaching in Kriftel für Hofheim, Höchst, Zeilsheim und Frankfurt-West. 1:1, 32 UE. Kostenfrei bei passendem AVGS und bewilligter Teilnahme.",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "AVGS-Bewerbungscoaching in Kriftel | KlarVoran",
    description: "32 UE Einzelcoaching in Kriftel für Hofheim, Höchst, Zeilsheim und Frankfurt-West. Auch online oder hybrid. Kostenfrei bei passendem AVGS und bewilligter Teilnahme.",
    url: "/avgs",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVGS-Bewerbungscoaching in Kriftel | KlarVoran",
    description: "32 UE Einzelcoaching in Kriftel für Hofheim, Höchst, Zeilsheim und Frankfurt-West. Auch online oder hybrid. Kostenfrei bei passendem AVGS und bewilligter Teilnahme.",
  },
  alternates: { canonical: "/avgs" },
};

const guideSteps: VisualStep[] = [
  {
    icon: "calendar",
    title: "Beratungstermin wahrnehmen",
    text: "Gehe zu deinem regulären Beratungstermin bei Jobcenter oder Agentur für Arbeit.",
  },
  {
    icon: "conversation",
    title: "Bedarf aktiv ansprechen",
    text: "Sag konkret, dass du Unterstützung bei Bewerbung, Orientierung oder Vorstellungsgespräch brauchst und begründe, warum individuelles Coaching sinnvoll ist.",
  },
  {
    icon: "document",
    title: "Prüfung & Gutschein",
    text: "Deine Vermittlungsfachkraft prüft, ob ein AVGS in deinem Fall infrage kommt. Wird er ausgestellt, beachte Ziel, Gültigkeit, Dauer und Region.",
  },
  {
    icon: "send",
    title: "Passung & Bewilligung",
    text: "Wir prüfen den AVGS und bestätigen bei Passung die Teilnahmemöglichkeit. Danach entscheidet deine Vermittlungsfachkraft. Beginne erst nach schriftlicher Bewilligung.",
  },
];

const moduleIcons: IconName[] = ["orientation", "document", "laptop", "conversation"];

export default function AvgsPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/avgs", label: "AVGS" }]} />

      {/* Dunkelblauer Einstieg. */}
      <Section tone="navy" spacing="hero" className="kv-hero">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow tone="white">Coaching mit Förderung</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
              Job- und Bewerbungscoaching mit AVGS
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Persönliche Unterstützung bei Orientierung, Bewerbungen und Vorstellungsgesprächen.
            </p>
            <QuickPoints onDark items={[
              { icon: "orientation", label: "Ziel klären" },
              { icon: "document", label: "Bewerbung verbessern" },
              { icon: "conversation", label: "Gespräche üben" },
            ]} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#schnellcheck" onDark>AVGS-Schnellcheck starten</Button>
              <Button href="/termin" onDark variant="secondary">Erstgespräch anfragen</Button>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
              Für die Anfrage brauchst du noch keinen Gutschein. Mit passendem AVGS und schriftlicher Bewilligung vor Beginn übernimmt der Kostenträger die Maßnahmekosten. In Kriftel, online oder hybrid.
            </p>
          </div>
          <ContextGraphic
            variant="application"
            title="Bewerbungsunterlagen gemeinsam sichten und den nächsten Schritt planen"
            className="mx-auto w-full max-w-sm lg:max-w-none"
          />
        </div>
      </Section>

      <Section tone="tint" spacing="compact">
        <h2 className="sr-only">Das AVGS-Coaching auf einen Blick</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <FactStat value="1:1" label="Du und dein Coach" />
          <FactStat value={`${totalUe} UE`} label="Eine Einheit dauert 45 Minuten" />
          <FactStat value="Bis 8 Wochen" label="Bis zu 8 Wochen · in der Regel zwei Termine pro Woche" />
          <FactStat value="0 €" label="Bei passendem AVGS und bewilligter Teilnahme" />
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-navy-600">
          Du brauchst noch keinen Gutschein, um uns anzusprechen. Vor dem Coaching klären wir mit dir,
          ob dein Gutschein passt und die Teilnahme bewilligt ist.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Button href="#inhalte" variant="text">Coachinginhalte ansehen →</Button>
          <Button href="#ablauf" variant="text">Ablauf kennenlernen →</Button>
          <Button href="#ort" variant="text">Ort &amp; Format ansehen →</Button>
        </div>
        <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold text-navy">KlarVoran bei der Arbeitsagentur finden</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-600">
            Du möchtest unser Angebot in KURSNET nachsehen oder mit deiner Vermittlungsfachkraft besprechen?
            Der Link führt direkt zu unserem Eintrag in der Coaching-Suche der Bundesagentur für Arbeit.
          </p>
          <Button href={siteConfig.measure.baHref} external variant="secondary" className="mt-4">
            KlarVoran in KURSNET ansehen
            <span className="sr-only"> (öffnet in einem neuen Tab)</span>
          </Button>
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow tone="navy">Passt das Coaching zu deiner Situation?</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Hier setzt das Einzelcoaching an</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">Du musst dich nicht rechtfertigen. Wir hören zu und arbeiten an dem, was dich gerade aufhält.</p>
        <QuickPoints items={[
          { icon: "orientation", label: "Richtung noch unklar" },
          { icon: "document", label: "Bewerbungen ohne Erfolg" },
          { icon: "signpost", label: "AVGS-Weg unübersichtlich" },
        ]} />
      </Section>

      <Section tone="navy" id="schnellcheck" spacing="compact">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">Schnellcheck &amp; Anfrage</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Dein nächster Schritt – einfach erklärt</h2>
          <p className="mt-3 text-white/80">
            Beantworte ein paar einfache Fragen. Du erhältst eine erste Orientierung und kannst bei Bedarf
            deinen persönlichen Antrag für Jobcenter oder Agentur für Arbeit vorbereiten. Kostenlos und ohne Anmeldung.
          </p>
        </div>
        <div className="mx-auto mt-6 max-w-2xl rounded-[var(--radius-lg)] bg-white p-2 sm:p-4">
          <AvgsSchnellcheck />
        </div>
      </Section>

      <Section tone="white" id="inhalte">
        <Eyebrow>Coachinginhalte</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
          Vier Module – insgesamt {totalUe} Unterrichtseinheiten
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
          Die Inhalte bauen aufeinander auf und werden an deiner beruflichen Ausgangslage praktisch bearbeitet.
        </p>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2">
          {coachingModules.map((module) => (
            <li key={module.id} className="rounded-[var(--radius-md)] border border-navy-100 bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <span className="flex items-center gap-3 font-mono text-sm font-semibold text-red-700">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-red/10" aria-hidden="true">
                    <VisualIcon name={moduleIcons[module.id - 1]} className="h-5 w-5" />
                  </span>
                  Modul {module.id}
                </span>
                <span className="rounded-[var(--radius-full)] bg-navy-50 px-3 py-1 font-mono text-xs font-semibold text-navy">
                  {module.ue} UE
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-navy">{module.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{module.summary}</p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-navy">
                Ergebnis: {module.outcome}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="tint" id="ablauf">
        <Eyebrow>Ablauf</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">So läuft dein Coaching ab</h2>
        <div className="mt-6">
          <ProcessStepper steps={processSteps} />
        </div>
      </Section>

      <Section tone="white" spacing="compact" id="ort">
        <Eyebrow>In deiner Nähe</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
          Jobcoaching für Hofheim, Kriftel und Frankfurt-West
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-navy-600">
          Du kommst aus Hofheim, Kriftel, Frankfurt-Höchst, Frankfurt-Zeilsheim oder der Umgebung?
          Bei KlarVoran erhältst du persönliche Bewerbungshilfe im Main-Taunus-Kreis.
          Das Einzelcoaching findet nach Terminbestätigung in den {siteConfig.presenceLocation.name}, {siteConfig.presenceLocation.street},
          {siteConfig.presenceLocation.zip} {siteConfig.presenceLocation.city} statt. So musst du für einen Präsenztermin nicht in die Frankfurter Innenstadt fahren.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed text-navy-600">
          Online oder hybrid ist ebenfalls möglich. Im kostenlosen Erstgespräch klären wir, welches Format
          zu deiner Situation und den Vorgaben deines AVGS passt.
        </p>
      </Section>

      <Section tone="tint" id="leitfaden">
        <Eyebrow>Leitfaden</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">So beantragst du einen AVGS</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-navy-600">
          Der Schnellcheck hilft dir, deinen Bedarf zu ordnen. Danach kannst du einen persönlichen Antragsentwurf erstellen oder im Erstgespräch Hilfe bekommen. Über den Gutschein entscheidet deine Vermittlungsfachkraft.
        </p>
        <div className="mt-6"><VisualSteps steps={guideSteps} /></div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-navy-600">
          Ein Gutschein allein ist noch kein Startsignal: Das Coaching beginnt erst, wenn der AVGS zu unserem
          Angebot passt und deine Teilnahme vor Beginn schriftlich bewilligt wurde.
        </p>
      </Section>



      {/* Formale Nachweise folgen nach Nutzen, Inhalten und Ablauf. So bleibt
          die Seite für Teilnehmende verständlich und zugleich transparent. */}
      <Section tone="white" spacing="compact">
        <Eyebrow>Zulassung &amp; Zertifizierung</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Zugelassenes Coaching – transparent nachgewiesen</h2>
        <div className="mt-6 max-w-xl">
          <InstitutionDownload kind="participantFlyer" />
        </div>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <CertificateSeal
            seal="traeger"
            caption="Trägerzertifikat – ausgestellt auf Mazhar Said – KlarVoran"
          />
          <CertificateSeal
            seal="massnahme"
            caption="Individuelles Bewerbungscoaching nach § 45 SGB III (Zugelassene Maßnahme nach AZAV)"
          />
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-navy-600">
          Die Maßnahme „Individuelles Bewerbungscoaching“ ist nach § 45 SGB III zugelassen. Bei Vorliegen eines
          passenden AVGS und vor Beginn schriftlich bewilligter Teilnahme werden die Maßnahmekosten vom zuständigen Kostenträger übernommen.
          Die AZAV legt fest, welche Anforderungen Träger und Maßnahmen der Arbeitsförderung erfüllen müssen.
        </p>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">FAQ</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Fragen rund um AZAV &amp; AVGS</h2>
        <div className="mt-6">
          <FaqAccordion items={avgsFaq} />
        </div>
        <FaqStructuredData items={avgsFaq} />
      </Section>

      <CtaSection
        title="Unsicher, ob das auf dich zutrifft?"
        description="Kein Problem – im kostenlosen Erstgespräch schauen wir gemeinsam auf deine Situation."
        secondaryLabel="AVGS-Schnellcheck starten"
        secondaryHref="#schnellcheck"
      />
    </>
  );
}
