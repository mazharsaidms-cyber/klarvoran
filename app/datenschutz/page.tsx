import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung für KlarVoran – Mazhar Said gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/datenschutz", label: "Datenschutz" }]} />
      <Section tone="white" className="pt-12">
        <Eyebrow>Datenschutz</Eyebrow>
        <h1 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">Datenschutzerklärung</h1>

        <div className="mt-10 max-w-2xl space-y-10 text-navy-600">
          <section>
            <h2 className="text-xl font-bold text-navy">1. Verantwortlicher</h2>
            <p className="mt-3">
              {siteConfig.legalName}
              <br />
              {siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}
              <br />
              E-Mail: {siteConfig.contact.email} · Telefon: {siteConfig.contact.phoneDisplay}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">2. Hosting und Server-Logfiles</h2>
            <p className="mt-3">
              Diese Website wird bei Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, gehostet.
              Beim Aufruf verarbeitet Vercel technische Zugriffsdaten wie IP-Adresse, Datum und Uhrzeit,
              aufgerufene Seite, Browsertyp und weitere Protokolldaten. Die Verarbeitung ist erforderlich, um die
              Website sicher, stabil und schnell auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO;
              unser berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb der Website.
            </p>
            <p className="mt-3">
              Eine Verarbeitung in den USA kann nicht ausgeschlossen werden. Vercel stellt für entsprechende
              Übermittlungen vertragliche Schutzmaßnahmen bereit, darunter die Standardvertragsklauseln der
              Europäischen Kommission. Weitere Informationen findest du in der{" "}
              <a
                href="https://vercel.com/legal/privacy-notice"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-red-700"
              >
                Datenschutzerklärung von Vercel
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">3. Kontakt-, Termin- und AVGS-Schnellcheck-Formulare</h2>
            <p className="mt-3">
              Wenn du unser Kontaktformular, das Terminanfrage-Formular oder den AVGS-Schnellcheck nutzt,
              verarbeiten wir die von dir angegebenen Daten (z. B. Name, E-Mail-Adresse, optional Telefonnummer,
              deine Angaben zu AVGS-Status und Anliegen) ausschließlich zur Bearbeitung deiner Anfrage (Art. 6 Abs.
              1 lit. b DSGVO – vorvertragliche Maßnahme, bzw. lit. a bei erteilter Einwilligung). Die Formulardaten
              werden dabei über die Server-Infrastruktur von Vercel verarbeitet. Sie werden nicht für Werbezwecke
              genutzt und nur an Dienstleister weitergegeben, soweit dies für die technische Bearbeitung und
              Übermittlung deiner Anfrage erforderlich ist.
            </p>
            <p className="mt-3">
              Soweit der E-Mail-Versand über Resend aktiviert ist, werden die Angaben zum Versand der Anfrage an
              Plus Five Five, Inc. (Resend), 2261 Market Street #5039, San Francisco, CA 94114, USA, übermittelt.
              Resend stellt für Übermittlungen in die USA vertragliche Schutzmaßnahmen einschließlich der
              Standardvertragsklauseln der Europäischen Kommission bereit. Weitere Informationen findest du in der{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-red-700"
              >
                Datenschutzerklärung von Resend
              </a>
              .
            </p>
            <p className="mt-3">
              Wir verzichten bewusst auf die Abfrage sensibler Gesundheits- oder Sozialdaten in diesen Formularen.
              Solche Angaben werden – falls im weiteren Verlauf des Coachings erforderlich – ausschließlich über
              gesonderte, für diesen Zweck vorgesehene und abgesicherte Aufnahmeunterlagen erhoben.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">4. Speicherdauer</h2>
            <p className="mt-3">
              Anfragedaten werden gelöscht, sobald sie für die Bearbeitung deiner Anfrage nicht mehr erforderlich
              sind, spätestens jedoch nach Ablauf gesetzlicher Aufbewahrungsfristen. Kommt eine Coaching-Maßnahme
              zustande, gelten die Dokumentations- und Aufbewahrungspflichten nach AZAV bzw. SGB III.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">5. Keine Cookies, kein Tracking ohne Einwilligung</h2>
            <p className="mt-3">
              Diese Website setzt aktuell keine Analyse- oder Marketing-Cookies und keine Tracking-Dienste ein.
              Sollte künftig ein solcher Dienst hinzukommen, geschieht dies nur nach vorheriger, ausdrücklicher
              Einwilligung über ein Consent-Banner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">6. Externe Links & Karten</h2>
            <p className="mt-3">
              Links zu Google Maps öffnen sich in einem neuen Tab und laden erst nach deinem Klick – es werden
              keine Kartendaten von Google automatisch beim Seitenaufruf nachgeladen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">7. Deine Rechte</h2>
            <p className="mt-3">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung deiner Daten. Zudem hast du das Recht,
              dich bei einer Datenschutzaufsichtsbehörde zu beschweren. Wende dich hierzu an{" "}
              {siteConfig.contact.email}.
            </p>
          </section>

          <p className="text-sm text-navy-600">Stand: September 2026</p>
        </div>
      </Section>
    </>
  );
}
