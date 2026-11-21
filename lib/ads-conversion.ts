export const ADS_TAG_ID = "AW-18584694795";
const LEAD_SEND_TO = `${ADS_TAG_ID}/tKwHCK6zybsdEIvg751F`;
export const ADS_CONSENT_KEY = "klarvoran-ads-consent-v1";

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readAdsConsent(): "granted" | "denied" | null {
  try {
    const choice = window.localStorage.getItem(ADS_CONSENT_KEY);
    return choice === "granted" || choice === "denied" ? choice : null;
  } catch {
    return null;
  }
}

export function setAdsConsent(choice: "granted" | "denied") {
  try {
    window.localStorage.setItem(ADS_CONSENT_KEY, choice);
  } catch {
    // Without storage, consent applies only to this page.
  }

  if (choice === "denied") {
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    return;
  }

  window.dataLayer ||= [];
  window.gtag ||= (...args: unknown[]) => { window.dataLayer?.push(args); };
  // Basic consent mode: no Google request or tag before the explicit choice.
  if (!document.getElementById("klarvoran-google-ads-tag")) {
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    window.gtag("config", ADS_TAG_ID, { send_page_view: false });
    const script = document.createElement("script");
    script.id = "klarvoran-google-ads-tag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_TAG_ID}`;
    document.head.appendChild(script);
  } else {
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  }
}

/** Called only after the server confirms that a real enquiry was delivered. */
export function trackDeliveredLead() {
  if (readAdsConsent() !== "granted" || !window.gtag) return;
  window.gtag("event", "conversion", {
    send_to: LEAD_SEND_TO,
    value: 1,
    currency: "EUR",
  });
}
