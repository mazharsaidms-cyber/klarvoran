import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site-config";
import { VisualIcon } from "@/components/VisualIcon";

export const metadata: Metadata = pageMetadata(
  "Kontakt",
  "Kontaktiere KlarVoran per Telefon, E-Mail, WhatsApp oder Formular – Rückmeldung in der Regel innerhalb von 1–2 Werktagen.",
  "/kontakt",
);

export default function KontaktPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/kontakt", label: "Kontakt" }]} />
      <Section tone="navy" spacing="hero" className="kv-hero">
        <Eyebrow tone="white">Kontakt</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">So erreichst du KlarVoran</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Du hast eine Frage oder möchtest Unterstützung anfragen? Ruf an, schreib uns oder nutze das Formular.
          Wir melden uns in der Regel innerhalb von 1–2 Werktagen.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[var(--radius-md)] bg-white p-5 text-navy">
            <h2 className="flex items-center gap-2 text-sm font-semibold"><VisualIcon name="phone" className="h-5 w-5" />Telefon</h2>
            <a href={siteConfig.contact.phoneHref} className="mt-3 block font-semibold underline underline-offset-4 hover:text-red-700">{siteConfig.contact.phoneDisplay}</a>
          </div>
          <div className="rounded-[var(--radius-md)] bg-white p-5 text-navy">
            <h2 className="flex items-center gap-2 text-sm font-semibold"><VisualIcon name="mail" className="h-5 w-5" />E-Mail</h2>
            <a href={`mailto:${siteConfig.contact.email}`} className="mt-3 block break-all font-semibold underline underline-offset-4 hover:text-red-700">{siteConfig.contact.email}</a>
          </div>
          <div className="rounded-[var(--radius-md)] bg-white p-5 text-navy">
            <h2 className="flex items-center gap-2 text-sm font-semibold"><VisualIcon name="conversation" className="h-5 w-5" />WhatsApp</h2>
            <Button href={siteConfig.contact.whatsappHref("Hallo! Ich habe eine Frage zu KlarVoran.")} external variant="text" className="mt-2">Nachricht schreiben →</Button>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="#nachricht" onDark variant="secondary">Kontaktformular</Button>
          <Button href="/termin" onDark variant="secondary">Kostenloses Erstgespräch</Button>
          <Button href="/fachkraefte-kooperationspartner#anfrage" onDark variant="secondary">Anfrage als Institution</Button>
        </div>
      </Section>

      <Section tone="tint" id="nachricht">
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow tone="navy">Deine Nachricht</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold text-navy">Was möchtest du klären?</h2>
            <p className="mt-4 leading-relaxed text-navy-600">Schreib kurz, worum es geht. Für die erste Anfrage brauchst du noch keine umfangreichen Unterlagen und keinen AVGS.</p>
            <p className="mt-4 text-sm leading-relaxed text-navy-600">Sie vertreten eine Institution? Nutzen Sie die <a href="/fachkraefte-kooperationspartner#anfrage" className="font-semibold underline underline-offset-4">institutionelle Anfrage</a> für Teilnahmeabstimmung, Zusammenarbeit oder einen Auftrag.</p>
            <p className="mt-4 text-sm leading-relaxed text-navy-600">Du möchtest wissen, wie Coaching mit Förderung funktioniert? <a href="/avgs#schnellcheck" className="font-semibold underline underline-offset-4">Zum AVGS-Schnellcheck</a>.</p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-navy-100 bg-white p-6 sm:p-8"><ContactForm /></div>
        </div>
      </Section>

      <Section tone="white" id="standort">
        <Eyebrow>Standort &amp; Anschrift</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy">Wo findet das Coaching statt?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[var(--radius-md)] border border-navy-100 p-6">
            <h3 className="font-bold text-navy">Coachingstandort Kriftel</h3>
            <p className="mt-3 text-navy-600">{siteConfig.presenceLocation.name}<br />{siteConfig.presenceLocation.street}<br />{siteConfig.presenceLocation.zip} {siteConfig.presenceLocation.city}</p>
            <p className="mt-3 text-sm text-navy-600">{siteConfig.presenceLocation.note} Alternativ online oder hybrid.</p>
            <Button href={`https://www.google.com/maps/search/?api=1&query=${siteConfig.presenceLocation.mapsQuery}`} external variant="text" className="mt-4">Anfahrt zum Coachingstandort →</Button>
          </div>
          <div className="rounded-[var(--radius-md)] border border-navy-100 p-6">
            <h3 className="font-bold text-navy">Geschäfts- und Postanschrift</h3>
            <p className="mt-3 text-navy-600">{siteConfig.address.street}<br />{siteConfig.address.zip} {siteConfig.address.city}</p>
            <p className="mt-3 text-sm font-medium text-navy-600">{siteConfig.address.note}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
