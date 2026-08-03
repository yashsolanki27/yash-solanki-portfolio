"use client";

import { useState } from "react";
import styles from "@/styles/sections/ScreenLoader.module.css";

export default function ScreenLoader({ onDismiss }) {
  const [leaving, setLeaving] = useState(false);

  function handleClick() {
    setLeaving(true);
    setTimeout(() => onDismiss?.(), 700);
  }

  return (
    <div className={`${styles.overlay} ${leaving ? styles.leave : ""}`}>
      <p className={styles.eyebrow}>Portfolio · {new Date().getFullYear()}</p>
      <p className={styles.name}>YASH<br />SOLANKI</p>
      <div className={styles.divider} />
      <button className={styles.button} onClick={handleClick}>
        ENTER
      </button>
    </div>
  );
}
