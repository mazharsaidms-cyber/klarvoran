import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Section, Eyebrow } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata(
  "Impressum",
  "Impressum von KlarVoran – Mazhar Said gemäß § 5 DDG.",
  "/impressum",
);

export default function ImpressumPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/impressum", label: "Impressum" }]} />
      <Section tone="white" spacing="hero">
        <Eyebrow>Impressum</Eyebrow>
        <h1 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">Impressum</h1>

        <div className="mt-10 max-w-2xl space-y-8 text-navy-600">
          <p className="text-sm">
            <strong className="font-semibold text-navy">{siteConfig.name}</strong> ist die Trägerbezeichnung von Mazhar
            Said. Die formale Anpassung der vorhandenen Zulassungsunterlagen befindet sich in Bearbeitung.
          </p>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-600">
              Angaben gemäß § 5 DDG
            </h2>
            <p className="mt-2 text-navy">
              {siteConfig.legalName}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.zip} {siteConfig.address.city}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-600">Kontakt</h2>
            <p className="mt-2">
              Telefon: {siteConfig.contact.phoneDisplay}
              <br />
              E-Mail: {siteConfig.contact.email}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-600">Umsatzsteuer</h2>
            <p className="mt-2">
              Kleinunternehmer im Sinne von § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-600">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="mt-2">{siteConfig.founder}, Anschrift wie oben.</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-600">
              Zulassung nach § 178 SGB III
            </h2>
            <p className="mt-2">
              {siteConfig.legalName} ist als Träger nach § 178 SGB III zugelassen, zertifiziert durch{" "}
              {siteConfig.certificate.issuerFull}. Zertifikat-Nr. {siteConfig.certificate.number}, gültig{" "}
              {siteConfig.certificate.validFrom} bis {siteConfig.certificate.validTo}.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
