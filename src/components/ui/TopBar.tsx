"use client";

import { motion } from "framer-motion";
import { WideTopBar, MidDivider } from "@/components/ui/SkyFrame";

interface TopBarProps {
  currentSection: string | null;
  onBack: () => void;
}

const sectionLabels: Record<string, string> = {
  skills: "Skills",
  items: "Items",
  map: "Map",
  magic: "Chronicle",
};

export function TopBar({ currentSection, onBack }: TopBarProps) {
  if (!currentSection) return null;

  const sectionTitle = sectionLabels[currentSection] ?? currentSection;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <WideTopBar>
        <div className="absolute inset-0 grid grid-cols-[auto_1fr_auto] items-center px-6">
          {/* Left: Back button */}
          <button
            onClick={onBack}
            className="cursor-pointer bg-transparent border-none outline-none
              hover:opacity-100 opacity-60 transition-opacity flex items-center gap-1.5"
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground/50"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-skyrim text-[10px] tracking-[0.2em] text-foreground/50">
              Back
            </span>
          </button>

          {/* Center: Section + character info */}
          <div className="flex items-center justify-center gap-6">
            <span className="font-skyrim text-xs tracking-[0.3em] text-foreground/60 uppercase">
              {sectionTitle}
            </span>
            <MidDivider height={14} className="text-foreground/20" />
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.15em] text-foreground/35 uppercase">Name</span>
              <span className="font-skyrim text-xs tracking-wider text-foreground/75">Felipe Ramos</span>
            </div>
            <MidDivider height={14} className="text-foreground/20" />
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.15em] text-foreground/35 uppercase">Level</span>
              <span className="font-skyrim text-sm font-bold text-foreground/90">90</span>
            </div>
            <MidDivider height={14} className="text-foreground/20" />
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.15em] text-foreground/35 uppercase">Race</span>
              <span className="font-skyrim text-xs tracking-wider text-foreground/75">Engineer</span>
            </div>
          </div>

          {/* Right: empty spacer to balance the grid */}
          <div />
        </div>
      </WideTopBar>
    </motion.div>
  );
}
