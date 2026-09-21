"use server";

import { appointmentSchema } from "@/lib/server/schemas";
import { sendLead } from "@/lib/server/mailer";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getClientIp } from "@/lib/server/request-ip";
import type { ActionState } from "@/lib/server/action-state";

const formatLabels: Record<string, string> = {
  praesenz_kriftel: "Präsenz (Taunusstraße 52, Kriftel)",
  online: "Online",
  hybrid: "Hybrid",
  unsicher: "Noch unsicher",
};

const avgsLabels: Record<string, string> = {
  ja: "Ja, ich habe bereits einen AVGS",
  nein: "Nein, noch nicht",
  unsicher: "Ich bin unsicher",
};

export async function submitAppointmentRequest(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ip = await getClientIp();
  const rate = checkRateLimit(`termin:${ip}`, 5, 60_000);
  if (!rate.allowed) {
    return {
      status: "rate-limited",
      message: `Zu viele Anfragen. Bitte versuche es in ${rate.retryAfterSeconds} Sekunden erneut oder ruf uns direkt an.`,
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = appointmentSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Bitte überprüfe deine Eingaben.", fieldErrors };
  }

  if (parsed.data.website) {
    return {
      status: "success",
      message: "Danke für deine Terminanfrage! Wir melden uns in der Regel innerhalb von 1–2 Werktagen, um einen Termin zu finden.",
    };
  }

  const result = await sendLead({
    formType: "termin",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    summaryLines: [
      `Bevorzugte Form: ${formatLabels[parsed.data.format]}`,
      `AVGS-Status: ${avgsLabels[parsed.data.hasAvgs]}`,
      parsed.data.message ? `Nachricht: ${parsed.data.message}` : "",
    ],
  });

  if (result.dev) {
    return {
      status: "dev-success",
      message:
        "Development-Modus: Kein E-Mail-Dienst konfiguriert. Deine Terminanfrage wurde nicht versendet.",
    };
  }

  if (!result.delivered) {
    return {
      status: "error",
      message:
        "Deine Terminanfrage konnte gerade nicht übermittelt werden. Bitte erreiche uns in der Zwischenzeit direkt per Telefon, E-Mail oder WhatsApp.",
    };
  }

  return {
    status: "success",
    message: "Danke für deine Terminanfrage! Wir melden uns in der Regel innerhalb von 1–2 Werktagen, um einen Termin zu finden.",
  };
}
