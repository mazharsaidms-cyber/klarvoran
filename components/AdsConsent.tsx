"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { readAdsConsent, setAdsConsent } from "@/lib/ads-conversion";

function isPublicPage(path: string) {
  return !/^\/(teilnehmer|coach|api)(\/|$)/.test(path);
}

export function AdsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const publicPage = isPublicPage(pathname);

  useEffect(() => {
    const saved = readAdsConsent();
    setChoice(saved);
    setReady(true);
    if (saved === "granted" && isPublicPage(window.location.pathname)) setAdsConsent("granted");
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener("klarvoran:ads-consent-settings", openSettings);
    return () => window.removeEventListener("klarvoran:ads-consent-settings", openSettings);
  }, []);

  useEffect(() => {
    if (ready && choice === "granted" && publicPage) setAdsConsent("granted");
  }, [choice, publicPage, ready]);

  if (!ready || !publicPage || (choice !== null && !settingsOpen)) return null;

  function choose(value: "granted" | "denied") {
    setAdsConsent(value);
    setChoice(value);
    setSettingsOpen(false);
  }

  return (
    <aside aria-label="Datenschutzeinstellungen" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl border border-navy-100 bg-white p-5 text-navy shadow-2xl sm:bottom-5 sm:p-6">
      <h2 className="text-lg font-bold">Google Ads Erfolgsmessung</h2>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">
        Wenn du zustimmst, nutzen wir den Google-Tag, um zu messen, ob nach einem Anzeigenklick eine Anfrage erfolgreich bei uns eingeht.
        Dabei können Kennungen und technische Nutzungsdaten an Google übermittelt und Cookies gesetzt werden. Wir übertragen keine Formularinhalte an Google.
        Deine Wahl ist freiwillig und jederzeit änderbar. <Link href="/datenschutz#tracking" className="underline underline-offset-2">Mehr zum Datenschutz</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("denied")} className="min-h-11 rounded-lg border border-navy-200 px-4 py-2 text-sm font-semibold hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red">
          Ohne Tracking fortfahren
        </button>
        <button type="button" onClick={() => choose("granted")} className="min-h-11 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red">
          Erfolgsmessung erlauben
        </button>
      </div>
    </aside>
  );
}

export function AdsConsentSettingsButton() {
  const pathname = usePathname();
  if (!isPublicPage(pathname)) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("klarvoran:ads-consent-settings"))} className="inline-flex min-h-9 items-center rounded-[var(--radius-sm)] text-sm text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
      Tracking-Einstellungen
    </button>
  );
}
