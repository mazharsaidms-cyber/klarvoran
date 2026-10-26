import { isIP } from "node:net";
import { gatewayDigest, gatewayMac, gatewayTargetAllowed, proofText, safeEqual, GATEWAY_MAX_AGE_MS, GATEWAY_MAX_BODY } from "../participant-gateway-proof";

export type ParticipantConfig = { enabled?: string; gatewayKey?: string; backendBearer?: string; resendKey?: string; sender?: string;
  backendOrigin?: string; productionBackendEnabled?: string; realOperationEnabled?: string; privacyApprovedVersion?: string;
  betriebBackendEnabled?: string; betriebGatewayKey?: string; betriebBackendBearer?: string;
  cleanBackendEnabled?: string; cleanGatewayKey?: string; cleanBackendBearer?: string };
export const participantOrigin = "https://www.klarvoran.de";
const backendOrigin = "https://ms-coaching-prototyp.mazhar-said-ms.chatgpt.site";
const productionBackendOrigin = "https://klarvoran-produktiv-vorbereitung.mazhar-said-ms.chatgpt.site";
const betriebBackendOrigin = "https://klarvoran-betrieb.mazhar-said-ms.chatgpt.site";
const cleanBackendOrigin = "https://klarvoran-betrieb-sauber.mazhar-said-ms.chatgpt.site";
const cookieName = /^(?:__Secure-)?klarvoran-participant\./;
const privateHeaders = { "cache-control": "private, no-store, max-age=0", "referrer-policy": "no-referrer", "x-content-type-options": "nosniff", "x-frame-options": "DENY" };
const errorResponse = (status: number, error: string) => Response.json({ error }, { status, headers: privateHeaders });

function selectedBackend(config: ParticipantConfig) {
  if (!config.backendOrigin || config.backendOrigin === backendOrigin) return backendOrigin;
  if (config.backendOrigin === productionBackendOrigin && config.productionBackendEnabled === "true") return productionBackendOrigin;
  if (config.backendOrigin === betriebBackendOrigin && config.betriebBackendEnabled === "true") return betriebBackendOrigin;
  if (config.backendOrigin === cleanBackendOrigin && config.cleanBackendEnabled === "true") return cleanBackendOrigin;
  return null;
}

function selectedSecrets(config: ParticipantConfig) {
  const selected = selectedBackend(config);
  if (selected === cleanBackendOrigin) return { gatewayKey: config.cleanGatewayKey, backendBearer: config.cleanBackendBearer };
  if (selected === betriebBackendOrigin) return { gatewayKey: config.betriebGatewayKey, backendBearer: config.betriebBackendBearer };
  return { gatewayKey: config.gatewayKey, backendBearer: config.backendBearer };
}

export function participantRealOperationConfigured(config: ParticipantConfig) {
  const selected = selectedBackend(config);
  return (selected === productionBackendOrigin || selected === cleanBackendOrigin) &&
    config.realOperationEnabled === "true" && config.privacyApprovedVersion === "2.8";
}

export function participantConfigured(config: ParticipantConfig) {
  const selected = selectedBackend(config);
  const realRequested = (selected === productionBackendOrigin || selected === cleanBackendOrigin) && config.realOperationEnabled === "true";
  if (realRequested && !participantRealOperationConfigured(config)) return false;
  const { gatewayKey, backendBearer } = selectedSecrets(config);
  return config.enabled === "true" && Boolean(selected && gatewayKey && gatewayKey.length >= 43 && backendBearer && backendBearer.length >= 30 && config.resendKey && config.sender && /@klarvoran\.de>?$/i.test(config.sender.trim()));
}

