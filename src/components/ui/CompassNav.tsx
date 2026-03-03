"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface CompassNavProps {
  currentSection: string | null;
  onNavigate: (section: string | null) => void;
  onHover?: () => void;
  onClick?: () => void;
}

const sections = [
  { id: "skills", label: "Skills", dx: 0, dy: -1 },
  { id: "items", label: "Items", dx: 1, dy: 0 },
  { id: "map", label: "Map", dx: 0, dy: 1 },
  { id: "magic", label: "Magic", dx: -1, dy: 0 },
] as const;

const BLADE_COLOR = "212, 201, 168";

const HORIZ_LENGTH = 220;
const HORIZ_BASE_HALF = 9;

const VERT_LENGTH = 110;
const VERT_BASE_HALF = 9;

const LABEL_GAP = 22;
const PARTICLE_COUNT = 32;

type BladeId = "skills" | "items" | "map" | "magic";

const keyToSection: Record<string, BladeId> = {
  ArrowUp: "skills",
  ArrowRight: "items",
  ArrowDown: "map",
  ArrowLeft: "magic",
  w: "skills",
  W: "skills",
  d: "items",
  D: "items",
  s: "map",
  S: "map",
  a: "magic",
  A: "magic",
};

function getBladePoints(id: BladeId): string {
  switch (id) {
    case "skills":
      return `0,${-VERT_LENGTH} ${VERT_BASE_HALF},-12 0,0 ${-VERT_BASE_HALF},-12`;
    case "map":
      return `0,${VERT_LENGTH} ${-VERT_BASE_HALF},12 0,0 ${VERT_BASE_HALF},12`;
    case "items":
      return `${HORIZ_LENGTH},0 12,${HORIZ_BASE_HALF} 0,0 12,${-HORIZ_BASE_HALF}`;
    case "magic":
      return `${-HORIZ_LENGTH},0 -12,${-HORIZ_BASE_HALF} 0,0 -12,${HORIZ_BASE_HALF}`;
  }
}

function getBladeHitArea(id: BladeId): {
  x: number;
  y: number;
  w: number;
  h: number;
} {
  const sidePad = 30;
  const hLen = HORIZ_LENGTH + 60;
  const vLen = VERT_LENGTH + 50;
  switch (id) {
    case "skills":
      return { x: -sidePad, y: -vLen, w: sidePad * 2, h: vLen - 15 };
    case "map":
      return { x: -sidePad, y: 15, w: sidePad * 2, h: vLen - 15 };
    case "items":
      return { x: 15, y: -sidePad, w: hLen - 15, h: sidePad * 2 };
    case "magic":
      return { x: -hLen, y: -sidePad, w: hLen - 15, h: sidePad * 2 };
  }
}

function getLabelPos(id: BladeId): { x: number; y: number } {
  switch (id) {
    case "skills":
      return { x: 0, y: -(VERT_LENGTH + LABEL_GAP) };
    case "map":
      return { x: 0, y: VERT_LENGTH + LABEL_GAP };
    case "items":
      return { x: HORIZ_LENGTH + LABEL_GAP + 30, y: 0 };
    case "magic":
      return { x: -(HORIZ_LENGTH + LABEL_GAP + 30), y: 0 };
  }
}

/* ── Particle system ─────────────────────────────────────── */

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

interface ParticleData {
  id: number;
  lateralOffset: number;
  speed: number;
  size: number;
  opacity: number;
  delay: number;
  drift: number;
  layer: number;
}

function generateParticles(bladeId: BladeId): ParticleData[] {
  const baseSeed = bladeId.charCodeAt(0) * 1000 + bladeId.charCodeAt(1) * 100;
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const s = baseSeed + i;
    const layer = i % 3;
    const layerScale = [0.6, 1, 1.5][layer];
    return {
      id: i,
      lateralOffset: (seededRandom(s + 1) - 0.5) * 22,
      speed: 2 - layer * 0.4 + seededRandom(s + 2) * 1.5,
      size: (0.5 + seededRandom(s + 3) * 1.4) * layerScale,
      opacity: (0.2 + seededRandom(s + 4) * 0.45) * layerScale,
      delay: seededRandom(s + 5) * 0.8,
      drift: (2 + seededRandom(s + 6) * 5) * layerScale,
      layer,
    };
  });
}

