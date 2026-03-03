# Items Section — Projects Inventory

**Direction**: East (right)
**Component**: `src/components/items/InventoryView.tsx`
**Data**: `src/data/projects.ts`
**Background**: Dark (`#0a0a0a`)

This section recreates Skyrim's inventory/items menu where each project is presented as a game item with stats and enchantments (tech stack).

## Visual Reference

Skyrim's inventory screen shows:
- A three-zone layout: category sidebar + item list on the left, item preview/details on the right
- Items categorized by type (Weapons, Armor, Potions, etc.)
- Each item has a name, and the detail view shows weight, value, and description
- A 3D rotating preview of the selected item dominates the right side
- A bottom bar with action keys, carry weight, and gold

## Current Implementation

### Layout

Two-zone layout matching Skyrim's inventory proportions:

```
┌──────────────────────────────────────────────────────────┐
│                       [Top Bar]                          │
├───────┬──────────┬───────────────────────────────────────┤
│       │          │                                       │
│ ALL   │ OphNet   │     ┌─────────────────────┐           │
│       │ Warehouse│     │  Showcase / Image    │           │
│WEAPONS│ Skyrim.. │     │  (placeholder zone)  │           │
│ ARMOR │ Ticket.. │     └─────────────────────┘           │
│POTIONS│          │                                       │
│SCROLLS│          │           OPHNET                      │
│       │          │         Full Stack                    │
│       │          │                                       │
│       │          │     DATE  2024    ROLE  Research Lead  │
│       │          │     ──── ◇ ─────────── ◇ ────         │
│       │          │     Description text...                │
│       │          │     ENCHANTMENTS                       │
│       │          │     [Python] [PyTorch] [CV] [Pipes]    │
│       │          │     [Equip]  [Inspect]                 │
├───────┴──────────┴───────────────────────────────────────┤
│ [E] Visit Demo  [G] GitHub    Projects: 4  ◇  Gold 4700 │
└──────────────────────────────────────────────────────────┘
```

- Full-height flex column: main content area (flex-1) + bottom bar footer
- **Left zone (~35%)**: category sidebar + scrollable item list, side by side
- **Right zone (~65%)**: project showcase image, centered name/stats, description, enchantments
- Zones separated by subtle `border-l border-foreground/[0.06]` dividers

### Component Architecture

The section is split into focused sub-components inside `src/components/items/`:

| Component | File | Responsibility |
|-----------|------|----------------|
| `InventoryView` | `InventoryView.tsx` | Main container, state management (activeCategory, selectedProject), two-zone flex layout |
| `CategoryList` | `CategoryList.tsx` | Vertical category labels, active state with spring-animated indicator |
| `ItemList` | `ItemList.tsx` | Scrollable project list, selection highlight, stagger animations |
| `ProjectDetail` | `ProjectDetail.tsx` | Right panel: image showcase, centered name, date/role, description, enchantments |
| `InventoryBar` | `InventoryBar.tsx` | Bottom bar: EscKey-style action key caps, summary stats |

### CategoryList (Left Sidebar)

- Vertical list: All, Weapons, Armor, Potions, Scrolls
- "All" separated from type categories by a thin horizontal divider
- Active category: brighter text (`foreground/80`) + `layoutId` spring-animated right-edge indicator
- Inactive: muted text (`foreground/25`) with hover brightening
- Plain text, no borders/boxes — matches Skyrim's clean sidebar
- Exports `FilterCategory` type used by parent

### ItemList (Center)

