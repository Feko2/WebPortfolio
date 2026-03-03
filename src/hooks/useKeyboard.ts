"use client";

import { useEffect } from "react";

const counterKeys: Record<string, string[]> = {
  skills: ["s", "S", "ArrowDown"],
  items: ["a", "A", "ArrowLeft"],
  map: ["w", "W", "ArrowUp"],
  magic: ["d", "D", "ArrowRight"],
};

export function useKeyboard(onBack: () => void, currentSection?: string | null) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onBack();
        return;
      }

      if (currentSection && counterKeys[currentSection]?.includes(e.key)) {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBack, currentSection]);
}
