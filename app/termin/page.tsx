import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termin & Erstgespräch",
  description: "Frage dein kostenloses, unverbindliches Erstgespräch bei KlarVoran online, per Formular oder telefonisch an.",
  alternates: { canonical: "/termin" },
};

export default function TerminPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/termin", label: "Termin" }]} />
      <Section tone="navy" className="pt-12">
        <Eyebrow tone="white">Kostenloses Erstgespräch</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">Kostenloses Erstgespräch anfragen</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Im kostenlosen, unverbindlichen Erstgespräch klären wir deine Situation, deinen AVGS-Status und die
          nächsten Schritte. Nach deiner Anfrage melden wir uns persönlich bei dir, um einen passenden Termin zu
          finden.
        </p>

        {siteConfig.booking.url && (
          <div className="mt-8 rounded-[var(--radius-md)] border border-navy-100 bg-navy-50 p-6">
            <h2 className="font-semibold text-navy">Direkt online buchen</h2>
            <p className="mt-2 text-sm text-navy-600">Wähle einen freien Termin direkt in unserem Kalender.</p>
            <Button href={siteConfig.booking.url} external className="mt-4">
              Termin im Kalender auswählen
            </Button>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-2xl rounded-[var(--radius-lg)] border border-navy-100 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-navy">Terminanfrage senden</h2>
          <p className="mt-2 text-sm text-navy-600">
            Wir melden uns in der Regel innerhalb von 1–2 Werktagen, um einen konkreten Termin zu vereinbaren.
          </p>
          <div className="mt-6">
            <AppointmentForm />
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-white/80">
          Du möchtest lieber direkt sprechen? Ruf uns an unter{" "}
          <a href={siteConfig.contact.phoneHref} className="font-semibold text-white underline underline-offset-2">
            {siteConfig.contact.phoneDisplay}
          </a>{" "}
          oder schreib uns per{" "}
          <a href={siteConfig.contact.whatsappHref()} className="font-semibold text-white underline underline-offset-2">
            WhatsApp
          </a>
          .
        </p>
      </Section>
    </>
  );
}