- Scrollable list with `overflow-y-auto`
- Each item is a `motion.button` with staggered entrance animation and `layout` prop
- Shows project name only (no rarity colors, no icons — matches Skyrim's plain white list)
- Selected item: subtle background tint + brighter text
- Hover: very subtle background + text brightening
- Uses `AnimatePresence` with `mode="popLayout"` for smooth list transitions

### ProjectDetail (Right Panel)

All content centered, rendered with CSS/SVG — no PNG dependencies:

- **Showcase zone**: 16:9 aspect ratio container with `max-w-md`. Shows project image via `next/image` if `project.image` is set, otherwise displays a subtle `NordicKnot` watermark. This maps to where Skyrim shows the 3D item model.
- **Project name**: `.font-skyrim` 2xl-3xl, centered, in `foreground/85`
- **Category subtitle**: e.g., "Full Stack", "Frontend" — derived from `categoryLabels`
- **Stats row**: Date and Role, centered (replacing Weight/Value)
- **Ornate divider**: `NordicKnot` SVG components + gradient horizontal rule
- **Description**: 14px text at 45% opacity, centered, max-width constrained
- **Enchantments**: tech stack displayed as bordered cyan-tinted tags, centered
- **Action links**: "Equip (Demo)" and "Inspect (GitHub)" as bordered links, pushed to bottom with `mt-auto`

### InventoryBar (Bottom)

Fully CSS-based (no PNG frames), follows the `WideTopBar` pattern from `SkyFrame.tsx`:

- Gradient border lines top and bottom with semi-transparent background fill
- **Left side**: Keyboard key cap hints styled after the `EscKey` component (rounded border, inner shadow, font-skyrim label) — `[E] Visit Demo`, `[G] GitHub`
- **Right side**: "Projects: {count}" + NordicKnot separator + "Gold 4700"

## Data Schema

```typescript
type ProjectCategory = "weapons" | "armor" | "potions" | "scrolls";

interface Project {
  id: string;
  name: string;           // Project name
  category: ProjectCategory;
  date: string;           // Year or date range (e.g., "2024", "Jan 2024 - Present")
  role: string;           // Position/role (e.g., "Research Lead", "Software Engineer")
  description: string;    // Project description
  enchantments: string[]; // Tech stack (displayed as enchantment tags)
  github?: string;        // GitHub repository URL
  demo?: string;          // Live demo URL
  image?: string;         // Optional project screenshot path
}
```

### Category Mapping

| Category | Skyrim Name | Portfolio Meaning |
|----------|-------------|-------------------|
| weapons | Weapons | Frontend projects |
| armor | Armor | Backend projects |
| potions | Potions | Tools & utilities |
| scrolls | Scrolls | Full-stack projects |

### Current Projects (4 items)

| Name | Category | Date | Role |
|------|----------|------|------|
| OphNet | scrolls | 2024 | Research Lead |
| Warehouse Automaton | scrolls | 2024 | Lead Developer |
| Skyrim Portfolio | weapons | 2025 | Creator |
| Ticket Forge | armor | 2024 | Software Engineer |

## Design Decisions

### No Rarity System
Skyrim items don't have a rarity tier. All items appear with the same text color in the list. This keeps the inventory authentic to the source material.

### No PNG Dependencies
All decorative elements (card frames, dividers, bottom bar, ornaments) are CSS/SVG-based using components from `SkyFrame.tsx`. This ensures full responsiveness, no image loading delays, and smaller bundle size.

### Date & Role Replace Weight & Value
Instead of arbitrary complexity/impact numbers, each project shows meaningful metadata: when it was built and what role was held. These map naturally to Skyrim's stat slots.

### Showcase Zone
The right panel's top area is reserved for a project image (where Skyrim renders the 3D item model). When no image is provided, a subtle NordicKnot watermark fills the space. Adding images later requires only setting the `image` field in project data.

### Centered Detail Layout
Unlike the original left-aligned detail panel, all right-zone content is centered to match how Skyrim presents item information below the 3D model.

## What Needs Work

### Visual Enhancements
- Add actual project screenshots via the `image` field
- More sophisticated category indicator animations
- Subtle particle or glow effects on selection change

### Interaction
- Keyboard navigation (arrow keys to browse items, Enter to select)
- Wire up `[E]` and `[G]` keybinds to actually trigger demo/source links
- Sorting options (by date, category, name)

### Animation
- Item list entrance could be more dramatic on category switch
- Consider adding a subtle shimmer on selected item in list
- Detail panel transition could include a brief scale pulse

### Responsiveness
- On narrower screens, categories could sit above the item list (stacked)
- On very small screens the detail panel could stack below the list
- Touch interactions for mobile

### Data
- GitHub and demo URLs are placeholder links
- Dates and roles should be verified with real data
- Project screenshots need to be added
