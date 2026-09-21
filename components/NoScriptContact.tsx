import { siteConfig } from "@/lib/site-config";

/** A working contact route when the interactive forms cannot run. */
export function NoScriptContact({ formal = false }: { formal?: boolean }) {
  return (
    <noscript>
      <p className="mb-6 rounded-[var(--radius-sm)] border border-navy-100 bg-navy-50 p-4 text-sm leading-relaxed text-navy">
        {formal
          ? "Das Formular benötigt JavaScript. Sie erreichen uns auch direkt: "
          : "Das Formular benötigt JavaScript. Du erreichst uns auch direkt: "}
        <a className="font-semibold underline underline-offset-4" href={siteConfig.contact.phoneHref}>
          {siteConfig.contact.phoneDisplay}
        </a>
        {" oder "}
        <a className="font-semibold underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>.
      </p>
    </noscript>
  );
}
