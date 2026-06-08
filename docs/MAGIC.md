# Activities Section (West) — Antique Newspaper

**Direction**: West (left)  
**Compass label**: Activities  
**Component**: `src/components/magic/SpellBook.tsx`  
**Data**: `src/data/resume.ts` (`parchmentSections`)  
**Background**: Neutral dark frame (`#1e1c18`) behind a full-bleed newsprint panel inside `SpellBook`

The West section is an **antique newspaper layout** presenting community work, recognition, and work/research as articles. Entries can deep-link to the **Map** (focused marker) or **Projects** (selected project).

## Layout

- **Outer**: `relative` container with cool cream newsprint gradient, subtle noise texture, light inset vignette
- **Top inset**: A fixed `h-20` (80px) spacer clears the global `TopBar` (fixed, `z-50`) so content never sits under it
- **Masthead** (full width): “The Activities Gazette” with dateline (`Monterrey, N.L. · Est. 2024`), section tagline, and double horizontal rule
- **Left column (~260px)**: Section index (three sections), classified-style **Download PDF** link
- **Right column**: Scrollable articles — Playfair Display headline, dateline, meta links (map/projects), Libre Baskerville body with drop cap

## Typography

Loaded via `next/font/google` in `src/app/layout.tsx`:

| Font | CSS variable | Utility class | Use |
|------|--------------|---------------|-----|
| Playfair Display | `--font-newspaper-display` | `.font-newspaper-display` | Masthead, section titles, article headlines |
| Libre Baskerville | `--font-newspaper-body` | `.font-newspaper-body` | Body copy, datelines, nav subtitles |

Additional utilities in `globals.css`:

- `.newspaper-drop-cap` — floated first letter on article body
- `.newspaper-rule-double` / `.newspaper-rule-single` — classic divider lines

## Section navigation

| Section id | Title | Role |
|------------|--------|------|
| `community` | Community & outreach | Inclusion camp, SATEM, Quasar, Cosmonautas |
| `recognition` | Recognition | Ikusi Velatia award |
| `work-research` | Work & research | Oracle internship, OphNet |

Active section: bold underline on index tab; inactive: muted ink with hover rule.

## Data schema

```typescript
interface ParchmentLink {
  label?: string;          // used for Projects links; map-only rows use entry `period` as the link text
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
- **`projectId`**: Parent sets `itemsFocusProjectId` and navigates to Projects. `InventoryView` selects the matching project in an effect and calls `onInitialProjectConsumed`.

Entries without inventory projects (e.g. inclusion camp) only expose map links (typically `tec` for Monterrey).

## CV download

Static file: `public/felipe-ramos-cv-en.pdf` — linked as “Download PDF” in a classified-ad box at the bottom of the section index.

## Top bar

`TopBar` displays the label **Activities** when `currentSection === "magic"` (see `sectionLabels` in `TopBar.tsx`). The bar is `fixed` at the top of the viewport; `WideTopBar` in `SkyFrame.tsx` uses a **solid black** fill so newsprint content does not show through. Layout reserves vertical space under it via the spacer above.

## What could be improved later

- Multi-column article layout on very wide viewports
- Torn or folded paper edge assets without hurting performance
- Keyboard focus styles on section tabs and meta-line links
