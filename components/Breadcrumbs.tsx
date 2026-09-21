import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ href: "/", label: "Startseite" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    // Dunkle Breadcrumb-Leiste: schließt optisch an den dunkelblauen Header an,
    // damit jede Seite mit dunklem Einstieg beginnt (Kundenvorgabe).
    <nav aria-label="Seitenpfad" className="border-b border-white/10 bg-navy">
      <div className="mx-auto max-w-6xl px-5 py-3 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
          <li>
            <Link href="/" className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]">
              Startseite
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-white">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </nav>
  );
}
