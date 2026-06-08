"use client";

import { ProjectCategory } from "@/data/projects";

/**
 * Thematic showcase banners — one motif per project category.
 *
 * The portfolio has no live project screenshots (no demo URLs exist to
 * capture, and GitHub code pages make poor showcase art), so each project
 * gets an original geometric line-art motif instead — in the same
 * SVG/CSS-only spirit as `NordicKnot` and the rest of `SkyFrame`. Motifs are
 * drawn in `currentColor` and tinted per category so the inventory keeps a
 * consistent, intentional look rather than empty placeholder space.
 */

const categoryAccent: Record<ProjectCategory, string> = {
  weapons: "text-skyrim-gold/40",
  armor: "text-foreground/35",
  potions: "text-emerald-400/35",
  scrolls: "text-sky-400/40",
};

const categoryGlow: Record<ProjectCategory, string> = {
  weapons: "from-skyrim-gold/[0.07]",
  armor: "from-foreground/[0.05]",
  potions: "from-emerald-400/[0.06]",
  scrolls: "from-sky-400/[0.07]",
};

// ─── Weapons (Frontend) — crossed blades ────────────────────────────────────
function WeaponsMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <g opacity="0.9">
        <path
          d="M55 30 L100 100 L92 112 L47 42 Z M47 42 L36 36 L41 30 Z"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <path
          d="M145 30 L100 100 L108 112 L153 42 Z M153 42 L164 36 L159 30 Z"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <path d="M100 100 L100 168" stroke="currentColor" strokeWidth="1.1" />
        <path d="M82 122 L118 122" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="100" cy="100" r="4.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
        <path d="M100 168 L92 178 L108 178 Z" stroke="currentColor" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

// ─── Armor (Backend) — layered shield ───────────────────────────────────────
function ArmorMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <g opacity="0.9">
        <path
          d="M100 28 L150 46 L150 104 C150 142 128 168 100 180 C72 168 50 142 50 104 L50 46 Z"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="currentColor"
          fillOpacity="0.04"
        />
        <path
          d="M100 48 L134 60 L134 102 C134 130 118 150 100 159 C82 150 66 130 66 102 L66 60 Z"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.7"
        />
        <path d="M100 48 L100 159" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
        <path d="M70 84 L130 84" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
        <path d="M68 110 L132 110" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      </g>
    </svg>
  );
}

// ─── Potions (Tools) — alchemy circle ───────────────────────────────────────
function PotionsMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <g opacity="0.9">
        <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="44" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = 100 + Math.cos(angle) * 62;
          const y1 = 100 + Math.sin(angle) * 62;
          const x2 = 100 + Math.cos(angle) * 68;
          const y2 = 100 + Math.sin(angle) * 68;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.5"
            />
          );
        })}
        {/* Flask silhouette */}
        <path
          d="M92 70 L92 92 L78 124 C75 130 79 136 86 136 L114 136 C121 136 125 130 122 124 L108 92 L108 70 Z"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <path d="M88 70 L112 70" stroke="currentColor" strokeWidth="1.1" />
        <path d="M82 118 L118 118" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <circle cx="100" cy="128" r="2.4" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  );
}

// ─── Scrolls (Full Stack) — unfurled scroll + seal ──────────────────────────
function ScrollsMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <g opacity="0.9">
        <rect
          x="58"
          y="58"
          width="84"
          height="100"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.035"
        />
        <path d="M58 70 C50 70 50 58 58 58" stroke="currentColor" strokeWidth="1.1" />
        <path d="M142 70 C150 70 150 58 142 58" stroke="currentColor" strokeWidth="1.1" />
        <path d="M58 146 C50 146 50 158 58 158" stroke="currentColor" strokeWidth="1.1" />
        <path d="M142 146 C150 146 150 158 142 158" stroke="currentColor" strokeWidth="1.1" />
        <line x1="72" y1="80" x2="128" y2="80" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <line x1="72" y1="92" x2="120" y2="92" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <line x1="72" y1="104" x2="124" y2="104" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        {/* wax seal */}
        <circle cx="100" cy="130" r="14" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.05" />
        <path
          d="M100 122 L103.5 128 L110 129 L105 134 L106 140.5 L100 137.5 L94 140.5 L95 134 L90 129 L96.5 128 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

const motifs: Record<ProjectCategory, React.FC<{ className?: string }>> = {
  weapons: WeaponsMotif,
  armor: ArmorMotif,
  potions: PotionsMotif,
  scrolls: ScrollsMotif,
};

interface ProjectBannerProps {
  category: ProjectCategory;
  className?: string;
}

export function ProjectBanner({ category, className = "" }: ProjectBannerProps) {
  const Motif = motifs[category];
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Radial tint matching the category */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${categoryGlow[category]} via-transparent to-transparent`}
      />
      {/* Faint corner vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.35)_100%)]" />
      {/* Centered motif */}
      <div className={`absolute inset-0 flex items-center justify-center ${categoryAccent[category]}`}>
        <Motif className="w-[46%] h-[46%]" />
      </div>
      {/* Hairline frame */}
      <div className="absolute inset-0 border border-foreground/[0.06]" />
    </div>
  );
}
