"use client";

import { NordicKnot } from "@/components/ui/SkyFrame";

function KeyHint({ label, action }: { label: string; action: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-[3px]
          border border-foreground/25 bg-foreground/[0.08]
          font-skyrim text-[7px] tracking-wider text-foreground/45 select-none
          shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
      >
        {label}
      </span>
      <span className="font-skyrim text-[9px] tracking-[0.12em] text-foreground/30">
        {action}
      </span>
    </div>
  );
}

interface InventoryBarProps {
  projectCount: number;
}

export function InventoryBar({ projectCount }: InventoryBarProps) {
  return (
    <div className="shrink-0 px-6 lg:px-10 pb-12">
      <div className="relative h-8">
        {/* Top/bottom gradient border lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent" />
        <div className="absolute inset-0 bg-foreground/[0.015]" />

        <div className="relative h-full flex items-center justify-between px-4 lg:px-6">
          {/* Left: action keybind hints (EscKey-style caps) */}
          <div className="flex items-center gap-5">
            <KeyHint label="E" action="Visit Demo" />
            <KeyHint label="G" action="GitHub" />
          </div>

          {/* Right: summary stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-skyrim text-[9px] tracking-[0.15em] text-foreground/30">
                Projects
              </span>
              <span className="font-skyrim text-xs text-foreground/55">
                {projectCount}
              </span>
            </div>
            <NordicKnot size={11} className="text-foreground/12" />
            <div className="flex items-center gap-2">
              <span className="font-skyrim text-[9px] tracking-[0.15em] text-foreground/30">
                Gold
              </span>
              <span className="font-skyrim text-xs text-skyrim-gold/50">
                4700
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
