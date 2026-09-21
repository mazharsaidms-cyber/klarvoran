import Link from "next/link";
import { VisualIcon } from "./VisualIcon";

const targetIcons = {
  "/fuer-jobcenter": "jobcenter",
  "/fuer-soziale-einrichtungen": "social",
  "/fuer-bildungstraeger": "provider",
  "/fuer-kommunen": "municipality",
} as const;

export type InstitutionTarget = {
  href: keyof typeof targetIcons;
  title: string;
  text: string;
  cta: string;
};

export function InstitutionCard({
  target,
  headingLevel = 3,
}: {
  target: InstitutionTarget;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <li className="h-full list-none">
      <Link
        href={target.href}
        className="group flex h-full flex-col gap-3 rounded-[var(--radius-md)] border border-navy-100 bg-white p-6 shadow-card transition-[color,background-color,border-color,transform,box-shadow] duration-200 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-0.5 hover:border-white hover:bg-navy hover:text-white hover:shadow-card-hover focus-visible:-translate-y-0.5 focus-visible:border-white focus-visible:bg-navy focus-visible:text-white focus-visible:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-red"
      >
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-red/10 text-red-700 transition-colors duration-200 group-hover:bg-white/15 group-hover:text-white group-focus-visible:bg-white/15 group-focus-visible:text-white motion-reduce:transition-none">
          <VisualIcon name={targetIcons[target.href]} />
        </span>
        <Heading className="text-lg font-bold text-navy transition-colors duration-200 group-hover:text-white group-focus-visible:text-white">
          {target.title}
        </Heading>
        <p className="text-sm leading-relaxed text-navy-600 transition-colors duration-200 group-hover:text-white/80 group-focus-visible:text-white/80">
          {target.text}
        </p>
        <span
          aria-hidden="true"
          className="mt-auto flex items-center justify-between gap-3 pt-2 text-sm font-semibold text-navy transition-colors duration-200 group-hover:text-white group-focus-visible:text-white"
        >
          <span>{target.cta}</span>
          <span className="shrink-0 transition-transform duration-200 motion-reduce:transform-none motion-reduce:transition-none group-hover:translate-x-1 group-focus-visible:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
