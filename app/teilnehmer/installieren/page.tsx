import type { Metadata } from "next";
import Link from "next/link";
import InstallButton from "./install-button";
import styles from "./installieren.module.css";

export const metadata: Metadata = {
  title: "KlarVoran auf dem Handy | Teilnehmerzugang",
  description: "KlarVoran auf deinem Startbildschirm speichern und deinen Teilnehmerbereich öffnen.",
  alternates: { canonical: "/teilnehmer/installieren" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function TeilnehmerInstallierenPage() {
  return (
    <div className={styles.shell}>
      <p className={styles.eyebrow}>KlarVoran · Für Teilnehmende</p>
      <h1>KlarVoran auf deinem Handy</h1>
      <p className={styles.intro}>Speichere den Zugang freiwillig auf deinem Startbildschirm. Du kannst ihn auch ohne Installation im Browser nutzen.</p>
      <InstallButton />
      <div className={styles.grid}>
        <section className={styles.card}>
          <h2>iPhone</h2>
          <ol>
            <li><strong>In Safari öffnen.</strong> Bei einem E-Mail-Link gegebenenfalls „In Safari öffnen“ wählen.</li>
            <li><strong>Auf „Teilen“ tippen.</strong> Falls nötig zuerst das Seitenmenü öffnen.</li>
            <li><strong>„Zu Home-Bildschirm hinzufügen“ wählen.</strong> „Als Web-App öffnen“ aktivieren und hinzufügen.</li>
          </ol>
        </section>
        <section className={styles.card}>
          <h2>Android</h2>
          <ol>
            <li><strong>In Chrome öffnen.</strong></li>
            <li><strong>Auf „Installieren“ tippen.</strong> Falls der Knopf fehlt: Menü mit den drei Punkten öffnen.</li>
            <li><strong>Installation bestätigen.</strong> Gegebenenfalls „Verknüpfung erstellen“ wählen.</li>
          </ol>
        </section>
      </div>
      <div className={styles.next}>
        <h2>Danach anmelden</h2>
        <p>Öffne das KlarVoran-Symbol. Melde dich mit deiner freigegebenen E-Mail-Adresse und dem Code aus der E-Mail an.</p>
        <Link href="/teilnehmer" className={styles.link}>Teilnehmerzugang jetzt öffnen</Link>
      </div>
    </div>
  );
}
