"use client";

import { useState } from "react";
import ScreenLoader from "@/components/sections/ScreenLoader";
import VideoIntro from "@/components/sections/VideoIntro";

export default function IntroExperience() {
  const [showLoader, setShowLoader] = useState(true);
  const [soundOn, setSoundOn] = useState(false);

  return (
    <>
      {showLoader && (
        <ScreenLoader
          onDismiss={() => {
            setShowLoader(false);
            setSoundOn(true);
          }}
        />
      )}
      <VideoIntro soundOn={soundOn} />
    </>
  );
}
