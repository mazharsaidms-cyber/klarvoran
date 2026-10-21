const encoder = new TextEncoder();
export const GATEWAY_MAX_BODY = 2_200_000;
export const GATEWAY_MAX_AGE_MS = 60_000;
export const PARTICIPANT_CHUNK_BYTES = 2_000_000;

export async function gatewayDigest(body: ArrayBuffer | Uint8Array | string) {
  const bytes = typeof body === "string" ? encoder.encode(body) : body;
  return hex(await crypto.subtle.digest("SHA-256", bytes as BufferSource));
}

export async function gatewayMac(secret: string, value: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export function proofText(method: string, target: string, timestamp: string, nonce: string, digest: string, client: string) {
  return ["klarvoran-participant-v1", method, target, timestamp, nonce, digest, client].join("\n");
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i += 1) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

export function gatewayTargetAllowed(method: string, target: string) {
  if (!target.startsWith("/") || target.startsWith("//") || target.includes("#") || target.includes("\\")) return false;
  let url: URL;
  try { url = new URL(target, "https://gateway.invalid"); } catch { return false; }
  if (url.origin !== "https://gateway.invalid") return false;
  const allowed = new Map([
    ["/me", ["GET"]], ["/documents", ["GET", "PATCH"]], ["/file", ["GET"]],
    ["/messages", ["GET", "POST"]],
    ["/document-requests", ["GET", "POST"]], ["/document-requests/file", ["GET"]],
    ["/progress", ["GET"]], ["/coach-sessions", ["GET", "POST"]],
    ["/upload/start", ["POST"]], ["/upload/chunk", ["POST"]], ["/upload/finish", ["POST"]],
    ["/auth/email-otp/send-verification-otp", ["POST"]],
    ["/auth/sign-in/email-otp", ["POST"]], ["/auth/sign-out", ["POST"]],
  ]);
  return Boolean(allowed.get(url.pathname)?.includes(method));
}

function hex(value: ArrayBuffer) {
  return Array.from(new Uint8Array(value), b => b.toString(16).padStart(2, "0")).join("");
}
