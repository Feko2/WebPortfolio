"use client";

import React from "react";

/**
 * SVG/CSS replacements for SkyUI PNG assets.
 * Fully responsive, no image dependencies.
 */

// ─── Nordic Celtic Knot Ornament ─────────────────────────────────────────────
// Two interlocking rings (diamond + square) inspired by the Skyrim UI celtic knot

export function NordicKnot({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Diamond ring */}
      <path
        d="M16 2 L30 16 L16 30 L2 16 Z M16 6 L26 16 L16 26 L6 16 Z"
        fill="currentColor"
        fillRule="evenodd"
        opacity="0.35"
      />
      {/* Square ring */}
      <path
        d="M7 7 L25 7 L25 25 L7 25 Z M10 10 L22 10 L22 22 L10 22 Z"
        fill="currentColor"
        fillRule="evenodd"
        opacity="0.45"
      />
      {/* Corner weave accents */}
      <line x1="7" y1="7" x2="10" y2="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <line x1="25" y1="7" x2="22" y2="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <line x1="7" y1="25" x2="10" y2="22" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <line x1="25" y1="25" x2="22" y2="22" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    </svg>
  );
}

// ─── Ornate Divider ──────────────────────────────────────────────────────────
// Decorative ornament used beside section labels (replaces ornate-l.png / ornate-r.png)

export function OrnateDivider({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <NordicKnot size={size} className={className} />;
}

// ─── Vertical Mid Divider ────────────────────────────────────────────────────
// Thin vertical separator between text elements (replaces mid.png)

export function MidDivider({
  height = 14,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: 1,
        height,
        background:
          "linear-gradient(to bottom, transparent, currentColor 20%, currentColor 80%, transparent)",
      }}
    />
  );
}

// ─── Escape Key ──────────────────────────────────────────────────────────────
// Rounded key-cap with "Esc" text (replaces escape.png)

export function EscKey({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[5px]
        border border-foreground/25 bg-foreground/[0.08]
        shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(255,255,255,0.05)]
        ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="font-skyrim text-[8px] tracking-wider text-foreground/50 select-none">
        Esc
      </span>
    </div>
  );
}

// ─── Wide Top Bar ────────────────────────────────────────────────────────────
// Full-width horizontal bar with ornate endpoints (replaces wider-top-bar.png)

export function WideTopBar({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-[42px] ${className}`}>
      {/* Background fill */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Top edge line with gradient fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.12] to-transparent" />
      {/* Bottom edge line with gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.12] to-transparent" />

      {/* Content */}
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// ─── Stat Bar Frame ──────────────────────────────────────────────────────────
// Frames for health/magicka/stamina bars (replaces empty-bar.png + condensed-bar.png)

export function StatBarFrame({
  variant = "condensed",
  children,
  className = "",
}: {
  variant?: "wide" | "condensed";
  children?: React.ReactNode;
  className?: string;
}) {
  if (variant === "wide") {
    return (
      <div className={`relative h-[24px] ${className}`}>
        {/* Rectangular frame */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 240 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect
            x="16"
            y="1"
            width="208"
            height="22"
            rx="1"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
            fill="rgba(255,255,255,0.02)"
          />
        </svg>

        {/* Endpoint ornaments */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[20%] text-foreground/20">
          <NordicKnot size={20} />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] text-foreground/20">
          <NordicKnot size={20} />
        </div>

        {/* Fill area — matches original inset-y-[5px] inset-x-[20px] */}
        <div className="absolute inset-y-[5px] inset-x-[20px] overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  // Condensed variant — hexagonal/beveled shape for magicka & stamina
  return (
    <div className={`relative h-[22px] ${className}`}>
      {/* Hexagonal frame */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 22"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M14 1 L186 1 L199 11 L186 21 L14 21 L1 11 Z"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.7"
          strokeLinejoin="miter"
          fill="rgba(255,255,255,0.02)"
        />
      </svg>

      {/* Endpoint ornaments */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[30%] text-foreground/15">
        <NordicKnot size={16} />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[30%] text-foreground/15">
        <NordicKnot size={16} />
      </div>

      {/* Fill area — matches original inset-y-[4px] inset-x-[14px] */}
      <div className="absolute inset-y-[4px] inset-x-[14px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
