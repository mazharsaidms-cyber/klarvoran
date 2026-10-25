import assert from "node:assert/strict";
import test from "node:test";
import { zoomMeetingUrlFromMessage } from "./zoom-link";

test("a Zoom invitation in a case message opens only a real HTTPS meeting host", () => {
  const invitation = "Unser Termin: https://us06web.zoom.us/j/12345678901?pwd=TestPasswort.";
  assert.equal(zoomMeetingUrlFromMessage(invitation), "https://us06web.zoom.us/j/12345678901?pwd=TestPasswort");
  assert.equal(zoomMeetingUrlFromMessage("https://zoom.us/my/klarvoran"), "https://zoom.us/my/klarvoran");
  for (const unsafe of [
    "http://zoom.us/j/123456789", "https://zoom.us.evil.example/j/123456789",
    "https://zoom.us@evil.example/j/123456789", "https://evil.example/zoom.us/j/123456789",
    "https://zoom.us/signin", "javascript:alert(1)",
  ]) assert.equal(zoomMeetingUrlFromMessage(unsafe), null, unsafe);
});
