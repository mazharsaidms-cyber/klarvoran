import "server-only";
import { participantConfig } from "@/lib/server/participant-config";
import { proxyParticipant } from "@/lib/server/participant-transport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function proxy(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const target = `/${path.join("/")}${new URL(request.url).search}`;
  return proxyParticipant(request, target, participantConfig());
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
