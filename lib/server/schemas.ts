import { z } from "zod";

const name = z.string().trim().min(2, "Bitte Namen eingeben.").max(120);
const email = z.string().trim().email("Bitte eine gültige E-Mail-Adresse eingeben.");
const phone = z
  .string()
  .trim()
  .max(40)
  .optional()
  .or(z.literal(""));
// Honeypot: must stay empty. Bots that fill every field trip this.
const honeypot = z.string().max(0, "Ungültige Übermittlung.").optional().or(z.literal(""));
const source = z
  .enum(["google", "ba_portal", "jobcenter_arbeitsagentur", "einrichtung_traeger", "empfehlung", "social_media", "sonstiges"])
  .optional()
  .or(z.literal(""));

export const contactSchema = z.object({
  name,
  email,
  phone,
  message: z.string().trim().min(10, "Bitte das Anliegen etwas ausführlicher beschreiben.").max(4000),
  formality: z.enum(["informal", "formal"]).default("informal"),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  role: z.string().trim().max(160).optional().or(z.literal("")),
  requestType: z
    .enum(["avgs_rueckfrage", "kooperation", "unterauftrag", "workshop", "oeffentlicher_auftrag", "sonstiges"])
    .optional(),
  timeframe: z.string().trim().max(200).optional().or(z.literal("")),
  source,
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
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  source,
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
  source: z.string().trim().max(200).optional().or(z.literal("")),
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type AvgsCheckInput = z.infer<typeof avgsCheckSchema>;
