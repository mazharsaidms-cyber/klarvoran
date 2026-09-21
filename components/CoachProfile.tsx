import Image from "next/image";
import { coachExperience, coachQualifications } from "@/lib/content/coach";

export function CoachProfile() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
      <div className="mx-auto w-56 sm:w-64 lg:mx-0 lg:w-full">
        <Image
          src="/images/team/einzelgespraech.jpg"
          alt="Mazhar Said im persönlichen Coachinggespräch"
          width={1400}
          height={781}
          sizes="(min-width: 1024px) 320px, 256px"
          className="aspect-[4/5] w-full rounded-[var(--radius-lg)] object-cover object-[42%_center]"
        />
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Mazhar Said</h2>
          <p className="mt-3 text-lg leading-relaxed text-navy-600">
            Ich verbinde die Genauigkeit aus dem Rechts- und Notariatsbereich mit praktischer Erfahrung in
            Bewerbungsmanagement, Jobcoaching, Inklusionshilfe und beruflicher Orientierung. Dabei ist mir wichtig,
            Menschen nicht nur kurzfristig zu unterstützen. Sie sollen Anforderungen verstehen, passende Schritte
            selbst umsetzen und auch bei Rückschlägen handlungsfähig bleiben.
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
