import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { ADS_CONSENT_KEY, readAdsConsent, setAdsConsent, trackDeliveredLead } from "./ads-conversion.ts";

test("Google tag is loaded only after explicit opt-in and stops tracking after withdrawal", () => {
  const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", { url: "https://www.klarvoran.de/avgs" });
  Object.assign(globalThis, { window: dom.window, document: dom.window.document });

  assert.equal(readAdsConsent(), null);
  trackDeliveredLead();
  assert.equal(document.querySelectorAll('script[src*="googletagmanager"]').length, 0);

  setAdsConsent("denied");
  assert.equal(window.localStorage.getItem(ADS_CONSENT_KEY), "denied");
  assert.equal(document.querySelectorAll('script[src*="googletagmanager"]').length, 0);

  setAdsConsent("granted");
  assert.equal(document.querySelectorAll('script[src*="googletagmanager"]').length, 1);
  trackDeliveredLead();
  assert.equal(window.dataLayer?.filter((entry) => entry[0] === "event").length, 1);
  assert.equal(window.dataLayer?.find((entry) => entry[0] === "event")?.[1], "conversion");

  setAdsConsent("denied");
  trackDeliveredLead();
  assert.equal(window.dataLayer?.filter((entry) => entry[0] === "event").length, 1);
  dom.window.close();
});
