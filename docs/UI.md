# UI Components Specification

All shared UI components live in `src/components/ui/`. These are the persistent elements that appear across the entire app — the HUD, navigation, audio controls, and atmospheric effects.

## CompassNav (`CompassNav.tsx`)

The central navigation element on the main menu. Recreates Skyrim's iconic 4-directional compass rose.

### Current Implementation

- **Size**: 400x400px SVG viewBox
- **Visual elements**:
  - Outer subtle rings (r=160, r=120) at very low opacity
  - Horizontal and vertical axis lines
  - Diagonal guide lines (even lower opacity)
  - 4-pointed star compass rose with north/east/south/west polygons
  - Inner diamond shapes (r=16, r=8)
  - Center Celtic knot (circle r=5, r=10, r=3)
- **Navigation buttons**: 4 `motion.button` elements positioned at cardinal directions, 170px from center
  - Labels: "Skills" (north), "Items" (east), "Map" (south), "Magic" (west)
  - Font: `.font-skyrim` (uppercase, tracked)
  - Hover: scale 1.2 with Framer Motion
  - Active state: full opacity + `.text-glow`
  - Inactive: 40% opacity, hover to 90%

### What Needs Work

- The compass rose is purely geometric SVG. The Skyrim original has an intricate Celtic knot pattern in the center — this needs a more detailed SVG or an image asset.
- No animated rotation or subtle movement on the compass itself.
- The compass lines should have a more organic, hand-drawn quality.
- Consider adding subtle particle effects around the compass center.

---

## TopBar (`TopBar.tsx`)

Appears when any section is active. Shows current section name and provides a back button.

### Current Implementation

- Fixed to top of screen, z-50
- **Uses SkyUI `wider-top-bar.png`** as the bar frame image (42px height, `object-fill`, 70% opacity)
- All content is overlaid on top of the bar frame via absolute positioning
- Left side: **SkyUI `escape.png` key icon** (28x28) + "Back" label + **SkyUI `ornate-l.png` divider** + section name
- Right side: Character info (Name: Sena, Level: 22, Race: Breton) separated by **SkyUI `mid.png` dividers**
- Animates in with `opacity: 0, y: -20` → `opacity: 1, y: 0`
- Only renders when `currentSection !== null`
- Uses `next/image` for all SkyUI assets

### What Needs Work

- Consider adding a progress bar between level indicators (like Skyrim's XP bar).
- The bar frame opacity and positioning may need fine-tuning based on the actual background images used per section.

---

## StatBars (`StatBars.tsx`)

The bottom HUD showing Magicka, Health, and Stamina bars.

### Current Implementation

- Fixed bottom, z-50, `pointer-events-none`
- Three bars arranged: Magicka (left, w-44), Health (center, w-52), Stamina (right, w-44)
- **Uses SkyUI bar frame images** via `next/image`:
  - Magicka & Stamina: `bars/condensed-bar.png` (18px height, 60% opacity)
  - Health: `bars/empty-bar.png` (20px height, 60% opacity)
- Colored gradient fills are rendered inside the bar frames using absolute positioning with inset offsets
- Each bar shows: label + current/max value above the bar frame
- Colors: Blue gradient (Magicka), Red gradient (Health), Green gradient (Stamina)
- Values are hardcoded: 240/240, 200/200, 125/125

### What Needs Work

- Values are static — could be made dynamic to represent real portfolio metrics.
- The bar frame inset offsets (`inset-y-[4px] inset-x-[14px]`) may need fine-tuning depending on display resolution.
- Could use the `triple-bars.png` asset for a single combined bar element instead of three separate bars.

---

## MuteButton (`MuteButton.tsx`)

Toggle for audio on/off.

### Current Implementation

- Fixed top-right corner, z-60
- 40x40px button with dark background + border
- SVG speaker icon with two states (muted: X lines, unmuted: sound waves)
- Hover: border brightens

### What Needs Work

- Works correctly but is visually plain. Could be styled more thematically (e.g., a lute icon, or a Skyrim-style toggle).

---

## StarField (`StarField.tsx`)

Canvas-based animated starfield that renders behind everything.

### Current Implementation

- Full-screen `<canvas>` element, fixed position, z-0, `pointer-events-none`
- Configurable star count (default 200, skills section uses 300)
- Each star has: position, size (0.5-2.5px), opacity, twinkle speed, phase offset
- Animation: sine-wave twinkling on opacity
- Larger stars (>1.5px) get a cyan glow halo via `createRadialGradient`
- Responsive: resizes canvas on window resize

### What Needs Work

- Stars are static in position — could add very slow drift for parallax feel.
- No shooting star / meteor effects.
- The nebula clouds in the skills section are done separately in `ConstellationView` — could be unified.

---

## FogEffect (`FogEffect.tsx`)

Canvas-based fog/mist particle system for the main menu atmosphere.

### Current Implementation

- Full-screen canvas, z-1, `pointer-events-none`
- 12 large fog particles with radial gradients (green-tinted, matching forest atmosphere)
- Each particle: random position, radius 100-300px, very low opacity (0.01-0.04)
- Movement: slow drift (vx: ±0.15, vy: ±0.075) with wrapping at edges
- Breathing effect: sine wave modulates opacity over time

### What Needs Work

- Only appears on main menu — could be adapted per section (e.g., blue mist for skills, warm mist for map).
- The fog is very subtle — may need tuning depending on the background image/video used.
- Consider adding depth layers (near fog vs far fog) for parallax.

---

## Main Menu Character Info Bar (`page.tsx`)

The character info bar below the compass on the main menu now uses SkyUI assets:

- **SkyUI `ornate-l.png`** and **`ornate-r.png`** dividers flanking the info bar (28x28, 25% opacity)
- **SkyUI `mid.png`** vertical dividers between Name/Level/Race stats (20% opacity)
- Displays: Name (Sena), Level (22, bold), Race (Breton)

---

## Persistent HUD Layout

The HUD elements layer on top of everything:

```
┌──────────────────────────────────────────────────────────────┐
│ [ESC.png] Back ◆ SKILLS    Name SENA │ Level 22 │ Race BRETON │  ← TopBar (z-50, wider-top-bar.png frame)
│                                                              │
│                                                              │
│              (Section content fills here)                     │
│                                                              │
│                                                              │
│ MAGICKA 240/240      HEALTH 200/200      STAMINA 125/125     │  ← StatBars (z-50, SkyUI bar frames)
└──────────────────────────────────────────────────────────────┘
                                                        [🔊]  ← MuteButton (z-60)
```

The TopBar only appears when inside a section. StatBars and MuteButton are always visible.

All bar frames, key icons, and dividers are authentic SkyUI PNG assets loaded via `next/image`.
