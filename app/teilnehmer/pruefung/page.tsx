import type { Metadata } from "next";
import DocumentAccessCheck from "./document-access-check";

export const metadata: Metadata = {
  title: "Zugriffsprüfung | KlarVoran",
  robots: { index: false, follow: false, noarchive: true },
};

export default function Page() {
  return <DocumentAccessCheck />;
}
