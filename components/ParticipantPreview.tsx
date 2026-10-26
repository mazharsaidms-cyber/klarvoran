import { VisualIcon } from "./VisualIcon";
import styles from "./ParticipantPreview.module.css";

/** Illustrative overview of the participant workspace, without personal or sample case data. */
export function ParticipantPreview() {
  return (
    <div className={styles.preview} aria-hidden="true">
      <div className={styles.topbar}>
        <span className={styles.brandMark}>K<span>V</span></span>
        <span className={styles.topbarTitle}>Dein Teilnehmerbereich</span>
        <span className={styles.topbarDot} />
      </div>
      <div className={styles.canvas}>
        <div className={styles.welcome}>
          <span>DEIN ÜBERBLICK</span>
          <strong>Alles an einem Ort.</strong>
          <i />
        </div>
        <div className={styles.tiles}>
          <div className={styles.tile}><span className={styles.blue}><VisualIcon name="calendar" /></span><strong>Termine</strong><small>Im Blick behalten</small></div>
          <div className={styles.tile}><span className={styles.coral}><VisualIcon name="document" /></span><strong>Unterlagen</strong><small>Prüfen &amp; senden</small></div>
          <div className={styles.tile}><span className={styles.green}><VisualIcon name="conversation" /></span><strong>Nachrichten</strong><small>Kontakt halten</small></div>
        </div>
      </div>
    </div>
  );
}
