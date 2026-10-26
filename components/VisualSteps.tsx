import { VisualIcon, type IconName } from "./VisualIcon";

export type VisualStep = {
  title: string;
  text: string;
  icon: IconName;
};

/** A compact, readable sequence for a process; all content remains plain HTML. */
export function VisualSteps({ steps }: { steps: readonly VisualStep[] }) {
  return (
    <ol className={`step-grid grid gap-x-6 gap-y-6 sm:grid-cols-2 ${steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {steps.map((step, index) => (
        <li
          data-reveal=""
          data-step={String(index + 1).padStart(2, "0")}
          key={step.title}
          className="kv-process-step group transition-colors duration-200 motion-reduce:transition-none"
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-navy text-white transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              aria-hidden="true"
            >
              <VisualIcon name={step.icon} />
            </span>
          </div>
          <h3 className="font-semibold text-navy">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
