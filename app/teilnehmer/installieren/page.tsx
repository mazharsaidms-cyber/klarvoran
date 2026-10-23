import type { Metadata } from "next";
import Link from "next/link";
import InstallButton from "./install-button";
import styles from "./installieren.module.css";

export const metadata: Metadata = {
  title: "KlarVoran auf dem Handy | Teilnehmerzugang",
  description: "KlarVoran auf deinem Startbildschirm speichern und deinen Teilnehmerbereich öffnen.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function TeilnehmerInstallierenPage() {
  return (
    <div className={styles.shell}>
      <p className={styles.eyebrow}>KlarVoran · Für Teilnehmende</p>
      <h1>KlarVoran auf deinem Handy</h1>
      <p className={styles.intro}>Speichere deinen persönlichen Zugang auf dem Startbildschirm. Das dauert nur wenige Schritte und ist freiwillig.</p>
      <InstallButton />
      <div className={styles.grid}>
        <section className={styles.card}>
          <h2>iPhone</h2>
          <ol>
            <li>Öffne diese Seite in Safari. Wenn sie aus einer E-Mail in einem anderen Browser geöffnet wurde, wähle „In Safari öffnen“.</li>
            <li>Tippe auf „Teilen“ (gegebenenfalls zuerst auf das Seitenmenü).</li>
            <li>Wähle „Zu Home-Bildschirm hinzufügen“, aktiviere „Als Web-App öffnen“ und tippe auf „Hinzufügen“.</li>
          </ol>
        </section>
        <section className={styles.card}>
          <h2>Android</h2>
          <ol>
            <li>Öffne diese Seite in Chrome.</li>
            <li>Tippe auf „Installieren“, falls die Schaltfläche oben erscheint. Sonst öffne das Menü mit den drei Punkten.</li>
            <li>Wähle „Installieren“ oder „Installieren und Verknüpfung erstellen“ und bestätige.</li>
          </ol>
        </section>
      </div>
      <div className={styles.next}>
        <h2>Danach anmelden</h2>
        <p>Öffne das KlarVoran-Symbol und melde dich mit deiner freigegebenen E-Mail-Adresse und dem einmaligen Code an. Du kannst den Zugang auch ohne Installation im Browser nutzen.</p>
        <Link href="/teilnehmer" className={styles.link}>Teilnehmerzugang jetzt öffnen</Link>
      </div>
    </div>
  );
}
