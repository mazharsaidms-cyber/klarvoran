import { institutionalDownloads, type InstitutionalDownloadKind } from "@/lib/content/downloads";

export function InstitutionDownload({ kind }: { kind: InstitutionalDownloadKind }) {
  const document = institutionalDownloads[kind];

  return (
    <div className="rounded-[var(--radius-md)] border border-navy-100 bg-white p-5 shadow-card sm:p-6">
      <h3 className="text-lg font-semibold text-navy">{document.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">{document.description}</p>
      <p className="mt-3 text-xs text-navy-600">PDF · 1 Seite · Stand {document.updatedAt}</p>
      <a
        href={document.href}
        download
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] px-1 py-2 text-sm font-semibold text-navy underline underline-offset-4 hover:text-btn-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-red"
        aria-label={`${document.title} als PDF herunterladen`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" />
        </svg>
        PDF herunterladen
      </a>
      <p className="mt-2 text-xs leading-relaxed text-navy-600">
        Alle wesentlichen Angaben finden Sie auch als lesbaren Text auf dieser Website.
      </p>
    </div>
  );
}
