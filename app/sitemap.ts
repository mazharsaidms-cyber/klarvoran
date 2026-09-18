import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const paths = [
  "/",
  "/leistungen",
  "/leistungen/einzelcoaching",
  "/leistungen/workshops",
  "/ueber-uns",
  "/avgs",
  "/fachkraefte-kooperationspartner",
  "/fuer-jobcenter",
  "/fuer-soziale-einrichtungen",
  "/fuer-bildungstraeger",
  "/fuer-kommunen",
  "/faq",
  "/kontakt",
  "/termin",
  "/impressum",
  "/datenschutz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
