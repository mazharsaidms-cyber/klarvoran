import type { ProcessStep } from "@/lib/content/process";

export function ProcessStepper({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="step-grid grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-5">
      {steps.map((step) => (
        <li key={step.id} className="group border-t-2 border-navy-100 pt-5 transition-colors duration-200 hover:border-red-700 motion-reduce:transition-none">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-mono text-sm font-bold text-white transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
            aria-hidden="true"
          >
            {String(step.id).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-semibold text-navy sm:mt-0">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-600 sm:mt-0">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
