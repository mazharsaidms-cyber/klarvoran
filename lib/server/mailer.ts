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

const LEAD_RECIPIENT = process.env.LEAD_RECIPIENT_EMAIL || siteConfig.contact.email;

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
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_SENDER_EMAIL || `KlarVoran Website <onboarding@resend.dev>`,
          to: [LEAD_RECIPIENT],
          reply_to: payload.email,
          subject,
          text,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      return { delivered: res.ok, dev: false };
    }

    if (process.env.FORM_WEBHOOK_URL) {
      const res = await fetch(process.env.FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, ...payload }),
        signal: AbortSignal.timeout(10_000),
      });
      return { delivered: res.ok, dev: false };
    }
  } catch (error) {
    console.error("Lead-Versand fehlgeschlagen:", error instanceof Error ? error.message : "Unbekannter Fehler");
    return { delivered: false, dev: false };
  }

  if (process.env.NODE_ENV !== "production") {
    // Datensparsamer Development-Fallback – kein echter Versand.
    console.log(`[DEV] Kein E-Mail-/CRM-Dienst konfiguriert. Anfrage würde gesendet an ${LEAD_RECIPIENT}:`);
    console.log(text);
    return { delivered: true, dev: true };
  }

  return { delivered: false, dev: false };
}
