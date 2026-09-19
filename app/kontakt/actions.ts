"use server";

import { contactSchema } from "@/lib/server/schemas";
import { sendLead } from "@/lib/server/mailer";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getClientIp } from "@/lib/server/request-ip";
import type { ActionState } from "@/lib/server/action-state";

const requestTypeLabels: Record<string, string> = {
  avgs_rueckfrage: "AVGS / Rückfrage zur Maßnahme",
  kooperation: "Kooperation",
  unterauftrag: "Unterauftrag / Leistungsbaustein",
  workshop: "Workshop / Gruppenformat",
  oeffentlicher_auftrag: "Öffentlicher Auftrag",
  sonstiges: "Sonstiges",
};

const sourceLabels: Record<string, string> = {
  google: "Google / Suchmaschine",
  ba_portal: "Portal der Bundesagentur für Arbeit",
  jobcenter_arbeitsagentur: "Jobcenter / Agentur für Arbeit",
  einrichtung_traeger: "Einrichtung / Bildungsträger",
  empfehlung: "Persönliche Empfehlung",
  social_media: "Social Media",
  sonstiges: "Sonstiges",
};

export async function submitContactForm(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const formal = formData.get("formality") === "formal";
  const ip = await getClientIp();
  const rate = checkRateLimit(`kontakt:${ip}`, 5, 60_000);
  if (!rate.allowed) {
    return {
      status: "rate-limited",
      message: formal
        ? `Zu viele Anfragen. Bitte versuchen Sie es in ${rate.retryAfterSeconds} Sekunden erneut oder schreiben Sie uns direkt per WhatsApp.`
        : `Zu viele Anfragen. Bitte versuche es in ${rate.retryAfterSeconds} Sekunden erneut oder schreib uns direkt per WhatsApp.`,
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: formal ? "Bitte überprüfen Sie Ihre Eingaben." : "Bitte überprüfe deine Eingaben.",
      fieldErrors,
    };
  }

  if (parsed.data.website) {
    // Honeypot ausgelöst – stiller Erfolg, kein echter Versand.
    return {
      status: "success",
      message: formal
        ? "Vielen Dank für Ihre Nachricht. Wir melden uns in der Regel innerhalb von 1–2 Werktagen bei Ihnen."
        : "Danke für deine Nachricht! Wir melden uns in der Regel innerhalb von 1–2 Werktagen bei dir.",
    };
  }

  const result = await sendLead({
    formType: "kontakt",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    summaryLines: [
      parsed.data.organization ? `Organisation: ${parsed.data.organization}` : "",
      parsed.data.role ? `Funktion: ${parsed.data.role}` : "",
      parsed.data.requestType ? `Art der Anfrage: ${requestTypeLabels[parsed.data.requestType]}` : "",
      parsed.data.timeframe ? `Gewünschter Zeitraum: ${parsed.data.timeframe}` : "",
      parsed.data.source ? `Quelle: ${sourceLabels[parsed.data.source]}` : "",
      "Nachricht:",
      parsed.data.message,
    ],
  });

  if (result.dev) {
    return {
      status: "dev-success",
      message:
        formal
          ? "Development-Modus: Kein E-Mail-Dienst konfiguriert. Ihre Anfrage wurde in der Server-Konsole protokolliert, nicht wirklich versendet."
          : "Development-Modus: Kein E-Mail-Dienst konfiguriert. Deine Anfrage wurde in der Server-Konsole protokolliert, nicht wirklich versendet.",
    };
  }

  if (!result.delivered) {
    return {
      status: "error",
      message:
        formal
          ? "Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte erreichen Sie uns in der Zwischenzeit direkt per Telefon, E-Mail oder WhatsApp."
          : "Deine Anfrage konnte gerade nicht übermittelt werden. Bitte erreiche uns in der Zwischenzeit direkt per Telefon, E-Mail oder WhatsApp.",
    };
  }

  return {
    status: "success",
    message: formal
      ? "Vielen Dank für Ihre Nachricht. Wir melden uns in der Regel innerhalb von 1–2 Werktagen bei Ihnen."
      : "Danke für deine Nachricht! Wir melden uns in der Regel innerhalb von 1–2 Werktagen bei dir.",
  };
}
