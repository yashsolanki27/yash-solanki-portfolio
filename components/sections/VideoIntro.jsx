"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import profile from "@/data/profile.json";
import styles from "@/styles/sections/VideoIntro.module.css";

const CinematicLayer = dynamic(() => import("@/components/three/CinematicLayer"), {
  ssr: false,
});

export default function VideoIntro({ soundOn = false }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [videoAvailable, setVideoAvailable] = useState(true);

  // When the user clicks ENTER on the opening gate, unmute the video.
  // The click counts as a user gesture, so the browser allows sound.
  useEffect(() => {
    if (soundOn && videoRef.current) {
      videoRef.current.muted = false;
      setMuted(false);
      videoRef.current.play().catch(() => {});
    }
  }, [soundOn]);

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }

  function togglePlay() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  return (
    <section className={styles.section} id="intro">
      {videoAvailable ? (
        <>
          <div className={styles.ambientGlow} aria-hidden="true" />
          <video
            ref={videoRef}
            className={styles.mainVideo}
            src="/assets/intro.mp4"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoAvailable(false)}
          />
        </>
      ) : (
        <div className={styles.fallbackBg} />
      )}
      <div className={styles.overlay} />
      <CinematicLayer />
      <div className={styles.content}>
        <h1 className={styles.name}>
          {profile.name.first}
          <br />
          {profile.name.last}
        </h1>
        <p className={styles.role}>{profile.roles.detailed}</p>
      </div>
      {videoAvailable && (
        <div className={styles.controls}>
          <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? "🔇 Sound" : "🔊 Mute"}
          </button>
        </div>
      )}
      {videoAvailable && muted && <div className={styles.hint}>Tap for sound</div>}
      <button
        type="button"
        className={styles.scrollCue}
        onClick={() => document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" })}
      >
        Scroll
      </button>
    </section>
  );
}
