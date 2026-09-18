import Image from "next/image";
import { coachExperience, coachQualifications } from "@/lib/content/coach";
import { siteConfig } from "@/lib/site-config";

export function CoachProfile() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
      <div className="mx-auto w-56 sm:w-64 lg:mx-0 lg:w-full">
        <Image
          src={siteConfig.images.badge}
          alt="Portrait von Mazhar Said, Gründer von KlarVoran"
          width={320}
          height={320}
          className="w-full rounded-[var(--radius-lg)]"
          priority
        />
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Mazhar Said</h2>
          <p className="mt-3 text-lg leading-relaxed text-navy-600">
            Ich habe KlarVoran gegründet, weil ich aus eigener beruflicher Erfahrung weiß, wie viel Unterschied
            eine klare Struktur und jemand macht, der sich wirklich Zeit nimmt. Mein Weg führte über eine
            juristische Ausbildung, den Vertrieb und die pädagogische Arbeit mit Menschen in herausfordernden
            Situationen zum Bewerbungscoaching – genau diese Mischung bringe ich in jedes Gespräch mit dir ein.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-600">Qualifikationen</h3>
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
              <li key={`${e.role}-${e.period}`} className="flex flex-col gap-0.5 border-l-2 border-red/40 pl-4">
                <span className="font-mono text-xs text-navy-600">{e.period}</span>
                <span className="font-semibold text-navy">{e.role}</span>
                {e.org !== "—" && <span className="text-sm text-navy-600">{e.org}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
