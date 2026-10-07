import { Button } from "./Button";

/** A plain-language entry to the existing check, without assuming AVGS knowledge. */
export function AvgsCheckEntry() {
  return (
    <div className="rounded-[var(--radius-lg)] border-l-4 border-btn-red bg-white p-5 text-navy shadow-card sm:p-6">
      <h2 className="text-xl font-bold">Kann dein Coaching gefördert werden?</h2>
      <p className="mt-2 leading-relaxed text-navy-600">
        Beantworte ein paar einfache Fragen und erfahre, wie du weiterkommst. Auch wenn du noch keinen Gutschein hast.
      </p>
      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href="/avgs#schnellcheck" className="w-full sm:w-auto">AVGS-Schnellcheck starten</Button>
        <p className="text-sm font-semibold text-navy-600">Kostenlos · Ohne Anmeldung</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-navy-600">
        Erste Orientierung. Über die Förderung entscheidet dein Jobcenter oder deine Agentur für Arbeit.
      </p>
    </div>
  );
}
