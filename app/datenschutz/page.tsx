import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata(
  "Datenschutz",
  "Datenschutzerklärung für KlarVoran – Mazhar Said gemäß DSGVO.",
  "/datenschutz",
);

const linkClasses = "underline underline-offset-4 hover:text-red-700";

export default function DatenschutzPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/datenschutz", label: "Datenschutz" }]} />
      <Section tone="white" spacing="hero">
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
              Beim Aufruf verarbeitet Vercel insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite,
              Browser- und Geräteinformationen sowie technische Protokolldaten. Zweck ist die sichere, stabile und
              schnelle Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte
              Interesse liegt im sicheren und zuverlässigen Websitebetrieb.
            </p>
            <p className="mt-3">
              Eine Verarbeitung in den USA kann nicht ausgeschlossen werden. Vercel setzt für entsprechende
              Übermittlungen geeignete Garantien ein, insbesondere Standardvertragsklauseln der Europäischen
              Kommission. Weitere Informationen enthält die{" "}
              <a
                href="https://vercel.com/legal/privacy-notice"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Datenschutzerklärung von Vercel
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">3. Kontakt-, Termin- und AVGS-Schnellcheck-Formulare</h2>
            <p className="mt-3">
              Bei Nutzung eines Formulars verarbeiten wir die eingegebenen Angaben, insbesondere Name,
              E-Mail-Adresse, optional Telefonnummer, Nachricht sowie – je nach Formular – Organisation, Funktion,
              Anfrageart, gewünschter Zeitraum, AVGS-Status, Kostenträger, Anliegen und gewünschte Durchführungsform.
              Die Verarbeitung dient ausschließlich dazu, die Anfrage zu prüfen, zu beantworten und gegebenenfalls
              ein Erstgespräch, eine Leistung oder eine Kooperation vorzubereiten.
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertrag oder eine
              vorvertragliche Maßnahme gerichtet ist. Bei allgemeinen oder institutionellen Anfragen ist
              Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse besteht in der sachgerechten
              Bearbeitung geschäftlicher Anfragen.
            </p>
            <p className="mt-3">
              Name, E-Mail-Adresse, Nachricht und die jeweils als Pflichtfeld gekennzeichneten Angaben werden für
              die Bearbeitung benötigt. Ohne diese Angaben kann die Anfrage nicht über das Formular versendet und
              nicht sachgerecht zugeordnet werden. Eine gesetzliche Pflicht zur Nutzung der Formulare besteht nicht;
              alternativ sind Telefon oder E-Mail möglich.
            </p>
            <p className="mt-3">
              Für den technischen Versand der Formulardaten nutzen wir Plus Five Five, Inc. (Resend), 2261 Market
              Street #5039, San Francisco, CA 94114, USA. Dabei werden die Formulardaten zum Zweck der Übermittlung
              verarbeitet. Resend beschreibt seine Datenschutz- und Übermittlungsmaßnahmen in der{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Datenschutzerklärung von Resend
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">4. Kontakt per E-Mail oder Telefon</h2>
            <p className="mt-3">
              Wenn du uns per E-Mail oder Telefon kontaktierst, verarbeiten wir deine Kontaktdaten und den Inhalt
              der Kommunikation zur Bearbeitung des Anliegens. Je nach Inhalt beruht die Verarbeitung auf Art. 6
              Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse besteht in der
              Beantwortung allgemeiner und geschäftlicher Anfragen. Zusätzlich können Telekommunikations- und
              E-Mail-Anbieter technisch erforderliche Verbindungs- und Zustelldaten verarbeiten.
            </p>
            <p className="mt-3">
              Das E-Mail-Postfach wird über IONOS SE bereitgestellt. Dabei können Absender-, Empfänger-,
              Verbindungs- und Nachrichteninhalte verarbeitet werden. Weitere Informationen enthält die{" "}
              <a
                href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Datenschutzerklärung von IONOS
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">5. Kontakt über WhatsApp</h2>
            <p className="mt-3">
              Die WhatsApp-Schaltflächen auf dieser Website sind reine Links. Beim normalen Seitenaufruf werden
              dadurch keine Daten an WhatsApp übertragen. Erst nach deinem Klick öffnet sich WhatsApp. Wenn du uns
              dort schreibst, verarbeiten wir insbesondere deine Telefonnummer, Profilangaben, Nachrichteninhalte
              und Kommunikationszeitpunkte zur Bearbeitung der Anfrage. Rechtsgrundlage ist – je nach Anliegen –
              Art. 6 Abs. 1 lit. b oder lit. f DSGVO.
            </p>
            <p className="mt-3">
              Für Nutzerinnen und Nutzer in der Europäischen Region wird WhatsApp von WhatsApp Ireland Limited
              bereitgestellt. WhatsApp verarbeitet eigene Konto-, Nutzungs-, Geräte- und Verbindungsdaten und kann
              Daten in Drittländern verarbeiten. Einzelheiten stehen in der{" "}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy-eea"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Datenschutzerklärung von WhatsApp
              </a>
              . Die Nutzung von WhatsApp ist freiwillig; E-Mail, Telefon und Websiteformular stehen als
              Alternativen zur Verfügung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">6. Bitte keine sensiblen Daten über offene Kontaktwege</h2>
            <p className="mt-3">
              Bitte übermittle über Websiteformulare, normale E-Mail oder WhatsApp keine Gesundheitsdaten,
              Diagnosen, vollständigen Bescheide, Ausweisdokumente oder andere besonders sensible Informationen.
              Sollte eine solche Angabe für eine spätere Leistung tatsächlich erforderlich sein, wird vorher ein
              geeigneter Übermittlungsweg und der konkrete Zweck abgestimmt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">7. Empfänger und Drittlandübermittlungen</h2>
            <p className="mt-3">
              Zugriff auf personenbezogene Daten erhalten nur Personen und Dienstleister, die sie zur Bearbeitung
              des jeweiligen Vorgangs benötigen. Mögliche Empfängerkategorien sind Hosting-, E-Mail-,
              Telekommunikations- und Nachrichtendienste sowie – bei rechtlicher Verpflichtung – Behörden oder
              beratende Stellen. Eine Weitergabe zu Werbezwecken findet nicht statt.
            </p>
            <p className="mt-3">
              Bei Dienstleistern mit Sitz oder Infrastruktur außerhalb des Europäischen Wirtschaftsraums können
              Daten in Drittländer gelangen. Soweit erforderlich, stützen sich solche Übermittlungen auf einen
              Angemessenheitsbeschluss oder geeignete Garantien wie EU-Standardvertragsklauseln.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">8. Speicherdauer</h2>
            <p className="mt-3">
              Anfragedaten werden nur so lange gespeichert, wie sie für Bearbeitung, Rückfragen und die Anbahnung
              einer möglichen Leistung erforderlich sind. Maßgebliche Kriterien sind der Abschluss des Anliegens,
              die Dauer einer daraus entstehenden Vertragsbeziehung sowie gesetzliche Nachweis- und
              Aufbewahrungspflichten. Nicht mehr erforderliche Daten werden gelöscht, sofern keine gesetzlichen
              Pflichten oder berechtigten Gründe für eine weitere Aufbewahrung bestehen. Kommt eine geförderte
              Maßnahme zustande, gelten für deren Unterlagen gesonderte gesetzliche und vertragliche
              Dokumentationsfristen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">9. Cookies, Tracking und externe Karten</h2>
            <p className="mt-3">
              Diese Website setzt aktuell keine Analyse- oder Marketing-Cookies und keine Tracking-Dienste ein.
              Google Maps ist nicht eingebettet. Karten-Links öffnen sich erst nach einem bewussten Klick in einem
              neuen Tab; ab diesem Zeitpunkt gelten die Datenschutzbedingungen des jeweiligen Anbieters.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">10. Automatisierte Entscheidungen</h2>
            <p className="mt-3">
              Es findet keine ausschließlich automatisierte Entscheidung einschließlich Profiling im Sinne von
              Art. 22 DSGVO statt. Auch das Ergebnis des AVGS-Schnellchecks ist nur eine unverbindliche Orientierung
              und keine Förder- oder Teilnahmeentscheidung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">11. Deine Rechte und Beschwerdemöglichkeit</h2>
            <p className="mt-3">
              Du hast im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen Verarbeitungen auf Basis
              berechtigter Interessen. Anfragen hierzu können an {siteConfig.contact.email} gerichtet werden.
            </p>
            <p className="mt-3">
              Außerdem besteht das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständig ist
              insbesondere der{" "}
              <a
                href="https://datenschutz.hessen.de/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Hessische Beauftragte für Datenschutz und Informationsfreiheit
              </a>
              .
            </p>
          </section>

          <p className="text-sm text-navy-600">Stand: 20. September 2026</p>
        </div>
      </Section>
    </>
  );
}
