"use client";

import { useActionState, useState } from "react";
import { submitAppointmentRequest } from "@/app/termin/actions";
import { initialActionState } from "@/lib/server/action-state";
import { TextField, TextareaField, RadioGroupField, PrivacyNotice, HoneypotField } from "./form-fields";
import { Button } from "./Button";
import { StatusMessage } from "./StatusMessage";

export function AppointmentForm() {
  const [state, formAction, pending] = useActionState(submitAppointmentRequest, initialActionState);
  const [format, setFormat] = useState("unsicher");
  const [hasAvgs, setHasAvgs] = useState("unsicher");

  return (
    <form action={formAction} className="space-y-5">
      <HoneypotField />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="name" label="Name" required autoComplete="name" error={state.fieldErrors?.name} />
        <TextField id="email" label="E-Mail" type="email" required autoComplete="email" error={state.fieldErrors?.email} />
      </div>
      <TextField id="phone" label="Telefon (optional)" type="tel" autoComplete="tel" error={state.fieldErrors?.phone} />

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
          { value: "hybrid", label: "Hybrid" },
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
        id="message"
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
