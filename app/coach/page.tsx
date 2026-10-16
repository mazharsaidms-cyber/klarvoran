import type { Metadata } from "next";
import { participantConfig } from "@/lib/server/participant-config";
import { participantConfigured } from "@/lib/server/participant-transport";
import CoachPortal from "./coach-portal";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Coachbereich | KlarVoran",
  description: "Persönlicher Testzugang für zugewiesene Coachingfälle.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function CoachPage() {
  return <CoachPortal configured={participantConfigured(participantConfig())} />;
}
