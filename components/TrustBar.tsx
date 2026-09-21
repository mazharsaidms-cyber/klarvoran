const items = [
  "AZAV-zugelassener Bildungsträger",
  "Persönliches 1:1-Coaching",
  "0 € mit passendem, bewilligtem AVGS",
];

export function TrustBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const textClass = tone === "dark" ? "text-white/80" : "text-navy-600";
  const checkClass = tone === "dark" ? "text-white" : "text-red";
  return (
    <ul className={`flex flex-col items-start gap-3 text-sm font-medium ${textClass}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" className={`mt-0.5 shrink-0 ${checkClass}`}>
            <path
              d="M4 10.5 8 14l8-9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
