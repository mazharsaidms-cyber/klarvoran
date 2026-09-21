"use client";

import { submitContactForm } from "@/app/kontakt/actions";
import { useLeadForm } from "./useLeadForm";
import { TextField, TextareaField, PrivacyNotice, HoneypotField, SelectField } from "./form-fields";
import { Button } from "./Button";
import { StatusMessage } from "./StatusMessage";
import { NoScriptContact } from "./NoScriptContact";

type RequestType =
  | "avgs_rueckfrage"
  | "kooperation"
  | "unterauftrag"
  | "workshop"
  | "oeffentlicher_auftrag"
  | "sonstiges";

export function ContactForm({
  formal = false,
  defaultRequestType,
}: {
  formal?: boolean;
  defaultRequestType?: RequestType;
}) {
  const { state, formAction, pending, formRef, field } = useLeadForm(submitContactForm, formal, {
    requestType: defaultRequestType ?? "",
  });

  if (state.status === "success" || state.status === "dev-success") return <StatusMessage state={state} />;

  return (
    <form ref={formRef} action={formAction} className="space-y-5" aria-busy={pending}>
      <NoScriptContact formal={formal} />
      <HoneypotField />
      <p className="text-xs text-navy-600">Mit * gekennzeichnete Felder sind Pflichtfelder.</p>
      <input type="hidden" name="formality" value={formal ? "formal" : "informal"} />
      {formal && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="organization" {...field("organization")}
              label="Organisation"
              required
              autoComplete="organization"
              error={state.fieldErrors?.organization}
            />
            <TextField
              id="role" {...field("role")}
              label="Ihre Funktion (optional)"
              autoComplete="organization-title"
              error={state.fieldErrors?.role}
            />
          </div>
          <SelectField
            id="requestType"
            label="Art der Anfrage"
            required
            {...field("requestType")}
            error={state.fieldErrors?.requestType}
          >
            <option value="" disabled>Bitte auswählen</option>
            <option value="avgs_rueckfrage">AVGS / Rückfrage zur Maßnahme</option>
            <option value="kooperation">Kooperation</option>
            <option value="unterauftrag">Unterauftrag / Leistungsbaustein</option>
            <option value="workshop">Workshop / Gruppenformat</option>
            <option value="oeffentlicher_auftrag">Öffentlicher Auftrag</option>
            <option value="sonstiges">Sonstiges</option>
          </SelectField>
          <TextField
            id="timeframe" {...field("timeframe")}
            label="Gewünschter Zeitraum (optional)"
            placeholder="z. B. ab November 2026"
            error={state.fieldErrors?.timeframe}
          />
        </>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="name" {...field("name")} label="Name" required autoComplete="name" error={state.fieldErrors?.name} />
        <TextField id="email" {...field("email")} label="E-Mail" type="email" required autoComplete="email" error={state.fieldErrors?.email} />
      </div>
      <TextField id="phone" {...field("phone")} label="Telefon (optional)" type="tel" autoComplete="tel" error={state.fieldErrors?.phone} />
      <TextareaField
        id="message" {...field("message")}
        label={formal ? "Ihre Nachricht" : "Deine Nachricht"}
        required
        error={state.fieldErrors?.message}
      />
      <p className="-mt-2 text-xs leading-relaxed text-navy-600">
        Bitte keine Gesundheitsdaten, Diagnosen, vollständigen Bescheide oder Ausweisdokumente über dieses Formular senden.
      </p>
      <PrivacyNotice formal={formal} />
      <StatusMessage state={state} />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Wird gesendet…" : "Nachricht senden"}
      </Button>
    </form>
  );
}
