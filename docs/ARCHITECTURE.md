# Architecture Overview

This is a Skyrim-themed interactive web portfolio that recreates the game's menu system as a personal portfolio. The entire UI is a single-page application where the user navigates between four sections using a central compass rose, just like Skyrim's pause menu.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | ^5 |
| UI Library | React | 19.2.3 |
| Styling | Tailwind CSS v4 + custom CSS | ^4 |
| Animation | Framer Motion | ^12.34.3 |
| Audio | Howler.js | ^2.2.4 |
| Build | Turbopack (via Next.js) | bundled |

## Directory Structure

```
WebPortfolio/
├── docs/                          # Documentation (you are here)
├── SkyUI/                         # Full Skyrim UI asset pack (509 files, reference only)
│   └── Skyrim Interface Elements/ # Bars, Boxes, Buttons-Keys, Fonts, HUD, Map Markers, Menu Icons, Title
├── public/
│   ├── fonts/                     # Futura Condensed TTFs (Light, Medium, Bold) from SkyUI pack
│   ├── sounds/                    # Audio files (ambient.mp3, hover.mp3, click.mp3, open.mp3, close.mp3)
│   ├── SkyUI/                     # Curated web-ready SkyUI assets (50 files, kebab-case names)
│   │   ├── bars/                  # Bar frame images (compass, condensed, empty, top, wider-top)
│   │   ├── boxes/                 # Card frame images (info cards, bottom bars, message cards)
│   │   ├── dividers/              # Ornate and simple divider images
│   │   ├── hud/                   # HUD overlay images (compass text)
│   │   ├── icons/                 # UI icons (dragon, legendary, arrows, selectors)
│   │   ├── keys/                  # Keyboard key images (escape)
│   │   └── markers/               # Map location marker images (cave, fort, college, etc.)
│   └── images/                    # Static images (project screenshots, etc.)
├── src/
│   ├── app/
│   │   ├── globals.css            # Global styles, Skyrim theme, CSS variables, animations
│   │   ├── layout.tsx             # Root layout (metadata, html/body shell)
│   │   └── page.tsx               # Main page — single-page app controller
│   ├── components/
│   │   ├── ui/                    # Shared UI: CompassNav, StatBars, TopBar, MuteButton, StarField, FogEffect
│   │   ├── skills/                # ConstellationView (skill tree section)
│   │   ├── items/                 # InventoryView (projects section)
│   │   ├── map/                   # WorldMap (experience/education section)
│   │   └── magic/                 # SpellBook (CV/resume section)
│   ├── data/                      # Static data files (skills, projects, locations, resume)
│   └── hooks/                     # Custom hooks (useAudio, useKeyboard)
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts             # (auto-configured by Tailwind v4)
```

## Application Flow

The app is a **single-page client component** (`"use client"` at root). There are no separate routes — all four sections render conditionally inside `src/app/page.tsx` based on `currentSection` state.

```
User lands on page
  → Main Menu (compass rose with SKILLS / ITEMS / MAP / MAGIC)
  → User clicks a direction
  → Section slides in from that compass direction (Framer Motion)
  → User presses ESC or clicks back button
  → Section slides out, main menu fades back in
```

### State Management

All state lives in `page.tsx` via React `useState`:

- `currentSection: Section | null` — which section is active (`null` = main menu)
- `hasInteracted: boolean` — tracks first user interaction (for audio autoplay policy)

No external state library is used. Each section component manages its own internal state (e.g., which skill is selected, which project is highlighted).

### Navigation Model

Sections are mapped to compass directions:

| Section | Direction | Slide Animation |
|---------|-----------|-----------------|
| Skills | North (top) | Slides in from top |
| Items | East (right) | Slides in from right |
| Map | South (bottom) | Slides in from bottom |
| Magic | West (left) | Slides in from left |

### Rendering Layers (z-index)

```
z-0   StarField (canvas, always rendered)
z-1   FogEffect (canvas, main menu only)
z-2   Vignette overlay (main menu only)
z-10  Main menu (compass + character info)
z-20  Active section view
z-50  TopBar + StatBars (persistent HUD)
z-60  MuteButton
```

