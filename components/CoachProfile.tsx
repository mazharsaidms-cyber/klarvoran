import { coachExperience, coachQualifications } from "@/lib/content/coach";
import { FounderExpertise } from "@/components/FounderExpertise";

export function CoachProfile() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
      <FounderExpertise />

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Mazhar Said</h2>
          <p className="mt-3 text-lg leading-relaxed text-navy-600">
            Ich verbinde strukturiertes Arbeiten aus dem Rechts- und Notariatsbereich mit pädagogischer Erfahrung
            und einem praxisnahen Verständnis von Arbeitswelt, Unternehmen und Vertrieb. So entstehen aus
            beruflicher Unsicherheit klare und umsetzbare nächste Schritte.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-600">Fachlicher Hintergrund</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {coachQualifications.map((q) => (
              <li
                key={q}
                className="rounded-[var(--radius-full)] border border-navy-100 bg-navy-50 px-3.5 py-1.5 text-sm text-navy"
              >
                {q}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-600">Berufserfahrung</h3>
          <ul className="mt-3 space-y-3">
            {coachExperience.map((e) => (
              <li key={`${e.role}-${e.period}`} className="grid gap-1 rounded-r-[var(--radius-sm)] border-l-2 border-red/50 bg-navy-50/60 px-4 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <span className="font-mono text-xs font-semibold text-navy-600">{e.period}</span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold text-navy">{e.role}</span>
                  <span className="text-sm text-navy-600">{e.org}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