/** Route handlers pass only server environment values; this module is never imported by participant UI. */
export async function proxyParticipant(request: Request, target: string, config: ParticipantConfig, send: typeof fetch = fetch) {
  if (!participantConfigured(config)) return errorResponse(503, "Der Teilnehmerzugang wird noch eingerichtet. Bitte wende dich an KlarVoran.");
  if (!gatewayTargetAllowed(request.method, target)) return errorResponse(404, "Diese Seite ist nicht vorhanden.");
  if (request.headers.get("sec-fetch-site") === "cross-site" || request.method !== "GET" && request.headers.get("origin") !== participantOrigin) return errorResponse(403, "Diese Anfrage ist nicht zulässig.");
  try {
    const body = await limitedBody(request, GATEWAY_MAX_BODY);
    if (request.method !== "GET" && !target.startsWith("/upload/chunk?") && !request.headers.get("content-type")?.startsWith("application/json")) return errorResponse(415, "Das Anfrageformat ist ungültig.");
    const rawIp = (request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "").split(",")[0].trim();
    const client = isIP(rawIp) ? rawIp : "0.0.0.0";
    const timestamp = String(Date.now()), nonce = crypto.randomUUID();
    const { gatewayKey, backendBearer } = selectedSecrets(config);
    const proof = await gatewayMac(gatewayKey!, proofText(request.method, target, timestamp, nonce, await gatewayDigest(body), client));
    // Never forward browser-supplied identity, bridge proof, authorization, or native Sites headers.
    const headers = new Headers({ "OAI-Sites-Authorization": `Bearer ${backendBearer}`, "x-portal-target": target,
      "x-portal-time": timestamp, "x-portal-nonce": nonce, "x-portal-proof": proof, "x-portal-client": client,
      "content-type": target.startsWith("/upload/chunk?") ? "application/octet-stream" : "application/json" });
    const cookie = (request.headers.get("cookie") ?? "").split(";").filter(c => cookieName.test(c.trim().split("=")[0])).join(";");
    if (cookie.length <= 4096) headers.set("cookie", cookie);
    const upstream = await send(`${selectedBackend(config)!}/api/participant-gateway`, { method: request.method, headers,
      ...(request.method !== "GET" ? { body } : {}), redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(45_000) });
    // A gate/login redirect is a configuration error; credentials never follow a redirect to another host.
    if (upstream.status >= 300 && upstream.status < 400 || !["application/json", "application/octet-stream"].some(type => upstream.headers.get("content-type")?.startsWith(type))) return errorResponse(503, "Die Verbindung zur Akte konnte nicht hergestellt werden. Bitte wende dich an KlarVoran.");
    const responseHeaders = new Headers(privateHeaders);
    for (const key of ["content-type", "content-disposition", "retry-after"]) {
      const value = upstream.headers.get(key);
      if (value) responseHeaders.set(key, value);
    }
    for (const cookieValue of upstream.headers.getSetCookie()) if (cookieName.test(cookieValue.split("=")[0]) && /;\s*httponly(?:;|$)/i.test(cookieValue) && /;\s*secure(?:;|$)/i.test(cookieValue) && !/;\s*domain=/i.test(cookieValue)) responseHeaders.append("set-cookie", cookieValue);
    // Stream downloads (up to 8 MB). Buffered Vercel function payloads have a 4.5 MB ceiling.
    const response = new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
    return response;
  } catch (error) {
    return error instanceof PayloadTooLarge ? errorResponse(413, "Die Anfrage ist zu groß.") : errorResponse(503, "Die Verbindung ist gerade unterbrochen. Bitte versuche es erneut.");
  }
}

