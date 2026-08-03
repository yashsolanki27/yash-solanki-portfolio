"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import profile from "@/data/profile.json";
import content from "@/data/content.json";
import CopyEmailLink from "@/components/ui/CopyEmailLink";
import styles from "@/styles/sections/HeroSection.module.css";

const HeroBackground = dynamic(() => import("@/components/three/HeroBackground"), { ssr: false });

const ROLES = profile.roles.rotating;
const TYPE_MS = 85;
const ERASE_MS = 40;
const HOLD_MS = 1500;

function useTypewriter() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIndex % ROLES.length];
    let delay;
    let action;

    if (!erasing && text === full) {
      delay = HOLD_MS;
      action = () => setErasing(true);
    } else if (erasing && text === "") {
      delay = 350;
      action = () => {
        setErasing(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      };
    } else if (erasing) {
      delay = ERASE_MS;
      action = () => setText(full.slice(0, text.length - 1));
    } else {
      delay = TYPE_MS;
      action = () => setText(full.slice(0, text.length + 1));
    }

    const t = setTimeout(action, delay);
    return () => clearTimeout(t);
  }, [text, erasing, roleIndex]);

  return text;
}

export default function HeroSection() {
  const typedRole = useTypewriter();

  return (
    <section className={styles.section} id="hero">
      <HeroBackground />

      {/* Left */}
      <div className={styles.left} data-reveal>
        <p className={styles.greeting}>Hi, I AM</p>
        <p className={styles.shortRole}>
          {typedRole}
          <span className={styles.cursor} />
        </p>
        <h2 className={styles.name}>
          {profile.name.first}
          <br />
          {profile.name.last}
        </h2>
        <p className={styles.tagline}>{profile.tagline}</p>
        <div className={styles.pills}>
          {content.hero.pills.map((pill) => (
            <span key={pill} className={styles.pill}>{pill}</span>
          ))}
        </div>
        <div className={styles.ctaRow}>
          <a
            className={styles.ctaBtn}
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {content.hero.cta} →
          </a>
          <a
            className={styles.ctaBtn}
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            style={{ background: "transparent", border: "1px solid rgba(235, 178, 124, 0.5)" }}
          >
            Resume ↓
          </a>
          <div className={styles.availCard}>
            <span className={styles.dot} />
            <span>{content.hero.availabilityLabel}</span>
          </div>
        </div>
      </div>

      {/* Center portrait */}
      <div className={styles.center} data-reveal data-reveal-delay="0.15">
        <div className={styles.imageWrap} data-parallax>
          <Image
            src="/assets/YASH.png"
            alt={profile.name.full}
            fill
            sizes="(max-width: 960px) 340px, 400px"
            className={styles.image}
            priority
          />
        </div>
      </div>

      {/* Right */}
      <div className={styles.right} data-reveal data-reveal-delay="0.3">
        <p className={styles.description}>{profile.description}</p>
        <div className={styles.stats}>
          {profile.stats.map((item) => {
            const match = item.value.match(/^([\d.]+)(.*)$/);
            return (
              <div key={item.label} className={styles.card}>
                {match ? (
                  <strong data-count={match[1]} data-suffix={match[2]}>
                    {item.value}
                  </strong>
                ) : (
                  <strong>{item.value}</strong>
                )}
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.socials}>
          {profile.socials.map((s) =>
            s.label === "Email" ? (
              <CopyEmailLink
                key={s.label}
                email={s.href.replace("mailto:", "")}
                className={styles.socialLink}
              />
            ) : (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
