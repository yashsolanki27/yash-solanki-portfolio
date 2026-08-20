"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function goTo(href) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.brand}>YASH SOLANKI</div>

      <nav className={styles.menu} aria-label="Primary">
        {ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className={styles.item}
            onClick={() => goTo(item.href)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        className={styles.cta}
        onClick={() => goTo("#contact")}
      >
        Contact
      </button>

      <button
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
            <button
              key={item.label}
              type="button"
              className={styles.mobileItem}
              onClick={() => goTo(item.href)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className={styles.mobileCta}
            onClick={() => goTo("#contact")}
          >
            Contact
          </button>
        </nav>
      )}
    </header>
  );
}
