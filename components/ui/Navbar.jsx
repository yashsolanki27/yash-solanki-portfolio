"use client";

import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "@/styles/ui/Navbar.module.css";

const ITEMS = [
  { label: "Home", href: "#intro" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#devtooling" },
  { label: "Case Studies", href: "#casestudies" },
  { label: "Education", href: "#education" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a className={styles.brand} href="#intro">
        YASH SOLANKI
      </a>

      <nav className={styles.menu} aria-label="Primary">
        {ITEMS.map((item) => (
          <a key={item.label} href={item.href} className={styles.item}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className={styles.cta} href="#contact">
        Contact
      </a>

      <button
        ref={menuToggleRef}
        type="button"
        className={styles.menuToggle}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {mobileOpen && (
        <nav className={styles.mobilePanel} aria-label="Mobile">
          {ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.mobileItem}
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
          <a className={styles.mobileCta} href="#contact" onClick={closeMobileMenu}>
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
