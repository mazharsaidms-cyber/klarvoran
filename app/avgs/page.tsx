import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AvgsSchnellcheck } from "@/components/AvgsSchnellcheck";
import { FaqStructuredData } from "@/components/StructuredData";
import { CtaSection } from "@/components/CtaSection";
import { CertificateSeal } from "@/components/CertificateSeal";
import { ProcessStepper } from "@/components/ProcessStepper";
import { avgsFaq } from "@/lib/content/faq";
import { processSteps } from "@/lib/content/process";
import { coachingModules, totalUe } from "@/lib/content/modules";
import { BrandTransitionNote } from "@/components/BrandTransitionNote";

export const metadata: Metadata = {
  title: "Job- und Bewerbungscoaching mit AVGS",
  description:
    "Was ist ein AVGS, was ist AZAV, wer bekommt einen Gutschein und wie läuft die Beantragung ab? Plus AVGS-Schnellcheck für eine erste Einschätzung.",
  alternates: { canonical: "/avgs" },
};

const guideSteps = [
  {
    title: "1. Beratungstermin wahrnehmen",
    text: "Gehe zu deinem regulären Beratungstermin bei Jobcenter oder Agentur für Arbeit.",
  },
  {
    title: "2. Bedarf aktiv ansprechen",
    text: "Sag konkret, dass du Unterstützung bei Bewerbung, Orientierung oder Vorstellungsgespräch brauchst und begründe, warum individuelles Coaching sinnvoll ist.",
  },
  {
    title: "3. Gutschein erhalten",
    text: "Ist deine Vermittlungsfachkraft einverstanden, erhältst du einen AVGS mit Gültigkeitsdauer, Förderziel und Kostenträger.",
  },
  {
    title: "4. Gutschein bei uns einreichen",
    text: "Bring deinen Gutschein zu KlarVoran – wir prüfen ihn unverbindlich im kostenlosen Erstgespräch.",
  },
];

export default function AvgsPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/avgs", label: "AVGS" }]} />

      {/* Dunkelblauer Einstieg. */}
      <Section tone="navy" className="pt-12">
        <Eyebrow tone="white">AVGS &amp; AZAV</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
          Job- und Bewerbungscoaching mit AVGS
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Mit einem bewilligten Aktivierungs- und Vermittlungsgutschein (AVGS) von Jobcenter oder Agentur für Arbeit
          kannst du am individuellen Coaching teilnehmen, ohne die Kosten selbst zu tragen. Du lernst, berufliche
          Anforderungen zu verstehen, Bewerbungen praktisch umzusetzen und die nächsten Schritte selbstständig
          weiterzuführen.
        </p>
      </Section>

      {/* Der kurze Schnellcheck steht direkt nach dem Einstieg, damit
          Interessierte ohne Umweg eine erste Orientierung erhalten. */}
      <Section tone="navy" id="schnellcheck">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">AVGS-Schnellcheck</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Wo stehst du gerade?</h2>
          <p className="mt-3 text-white/80">
            Drei kurze Schritte für eine erste, unverbindliche Einschätzung – keine Anspruchszusage, sondern
            Orientierung für dein Gespräch mit uns.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl rounded-[var(--radius-lg)] bg-white p-2 sm:p-4">
          <AvgsSchnellcheck />
        </div>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">Passt das Coaching zu deiner Situation?</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Hier setzt das Einzelcoaching an</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Card>
            <h3 className="text-lg font-bold text-navy">Wenn dir Orientierung oder Struktur fehlt</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Das Coaching unterstützt dich bei beruflicher Orientierung, Bewerbungsunterlagen, Stellensuche und
              Vorstellungsgesprächen. Gemeinsam klären wir, wo du stehst und welcher nächste Schritt realistisch ist.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-navy">Damit du später selbst weiterkommst</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Du sollst Anforderungen nicht nur erklärt bekommen. Du übst konkrete Schritte, erkennst deine
              Fortschritte und lernst, Bewerbungsaufgaben zunehmend selbst zu übernehmen und bei Rückschlägen
              weiterzumachen.
            </p>
          </Card>
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
        <ol className="mt-8 grid gap-5 sm:grid-cols-2">
          {coachingModules.map((module) => (
            <li key={module.id} className="rounded-[var(--radius-md)] border border-navy-100 bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-sm font-semibold text-red-700">Modul {module.id}</span>
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

      {/* Integrierter Ablauf: 5-stufiger Prozess direkt hier, keine eigene Ablauf-Seite. */}
      <Section tone="tint" id="ablauf">
        <Eyebrow>Ablauf</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">So läuft dein Coaching ab</h2>
        <div className="mt-8">
          <ProcessStepper steps={processSteps} />
        </div>
      </Section>

      <Section tone="white" id="leitfaden">
        <Eyebrow>Leitfaden</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">So beantragst du einen AVGS</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2">
          {guideSteps.map((step) => (
            <li key={step.title} className="rounded-[var(--radius-md)] border border-navy-100 bg-white p-5">
              <h3 className="font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Formale Nachweise folgen nach Nutzen, Inhalten und Ablauf. So bleibt
          die Seite für Teilnehmende verständlich und zugleich transparent. */}
      <Section tone="white" className="py-12 sm:py-14">
        <Eyebrow>Zulassung &amp; Zertifizierung</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Zugelassenes Coaching – transparent nachgewiesen</h2>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <CertificateSeal
            seal="traeger"
            caption="Trägerzertifikat – ausgestellt auf die bisherige Trägerbezeichnung"
          />
          <CertificateSeal
            seal="massnahme"
            caption="Individuelles Bewerbungscoaching nach § 45 SGB III (Zugelassene Maßnahme nach AZAV)"
          />
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-navy-600">
          Die Maßnahme „Individuelles Bewerbungscoaching“ ist nach § 45 SGB III zugelassen. Bei Vorliegen eines
          passenden und bewilligten AVGS werden die Kosten vom zuständigen Kostenträger vollständig übernommen.
          Die AZAV legt fest, welche Anforderungen Träger und Maßnahmen der Arbeitsförderung erfüllen müssen.
        </p>
        <BrandTransitionNote className="mt-3 max-w-2xl" />
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">FAQ</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Fragen rund um AZAV &amp; AVGS</h2>
        <div className="mt-8">
          <FaqAccordion items={avgsFaq} />
        </div>
        <FaqStructuredData items={avgsFaq} />
      </Section>

      <CtaSection
        title="Unsicher, ob das auf dich zutrifft?"
        description="Kein Problem – im kostenlosen Erstgespräch schauen wir gemeinsam auf deine Situation."
      />
    </>
  );
}
