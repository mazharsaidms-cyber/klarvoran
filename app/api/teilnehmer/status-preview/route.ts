import "server-only";
import { participantConfig } from "@/lib/server/participant-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Temporary Preview diagnostic; remove before review/merge.
export function GET() {
  if (process.env.VERCEL_ENV !== "preview" || process.env.VERCEL_GIT_COMMIT_REF !== "codex/isolated-portal-e2e") {
    return new Response(null, { status: 404 });
  }
  const c = participantConfig();
  const backend = "https://klarvoran-gesamt-restore-20261021.mazhar-said-ms.chatgpt.site";
  const publicUrl = "https://klarvoran-git-codex-isolated-portal-e2e-klar-voran.vercel.app";
  return Response.json({
    enabled: c.enabled === "true",
    gatewayKey: Boolean(c.gatewayKey && c.gatewayKey.length >= 43),
    backendBearer: Boolean(c.backendBearer && c.backendBearer.length >= 30),
    resendKey: Boolean(c.resendKey),
    sender: Boolean(c.sender && /@klarvoran\.de>?$/i.test(c.sender.trim())),
    backendOrigin: c.backendOrigin === backend,
    publicOrigin: c.publicOrigin === publicUrl,
    testRecipients: Boolean(c.testRecipients?.trim()),
  }, { headers: { "cache-control": "private, no-store", "x-robots-tag": "noindex" } });
}