export async function deliverParticipantMail(request: Request, config: ParticipantConfig, send: typeof fetch = fetch) {
  if (!participantConfigured(config)) return errorResponse(503, "Der E-Mail-Versand ist noch nicht eingerichtet.");
  const timestamp = request.headers.get("x-portal-time") ?? "", nonce = request.headers.get("x-portal-nonce") ?? "";
  if (!/^\d{13}$/.test(timestamp) || Math.abs(Date.now() - Number(timestamp)) > GATEWAY_MAX_AGE_MS || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(nonce)) return errorResponse(403, "Diese Anfrage ist nicht zulässig.");
  try {
    const body = await limitedBody(request, 4096);
    const expected = await gatewayMac(selectedSecrets(config).gatewayKey!, proofText("POST", "/api/teilnehmer/mail", timestamp, nonce, await gatewayDigest(body), "mail"));
    if (!safeEqual(expected, request.headers.get("x-portal-proof") ?? "")) return errorResponse(403, "Diese Anfrage ist nicht zulässig.");
    const message = JSON.parse(new TextDecoder().decode(body)) as { kind?: unknown; email?: unknown; code?: unknown; role?: unknown; operatingMode?: unknown };
    if (typeof message.email !== "string" || message.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email) || !["invitation", "code"].includes(String(message.kind)) ||
        message.kind === "code" && (typeof message.code !== "string" || !/^\d{6}$/.test(message.code)) ||
        message.role !== undefined && !["participant", "coach"].includes(String(message.role))) return errorResponse(400, "Die E-Mail-Angaben sind ungültig.");
    const real = participantRealOperationConfigured(config);
    if (message.operatingMode !== undefined && message.operatingMode !== (real ? "real" : "test") || real && message.operatingMode !== "real")
      return errorResponse(409, "Der Betriebsmodus für den E-Mail-Zugang stimmt nicht überein.");
    const loginUrl = message.role === "coach" ? "https://www.klarvoran.de/coach" : "https://www.klarvoran.de/teilnehmer";
    const text = message.kind === "code" ? [
      "Dein Bestätigungscode für KlarVoran:", String(message.code), "",
      "Der Code gilt fünf Minuten und kann nur einmal zur Anmeldung verwendet werden.",
      `Gib ihn auf ${loginUrl} ein. Teile den Code mit niemandem.`,
      "Wenn du die Anmeldung nicht angefordert hast, ignoriere diese E-Mail.",
    ].join("\n") : [
      "Hallo,", "", real ? "Dein persönlicher KlarVoran-Zugang wurde freigegeben." : "Dein persönlicher KlarVoran-Testzugang wurde freigegeben.",
      ...(message.role === "participant" ? ["Datenschutzinformation vor der Anmeldung: https://www.klarvoran.de/teilnehmer/datenschutz"] : []),
      `Öffne ${loginUrl}`, "Gib die E-Mail-Adresse ein, an die diese Einladung geschickt wurde.",
      "Du erhältst einen Bestätigungscode per E-Mail. Gib den Code auf der Seite ein.",
      message.role === "coach" ? `Danach kannst du die dir zugewiesenen ${real ? "Akten" : "Testakten"} und Dokumente öffnen.` : "Danach kannst du deine eigene Akte öffnen, Dokumente hochladen und Hinweise ansehen.",
      "Du brauchst kein ChatGPT-Konto und kein Passwort.", "",
      ...(real ? [] : ["Wir testen noch: Bitte lade ausschließlich Dokumente mit erfundenen Angaben hoch."]),
      "Du brauchst Unterstützung? KlarVoran hilft dir unter 0177 9548140.",
    ].join("\n");
    const result = await send("https://api.resend.com/emails", { method: "POST", redirect: "manual", signal: AbortSignal.timeout(10_000),
      headers: { authorization: `Bearer ${config.resendKey}`, "content-type": "application/json", "idempotency-key": `participant-${nonce}` },
      body: JSON.stringify({ from: config.sender, to: [message.email], subject: message.kind === "code" ? "Dein KlarVoran-Bestätigungscode" : real ? "Dein persönlicher KlarVoran-Zugang" : "Dein persönlicher KlarVoran-Testzugang", text }),
    });
    if (!result.ok) return errorResponse(502, "Die E-Mail konnte nicht übergeben werden.");
    return Response.json({ accepted: true }, { headers: privateHeaders });
  } catch (error) {
    return error instanceof PayloadTooLarge ? errorResponse(413, "Die Anfrage ist zu groß.") : errorResponse(502, "Die E-Mail konnte nicht übergeben werden.");
  }
}

class PayloadTooLarge extends Error {}
async function limitedBody(request: Request, maximum: number) {
  const declared = request.headers.get("content-length");
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > maximum)) throw new PayloadTooLarge();
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader(), parts: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maximum) { await reader.cancel(); throw new PayloadTooLarge(); }
    parts.push(value);
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) { result.set(part, offset); offset += part.byteLength; }
  return result;
}
