"use client";

import { useEffect, useState } from "react";
import styles from "./installieren.module.css";

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallButton() {
  const [promptEvent, setPromptEvent] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    if (standalone.matches) {
      window.location.replace("/teilnehmer");
      return;
    }

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPrompt);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!promptEvent) return;
    setPromptEvent(null);
    await promptEvent.prompt();
    await promptEvent.userChoice;
  };

  if (installed) return <p className={styles.success}>KlarVoran wurde hinzugefügt. Öffne jetzt das Symbol auf deinem Startbildschirm.</p>;
  if (!promptEvent) return null;
  return <button type="button" className={styles.install} onClick={install}>KlarVoran installieren</button>;
}
