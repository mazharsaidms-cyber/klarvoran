import type { Metadata } from "next";
import Link from "next/link";
import styles from "./zugang.module.css";

export const metadata: Metadata = {
  title: "Persönlicher Zugang | KlarVoran",
  description: "Direkt zu deinem Teilnehmer- oder Coachbereich.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function ZugangPage() {
  return (
    <div className={styles.shell}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>KlarVoran · Persönlicher Zugang</p>
        <h1>Deine Akte direkt öffnen</h1>
        <p>Wähle deinen Bereich. Die Anmeldung erfolgt mit der E-Mail-Adresse, die KlarVoran für dich freigegeben hat, und einem einmaligen Code.</p>
      </div>
      <div className={styles.grid}>
        <section className={styles.card}>
          <span className={styles.tag}>Für Teilnehmende</span>
          <h2>Mein Teilnehmerbereich</h2>
          <p>Deine Termine, freigegebenen Unterlagen, Bestätigungen und Nachrichten an KlarVoran.</p>
          <Link href="/teilnehmer" className={styles.action}>Teilnehmerzugang öffnen</Link>
        </section>
        <section className={styles.card}>
          <span className={styles.tag}>Für Coaches</span>
          <h2>Mein Coachbereich</h2>
          <p>Deine zugewiesenen Fälle, Sitzungen, Unterlagen und Nachrichten.</p>
          <Link href="/coach" className={styles.action}>Coachzugang öffnen</Link>
        </section>
      </div>
      <p className={styles.help}>Ein Zugang wird zuerst von KlarVoran freigegeben. Das Symbol auf dem Startbildschirm ersetzt diese persönliche Anmeldung nicht.</p>
    </div>
  );
}
