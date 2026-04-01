// ─── Preloader ───────────────────────────────────────────────────
// Shows a luxurious animated screen while the app initializes.
import { useEffect, useState } from 'react';
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFade(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${styles.wrap} ${fade ? styles.fadeOut : ''}`}>
      {/* Animated background particles */}
      <div className={styles.particles}>
        {[...Array(12)].map((_, i) => <span key={i} className={styles.particle} style={{ '--i': i }} />)}
      </div>

      {/* Logo mark */}
      <div className={styles.logoWrap}>
        <div className={styles.crown}>♛</div>
        <div className={styles.logoText}>
          <span className={styles.sweet}>Sweet</span>
          <span className={styles.venom}>Venom</span>
        </div>
        <p className={styles.tagline}>Bakery &amp; Confections</p>
      </div>

      {/* Loading bar */}
      <div className={styles.barTrack}>
        <div className={styles.bar} />
      </div>

      <p className={styles.loadingText}>Crafting something delicious…</p>
    </div>
  );
}
