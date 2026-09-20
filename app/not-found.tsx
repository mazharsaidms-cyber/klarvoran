import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  description: "Die angeforderte Seite wurde nicht gefunden. Hier geht es zurück zu KlarVoran.",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <Section tone="white" className="pt-20 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">Diese Seite gibt es nicht (mehr)</h1>
      <p className="mx-auto mt-4 max-w-md text-navy-600">
        Vielleicht wurde die Seite verschoben oder es hat sich ein Tippfehler eingeschlichen. Kein Problem – hier
        geht es weiter:
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/">Zur Startseite</Button>
        <Button href="/avgs#schnellcheck" variant="ghost">
          AVGS-Schnellcheck starten
        </Button>
        <Button href="/kontakt" variant="text">
          Kontakt aufnehmen →
        </Button>
      </div>
    </Section>
  );
}
