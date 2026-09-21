"use client";

import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react";
import { initialActionState, type ActionState } from "@/lib/server/action-state";

type LeadAction = (previous: ActionState, data: FormData) => Promise<ActionState>;

/** Controlled fields retain the enquiry when React resets a resolved form action. */
export function useLeadForm(action: LeadAction, formal = false, defaults: Record<string, string> = {}) {
  const [values, setValues] = useState(defaults);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(async (previous: ActionState, data: FormData) => {
    try {
      return await action(previous, data);
    } catch {
      return {
        status: "error" as const,
        message: formal
          ? "Die Übermittlung ist fehlgeschlagen. Ihre Eingaben bleiben erhalten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch."
          : "Die Übermittlung ist fehlgeschlagen. Deine Eingaben bleiben erhalten. Bitte versuche es erneut oder ruf uns an.",
      };
    }
  }, initialActionState);

  useEffect(() => {
    if (state.fieldErrors) {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [state]);

  function field(name: string) {
    return {
      value: values[name] ?? "",
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = event.target.value;
        setValues((current) => ({ ...current, [name]: value }));
      },
    };
  }

  return { state, formAction, pending, formRef, field };
}
