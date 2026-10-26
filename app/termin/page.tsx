import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site-config";
import { VisualIcon } from "@/components/VisualIcon";

export const metadata: Metadata = pageMetadata(
  "Termin & Erstgespräch",
  "Frage dein kostenloses, unverbindliches Erstgespräch bei KlarVoran online, per Formular oder telefonisch an.",
  "/termin",
);

export default function TerminPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/termin", label: "Termin" }]} />
      <Section tone="navy" spacing="hero" className="kv-hero">
        <Eyebrow tone="white">Kostenloses Erstgespräch</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">Kostenloses Erstgespräch anfragen</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Wir klären dein Ziel, mögliche Unterstützung und bei Bedarf den AVGS-Weg. Kostenlos und unverbindlich.
        </p>

        <ol className="mt-7 grid max-w-4xl gap-3 sm:grid-cols-3" aria-label="So kommt dein Erstgespräch zustande">
          {[
            { icon: "send" as const, title: "Anfrage senden" },
            { icon: "phone" as const, title: "Rückmeldung erhalten" },
            { icon: "calendar" as const, title: "Termin bestätigen" },
          ].map((step, index) => (
            <li key={step.title} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
              <span className="font-mono text-white/70" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <VisualIcon name={step.icon} className="h-5 w-5 shrink-0" />
              {step.title}
            </li>
          ))}
        </ol>

        {siteConfig.booking.url && (
          <div className="mt-6 rounded-[var(--radius-md)] border border-navy-100 bg-navy-50 p-6">
            <h2 className="font-semibold text-navy">Direkt online buchen</h2>
            <p className="mt-2 text-sm text-navy-600">Wähle einen freien Termin direkt in unserem Kalender.</p>
            <Button href={siteConfig.booking.url} external className="mt-4">
              Termin im Kalender auswählen
            </Button>
          </div>
        )}

        <div className="mx-auto mt-8 max-w-2xl rounded-[var(--radius-lg)] border border-navy-100 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-navy">Terminanfrage senden</h2>
          <p className="mt-2 text-sm text-navy-600">
            Wir melden uns zur Abstimmung. Verbindlich ist der Termin erst nach unserer Bestätigung.
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
