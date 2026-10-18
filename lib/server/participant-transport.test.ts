import assert from "node:assert/strict";
import { test } from "node:test";
import { deliverParticipantMail, participantConfigured, proxyParticipant, type ParticipantConfig } from "./participant-transport";
import { gatewayDigest, gatewayMac, proofText } from "../participant-gateway-proof";

const config: ParticipantConfig = { enabled: "true", gatewayKey: "g".repeat(43), backendBearer: "b".repeat(43), resendKey: "re_fake_local_test", sender: "KlarVoran <info@klarvoran.de>" };
function client(path: string, init: RequestInit = {}) { return new Request(`https://www.klarvoran.de/api/teilnehmer${path}`, { ...init,
  headers: { origin: "https://www.klarvoran.de", "content-type": "application/json", "x-forwarded-for": "192.0.2.20", ...Object.fromEntries(new Headers(init.headers)) } }); }
async function mailRequest(message: unknown, changes: Record<string, string> = {}) {
  const body = JSON.stringify(message), timestamp = String(Date.now()), nonce = crypto.randomUUID();
  const proof = await gatewayMac(config.gatewayKey!, proofText("POST", "/api/teilnehmer/mail", timestamp, nonce, await gatewayDigest(body), "mail"));
  return client("/mail", { method: "POST", body, headers: { "x-portal-time": timestamp, "x-portal-nonce": nonce, "x-portal-proof": proof, ...changes } });
}

