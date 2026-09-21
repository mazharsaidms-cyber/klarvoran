"use client";

import { useState } from "react";
import { submitAppointmentRequest } from "@/app/termin/actions";
import { useLeadForm } from "./useLeadForm";
import { TextField, TextareaField, RadioGroupField, PrivacyNotice, HoneypotField } from "./form-fields";
import { Button } from "./Button";
import { StatusMessage } from "./StatusMessage";
import { NoScriptContact } from "./NoScriptContact";

export function AppointmentForm() {
  const { state, formAction, pending, formRef, field } = useLeadForm(submitAppointmentRequest);
  const [format, setFormat] = useState("unsicher");
  const [hasAvgs, setHasAvgs] = useState("unsicher");

  if (state.status === "success" || state.status === "dev-success") return <StatusMessage state={state} />;

  return (
    <form ref={formRef} action={formAction} className="space-y-5" aria-busy={pending}>
      <NoScriptContact />
      <HoneypotField />
      <p className="text-xs text-navy-600">Mit * gekennzeichnete Felder sind Pflichtfelder.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="name" {...field("name")} label="Name" required autoComplete="name" error={state.fieldErrors?.name} />
        <TextField id="email" {...field("email")} label="E-Mail" type="email" required autoComplete="email" error={state.fieldErrors?.email} />
      </div>
      <TextField id="phone" {...field("phone")} label="Telefon (optional)" type="tel" autoComplete="tel" error={state.fieldErrors?.phone} />

      <RadioGroupField
        legend="Bevorzugte Form"
        name="format"
        required
        value={format}
        onChange={setFormat}
        error={state.fieldErrors?.format}
        options={[
          { value: "praesenz_kriftel", label: "Präsenz (Kriftel)" },
          { value: "online", label: "Online" },
          { value: "hybrid", label: "Online und Präsenz im Wechsel" },
          { value: "unsicher", label: "Noch unsicher" },
        ]}
      />

      <RadioGroupField
        legend="Hast du bereits einen AVGS?"
        name="hasAvgs"
        required
        value={hasAvgs}
        onChange={setHasAvgs}
        error={state.fieldErrors?.hasAvgs}
        options={[
          { value: "ja", label: "Ja" },
          { value: "nein", label: "Nein" },
          { value: "unsicher", label: "Unsicher" },
        ]}
      />

      <TextareaField
        id="message" {...field("message")}
        label="Wunschtermin oder Anmerkungen (optional)"
        error={state.fieldErrors?.message}
      />
      <p className="-mt-2 text-xs leading-relaxed text-navy-600">
        Bitte hier keine Gesundheitsdaten, Diagnosen, vollständigen Bescheide oder Ausweisdokumente eintragen.
      </p>
      <PrivacyNotice />
      <StatusMessage state={state} />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Wird gesendet…" : "Terminanfrage senden"}
      </Button>
    </form>
  );
}
