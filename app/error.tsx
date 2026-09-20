"use client";

import { Button } from "@/components/Button";
import { Eyebrow, Section } from "@/components/Section";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section tone="white" className="pt-20 text-center">
      <Eyebrow>Technischer Fehler</Eyebrow>
      <h1 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">Diese Seite konnte gerade nicht geladen werden</h1>
      <p className="mx-auto mt-4 max-w-lg leading-relaxed text-navy-600">
        Bitte versuche es erneut. Falls der Fehler bleibt, erreichst du KlarVoran auch über die Kontaktseite.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button type="button" onClick={() => reset()}>
          Erneut versuchen
        </Button>
        <Button href="/kontakt" variant="ghost">
          Kontakt aufnehmen
        </Button>
      </div>
    </Section>
  );
}
