import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import { VisualIcon } from "@/components/VisualIcon";
import { VisualSteps, type VisualStep } from "@/components/VisualSteps";

export const metadata: Metadata = pageMetadata(
  "Workshops für Bewerbung und berufliche Orientierung",
  "Praxisnahe Workshops und Gruppenformate von KlarVoran zu Bewerbung, beruflicher Orientierung und digitaler Kompetenz – für Einrichtungen, Bildungsträger und Unternehmen.",
  "/leistungen/workshops",
);

const themen = [
  {
    icon: "document" as const,
    title: "Bewerbungstraining",
    text: "Lebenslauf, Anschreiben und Online-Bewerbung praxisnah für eine Gruppe aufbereitet.",
  },
  {
    icon: "orientation" as const,
    title: "Berufliche Orientierung",
    text: "Eigene Stärken erkennen und realistische berufliche Perspektiven entwickeln.",
  },
  {
    icon: "conversation" as const,
    title: "Vorstellungsgespräch & Auftreten",
    text: "Typische Situationen üben, Sicherheit im Auftreten und im Umgang mit Nervosität gewinnen.",
  },
  {
    icon: "laptop" as const,
    title: "Digitale Kompetenz im Bewerbungsprozess",
    text: "Jobbörsen, Online-Formulare und digitale Tools sicher nutzen lernen.",
  },
];

const formats = [
  {
    title: "Halbtags-Workshop",
    text: "Kompakter Impuls zu einem einzelnen Thema, z. B. Bewerbungsunterlagen oder Vorstellungsgespräch.",
  },
  {
    title: "Ganztags-Workshop",
    text: "Vertiefte Bearbeitung mit praktischen Übungen und individuellem Feedback in der Gruppe.",
  },
  {
    title: "Modulreihe / Gruppenformat",
    text: "Mehrere Termine über einen längeren Zeitraum, z. B. begleitend zu einer Maßnahme oder einem Projekt.",
  },
];

const approach: VisualStep[] = [
  {
    icon: "conversation",
    title: "Verständlich einsteigen",
    text: "Wir knüpfen an der Ausgangslage der Gruppe an und erklären Anforderungen in klarer, direkter Sprache.",
  },
  {
    icon: "laptop",
    title: "Praktisch üben",
    text: "Die Teilnehmenden arbeiten an konkreten Beispielen, probieren Schritte selbst aus und erhalten nachvollziehbares Feedback.",
  },
  {
    icon: "progress",
    title: "Transfer sichern",
    text: "Am Ende steht ein sichtbares Arbeitsergebnis und ein nächster Schritt, den die Teilnehmenden selbst weiterführen können.",
  },
];

export default function WorkshopsPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/leistungen", label: "Leistungen" }, { href: "/leistungen/workshops", label: "Workshops & Gruppenformate" }]} />
      <Section tone="navy" spacing="hero" className="kv-hero">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow tone="white">Workshops &amp; Gruppenformate</Eyebrow>
            <h1 className="mt-4 max-w-xl text-3xl font-bold text-white sm:text-4xl">
              Praxisnahe Workshops für Bewerbung und berufliche Orientierung
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Für Einrichtungen, Bildungsträger und Unternehmen: kompakte Formate rund um Bewerbung, berufliche
              Orientierung und digitale Kompetenz – auf Ihre Zielgruppe, Ihre Ziele und den verfügbaren Zeitrahmen
              abgestimmt.
            </p>
            <Button href="#anfrage" onDark className="mt-6">Workshop anfragen</Button>
          </div>
          <Image
            src="/images/team/whiteboard-erklaerung.jpg"
            alt="Mazhar Said erklärt einer kleinen Gruppe einen Ablauf am Whiteboard"
            width={2000}
            height={848}
            sizes="(min-width: 1152px) 500px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 40px)"
            className="w-full rounded-[var(--radius-lg)] border border-white/15"
          />
        </div>
      </Section>

      <Section tone="tint">
        <Eyebrow tone="navy">Themen</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Woran wir mit Gruppen arbeiten</h2>
        <div className="icon-card-grid mt-8 grid gap-5 sm:grid-cols-2">
          {themen.map((t) => (
            <Card key={t.title}>
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700">
                <VisualIcon name={t.icon} />
              </span>
              <h3 className="font-semibold text-navy">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{t.text}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-navy-600">
          Die konkrete Themenauswahl stimmen wir vorab mit der Einrichtung ab – auf die Zielgruppe, den
          Förderbedarf und die verfügbare Zeit zugeschnitten.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-600">
          Je nach Thema nehmen die Teilnehmenden ein konkretes Arbeitsergebnis mit – zum Beispiel einen
          überarbeiteten Lebenslauf, eine persönliche Suchstrategie, vorbereitete Antworten für
          Vorstellungsgespräche oder einen klaren nächsten beruflichen Schritt.
        </p>
      </Section>

      <Section tone="white">
        <Eyebrow>Arbeitsweise</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">So arbeiten wir mit Gruppen</h2>
        <div className="mt-8"><VisualSteps steps={approach} /></div>
      </Section>

      <Section tone="tint">
        <Eyebrow>Format</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Von Halbtag bis Modulreihe</h2>
        <div className="text-card-grid mt-8 grid gap-5 sm:grid-cols-3">
          {formats.map((f) => (
            <Card key={f.title}>
              <h3 className="font-semibold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{f.text}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-navy">Gruppengröße & Ort</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Vor Ort bei der Einrichtung, am Coachingstandort in Kriftel oder online. Die Gruppengröße wird so
              vereinbart, dass praktische Übungen und Rückmeldungen im gebuchten Format realistisch möglich sind.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">Kosten</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Nach Klärung von Zielgruppe, Thema, Dauer und Gruppengröße erhalten Sie ein schriftliches Angebot mit
              Leistungsumfang und Gesamtpreis. Die Anfrage ist unverbindlich.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="navy" id="anfrage">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="white">Für Einrichtungen &amp; Unternehmen</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Workshop für Ihre Gruppe anfragen</h2>
          <p className="mt-4 text-white/80">
            Nennen Sie uns Zielgruppe, Thema und gewünschten Zeitraum. Wir melden uns in der Regel
            innerhalb von 1–2 Werktagen, um die passenden Inhalte und den Umfang abzustimmen.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-xl rounded-[var(--radius-lg)] bg-white p-6 sm:p-8">
          <ContactForm formal defaultRequestType="workshop" />
        </div>
      </Section>
    </>
  );
}
