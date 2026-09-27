export function FounderExpertise() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-navy-100 bg-navy-50 p-6 sm:p-7" aria-label="Fachlicher Hintergrund von Mazhar Said">
      <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Mazhar Said</p>
      <p className="mt-3 text-xl font-bold leading-snug text-navy">Erfahrung, die zu klaren Schritten führt.</p>
      <dl className="mt-6 space-y-4 border-t border-navy-100 pt-5">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy-600">Struktur</dt>
          <dd className="mt-1 text-sm font-medium text-navy">Rechts- und Notariatsbereich</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy-600">Begleitung</dt>
          <dd className="mt-1 text-sm font-medium text-navy">Jobcoaching und pädagogische Praxis</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy-600">Arbeitswelt</dt>
          <dd className="mt-1 text-sm font-medium text-navy">Unternehmen und Vertrieb</dd>
        </div>
      </dl>
    </div>
  );
}
