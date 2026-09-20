import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit } from "./rate-limit";

test("Rate-Limit blockiert nach Erreichen des Limits", () => {
  const key = `test:${Date.now()}:${Math.random()}`;

  assert.equal(checkRateLimit(key, 2, 60_000).allowed, true);
  assert.equal(checkRateLimit(key, 2, 60_000).allowed, true);

  const blocked = checkRateLimit(key, 2, 60_000);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds > 0);
});
