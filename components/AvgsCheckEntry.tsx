import { Button } from "./Button";
import { VisualIcon } from "./VisualIcon";

/** A plain-language entry to the existing check, without assuming AVGS knowledge. */
export function AvgsCheckEntry() {
  return (
    <div className="rounded-[var(--radius-lg)] border-l-4 border-btn-red bg-white p-5 text-navy shadow-card">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-red/10 text-red-700"><VisualIcon name="signpost" /></span><h2 className="text-xl font-bold">Coaching mit Förderung?</h2></div>
      <p className="mt-2 leading-relaxed text-navy-600">
        Drei kurze Schritte zeigen dir, wie es weitergehen kann – auch ohne Gutschein.
      </p>
      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href="/avgs#schnellcheck" className="w-full sm:w-auto">AVGS-Schnellcheck starten</Button>
        <p className="text-sm font-semibold text-navy-600">Kostenlos · Ohne Anmeldung</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-navy-600">
        Erste Orientierung. Über die Förderung entscheidet Jobcenter oder Agentur für Arbeit.
      </p>
    </div>
  );
}
