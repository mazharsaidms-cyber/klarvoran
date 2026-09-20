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
        logo: `${siteConfig.url}${siteConfig.images.logo}`,
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
    "@type": "ItemList",
    name: "Leistungen von KlarVoran",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: siteConfig.measure.title,
          url: `${siteConfig.url}/avgs`,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: "Rhein-Main-Gebiet und online",
          audience: { "@type": "Audience", audienceType: "Arbeitsuchende mit passendem AVGS" },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
            description: "Für Teilnehmende kostenfrei bei passendem und bewilligtem AVGS.",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Privates Job- und Bewerbungscoaching",
          url: `${siteConfig.url}/leistungen/einzelcoaching`,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: "Rhein-Main-Gebiet und online",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Workshops und arbeitsmarktbezogene Gruppenformate",
          url: `${siteConfig.url}/leistungen/workshops`,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: "Rhein-Main-Gebiet und online",
        },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />;
}

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
