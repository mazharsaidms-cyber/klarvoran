import { siteConfig } from "@/lib/site-config";
import { Button } from "./Button";

const facts: { label: string; value: string }[] = [
  { label: "Träger", value: siteConfig.legalName },
  { label: "Rechtsgrundlage", value: siteConfig.certificate.legalBasis },
  { label: "Zertifizierer", value: siteConfig.certificate.issuer },
  { label: "Zertifikat-Nr.", value: siteConfig.certificate.number },
  { label: "Fachbereich", value: siteConfig.certificate.field },
  { label: "Gültigkeit", value: `${siteConfig.certificate.validFrom} – ${siteConfig.certificate.validTo}` },
];

export function CertificateFacts() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-navy-100 bg-white p-6 sm:p-8">
      <dl className="grid gap-5 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-navy-600">{fact.label}</dt>
            <dd className="mt-1 font-mono text-sm text-navy">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 border-t border-navy-100 pt-6">
        <Button href={siteConfig.certificate.pdfHref} external variant="ghost">
          CERTQUA-Zertifikat als PDF ansehen
        </Button>
      </div>
    </div>
  );
}
