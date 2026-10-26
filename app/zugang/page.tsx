import type { Metadata } from "next";
import Link from "next/link";
import { ParticipantPreview } from "@/components/ParticipantPreview";
import { VisualIcon } from "@/components/VisualIcon";
import styles from "./zugang.module.css";

export const metadata: Metadata = {
  title: "Persönlicher Zugang | KlarVoran",
  description: "Direkt zu deinem Teilnehmer- oder Coachbereich.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function ZugangPage() {
  return (
    <div className={styles.shell}>
      <section className={styles.hero} aria-labelledby="zugang-title">
        <div className={styles.intro}>
          <span className={styles.eyebrow}>KlarVoran · Persönlicher Zugang</span>
          <h1 id="zugang-title">Dein Coaching. Dein Bereich.</h1>
          <p>Du bist bereits bei KlarVoran? Hier findest du Termine, Unterlagen und Nachrichten an einem Ort.</p>
          <Link href="/teilnehmer" className={styles.action}>Meinen Teilnehmerbereich öffnen <span aria-hidden="true">→</span></Link>
          <p className={styles.accessNote}><VisualIcon name="quality" />Du brauchst eine Einladung von KlarVoran. Melde dich dann mit deiner E-Mail-Adresse und einem einmaligen Code an.</p>
        </div>
        <div className={styles.previewColumn}>
          <span className={styles.previewLabel}>So ist dein Bereich aufgebaut · grafische Vorschau</span>
          <ParticipantPreview />
        </div>
      </section>

      <section className={styles.guide} aria-labelledby="guide-title">
        <div>
          <span className={styles.eyebrow}>Einfach anmelden</span>
          <h2 id="guide-title">In zwei Schritten zu deiner Akte</h2>
        </div>
        <ol className={styles.steps}>
          <li><span>01</span><div><strong>E-Mail eingeben</strong><p>Nutze die Adresse aus deiner Einladung.</p></div></li>
          <li><span>02</span><div><strong>Code bestätigen</strong><p>Den Code schicken wir dir per E-Mail.</p></div></li>
        </ol>
        <Link href="/teilnehmer/installieren" className={styles.installLink}>Auf dem Handy einrichten <span aria-hidden="true">↗</span></Link>
      </section>

      <aside className={styles.coach} aria-label="Zugang für Coaches">
        <span className={styles.coachIcon}><VisualIcon name="quality" /></span>
        <div><strong>Du arbeitest als Coach mit KlarVoran?</strong><p>Deine zugewiesenen Fälle und Sitzungen findest du im Coachbereich.</p></div>
        <Link href="/coach">Coachbereich öffnen <span aria-hidden="true">→</span></Link>
      </aside>
    </div>
  );
}
