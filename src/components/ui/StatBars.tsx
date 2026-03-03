"use client";

import { StatBarFrame } from "@/components/ui/SkyFrame";

export function StatBars() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex items-end justify-between px-8 pb-4">
        {/* Magicka */}
        <div className="relative w-48">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-skyrim text-[10px] tracking-[0.2em] text-blue-400/80">
              Magicka
            </span>
            <span className="font-skyrim text-[10px] tracking-wider text-blue-300/70">
              240/240
            </span>
          </div>
          <StatBarFrame variant="condensed">
            <div
              className="h-full bg-gradient-to-r from-blue-700/90 to-blue-500/70"
              style={{ width: "100%" }}
            />
          </StatBarFrame>
        </div>

        {/* Health */}
        <div className="relative w-56">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-skyrim text-[10px] tracking-[0.2em] text-red-400/80">
              Health
            </span>
            <span className="font-skyrim text-[10px] tracking-wider text-red-300/70">
              200/200
            </span>
          </div>
          <StatBarFrame variant="wide">
            <div
              className="h-full bg-gradient-to-r from-red-800/90 to-red-500/70"
              style={{ width: "100%" }}
            />
          </StatBarFrame>
        </div>

        {/* Stamina */}
        <div className="relative w-48">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-skyrim text-[10px] tracking-[0.2em] text-green-400/80">
              Stamina
            </span>
            <span className="font-skyrim text-[10px] tracking-wider text-green-300/70">
              125/125
            </span>
          </div>
          <StatBarFrame variant="condensed">
            <div
              className="h-full bg-gradient-to-r from-green-700/90 to-green-500/70"
              style={{ width: "100%" }}
            />
          </StatBarFrame>
        </div>
      </div>
    </div>
  );
}
