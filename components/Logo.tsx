import Image from "next/image";

/**
 * KlarVoran-Wortmarke (Logo mit rotem V) als Bild statt Klartext.
 * tone="light": Navy-Schrift für helle Flächen.
 * tone="dark":  Weiße Schrift für dunkelblaue Flächen (Header, Footer, Navy-Sektionen).
 * Das rote V bleibt in beiden Varianten unverändert (Markenrot, kein Umfärben).
 */
export function Logo({
  tone = "light",
  className = "h-7 w-auto",
  loading = "lazy",
}: {
  tone?: "light" | "dark";
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const src =
    tone === "dark" ? "/images/klarvoran-logo-white.png" : "/images/klarvoran-logo.png";
  return <Image src={src} alt="KlarVoran" width={148} height={32} loading={loading} className={className} />;
}
