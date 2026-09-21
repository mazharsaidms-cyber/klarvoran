import { z } from "zod";
import { formLimits } from "@/lib/form-limits";

const name = z.string().trim().min(2, "Bitte Namen eingeben.")
  .max(formLimits.name, "Bitte höchstens 120 Zeichen eingeben.")
  .regex(/^[^\r\n\u0000-\u001f\u007f]+$/, "Bitte den Namen ohne Zeilenumbrüche eingeben.");
const email = z.string().trim().max(formLimits.email, "Bitte eine gültige E-Mail-Adresse eingeben.")
  .email("Bitte eine gültige E-Mail-Adresse eingeben.");
const phone = z
  .string()
  .trim()
  .max(formLimits.phone, "Bitte höchstens 40 Zeichen eingeben.")
  .optional()
  .or(z.literal(""));
// Honeypot: bleibt für Menschen unsichtbar. Ein ausgefüllter Wert wird erst
// nach der Validierung still abgefangen, damit Bots keinen Erkennungshinweis
// erhalten.
const honeypot = z.string().max(500).optional().or(z.literal(""));

export const contactSchema = z.object({
  name,
  email,
  phone,
  message: z.string().trim().min(10, "Bitte das Anliegen etwas ausführlicher beschreiben.")
    .max(formLimits.message, "Bitte höchstens 4.000 Zeichen eingeben."),
  formality: z.enum(["informal", "formal"]).default("informal"),
  organization: z.string().trim().max(formLimits.organization, "Bitte höchstens 200 Zeichen eingeben.").optional().or(z.literal("")),
  role: z.string().trim().max(formLimits.role, "Bitte höchstens 160 Zeichen eingeben.").optional().or(z.literal("")),
  requestType: z
    .enum(["avgs_rueckfrage", "kooperation", "unterauftrag", "workshop", "oeffentlicher_auftrag", "sonstiges"])
    .optional(),
  timeframe: z.string().trim().max(formLimits.timeframe, "Bitte höchstens 200 Zeichen eingeben.").optional().or(z.literal("")),
  website: honeypot,
}).superRefine((data, ctx) => {
  if (data.formality === "formal" && !data.organization) {
    ctx.addIssue({ code: "custom", path: ["organization"], message: "Bitte Organisation angeben." });
  }
  if (data.formality === "formal" && !data.requestType) {
    ctx.addIssue({ code: "custom", path: ["requestType"], message: "Bitte Art der Anfrage auswählen." });
  }
});

export const appointmentSchema = z.object({
  name,
  email,
  phone,
  format: z.enum(["praesenz_kriftel", "online", "hybrid", "unsicher"]),
  hasAvgs: z.enum(["ja", "nein", "unsicher"]),
  message: z.string().trim().max(formLimits.message, "Bitte höchstens 4.000 Zeichen eingeben.").optional().or(z.literal("")),
  website: honeypot,
});

export const avgsCheckSchema = z.object({
  status: z.enum(["hat_avgs", "moechte_beantragen", "unsicher"]),
  traeger: z.enum(["jobcenter", "arbeitsagentur", "andere_unsicher"]),
  anliegen: z.enum([
    "bewerbungsunterlagen",
    "berufliche_orientierung",
    "ausbildungsplatz",
    "vorstellungsgespraech",
    "anderes",
  ]),
  format: z.enum(["praesenz_kriftel", "online", "hybrid", "unsicher"]),
  name,
  email,
  phone,
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type AvgsCheckInput = z.infer<typeof avgsCheckSchema>;
