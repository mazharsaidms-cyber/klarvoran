import { siteConfig } from "@/lib/site-config";

export function OrganizationStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.images.badge}`,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          postalCode: siteConfig.address.zip,
          addressLocality: siteConfig.address.city,
          addressCountry: "DE",
        },
        founder: {
          "@type": "Person",
          name: siteConfig.founder,
          jobTitle: "Gründer und fachliche Leitung",
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "AZAV-Trägerzulassung nach § 178 SGB III",
          credentialCategory: "Zulassung als Träger nach dem Recht der Arbeitsförderung",
          recognizedBy: {
            "@type": "Organization",
            name: siteConfig.certificate.issuerFull,
          },
          identifier: siteConfig.certificate.number,
        },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />;
}

export function FaqStructuredData({ items }: { items: { question: string; answer: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />;
}

export function ServiceStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Individuelles Bewerbungscoaching und Aktivierung",
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
    },
    areaServed: {
      "@type": "City",
      name: "Frankfurt am Main",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Arbeitsuchende mit AVGS",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Kostenfrei bei bewilligtem Aktivierungs- und Vermittlungsgutschein (AVGS).",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />;
}

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
