"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Fade-up reveals
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: parseFloat(el.dataset.revealDelay || 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Number counters
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const decimals = el.dataset.count.includes(".") ? 1 : 0;
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = state.v.toFixed(decimals) + suffix;
          },
        });
      });

      // Scrub parallax
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
