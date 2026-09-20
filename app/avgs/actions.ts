"use server";

import { avgsCheckSchema } from "@/lib/server/schemas";
import { sendLead } from "@/lib/server/mailer";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getClientIp } from "@/lib/server/request-ip";
import { avgsAnliegenLabels } from "@/lib/avgs-logic";
import type { ActionState } from "@/lib/server/action-state";

const statusLabels: Record<string, string> = {
  hat_avgs: "Hat bereits einen AVGS",
  moechte_beantragen: "Möchte einen AVGS beantragen",
  unsicher: "Unsicher, ob Anspruch besteht",
};

const traegerLabels: Record<string, string> = {
  jobcenter: "Jobcenter",
  arbeitsagentur: "Agentur für Arbeit",
  andere_unsicher: "Anderer / unsicher",
};

const formatLabels: Record<string, string> = {
  praesenz_kriftel: "Präsenz (Taunusstraße 52, Kriftel)",
  online: "Online",
  hybrid: "Hybrid",
  unsicher: "Noch unsicher",
};

export async function submitAvgsCheck(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ip = await getClientIp();
  const rate = checkRateLimit(`avgs-check:${ip}`, 5, 60_000);
  if (!rate.allowed) {
    return {
      status: "rate-limited",
      message: `Zu viele Anfragen. Bitte versuche es in ${rate.retryAfterSeconds} Sekunden erneut.`,
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = avgsCheckSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Bitte überprüfe deine Eingaben.", fieldErrors };
  }

  if (parsed.data.website) {
    return { status: "success", message: "Danke! Wir melden uns in der Regel innerhalb von 1–2 Werktagen bei dir." };
  }

  const result = await sendLead({
    formType: "avgs-schnellcheck",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    summaryLines: [
      `AVGS-Status: ${statusLabels[parsed.data.status]}`,
      `Kostenträger: ${traegerLabels[parsed.data.traeger]}`,
      `Anliegen: ${avgsAnliegenLabels[parsed.data.anliegen]}`,
      `Bevorzugte Form: ${formatLabels[parsed.data.format]}`,
    ],
  });

  if (result.dev) {
    return {
      status: "dev-success",
      message:
        "Development-Modus: Kein E-Mail-Dienst konfiguriert. Deine Angaben wurden in der Server-Konsole protokolliert, nicht wirklich versendet.",
    };
  }

  if (!result.delivered) {
    return {
      status: "error",
      message:
        "Deine Angaben konnten gerade nicht übermittelt werden. Bitte erreiche uns in der Zwischenzeit direkt per Telefon, E-Mail oder WhatsApp.",
    };
  }

  return { status: "success", message: "Danke! Wir melden uns in der Regel innerhalb von 1–2 Werktagen bei dir." };
}
