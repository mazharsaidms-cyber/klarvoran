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
  "Häufige Fragen (FAQ)",
  "Antworten auf die häufigsten Fragen zu AVGS-Coaching, Kosten, Ablauf und Zulassung von KlarVoran.",
  "/faq",
);

const allFaq = [...generalFaq, ...avgsFaq, ...institutionFaq];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/faq", label: "FAQ" }]} />
      <Section tone="white" spacing="hero" className="kv-hero">
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-navy sm:text-4xl">Häufige Fragen</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-600">
          Die Antworten auf die Fragen, die uns am häufigsten erreichen. Ist deine Frage nicht dabei? Schreib uns
          einfach.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Button href="#coaching" variant="text">Coaching &amp; Kosten</Button>
          <Button href="#foerderung" variant="text">AVGS &amp; Förderung</Button>
          <Button href="#institutionen" variant="text">Für Institutionen</Button>
        </div>
        <div id="coaching" className="mt-8 max-w-3xl scroll-mt-32">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">Coaching, Kosten und Ablauf</h2>
          <div className="mt-5">
            <FaqAccordion items={generalFaq} />
          </div>
        </div>
        <div id="foerderung" className="mt-10 max-w-3xl scroll-mt-32">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">AVGS und Zulassung</h2>
          <div className="mt-5">
            <FaqAccordion items={avgsFaq} />
          </div>
          <div className="mt-6"><AvgsCheckEntry /></div>
        </div>
        <div id="institutionen" className="mt-10 max-w-3xl scroll-mt-32">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">Zusammenarbeit mit Institutionen</h2>
          <div className="mt-5"><FaqAccordion items={institutionFaq} /></div>
        </div>
        <FaqStructuredData items={allFaq} />
      </Section>

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
