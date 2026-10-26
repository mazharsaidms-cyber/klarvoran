import { VisualIcon, type IconName } from "./VisualIcon";

type Point = { icon: IconName; label: string };

/** Short, scannable facts in place of a long introductory paragraph. */
export function QuickPoints({ items, onDark = false }: { items: readonly Point[]; onDark?: boolean }) {
  return (
    <ul className="mt-5 grid gap-2 sm:grid-cols-3" aria-label="Auf einen Blick">
      {items.map((item) => (
        <li key={item.label} className={`flex min-h-12 items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold ${onDark ? "border border-white/20 bg-white/10 text-white" : "border border-navy-100 bg-white text-navy"}`}>
          <VisualIcon name={item.icon} className={`h-5 w-5 shrink-0 ${onDark ? "text-white" : "text-red-700"}`} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