function getParticleAnimation(bladeId: BladeId, p: ParticleData) {
  const isVertical = bladeId === "skills" || bladeId === "map";
  const length = isVertical ? VERT_LENGTH : HORIZ_LENGTH;
  const dir = bladeId === "skills" || bladeId === "magic" ? -1 : 1;

  const axisPositions = [0.1, 0.35, 0.65, 0.95].map((t) => t * length * dir);
  const driftValues = [
    p.lateralOffset,
    p.lateralOffset + p.drift,
    p.lateralOffset - p.drift * 0.7,
    p.lateralOffset,
  ];

  if (isVertical) {
    return {
      cx: driftValues,
      cy: axisPositions,
      opacity: [0, p.opacity, p.opacity * 0.7, 0],
    };
  }
  return {
    cx: axisPositions,
    cy: driftValues,
    opacity: [0, p.opacity, p.opacity * 0.7, 0],
  };
}

const bladeParticles: Record<BladeId, ParticleData[]> = {
  skills: generateParticles("skills"),
  items: generateParticles("items"),
  map: generateParticles("map"),
  magic: generateParticles("magic"),
};

/* ── Component ───────────────────────────────────────────── */

export function CompassNav({
  currentSection,
  onNavigate,
  onHover,
  onClick,
}: CompassNavProps) {
  const [hoveredBlade, setHoveredBlade] = useState<string | null>(null);
  const [selectedBlade, setSelectedBlade] = useState<string | null>(null);

  const activeBlade = hoveredBlade || selectedBlade;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (currentSection) return;

      const targetSection = keyToSection[e.key];
      if (!targetSection) return;

      e.preventDefault();

      if (selectedBlade === targetSection) {
        onClick?.();
        onNavigate(targetSection);
        setSelectedBlade(null);
      } else {
        onHover?.();
        setSelectedBlade(targetSection);
      }
    },
    [currentSection, selectedBlade, onNavigate, onHover, onClick]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleMouseEnter = (id: string) => {
    setHoveredBlade(id);
    setSelectedBlade(null);
    onHover?.();
  };

  const handleMouseLeave = () => {
    setHoveredBlade(null);
  };

  const viewBoxWidth = 820;
  const viewBoxHeight = 520;
  const cx = viewBoxWidth / 2;
  const cy = viewBoxHeight / 2;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: "min(880px, 90vw)", aspectRatio: "880 / 560" }}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="blade-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="blade-pulse"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter
            id="particle-glow"
            x="-200%"
            y="-200%"
            width="500%"
            height="500%"
          >
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${cx}, ${cy})`}>
          {/* Guide lines */}
          <line
            x1="0"
            y1={-(VERT_LENGTH + 80)}
            x2="0"
            y2={VERT_LENGTH + 80}
            stroke={`rgba(${BLADE_COLOR}, 0.08)`}
            strokeWidth="0.5"
          />
          <line
            x1={-(HORIZ_LENGTH + 100)}
            y1="0"
            x2={HORIZ_LENGTH + 100}
            y2="0"
            stroke={`rgba(${BLADE_COLOR}, 0.08)`}
            strokeWidth="0.5"
          />
          <line
            x1="-110"
            y1="-110"
            x2="110"
            y2="110"
            stroke={`rgba(${BLADE_COLOR}, 0.04)`}
            strokeWidth="0.3"
          />
          <line
            x1="110"
            y1="-110"
            x2="-110"
            y2="110"
            stroke={`rgba(${BLADE_COLOR}, 0.04)`}
            strokeWidth="0.3"
          />

          {/* Blades + labels */}
          {sections.map((section) => {
            const highlighted = activeBlade === section.id;
            const labelPos = getLabelPos(section.id);
            const hitArea = getBladeHitArea(section.id);

            return (
              <g
                key={section.id}
                className="cursor-pointer"
                onMouseEnter={() => handleMouseEnter(section.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  onClick?.();
                  onNavigate(section.id);
                }}
              >
                {/* Hit area */}
                <rect
                  x={hitArea.x}
                  y={hitArea.y}
                  width={hitArea.w}
                  height={hitArea.h}
                  fill="transparent"
                />

                {/* Pulsing glow aura behind active blade */}
                {highlighted && (
                  <motion.polygon
                    points={getBladePoints(section.id)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    fill={`rgb(${BLADE_COLOR})`}
                    stroke="none"
                    filter="url(#blade-pulse)"
                  />
                )}

                {/* Main blade — fixed size, no extension */}
                <polygon
                  points={getBladePoints(section.id)}
                  fill={`rgba(${BLADE_COLOR}, ${highlighted ? 0.45 : 0.18})`}
                  stroke={`rgba(${BLADE_COLOR}, ${highlighted ? 0.9 : 0.4})`}
                  strokeWidth={highlighted ? "0.8" : "0.5"}
                  strokeLinejoin="miter"
                  filter={highlighted ? "url(#blade-glow)" : undefined}
                  style={{
                    transition:
                      "fill 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease",
                  }}
                />

                {/* Parallax particles — 3 depth layers, float along blade axis */}
                {highlighted &&
                  bladeParticles[section.id].map((p) => {
                    const anim = getParticleAnimation(section.id, p);
                    return (
                      <motion.circle
                        key={p.id}
                        r={p.size}
                        fill={`rgb(${BLADE_COLOR})`}
                        animate={anim}
                        transition={{
                          duration: p.speed,
                          delay: p.delay,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        filter={
                          p.layer >= 1 ? "url(#particle-glow)" : undefined
                        }
                      />
                    );
                  })}

                {/* Label — fixed position */}
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-skyrim select-none"
                  fill={
                    highlighted
                      ? `rgba(${BLADE_COLOR}, 0.95)`
                      : `rgba(${BLADE_COLOR}, 0.4)`
                  }
                  fontSize="18px"
                  style={{
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    filter: highlighted
                      ? `drop-shadow(0 0 8px rgba(${BLADE_COLOR}, 0.6)) drop-shadow(0 0 18px rgba(${BLADE_COLOR}, 0.3))`
                      : "none",
                    transition: "fill 0.3s ease, filter 0.4s ease",
                  }}
                >
                  {section.label}
                </text>
              </g>
            );
          })}

          {/* Outer diamond */}
          <polygon
            points="0,-20 20,0 0,20 -20,0"
            fill="none"
            stroke={`rgba(${BLADE_COLOR}, 0.25)`}
            strokeWidth="0.5"
          />

          {/* Inner diamond */}
          <polygon
            points="0,-10 10,0 0,10 -10,0"
            fill={`rgba(${BLADE_COLOR}, 0.08)`}
            stroke={`rgba(${BLADE_COLOR}, 0.3)`}
            strokeWidth="0.5"
          />

          {/* Center circles */}
          <circle
            r="12"
            fill="none"
            stroke={`rgba(${BLADE_COLOR}, 0.15)`}
            strokeWidth="0.3"
          />
          <circle
            r="6"
            fill={`rgba(${BLADE_COLOR}, 0.12)`}
            stroke={`rgba(${BLADE_COLOR}, 0.4)`}
            strokeWidth="0.5"
          />
          <circle r="3" fill={`rgba(${BLADE_COLOR}, 0.25)`} stroke="none" />
        </g>
      </svg>
    </div>
  );
}
