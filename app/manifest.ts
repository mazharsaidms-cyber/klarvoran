import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KlarVoran Zugang",
    short_name: "KlarVoran",
    description: "Persönlicher Zugang für Teilnehmer und Coaches bei KlarVoran.",
    start_url: "/zugang",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1b222e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
