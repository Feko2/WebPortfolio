# Agent Instructions — Skyrim Portfolio

You are working on a Skyrim-themed interactive web portfolio. Read this document first to understand the project before making changes.

## Project Identity

This is a personal portfolio for **Sena**, a 22-year-old developer (Breton race in Skyrim terms). The entire UI recreates Skyrim's character menu system — the compass navigation, constellation skill trees, inventory system, world map, and a parchment Chronicle (CV) — as a creative portfolio.

## Quick Start

```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run lint   # Run ESLint
```

Note: On this machine, `npx` may not work directly. Use `node node_modules/next/dist/bin/next dev` if needed.

## How the App Works

This is a **single-page app** — all navigation happens within `src/app/page.tsx` via React state. There are no separate routes.

The user sees a compass rose on the main menu and clicks a direction to enter a section:
- **North → Skills**: Constellation skill tree (`src/components/skills/ConstellationView.tsx`)
- **East → Items**: Project inventory (`src/components/items/InventoryView.tsx`)
- **South → Map**: World map of experience (`src/components/map/WorldMap.tsx`)
- **West → Magic (Chronicle)**: Parchment CV with map/items links (`src/components/magic/SpellBook.tsx`)

Pressing ESC or clicking the back button returns to the main menu.

## Key Files to Know

| What | Where |
|------|-------|
| Main page controller | `src/app/page.tsx` |
| Global styles + theme | `src/app/globals.css` |
| All portfolio content | `src/data/*.ts` |
| Shared UI (HUD, nav) | `src/components/ui/` |
| Section components | `src/components/{skills,items,map,magic}/` |
| Audio system | `src/hooks/useAudio.ts` |
| SkyUI assets (web-ready) | `public/SkyUI/` |
| SkyUI assets (full pack) | `SkyUI/Skyrim Interface Elements/` |
| Fonts (Futura Condensed) | `public/fonts/` |

## Styling Rules

- Use **Tailwind CSS v4** utilities for layout and spacing
- Use the custom CSS classes in `globals.css` for Skyrim-specific effects:
  - `.font-skyrim` — Skyrim font + uppercase + letter-spacing
  - `.text-glow`, `.text-glow-cyan`, `.text-glow-gold` — glow effects
  - `.nebula-bg` — skills section background
  - `.stat-bar` — HUD bar with shimmer
- Theme colors are defined as CSS custom properties in `:root` and exposed to Tailwind via `@theme inline`
- The color palette is: dark charcoal background, warm white text, gold accents, cyan for active/interactive states
- All text uses low opacity values (25-80%) to create the muted Skyrim aesthetic — never use full white

## Animation Rules

- Use **Framer Motion** for all component animations (entrance, exit, transitions)
- Section transitions slide in from the compass direction (skills from top, items from right, etc.)
- Use `AnimatePresence` with `mode="wait"` for content swaps within sections
- Stagger child animations with incremental delays (typically 0.04-0.08s per item)
- Keep animations subtle and smooth — ease curves like `[0.16, 1, 0.3, 1]`

## Data Editing

All content lives in `src/data/`. See `docs/DATA.md` for detailed editing instructions. Currently all content is placeholder — it needs to be replaced with real portfolio data.

## SkyUI Asset Pack

The project includes an authentic Skyrim UI component pack located in two places:

- **`/SkyUI/Skyrim Interface Elements/`** — Full original asset collection (509 files). Reference only.
- **`public/SkyUI/`** — Curated web-ready subset (50 files) with kebab-case names. These are the files used by components.

### Asset directory structure (`public/SkyUI/`)

```
public/SkyUI/
├── bars/        # Bar frames: compass, condensed, empty, top, triple, wider-top
├── boxes/       # Card frames: info cards, bottom bars, message cards, level-up
├── dividers/    # Ornate and simple dividers (left, right, mid)
├── hud/         # Compass text overlay
├── icons/       # UI icons: dragon, legendary, arrows, selectors, quest markers
├── keys/        # Keyboard key images (escape.png)
└── markers/     # Map location markers: cave, fort, college, farm, settlement, etc.
```

### How assets are used

