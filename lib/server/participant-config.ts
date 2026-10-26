import "server-only";
import type { ParticipantConfig } from "./participant-transport";

export function participantConfig(): ParticipantConfig {
  return { enabled: process.env.PORTAL_EMAIL_ENABLED, gatewayKey: process.env.PORTAL_GATEWAY_KEY,
    backendBearer: process.env.PORTAL_BACKEND_BEARER, resendKey: process.env.RESEND_API_KEY,
    sender: process.env.PORTAL_SENDER_EMAIL || process.env.LEAD_SENDER_EMAIL || "KlarVoran <info@klarvoran.de>",
    backendOrigin: process.env.PORTAL_BACKEND_ORIGIN,
    productionBackendEnabled: process.env.PORTAL_PRODUCTION_BACKEND_ENABLED,
    realOperationEnabled: process.env.PORTAL_REAL_OPERATION_ENABLED,
    betriebBackendEnabled: process.env.PORTAL_BETRIEB_BACKEND_ENABLED,
    betriebGatewayKey: process.env.PORTAL_BETRIEB_GATEWAY_KEY,
    betriebBackendBearer: process.env.PORTAL_BETRIEB_BACKEND_BEARER,
    cleanBackendEnabled: process.env.PORTAL_CLEAN_BACKEND_ENABLED,
    cleanGatewayKey: process.env.PORTAL_CLEAN_GATEWAY_KEY,
    cleanBackendBearer: process.env.PORTAL_CLEAN_BACKEND_BEARER };
}
