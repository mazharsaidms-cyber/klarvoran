export function GET() {
  return Response.json(
    {
      id: "/teilnehmer",
      name: "KlarVoran Teilnehmerbereich",
      short_name: "KlarVoran",
      description: "Persönlicher Zugang zu deinem KlarVoran-Teilnehmerbereich.",
      start_url: "/teilnehmer",
      scope: "/teilnehmer",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#1b222e",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json; charset=utf-8" } },
  );
}
