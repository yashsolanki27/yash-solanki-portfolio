"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/sections/ScreenLoader.module.css";

export default function ScreenLoader({ onDismiss }) {
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);

  useEffect(() => {
    if (leaving) return;
    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaving]);

  function handleClick() {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    setTimeout(() => onDismiss?.(), 700);
  }

  return (
    <div className={`${styles.overlay} ${leaving ? styles.leave : ""}`} role="dialog" aria-modal="true" aria-label="Portfolio intro">
      <p className={styles.eyebrow}>Portfolio · {new Date().getFullYear()}</p>
      <p className={styles.name}>YASH<br />SOLANKI</p>
      <div className={styles.divider} />
      <button className={styles.button} onClick={handleClick} autoFocus>
        ENTER
      </button>
    </div>
  );
}
