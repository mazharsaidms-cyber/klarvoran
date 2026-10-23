import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  manifest: "/teilnehmer/manifest.webmanifest",
  appleWebApp: { capable: true, title: "KlarVoran", statusBarStyle: "default" },
};

export default function TeilnehmerLayout({ children }: { children: ReactNode }) {
  return children;
}