| Asset | Component | Purpose |
|-------|-----------|---------|
| `bars/condensed-bar.png` | StatBars | Magicka and Stamina bar frames |
| `bars/empty-bar.png` | StatBars | Health bar frame |
| `bars/wider-top-bar.png` | TopBar | Section header bar frame |
| `boxes/info-card-empty.png` | InventoryView | Item detail card background |
| `boxes/bottom-bar-thin.png` | InventoryView | Carry weight / gold footer |
| `dividers/ornate-l.png`, `ornate-r.png` | Multiple | Decorative dividers flanking content |
| `dividers/mid.png` | TopBar, page.tsx | Vertical separator between stats |
| `icons/dragon.png` | InventoryView | Decorative dragon icon |
| `icons/selector-left/right.png` | ConstellationView | Skill category navigation arrows |
| `keys/escape.png` | TopBar | ESC key icon for back button |
| `markers/college.png` | WorldMap | Education location markers |
| `markers/fort.png` | WorldMap | Work location markers |
| `markers/standing-stone.png` | WorldMap | Project location markers |

### Adding new SkyUI assets

1. Copy the file from `SkyUI/Skyrim Interface Elements/` to the appropriate `public/SkyUI/` subfolder
2. Rename to kebab-case (e.g., `Info Card - Wide.png` → `info-card-wide.png`)
3. Import via `next/image` with `src="/SkyUI/subfolder/filename.png"`

## What's Placeholder / Not Yet Done

1. **Audio files** — all `.mp3` files in `public/sounds/` are empty. Need real sound effects.
2. ~~**Font**~~ — **DONE.** Futura Condensed (Light, Medium, Bold) TTFs from SkyUI pack are in `public/fonts/` and registered in `globals.css`.
3. **All data** — skills, projects, locations, resume entries are placeholder text.
4. ~~**CV download**~~ — wired in Chronicle (`public/felipe-ramos-cv-en.pdf`).
5. **Mobile** — no mobile-specific layout or touch interactions.
6. **Images** — no project screenshots, no real map texture, no constellation icons. (Map markers, bar frames, card frames, and dividers are now covered by SkyUI assets.)
7. **Links** — GitHub and demo URLs are placeholder.

## Documentation Index

Read these docs for detailed specifications on each part:

| Doc | What It Covers |
|-----|---------------|
| `ARCHITECTURE.md` | Tech stack, directory structure, app flow, state management, z-index layers |
| `UI.md` | Shared UI components (CompassNav, TopBar, StatBars, MuteButton, StarField, FogEffect) |
| `SKILLS.md` | Constellation skill tree section — visual design, data schema, what needs work |
| `ITEMS.md` | Project inventory section — layout, rarity system, data schema, what needs work |
| `MAP.md` | World map section — parchment design, markers, pan/zoom, what needs work |
| `MAGIC.md` | Chronicle (parchment CV) — schema, map/items links, what needs work |
| `AUDIO.md` | Audio system — Howler.js hook, sound registry, mute behavior, what needs work |
| `DATA.md` | Data layer — all schemas, how to edit content, relationships |
| `GOOGLE_STITCH_ASSETS.md` | Image/asset generation specs for Google Stitch — every visual asset needed |

## Common Tasks

### "Add a new skill category"
1. Edit `src/data/skills.ts` — add entry to `skills` array
2. Design constellation node positions (x: 0-800, y: 0-500)
3. Define connections between nodes
4. No component changes needed — it auto-renders from data

### "Add a new project"
1. Edit `src/data/projects.ts` — add entry to `projects` array
2. Choose category, rarity, weight, value
3. No component changes needed

### "Change the character info (name, level, race)"
Update in three places:
1. `src/app/page.tsx` — main menu character info bar
2. `src/components/ui/TopBar.tsx` — section header
3. `src/components/skills/ConstellationView.tsx` — skills section header

### "Add real audio"
1. Replace empty files in `public/sounds/` with real `.mp3` files
2. Keep filenames the same: `ambient.mp3`, `hover.mp3`, `click.mp3`, `open.mp3`, `close.mp3`
3. No code changes needed

### "Wire up CV download"
1. Place or replace the PDF at `public/felipe-ramos-cv-en.pdf`
2. The Chronicle sidebar already links to it (`Download CV (PDF)`).