## Data Layer

All content is stored as typed TypeScript objects in `src/data/`. There is no database or CMS — everything is static and editable directly in code.

| File | Purpose | Key Interface |
|------|---------|---------------|
| `skills.ts` | Skill categories with constellation node positions | `SkillCategory` |
| `projects.ts` | Project entries with rarity, stats, tech stack | `Project` |
| `locations.ts` | Map locations with coordinates and descriptions | `Location` |
| `resume.ts` | Parchment CV (Chronicle) sections and entries | `ParchmentSection` |

## Styling System

The app uses a hybrid approach:

1. **Tailwind CSS v4** — utility classes for layout, spacing, responsive
2. **Custom CSS classes** in `globals.css` — Skyrim-specific effects:
   - `.font-skyrim` — Skyrim font family + letter spacing + uppercase
   - `.text-glow`, `.text-glow-cyan`, `.text-glow-gold` — text shadow glow effects
   - `.nebula-bg` — radial gradient nebula background for skills section
   - `.stat-bar` — HUD stat bar with shimmer animation
3. **CSS custom properties** — theme colors defined in `:root` and exposed to Tailwind via `@theme inline`

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Background | `#0a0a0a` | Page background |
| Foreground | `#d4c9a8` | Primary text (warm white) |
| Skyrim Gold | `#b8860b` | Accents, item values, gold elements |
| Skyrim Cyan | `#4dc9f6` | Constellation glow, active states |
| Parchment | `#d2b48c` | Map background |
| Magicka Blue | `#3366cc` | Magicka stat bar |
| Health Red | `#cc3333` | Health stat bar |
| Stamina Green | `#339933` | Stamina stat bar |

## Audio System

Managed by `useAudio` hook wrapping Howler.js:

- **Ambient loop** — `ambient.mp3` plays continuously (0.15 volume)
- **UI sounds** — `hover.mp3`, `click.mp3`, `open.mp3`, `close.mp3` (0.3 volume)
- **Mute toggle** — persisted in `localStorage` under key `skyrim-portfolio-muted`
- **Lazy initialization** — audio only loads after first user interaction (browser autoplay policy)

## SkyUI Asset Integration

Authentic Skyrim UI assets from the "Skyrim Interface Elements" pack are integrated throughout the app via `next/image`:

- **Fonts**: Futura Condensed (Light/Medium/Bold) TTFs registered as `"Skyrim"` font-family in `globals.css`
- **StatBars**: `condensed-bar.png` and `empty-bar.png` frames replace CSS-only bars
- **TopBar**: `wider-top-bar.png` frame, `escape.png` key icon, ornate dividers
- **Main menu**: Ornate dividers (`ornate-l.png`, `ornate-r.png`) and mid dividers around character info
- **Skills**: `selector-left.png` / `selector-right.png` arrows, ornate dividers above category bar
- **Items**: `info-card-empty.png` detail frame, `bottom-bar-thin.png` carry weight footer, ornate dividers, dragon icon
- **Map**: `college.png`, `fort.png`, `standing-stone.png` markers replace SVG pins
- **Magic**: `dragon.png` icon in school headers, ornate dividers below headers and above download button

All image assets are loaded from `public/SkyUI/` using Next.js `<Image>` component for automatic optimization.

## Current Limitations / Placeholder State

- **Audio files** — all `.mp3` files in `public/sounds/` are empty 0-byte placeholders. Real audio files need to be added.
- ~~**Font**~~ — **RESOLVED.** Futura Condensed TTFs from SkyUI pack are installed and registered.
- **Data** — all content in `src/data/` is placeholder. Real projects, skills, locations, and resume data need to be filled in.
- **Mobile** — desktop-first design. No mobile-specific adaptations yet.
- **CV download** — the "Cast Spell (Download CV)" button has no actual download functionality wired up.
- **Project links** — GitHub and demo URLs point to `https://github.com` and `https://example.com` placeholders.
