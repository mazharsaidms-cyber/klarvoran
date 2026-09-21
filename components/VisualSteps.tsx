import { VisualIcon, type IconName } from "./VisualIcon";

export type VisualStep = {
  title: string;
  text: string;
  icon: IconName;
};

/** A compact, readable sequence for a process; all content remains plain HTML. */
export function VisualSteps({ steps }: { steps: readonly VisualStep[] }) {
  return (
    <ol className={`step-grid grid gap-x-7 gap-y-8 sm:grid-cols-2 ${steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {steps.map((step, index) => (
        <li
          data-reveal=""
          key={step.title}
          className="group border-t-2 border-navy-100 pt-5 transition-colors duration-200 hover:border-red-700 motion-reduce:transition-none"
        >
          <div className="mb-4 flex items-center gap-3 sm:mb-0">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-navy text-white transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              aria-hidden="true"
            >
              <VisualIcon name={step.icon} />
            </span>
            <span className="font-mono text-xs font-semibold text-red-700" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-semibold text-navy">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-600 sm:mt-0">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
