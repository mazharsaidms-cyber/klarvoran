import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClasses =
  "w-full rounded-[var(--radius-sm)] border border-navy-100 bg-white px-4 py-2.5 text-navy placeholder:text-navy-600/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

export function TextField({
  id,
  label,
  error,
  required,
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span aria-hidden="true" className="text-red">*</span>}
      </label>
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClasses}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextareaField({
  id,
  label,
  error,
  required,
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span aria-hidden="true" className="text-red">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        rows={5}
        className={fieldClasses}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  id,
  label,
  error,
  required,
  children,
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span aria-hidden="true" className="text-red">*</span>}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClasses}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function RadioGroupField({
  legend,
  name,
  options,
  error,
  value,
  onChange,
  required,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-1.5 text-sm font-semibold text-navy">
        {legend} {required && <span aria-hidden="true" className="text-red">*</span>}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] border border-navy-100 px-3.5 py-2.5 text-sm text-navy has-[:checked]:border-navy has-[:checked]:bg-navy-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              required={required}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
              className="h-4 w-4 accent-red"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p id={`${name}-error`} className="mt-1.5 text-sm text-red-700">{error}</p>}
    </fieldset>
  );
}

export function PrivacyNotice({ formal = false }: { formal?: boolean }) {
  return (
    <p className="text-sm leading-relaxed text-navy-600">
      Mit dem Absenden werden {formal ? "Ihre" : "deine"} Angaben zur Bearbeitung {formal ? "Ihrer" : "deiner"}{" "}
      Anfrage verarbeitet. {formal ? "Weitere Informationen finden Sie" : "Weitere Informationen findest du"} in der{" "}
      <a href="/datenschutz" className="font-medium text-navy underline underline-offset-2">
        Datenschutzerklärung
      </a>
      .
    </p>
  );
}

export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
