# Map Section — Mexico Parchment Map

**Direction**: South (bottom)
**Component**: `src/components/map/WorldMap.tsx`
**Data**: `src/data/locations.ts`
**Background**: AI-generated parchment map image (`public/images/mexico-map.png`)

This section shows the developer's journey across Mexico — education, work experience, and project milestones as location markers on an antique parchment-style map of Mexico.

## Visual Reference

The map uses an AI-generated parchment image of Mexico featuring:
- Aged parchment texture with burnt edges and stain marks
- Mexico's outline with state borders in a hand-drawn ink style
- Sierra Madre mountain ranges drawn in old cartography style
- Ocean areas with wave line patterns
- A decorative compass rose in the bottom right
- Sea creature illustrations in the Pacific

## Current Implementation

### Responsive Map Container

The map uses an **aspect-ratio-locked container** that scales responsively at all screen sizes.

- Container has `aspect-ratio: 43/24` matching the 1376×768 map image
- `max-height: calc(100vh - 10rem)` prevents vertical overflow
- `width: 100%` fills available width, height adjusts proportionally
- All markers use percentage-based positioning (`left: X%; top: Y%`) relative to the container
- Since the aspect ratio is constant, markers always align with the map regardless of screen size

### Pan & Zoom

- **Initial zoom**: map opens at **1.5×** so Mexico occupies more of the viewport (adjust `INITIAL_SCALE` in `WorldMap.tsx`)
- **Mouse drag**: pans the map via `translate(x, y)` state
- **Scroll wheel**: zooms from 1x to 3x
- **Pinch-to-zoom**: two-finger touch gesture for mobile/tablet
- **Touch drag**: single-finger touch pans the map
- **Pan clamping**: prevents panning beyond the map edges at any zoom level
- `touch-action: none` on the container prevents browser scroll interference
- Smooth transition on release (0.15s ease-out), disabled during active drag

### Map Image

- `next/image` with `fill` + `object-contain` renders the parchment map
- Image: `public/images/mexico-map.png` (1376×768, aspect ratio 43:24)
- `priority` loading since it's the main section content
- `draggable={false}` prevents browser image drag

### Location Markers

- **SkyUI map marker PNG images** (32x32) positioned at percentage coordinates via `next/image`

#### PNG markers vs React/SVG components

SkyUI **PNGs are a good default** here: they match the rest of the portfolio, need no maintenance, and `next/image` handles sizing. **SVG or inline React icons** are worth it only if you want markers to scale crisply at every zoom, recolor from CSS, or mimic the parchment line art. That means redrawing (or tracing) the marker shapes—more art time than engineering complexity. A middle ground is keeping PNGs but wrapping them in a small `MapMarker` component for layout and glow only.

- Marker type mapping:
  - Education: **`markers/college.png`** (College of Winterhold icon)
  - Work: **`markers/fort.png`** (Fort icon)
  - Project: **`markers/standing-stone.png`** (Standing Stone icon)
- Each marker has a colored `drop-shadow` glow matching the location type color:
  - Education: cyan (`#4dc9f6`)
  - Work: gold (`#b8860b`)
  - Project: green (`#2ecc71`)
- Location name label below each marker in `.font-skyrim` at 8px
- Spring entrance animation with staggered delay
- Hover: scale 1.3

### Path Connections

- SVG `<line>` elements connecting related locations
- Dashed stroke: `rgba(80, 50, 20, 0.35)`, strokeWidth 1.5, dasharray "6 4"

### Location Tooltip

- Appears at bottom-center of screen (fixed position, outside the pannable map layer)
- Parchment-colored background with gradient
- Shows: location name, type badge, title, period, description
- `max-w-[90vw]` for mobile responsiveness
- Animated entrance with fade + slide + scale

### Legend

- Bottom-right corner of the map container, semi-transparent dark background with backdrop blur
- Three entries: Hall of Learning, Guild Hall, Adventurer's Mark

## Data Schema

```typescript
interface Location {
  id: string;
  name: string;           // Location/institution name
  type: "education" | "work" | "project";
  city: string;           // Mexican city for geographic grouping
  x: number;              // Percentage position (0-100) on map image
  y: number;              // Percentage position (0-100) on map image
  title: string;          // Real-world title/role
  period: string;         // Date range
  description: string;    // Description of experience
}

const paths: [string, string][];  // Array of [fromId, toId] pairs
```

### Current Locations (4 markers)

| ID | Name | Type | City | Position (x%, y%) | Title |
|----|------|------|------|-------------------|-------|
| tec | Tecnológico de Monterrey | education | Monterrey, NL | (54, 23) | B.S. Computer Technologies Engineering |
| oracle | Oracle | work | Zapopan, JAL | (37, 48) | Software Engineering Intern |
| ophnet | OphNet Research Lab | project | Ciudad de México, CDMX | (50, 53) | Glaucoma Diagnostic Research Lead |
| ophnet-merida | OphNet Clinic | project | Mérida, YUC | (77, 36) | Clinical Deployment — OphNet |

The Tec tooltip copy points readers to **Items** (East) for project inventory including the multi-agent work, and **Magic** (West) for résumé-style narrative — see `docs/ITEMS.md` and `docs/MAGIC.md` for section specs.

### Current Paths (4 connections)

```
tec → oracle
tec → ophnet
oracle → ophnet
ophnet → ophnet-merida
```

## What Needs Work

### Content
- Marker `(x, y)` percentages may need small nudges if the parchment art is regenerated.
- Consider adding "undiscovered" locations (future goals) shown as faded/locked markers.

### Interaction
- Momentum/inertia on pan release would feel more polished.
- Double-click/tap to zoom in on a location.
- Clicking a location could zoom/pan to center it, not just show a tooltip.
- Path connections could animate (draw themselves) when the section loads.
- Path connections could use directional arrows or animated dots to show career progression.

### Visual
- Consider regenerating the map image at higher resolution (2400+ pixels wide) for sharper rendering on high-DPI displays.
- The map image could be generated with more detail (city name labels in calligraphic style, more terrain features).
- Additional SkyUI markers available in `public/SkyUI/markers/` for future use: `camp.png`, `cave.png`, `farm.png`, `landmark.png`, `mine.png`, `settlement.png`, `shrine.png`, `town.png`, `whiterun.png`, and undiscovered variants.
