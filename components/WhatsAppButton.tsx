import { siteConfig } from "@/lib/site-config";

export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsappHref("Hallo! Ich habe eine Frage zum AVGS-Coaching bei KlarVoran.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-[var(--radius-full)] bg-[#25D366] px-4 py-3 text-sm font-semibold text-navy shadow-card-hover transition-transform motion-reduce:transition-none hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      aria-label="Per WhatsApp kontaktieren (öffnet in neuem Tab)"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.36a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.79 14.09c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.1.28-3.67-.79-3.09-1.28-5.07-4.39-5.22-4.6-.15-.2-1.26-1.67-1.26-3.19 0-1.51.79-2.26 1.07-2.57.28-.3.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.85 2.08.93 2.23.08.15.13.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.01 2.09 1.33 2.39 1.48.3.15.48.13.66-.07.18-.2.76-.88.96-1.19.2-.3.4-.25.68-.15.28.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.72-.16 1.4Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
