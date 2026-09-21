import type { Metadata } from "next";
import { siteConfig } from "./site-config";

/** Keep search snippets and shared links specific to the current page. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = `${title} – ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description },
  };
}
