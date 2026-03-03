"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const SOUNDS = {
  hover: "/sounds/hover.mp3",
  click: "/sounds/click.mp3",
  open: "/sounds/open.mp3",
  close: "/sounds/close.mp3",
} as const;

type SoundName = keyof typeof SOUNDS;

export function useAudio() {
  const [muted, setMuted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const soundsRef = useRef<Record<string, Howl>>({});
  const ambientRef = useRef<Howl | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("skyrim-portfolio-muted");
    if (saved === "true") setMuted(true);
  }, []);

  const initAudio = useCallback(() => {
    if (initialized) return;

    Object.entries(SOUNDS).forEach(([name, src]) => {
      soundsRef.current[name] = new Howl({
        src: [src],
        volume: 0.3,
        preload: true,
      });
    });

    ambientRef.current = new Howl({
      src: ["/sounds/ambient.mp3"],
      volume: 0.15,
      loop: true,
      preload: true,
    });

    setInitialized(true);
  }, [initialized]);

  const playSound = useCallback(
    (name: SoundName) => {
      if (muted || !initialized) return;
      soundsRef.current[name]?.play();
    },
    [muted, initialized]
  );

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem("skyrim-portfolio-muted", String(next));
      if (next) {
        ambientRef.current?.pause();
      } else {
        ambientRef.current?.play();
      }
      Howler.mute(next);
      return next;
    });
  }, []);

  const startAmbient = useCallback(() => {
    if (!muted && ambientRef.current && initialized) {
      ambientRef.current.play();
    }
  }, [muted, initialized]);

  const stopAmbient = useCallback(() => {
    ambientRef.current?.pause();
  }, []);

  return { muted, toggleMute, playSound, initAudio, startAmbient, stopAmbient, initialized };
}
