"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CompassNav } from "@/components/ui/CompassNav";
import { OrnateDivider, MidDivider } from "@/components/ui/SkyFrame";
import { MuteButton } from "@/components/ui/MuteButton";
import { TopBar } from "@/components/ui/TopBar";
import { StarField } from "@/components/ui/StarField";
import { FogEffect } from "@/components/ui/FogEffect";
import { ConstellationView } from "@/components/skills/ConstellationView";
import { InventoryView } from "@/components/items/InventoryView";
import { WorldMap } from "@/components/map/WorldMap";
import { SpellBook } from "@/components/magic/SpellBook";
import { useAudio } from "@/hooks/useAudio";
import { useKeyboard } from "@/hooks/useKeyboard";

type Section = "skills" | "items" | "map" | "magic";

const sectionBackgrounds: Record<Section, string> = {
  skills: "nebula-bg",
  items: "bg-[#0a0a0a]",
  map: "bg-[#0a0a0a]",
  magic: "bg-[#0a0a0a]",
};

const slideDirections: Record<Section, { x: number; y: number }> = {
  skills: { x: 0, y: -1 },
  items: { x: 1, y: 0 },
  map: { x: 0, y: 1 },
  magic: { x: -1, y: 0 },
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { muted, toggleMute, playSound, initAudio, startAmbient, initialized } = useAudio();

  const handleFirstInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      initAudio();
      setTimeout(() => startAmbient(), 500);
    }
  }, [hasInteracted, initAudio, startAmbient]);

  const handleNavigate = useCallback(
    (section: string | null) => {
      handleFirstInteraction();
      if (initialized) playSound("open");
      setCurrentSection(section as Section | null);
    },
    [handleFirstInteraction, initialized, playSound]
  );

  const handleBack = useCallback(() => {
    if (initialized) playSound("close");
    setCurrentSection(null);
  }, [initialized, playSound]);

  useKeyboard(handleBack, currentSection);

  const direction = currentSection ? slideDirections[currentSection] : { x: 0, y: 0 };
  const slideDistance = 100;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050508] relative">
      <StarField count={200} />

      {/* Main menu */}
      <AnimatePresence>
        {!currentSection && (
          <motion.div
            key="main-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
          >
            <FogEffect />

            {/* Radial vignette */}
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(5, 5, 8, 0.7) 80%)",
              }}
            />

            {/* Compass navigation */}
            <div className="relative z-10">
              <CompassNav
                currentSection={currentSection}
                onNavigate={handleNavigate}
                onHover={() => {
                  handleFirstInteraction();
                  if (initialized) playSound("hover");
                }}
                onClick={() => {
                  handleFirstInteraction();
                  if (initialized) playSound("click");
                }}
              />
            </div>

            {/* Character info bar with ornate dividers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-24 flex items-center gap-4 z-10"
            >
              <OrnateDivider size={28} className="text-foreground/25" />
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase">
                    Name
                  </span>
                  <span className="font-skyrim text-sm tracking-[0.15em] text-foreground/60">
                    Felipe Ramos
                  </span>
                </div>
                <MidDivider height={16} className="text-foreground/20" />
                <div className="flex items-center gap-2">
                  <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase">
                    Level
                  </span>
                  <span className="font-skyrim text-xl font-bold text-foreground/80">90</span>
                </div>
                <MidDivider height={16} className="text-foreground/20" />
                <div className="flex items-center gap-2">
                  <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase">
                    Race
                  </span>
                  <span className="font-skyrim text-sm tracking-[0.15em] text-foreground/60">
                    Engineer
                  </span>
                </div>
              </div>
              <OrnateDivider size={28} className="text-foreground/25" />
            </motion.div>

            {/* Hint text */}
            {!hasInteracted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ delay: 2, duration: 3, repeat: Infinity }}
                className="absolute bottom-14 text-[9px] tracking-[0.4em] text-foreground/15 z-10"
              >
                SELECT A DIRECTION TO BEGIN
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section views */}
      <AnimatePresence mode="wait">
        {currentSection && (
          <motion.div
            key={currentSection}
            initial={{
              opacity: 0,
              x: `${direction.x * slideDistance}%`,
              y: `${direction.y * slideDistance}%`,
              scale: 0.95,
            }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: `${direction.x * slideDistance * 0.3}%`,
              y: `${direction.y * slideDistance * 0.3}%`,
              scale: 0.98,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 z-20 ${sectionBackgrounds[currentSection]}`}
          >
            {currentSection === "skills" && <ConstellationView onBack={handleBack} />}
            {currentSection === "items" && <InventoryView />}
            {currentSection === "map" && <WorldMap />}
            {currentSection === "magic" && <SpellBook />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD elements */}
      <TopBar currentSection={currentSection} onBack={handleBack} />
      <MuteButton muted={muted} onToggle={toggleMute} />
    </div>
  );
}
