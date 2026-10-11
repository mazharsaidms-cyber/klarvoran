import type { Metadata } from "next";
import { participantConfig } from "@/lib/server/participant-config";
import { participantConfigured } from "@/lib/server/participant-transport";
import ParticipantPortal from "./participant-portal";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Deine Akte | KlarVoran", description: "Persönlicher KlarVoran-Teilnehmerbereich.", robots: { index: false, follow: false, noarchive: true } };
export default function ParticipantPage() {
  return <ParticipantPortal configured={participantConfigured(participantConfig())} />;
}