test("missing bridge or sender configuration closes email access", async () => {
  for (const incomplete of [{ ...config, enabled: "false" }, { ...config, gatewayKey: "" }, { ...config, backendBearer: "" }, { ...config, resendKey: "" }, { ...config, sender: "onboarding@resend.dev" }]) {
    assert.equal(participantConfigured(incomplete), false);
    assert.equal((await proxyParticipant(client("/me"), "/me", incomplete, async () => { throw new Error("must not send"); })).status, 503);
  }
});
test("participant proxy permits only narrow endpoints and same-origin writes", async () => {
  const send: typeof fetch = async () => { throw new Error("must not send"); };
  assert.equal((await proxyParticipant(client("/access"), "/access", config, send)).status, 404);
  assert.equal((await proxyParticipant(client("/auth/sign-up/email", { method: "POST", body: "{}" }), "/auth/sign-up/email", config, send)).status, 404);
  assert.equal((await proxyParticipant(client("/auth/sign-out", { method: "POST", body: "{}", headers: { origin: "https://foreign.example.invalid" } }), "/auth/sign-out", config, send)).status, 403);
  assert.equal((await proxyParticipant(client("/me", { headers: { "sec-fetch-site": "cross-site" } }), "/me", config, send)).status, 403);
  assert.equal((await proxyParticipant(client("/documents", { method: "PATCH", body: "{}", headers: { origin: "https://foreign.example.invalid" } }), "/documents", config, send)).status, 403);
  assert.equal((await proxyParticipant(client("/access", { method: "PATCH", body: "{}" }), "/access", config, send)).status, 404);
});
test("coach review is forwarded only to the document endpoint with the signed request body", async () => {
  const body = JSON.stringify({ documentId: "test-document", action: "mark_reviewed" });
  const response = await proxyParticipant(client("/documents", { method: "PATCH", body }), "/documents", config, async (_, init) => {
    const headers = new Headers(init?.headers);
    assert.equal(init?.method, "PATCH");
    assert.equal(await new Response(init?.body).text(), body);
    assert.equal(headers.get("x-portal-proof"), await gatewayMac(config.gatewayKey!, proofText("PATCH", "/documents", headers.get("x-portal-time")!, headers.get("x-portal-nonce")!, await gatewayDigest(body), headers.get("x-portal-client")!)));
    return Response.json({ documentId: "test-document", status: "reviewed" });
  });
  assert.equal(response.status, 200);
});
test("case messages require signed same-origin requests and preserve the test confirmation", async () => {
  const body = JSON.stringify({ participantId: "fictional-case", body: "Fiktive Antwort", testDataConfirmed: true });
  const response = await proxyParticipant(client("/messages", { method: "POST", body }), "/messages", config, async (_, init) => {
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("x-portal-target"), "/messages");
    assert.equal(await new Response(init?.body).text(), body);
    assert.equal(headers.get("x-portal-proof"), await gatewayMac(config.gatewayKey!, proofText("POST", "/messages", headers.get("x-portal-time")!, headers.get("x-portal-nonce")!, await gatewayDigest(body), headers.get("x-portal-client")!)));
    return Response.json({ id: "fictional-message" }, { status: 201 });
  });
  assert.equal(response.status, 201);
  assert.equal((await proxyParticipant(client("/messages", { method: "POST", body, headers: { origin: "https://foreign.example.invalid" } }), "/messages", config, async () => { throw new Error("must not send"); })).status, 403);
  assert.equal((await proxyParticipant(client("/messages", { method: "PATCH", body }), "/messages", config, async () => { throw new Error("must not send"); })).status, 404);
});
test("coach session POST is signed with its exact body and rejects a foreign origin", async () => {
  const body = JSON.stringify({ participantId: "CASE-FIKTIV", appointmentId: "DATE-FIKTIV", attendance: "Anwesend",
    endTime: "11:30", pauseMinutes: 0, performedUe: 2, topic: "Fiktives Thema", result: "Fiktives Ergebnis",
    nextStep: "Fiktiver Schritt", expectedRevision: 4, testDataConfirmed: true });
  const response = await proxyParticipant(client("/coach-sessions", { method: "POST", body }), "/coach-sessions", config, async (url, init) => {
    assert.equal(String(url), "https://ms-coaching-prototyp.mazhar-said-ms.chatgpt.site/api/participant-gateway");
    assert.equal(init?.method, "POST");
    const headers = new Headers(init?.headers), actual = await new Response(init?.body).text();
    assert.equal(headers.get("x-portal-target"), "/coach-sessions");
    assert.equal(headers.get("content-type"), "application/json");
    assert.equal(actual, body);
    assert.equal(headers.get("x-portal-proof"), await gatewayMac(config.gatewayKey!, proofText("POST", "/coach-sessions",
      headers.get("x-portal-time")!, headers.get("x-portal-nonce")!, await gatewayDigest(actual), headers.get("x-portal-client")!)));
    return Response.json({ saved: true, revision: 5 });
  });
  assert.deepEqual(await response.json(), { saved: true, revision: 5 });
  assert.equal((await proxyParticipant(client("/coach-sessions", { method: "POST", body,
    headers: { origin: "https://foreign.example.invalid" } }), "/coach-sessions", config,
    async () => { throw new Error("must not send"); })).status, 403);
});
test("own progress is available read-only through the signed bridge", async () => {
  const response = await proxyParticipant(client("/progress"), "/progress", config, async (_, init) => {
    assert.equal(init?.method, "GET");
    assert.equal(new Headers(init?.headers).get("x-portal-target"), "/progress");
    return Response.json({ goal: "Fiktives Ziel", goalSteps: [], appointments: [] });
  });
  assert.equal(response.status, 200);
  assert.equal((await proxyParticipant(client("/progress", { method: "POST", body: "{}" }), "/progress", config, async () => { throw new Error("must not send"); })).status, 404);
});
test("bridge signs actual body and replaces all browser identity and authorization headers", async () => {
  let called = false;
  const body = JSON.stringify({ email: "fictitious@example.invalid", type: "sign-in" });
  const response = await proxyParticipant(client("/auth/email-otp/send-verification-otp", { method: "POST", body,
    headers: { "oai-authenticated-user-email": "forged-admin@example.invalid", authorization: "forged", "x-klarvoran-actor": "forged", "x-portal-proof": "forged", cookie: "other-session=secret; __Secure-klarvoran-participant.session_token=fake-cookie" } }), "/auth/email-otp/send-verification-otp", config, async (url, init) => {
    called = true; assert.equal(String(url), "https://ms-coaching-prototyp.mazhar-said-ms.chatgpt.site/api/participant-gateway");
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("oai-authenticated-user-email"), null); assert.equal(headers.get("x-klarvoran-actor"), null); assert.equal(headers.get("authorization"), null);
    assert.equal(headers.get("oai-sites-authorization"), `Bearer ${config.backendBearer}`); assert.equal(headers.get("cookie"), "__Secure-klarvoran-participant.session_token=fake-cookie");
    const actual = await new Response(init?.body).text(); assert.equal(actual, body);
    assert.equal(headers.get("x-portal-proof"), await gatewayMac(config.gatewayKey!, proofText("POST", headers.get("x-portal-target")!, headers.get("x-portal-time")!, headers.get("x-portal-nonce")!, await gatewayDigest(actual), headers.get("x-portal-client")!)));
    assert.equal(init?.redirect, "manual"); return Response.json({ success: true });
  });
  assert.ok(called); assert.deepEqual(await response.json(), { success: true }); assert.match(response.headers.get("cache-control")!, /no-store/);
});
test("gate redirects are reported as connection failure without following redirects", async () => {
  const response = await proxyParticipant(client("/me"), "/me", config, async () => new Response(null, { status: 307, headers: { location: "https://foreign.example.invalid/login" } }));
  assert.equal(response.status, 503); assert.equal(response.headers.get("location"), null); assert.ok(!JSON.stringify(await response.json()).includes(config.backendBearer!));
});
test("large file response streams without buffered content length and only secure SDK cookies survive", async () => {
  const header = new Headers({ "content-type": "application/octet-stream", "content-length": "6000000", "content-disposition": "attachment; filename=Fiktiv.pdf" });
  header.append("set-cookie", "__Secure-klarvoran-participant.session_token=fake; Path=/; HttpOnly; Secure; SameSite=Lax");
  header.append("set-cookie", "unsafe=bad; Path=/"); header.append("set-cookie", "__Secure-klarvoran-participant.other=bad; Domain=foreign.example.invalid; HttpOnly; Secure");
  let parts = 0;
  const body = new ReadableStream({ pull(controller) { if (++parts > 6) controller.close(); else controller.enqueue(new Uint8Array(1_000_000)); } });
  const response = await proxyParticipant(client("/file?documentId=fictitious"), "/file?documentId=fictitious", config, async () => new Response(body, { headers: header }));
  assert.equal(response.status, 200); assert.equal(response.headers.get("content-length"), null); assert.equal(response.headers.getSetCookie().length, 1);
  assert.equal((await response.arrayBuffer()).byteLength, 6_000_000);
});
test("oversized upload request is refused before contacting private backend", async () => {
  const response = await proxyParticipant(client("/upload/chunk?id=fake&part=0", { method: "POST", body: new Uint8Array(2_200_001), headers: { "content-type": "application/octet-stream" } }), "/upload/chunk?id=fake&part=0", config, async () => { throw new Error("must not send"); });
  assert.equal(response.status, 413);
});
test("unsigned or altered email callback cannot cause delivery", async () => {
  const send: typeof fetch = async () => { throw new Error("must not send"); };
  const message = { kind: "code", email: "fictitious@example.invalid", code: "123456" };
  assert.equal((await deliverParticipantMail(await mailRequest(message, { "x-portal-proof": "bad" }), config, send)).status, 403);
  assert.equal((await deliverParticipantMail(await mailRequest(message, { "x-portal-time": String(Date.now() - 120000) }), config, send)).status, 403);
});
test("signed invitation uses existing Resend project key and carries no case information", async () => {
  const request = await mailRequest({ kind: "invitation", email: "fictitious@example.invalid" });
  const response = await deliverParticipantMail(request, config, async (url, init) => {
    assert.equal(String(url), "https://api.resend.com/emails"); const headers = new Headers(init?.headers);
    assert.equal(headers.get("authorization"), `Bearer ${config.resendKey}`); assert.match(headers.get("idempotency-key")!, /^participant-[0-9a-f-]{36}$/);
    const message = JSON.parse(String(init?.body)); assert.deepEqual(message.to, ["fictitious@example.invalid"]); assert.equal(message.from, config.sender);
    assert.match(message.text, /kein ChatGPT-Konto/); assert.match(message.text, /erfundenen Angaben/); assert.ok(!("document" in message)); assert.ok(!message.text.includes(config.gatewayKey!));
    return Response.json({ id: "fake-provider-receipt" });
  });
  assert.deepEqual(await response.json(), { accepted: true });
});
test("coach invitation points to the independent coach login without case details", async () => {
  const response = await deliverParticipantMail(await mailRequest({ kind: "invitation", role: "coach", email: "coach@example.invalid" }), config, async (_, init) => {
    const message = JSON.parse(String(init?.body));
    assert.match(message.text, /klarvoran\.de\/coach/);
    assert.match(message.text, /kein ChatGPT-Konto/);
    assert.ok(!message.text.includes("Mazhar"));
    assert.ok(!message.text.includes("participantId"));
    return Response.json({ id: "fake-provider-receipt" });
  });
  assert.equal(response.status, 200);
});
test("provider refusal is a truthful mail failure, not a simulated success", async () => {
  const response = await deliverParticipantMail(await mailRequest({ kind: "code", email: "fictitious@example.invalid", code: "123456" }), config, async () => Response.json({ message: "private provider detail" }, { status: 403 }));
  assert.equal(response.status, 502); const result = await response.json(); assert.ok(result.error); assert.ok(!JSON.stringify(result).includes("private provider detail"));
});
