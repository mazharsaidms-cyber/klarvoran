import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { OrganizationStructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-num",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – AVGS Coaching Frankfurt`,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – AVGS Coaching Frankfurt`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – AVGS Coaching Frankfurt`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "HXQPvD3_EClL3KarTLI5WNO7i--j9hCmxxwya6G2Cd4",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-16">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <OrganizationStructuredData />
      </body>
    </html>
  );
}
