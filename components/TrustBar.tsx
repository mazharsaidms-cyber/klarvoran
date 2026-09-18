import { siteConfig } from "@/lib/site-config";

const items = [
  { label: "Zugelassene Maßnahme nach § 45 SGB III", value: null },
  { label: `CERTQUA-Zertifikat ${siteConfig.certificate.number}`, value: null },
  { label: "0 € für dich mit bewilligtem AVGS", value: null },
  { label: "Persönlich begleitet, klar strukturiert", value: null },
];

export function TrustBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const textClass = tone === "dark" ? "text-white/80" : "text-navy-600";
  const checkClass = tone === "dark" ? "text-white" : "text-red";
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium ${textClass}`}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" className={`shrink-0 ${checkClass}`}>
            <path
              d="M4 10.5 8 14l8-9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
