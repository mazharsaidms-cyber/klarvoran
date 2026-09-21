import Link from "next/link";
import { VisualIcon, type IconName } from "./VisualIcon";
import type { Leistung } from "@/lib/content/leistungen";

const icons: Record<string, IconName> = {
  avgs: "document",
  einzelcoaching: "orientation",
  workshops: "social",
  kooperationen: "provider",
};

/**
 * Ganz anklickbare Zielkarte mit genau einem Ziel: Die Karte selbst ist der Link.
 * Kein Button mit eigenem href im Inneren (kein Link-in-Link) – das CTA-Label
 * unten ist reines Dekor-Element der Karte.
 * Hover: Karte wechselt zu Dunkelblau mit weißer Schrift und weißem Rand,
 * hebt sich um maximal 2 px an. Labels/Icons werden passend umgestellt.
 * Transition bewusst nur für color, background-color, border-color, transform
 * und box-shadow. Der separate Scroll-Reveal bewegt nur das äußere Listenelement.
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
    <li data-reveal="" className="list-none h-full">
      <Link
        href={leistung.href}
        className="group relative flex h-full flex-col gap-4 rounded-[var(--radius-md)] border border-navy-100 bg-white p-6 shadow-card transition-[color,background-color,border-color,transform,box-shadow] duration-200 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-0.5 hover:border-white hover:bg-navy hover:text-white hover:shadow-card-hover focus-visible:-translate-y-0.5 focus-visible:border-white focus-visible:bg-navy focus-visible:text-white focus-visible:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-red"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
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
            <VisualIcon name={icons[leistung.id]} className="h-7 w-7" />
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
            className="flex items-center justify-between gap-3 text-sm font-semibold text-navy transition-colors group-hover:text-white group-focus-visible:text-white"
          >
            <span>{leistung.ctaLabel}</span>
            <span className="shrink-0 transition-transform duration-200 motion-reduce:transform-none motion-reduce:transition-none group-hover:translate-x-1 group-focus-visible:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
