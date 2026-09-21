import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqStructuredData } from "@/components/StructuredData";
import { CtaSection } from "@/components/CtaSection";
import { generalFaq, avgsFaq } from "@/lib/content/faq";

export const metadata: Metadata = pageMetadata(
  "Häufige Fragen (FAQ)",
  "Antworten auf die häufigsten Fragen zu AVGS-Coaching, Kosten, Ablauf und Zulassung von KlarVoran.",
  "/faq",
);

const allFaq = [...generalFaq, ...avgsFaq];

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
        <div className="mt-10 max-w-3xl">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">Coaching, Kosten und Ablauf</h2>
          <div className="mt-5">
            <FaqAccordion items={generalFaq} />
          </div>
        </div>
        <div className="mt-12 max-w-3xl">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">AVGS und Zulassung</h2>
          <div className="mt-5">
            <FaqAccordion items={avgsFaq} />
          </div>
        </div>
        <FaqStructuredData items={allFaq} />
      </Section>

      <CtaSection
        title="Deine Frage war nicht dabei?"
        description="Kein Problem – kontaktiere uns direkt, wir antworten persönlich."
        primaryLabel="Zur Kontaktseite"
        primaryHref="/kontakt"
      />
    </>
  );
}
