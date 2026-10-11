import "server-only";
import { participantConfig } from "@/lib/server/participant-config";
import { deliverParticipantMail } from "@/lib/server/participant-transport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;
export async function POST(request: Request) { return deliverParticipantMail(request, participantConfig()); }
