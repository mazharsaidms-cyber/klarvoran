import type { Metadata } from "next";
import { participantConfig } from "@/lib/server/participant-config";
import { participantConfigured } from "@/lib/server/participant-transport";
import ParticipantPortal from "./participant-portal";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Deine Akte | KlarVoran", description: "Persönlicher KlarVoran-Teilnehmerbereich.", robots: { index: false, follow: false, noarchive: true } };
export default function ParticipantPage() {
  const c = participantConfig();
  const diagnostic = process.env.VERCEL_ENV === "preview" && process.env.VERCEL_GIT_COMMIT_REF === "codex/isolated-portal-e2e"
    ? { enabled: c.enabled === "true", gatewayKey: Boolean(c.gatewayKey && c.gatewayKey.length >= 43),
        backendBearer: Boolean(c.backendBearer && c.backendBearer.length >= 30), resendKey: Boolean(c.resendKey),
        sender: Boolean(c.sender && /@klarvoran\.de>?$/i.test(c.sender.trim())),
        backendOrigin: c.backendOrigin === "https://klarvoran-gesamt-restore-20261021.mazhar-said-ms.chatgpt.site",
        publicOrigin: c.publicOrigin === "https://klarvoran-git-codex-isolated-portal-e2e-klar-voran.vercel.app",
        testRecipients: Boolean(c.testRecipients?.trim()) } : null;
  return <><ParticipantPortal configured={participantConfigured(c)} />{diagnostic && <aside style={{ padding: 16 }} data-testid="preview-configuration">Testkonfiguration: {JSON.stringify(diagnostic)}</aside>}</>;
}
