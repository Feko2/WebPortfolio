# Magic Section (West) — Chronicle / Parchment CV

**Direction**: West (left)  
**Component**: `src/components/magic/SpellBook.tsx`  
**Data**: `src/data/resume.ts` (`parchmentSections`)  
**Background**: Warm dark frame (`#1c1410`) behind a full-bleed parchment panel inside `SpellBook`

The West section is a **biographical CV on parchment**, not the Skyrim spell book. It highlights community work, recognition, and work/research, with actions that jump to the **Map** (focused marker) or **Items** (selected project).

## Layout

- **Outer**: `relative` container with parchment gradient, subtle noise texture, inset vignette
- **Left column (~280px)**: “Chronicle” label, section navigation (three sections), **Download CV (PDF)** link
- **Right column**: Scrollable entries for the active section — serif title, period line, body copy, link buttons

## Section navigation

| Section id | Title | Role |
|------------|--------|------|
| `community` | Community & outreach | Inclusion camp, SATEM, Quasar, Cosmonautas |
| `recognition` | Recognition | Ikusi Velatia award |
| `work-research` | Work & research | Oracle internship, OphNet |

Active section: bordered “card” on parchment; inactive: transparent with hover tint.

## Data schema

```typescript
interface ParchmentLink {
  label: string;
  mapLocationId?: string;  // id from `src/data/locations.ts`
  projectId?: string;      // id from `src/data/projects.ts`
}

interface ParchmentEntry {
  id: string;
  title: string;
  body: string;
  period?: string;
  links?: ParchmentLink[];
}

interface ParchmentSection {
  id: string;
  title: string;
  subtitle?: string;
  entries: ParchmentEntry[];
}
```

## Cross-links

- **`mapLocationId`**: Parent (`page.tsx`) sets `mapFocusLocationId` and navigates to Map. `WorldMap` receives `focusLocationId`, selects the marker, zooms to `FOCUS_SCALE` (2.2), pans to center the marker, then calls `onFocusLocationConsumed` to clear intent.
- **`projectId`**: Parent sets `itemsFocusProjectId` and navigates to Items. `InventoryView` selects the matching project in an effect and calls `onInitialProjectConsumed`.

Entries without inventory projects (e.g. inclusion camp) only expose map links (typically `tec` for Monterrey).

## CV download

Static file: `public/felipe-ramos-cv-en.pdf` — linked as “Download CV (PDF)” with a `download` attribute.

## Top bar

`TopBar` displays the label **Chronicle** when `currentSection === "magic"` (see `sectionLabels` in `TopBar.tsx`).

## What could be improved later

- Optional serif webfont to match the parchment tone (currently Tailwind `font-serif` / system stack)
- Richer paper edges (torn border asset) without hurting performance
- Keyboard focus styles on section tabs and link buttons
