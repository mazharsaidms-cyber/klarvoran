"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/kontakt/actions";
import { initialActionState } from "@/lib/server/action-state";
import { TextField, TextareaField, PrivacyNotice, HoneypotField, SelectField } from "./form-fields";
import { Button } from "./Button";
import { StatusMessage } from "./StatusMessage";

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
  const [state, formAction, pending] = useActionState(submitContactForm, initialActionState);

  return (
    <form action={formAction} className="space-y-5" noValidate={false} aria-busy={pending}>
      <HoneypotField />
      <input type="hidden" name="formality" value={formal ? "formal" : "informal"} />
      {formal && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="organization"
              label="Organisation"
              required
              autoComplete="organization"
              error={state.fieldErrors?.organization}
            />
            <TextField
              id="role"
              label="Ihre Funktion (optional)"
              autoComplete="organization-title"
              error={state.fieldErrors?.role}
            />
          </div>
          <SelectField
            id="requestType"
            label="Art der Anfrage"
            required
            defaultValue={defaultRequestType ?? ""}
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
            id="timeframe"
            label="Gewünschter Zeitraum (optional)"
            placeholder="z. B. ab November 2026"
            error={state.fieldErrors?.timeframe}
          />
        </>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="name" label="Name" required autoComplete="name" error={state.fieldErrors?.name} />
        <TextField id="email" label="E-Mail" type="email" required autoComplete="email" error={state.fieldErrors?.email} />
      </div>
      <TextField id="phone" label="Telefon (optional)" type="tel" autoComplete="tel" error={state.fieldErrors?.phone} />
      <TextareaField
        id="message"
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
