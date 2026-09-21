import "server-only";
import { siteConfig } from "@/lib/site-config";

export type LeadPayload = {
  formType: "kontakt" | "termin" | "avgs-schnellcheck";
  name: string;
  email: string;
  phone?: string;
  summaryLines: string[];
};

export type SendResult = {
  delivered: boolean;
  dev: boolean;
};

const LEAD_RECIPIENT = process.env.LEAD_INBOX_EMAIL?.trim() || siteConfig.contact.email;

function getHttpsWebhookUrl() {
  const candidate = process.env.FORM_WEBHOOK_URL?.trim();
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Adapter für den Lead-Versand. Nutzt, sofern konfiguriert, die Resend-HTTP-API
 * (RESEND_API_KEY) oder einen generischen Webhook (FORM_WEBHOOK_URL, z. B. für ein
 * CRM). Ohne Konfiguration wird in Development ein klar gekennzeichneter,
 * datensparsamer Fallback geloggt; in Production wird niemals ein Erfolg
 * vorgetäuscht, wenn kein Versand stattgefunden hat.
 */
export async function sendLead(payload: LeadPayload): Promise<SendResult> {
  const subject = `Neue Anfrage (${payload.formType}) – ${payload.name}`;
  const text = [
    `Formular: ${payload.formType}`,
    `Name: ${payload.name}`,
    `E-Mail: ${payload.email}`,
    payload.phone ? `Telefon: ${payload.phone}` : null,
    "",
    ...payload.summaryLines,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_SENDER_EMAIL?.trim() || `KlarVoran Website <onboarding@resend.dev>`,
          to: [LEAD_RECIPIENT],
          reply_to: payload.email,
          subject,
          text,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      return { delivered: res.ok, dev: false };
    }

    const webhookUrl = getHttpsWebhookUrl();
    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, ...payload }),
        signal: AbortSignal.timeout(10_000),
      });
      return { delivered: res.ok, dev: false };
    }

    if (process.env.FORM_WEBHOOK_URL?.trim()) {
      console.error("Lead-Versand fehlgeschlagen: FORM_WEBHOOK_URL muss eine gültige HTTPS-Adresse sein.");
      return { delivered: false, dev: false };
    }
  } catch (error) {
    // Transport errors can include webhook URLs or credentials. Log only the
    // error category; never a provider response or the submitted enquiry.
    console.error("Lead-Versand fehlgeschlagen:", error instanceof Error ? error.name : "Unbekannter Fehler");
    return { delivered: false, dev: false };
  }

  if (process.env.NODE_ENV !== "production") {
    // Datensparsamer Development-Fallback – kein echter Versand.
    console.info(`[DEV] Formular ${payload.formType}: kein Versanddienst konfiguriert. Personenbezogene Inhalte werden nicht protokolliert.`);
    return { delivered: true, dev: true };
  }

  return { delivered: false, dev: false };
}
