import Image from "next/image";
import { coachExperience, coachQualifications } from "@/lib/content/coach";
import { FounderExpertise } from "@/components/FounderExpertise";

export function CoachProfile() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
      <div className="space-y-5">
        <figure className="overflow-hidden rounded-[var(--radius-lg)] border border-navy-100 bg-navy-50 shadow-sm">
          <Image
            src="/images/mazhar-said-portrait.jpg"
            alt="Mazhar Said, Gründer und fachliche Leitung von KlarVoran"
            width={591}
            height={827}
            sizes="(max-width: 1023px) min(100vw - 3rem, 400px), 320px"
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <figcaption className="px-5 py-4 text-sm font-semibold text-navy">Mazhar Said <span className="block font-normal text-navy-600">Gründer &amp; fachliche Leitung</span></figcaption>
        </figure>
        <FounderExpertise />
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Mazhar Said</h2>
          <p className="mt-3 text-lg leading-relaxed text-navy-600">
            Ich verbinde strukturiertes Arbeiten aus dem Rechts- und Notariatsbereich mit pädagogischer Erfahrung
            und einem praxisnahen Verständnis von Arbeitswelt, Unternehmen und Vertrieb. So entstehen aus
            beruflicher Unsicherheit klare und umsetzbare nächste Schritte.
          </p>
        </div>

        <blockquote className="rounded-[var(--radius-lg)] border border-navy-100 border-l-4 border-l-red bg-navy-50 px-6 py-6 sm:px-8">
          <p className="text-lg font-medium leading-relaxed text-navy sm:text-xl">
            „Gute Begleitung macht nicht abhängig: Sie schafft Verständnis, stärkt Handlungssicherheit und wird mit jedem selbstständig übernommenen Schritt weniger nötig.“
          </p>
          <footer className="mt-5 text-sm font-semibold text-red-700">— Mazhar Said</footer>
        </blockquote>

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
