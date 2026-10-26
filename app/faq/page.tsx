import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqStructuredData } from "@/components/StructuredData";
import { CtaSection } from "@/components/CtaSection";
import { AvgsCheckEntry } from "@/components/AvgsCheckEntry";
import { Button } from "@/components/Button";
import { generalFaq, avgsFaq, institutionFaq } from "@/lib/content/faq";

export const metadata: Metadata = pageMetadata(
  "AVGS-Coaching: Häufige Fragen",
  "Fragen zu AVGS, Kosten, Ablauf und Zulassung: KlarVoran erklärt das Bewerbungscoaching in Kriftel für Frankfurt und den Main-Taunus-Kreis.",
  "/faq",
);

const allFaq = [...generalFaq, ...avgsFaq, ...institutionFaq];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/faq", label: "FAQ" }]} />
      <Section tone="navy" spacing="hero" className="kv-hero">
        <Eyebrow tone="white">FAQ</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">Häufige Fragen</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Finde schnell die Antwort zu Coaching, AVGS oder Zusammenarbeit. Deine Frage fehlt? Schreib uns.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="#coaching" variant="secondary" onDark>Coaching &amp; Kosten</Button>
          <Button href="#foerderung" variant="secondary" onDark>AVGS &amp; Förderung</Button>
          <Button href="#institutionen" variant="secondary" onDark>Für Institutionen</Button>
        </div>
      </Section>

      <Section tone="tint" id="coaching">
        <div className="max-w-3xl">
          <Eyebrow tone="navy">Für dich</Eyebrow>
          <h2 className="mt-3 text-xl font-bold text-navy sm:text-2xl">Coaching, Kosten und Ablauf</h2>
          <div className="mt-5">
            <FaqAccordion items={generalFaq} />
          </div>
        </div>
      </Section>

      <Section tone="white" id="foerderung">
        <div className="max-w-3xl">
          <Eyebrow>Förderung</Eyebrow>
          <h2 className="mt-3 text-xl font-bold text-navy sm:text-2xl">AVGS und Zulassung</h2>
          <div className="mt-5">
            <FaqAccordion items={avgsFaq} />
          </div>
          <div className="mt-6"><AvgsCheckEntry /></div>
        </div>
      </Section>

      <Section tone="tint" id="institutionen">
        <div className="max-w-3xl">
          <Eyebrow tone="navy">Für Auftraggeber</Eyebrow>
          <h2 className="mt-3 text-xl font-bold text-navy sm:text-2xl">Zusammenarbeit mit Institutionen</h2>
          <div className="mt-5"><FaqAccordion items={institutionFaq} /></div>
        </div>
      </Section>
      <FaqStructuredData items={allFaq} />

      <CtaSection
        title="Deine Frage war nicht dabei?"
        description="Kein Problem – kontaktiere uns direkt, wir antworten persönlich."
        primaryLabel="Zur Kontaktseite"
        primaryHref="/kontakt"
        secondaryLabel="Institutionelle Anfrage"
        secondaryHref="/fachkraefte-kooperationspartner#anfrage"
      />
    </>
  );
}
