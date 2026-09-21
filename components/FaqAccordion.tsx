import type { FaqItem } from "@/lib/content/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-navy-100 rounded-[var(--radius-md)] border border-navy-100 bg-white">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[var(--radius-sm)] p-5 transition-colors duration-200 motion-reduce:transition-none open:pb-5 hover:bg-navy-50 sm:p-6"
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded-[var(--radius-sm)]">
            {item.question}
            <svg
              viewBox="0 0 20 20"
              width="20"
              height="20"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-red transition-transform duration-200 motion-reduce:transition-none group-open:rotate-45"
            >
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-navy-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
