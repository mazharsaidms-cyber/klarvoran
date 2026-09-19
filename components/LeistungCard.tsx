import Link from "next/link";
import type { ReactNode } from "react";
import type { Leistung } from "@/lib/content/leistungen";

// Einheitliche Icons je Leistung (Kundenvorgabe):
// Dokument für Bewerbung, Kompass für Orientierung, Lernrunde für Workshops,
// verknüpfte Bausteine für Kooperation.
const icons: Record<string, ReactNode> = {
  avgs: (
    // Dokument – Bewerbung
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6M9 8.5h2" />
    </svg>
  ),
  einzelcoaching: (
    // Kompass – Orientierung
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 5-5 2.2 2.2-5 5-2.2Z" />
    </svg>
  ),
  workshops: (
    // Lernrunde – Workshop
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="7.5" r="2.5" />
      <circle cx="6" cy="16.5" r="2.5" />
      <circle cx="18" cy="16.5" r="2.5" />
      <path d="M10 9.5 7.2 14.4M14 9.5l2.8 4.9M8.5 16.5h7" />
    </svg>
  ),
  kooperationen: (
    // Verknüpfte Bausteine – Kooperation
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
      <path d="M10.5 7h4.5a2 2 0 0 1 2 2v4.5M13.5 17H9a2 2 0 0 1-2-2v-4.5" />
    </svg>
  ),
};

/**
 * Ganz anklickbare Zielkarte mit genau einem Ziel: Die Karte selbst ist der Link.
 * Kein Button mit eigenem href im Inneren (kein Link-in-Link) – das CTA-Label
 * unten ist reines Dekor-Element der Karte.
 * Hover: Karte wechselt zu Dunkelblau mit weißer Schrift und weißem Rand,
 * hebt sich um maximal 2 px an. Labels/Icons werden passend umgestellt.
 * Transition bewusst nur für color, background-color, border-color, transform
 * und box-shadow (Kundenvorgabe: keine Voll-Animation).
 */
export function LeistungCard({
  leistung,
  hasMassnahmeBadge = false,
  headingLevel = 3,
}: {
  leistung: Leistung;
  hasMassnahmeBadge?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <li className="list-none h-full">
      <Link
        href={leistung.href}
        className="group relative flex h-full flex-col gap-4 rounded-[var(--radius-md)] border border-navy-100 bg-white p-6 shadow-card transition-[color,background-color,border-color,transform,box-shadow] duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:border-white hover:bg-navy hover:text-white hover:shadow-card-hover focus-visible:-translate-y-0.5 focus-visible:border-white focus-visible:bg-navy focus-visible:text-white focus-visible:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-red"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-[var(--radius-full)] bg-navy-50 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wide text-navy transition-colors group-hover:bg-white/10 group-hover:text-white group-focus-visible:bg-white/10 group-focus-visible:text-white">
            {leistung.eyebrow}
          </span>
          {hasMassnahmeBadge && (
            <span className="shrink-0 rounded bg-btn-red px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
              AZAV-Maßnahme
            </span>
          )}
        </div>

        {icons[leistung.id] && (
          <span className="text-btn-red transition-colors group-hover:text-white group-focus-visible:text-white" aria-hidden="true">
            {icons[leistung.id]}
          </span>
        )}

        <Heading className="text-xl font-bold text-navy transition-colors group-hover:text-white group-focus-visible:text-white">
          {leistung.title}
        </Heading>

        <p className="text-sm leading-relaxed text-navy-600 transition-colors group-hover:text-white/80 group-focus-visible:text-white/80">
          {leistung.summary}
        </p>

        <ul className="space-y-1.5 text-sm text-navy-600 transition-colors group-hover:text-white/90 group-focus-visible:text-white/90">
          {leistung.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-btn-red transition-colors group-hover:bg-white group-focus-visible:bg-white"
                aria-hidden="true"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-4 pt-2">
          {leistung.price && (
            <p className="rounded-[var(--radius-sm)] bg-navy-50 px-3.5 py-3 font-mono text-sm font-semibold text-navy transition-colors group-hover:bg-white/10 group-hover:text-white group-focus-visible:bg-white/10 group-focus-visible:text-white">
              {leistung.price}
            </p>
          )}
          <div
            aria-hidden="true"
            className="flex items-center justify-between text-sm font-semibold text-navy transition-colors group-hover:text-white group-focus-visible:text-white"
          >
            <span>{leistung.ctaLabel}</span>
            <span className="transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-1 group-focus-visible:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
