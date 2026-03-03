# Map Section — Experience/Education World Map

**Direction**: South (bottom)
**Component**: `src/components/map/WorldMap.tsx`
**Data**: `src/data/locations.ts`
**Background**: Antique parchment (CSS gradients)

This section recreates Skyrim/Oblivion's world map as an antique parchment showing the developer's journey — education, work experience, and project milestones as locations on a fantasy-styled map.

## Visual Reference

The Oblivion/Skyrim world map shows:
- An aged parchment background with burnt edges and stain marks
- Location names in a serif/fantasy font scattered across the map
- Roads connecting major cities shown as thin lines
- A compass rose decoration
- Terrain features (mountains, rivers, forests) drawn in an old cartography style
- Clicking a location fast-travels to it (in our case, shows details)

## Current Implementation

### Map Container
- Full-screen div with `overflow-hidden`, `cursor-grab` / `cursor-grabbing`
- Inner map is oversized at 140% width/height with `inset-[-20%]` to allow panning
- Pan: mouse drag updates `translate(x, y)` via state
- Zoom: mouse wheel adjusts `scale` (range 0.5 to 2.5)
- Smooth transition on release (0.15s ease-out), disabled during drag

### Parchment Background (CSS-only, no images)
1. **Base gradient**: Multi-stop linear gradient (160deg) cycling through parchment tones (#c9a96e → #b8956a → #a8855a → etc.)
2. **Stain texture**: 6 layered radial gradients simulating age spots and discoloration
3. **Burnt edges**: Inset box-shadow (200px + 400px) creating dark vignette
4. **Border decoration**: Two nested `border` divs at 8% and 9% inset

### Decorative Elements
- **Title**: "The Developer's Journey" in `.font-skyrim`, centered at top 12%
- **Compass rose**: Small SVG (60x60) at bottom-right 15%, 20% opacity, with N label
- **Divider line**: Gradient line under the title

### Location Markers
- **SkyUI map marker PNG images** (32x32) positioned at percentage coordinates via `next/image`
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
- Additional SkyUI markers available in `public/SkyUI/markers/` for future use: `camp.png`, `cave.png`, `farm.png`, `landmark.png`, `mine.png`, `settlement.png`, `shrine.png`, `town.png`, `whiterun.png`, and undiscovered variants

### Path Connections
- SVG `<line>` elements connecting related locations
- Dashed stroke: `rgba(80, 50, 20, 0.25)`, strokeWidth 1.5, dasharray "6 4"

### Location Tooltip
- Appears at bottom-center of screen (fixed position, not following the map)
- Parchment-colored background with gradient
- Shows: location name, type badge, title, period, description
- Animated entrance with fade + slide + scale

### Legend
- Bottom-right corner, semi-transparent dark background with backdrop blur
- Three entries: Hall of Learning, Guild Hall, Adventurer's Mark

## Data Schema

```typescript
interface Location {
  id: string;
  name: string;           // Fantasy-style location name
  type: "education" | "work" | "project";
  x: number;              // Percentage position (0-100) on map
  y: number;              // Percentage position (0-100) on map
  title: string;          // Real-world title/role
  period: string;         // Date range
  description: string;    // Description of experience
}

// Paths define connections between locations (career progression)
const paths: [string, string][];  // Array of [fromId, toId] pairs
```

### Current Locations (6 markers)

| ID | Name | Type | Position | Title |
|----|------|------|----------|-------|
| university | The Arcane University | education | (45, 40) | Bachelor of Computer Science |
| bootcamp | The Mages Guild | education | (30, 55) | Web Development Bootcamp |
| internship | Whiterun Forge | work | (55, 30) | Software Engineering Intern |
| freelance | The Thieves Guild | work | (70, 50) | Freelance Developer |
| opensource | High Hrothgar | project | (50, 65) | Open Source Contributor |
| hackathon | The Arena | project | (25, 35) | Hackathon Competitor |

### Current Paths (7 connections)

```
university → bootcamp
bootcamp → internship
university → internship
internship → freelance
university → opensource
bootcamp → hackathon
hackathon → opensource
```

## What Needs Work

### Visual Fidelity
- The parchment is pure CSS gradients — it looks flat. Needs a real parchment texture image or a more sophisticated procedural texture (canvas noise, paper grain).
- No terrain features — the map is blank parchment with just markers. Should have hand-drawn mountains, rivers, coastlines, forests like a real fantasy map.
- The compass rose is tiny and basic — should be a detailed ornamental compass.
- Missing decorative cartography elements: sea monsters in ocean areas, ornamental borders, calligraphic region labels.
- ~~Location markers are generic pin SVGs~~ **DONE** — replaced with authentic SkyUI map marker PNGs (college, fort, standing-stone).

### Interaction
- Pan/zoom works but feels basic. Consider adding:
  - Momentum/inertia on pan release
  - Pinch-to-zoom for touch devices
  - Double-click to zoom in on a location
  - Minimap in corner showing current viewport
- Clicking a location should zoom/pan to center it, not just show a tooltip.
- Path connections should animate (draw themselves) when the section loads.

### Content
- The map should tell a story — the path connections should visually represent career progression with directional arrows or animated dots traveling along paths.
- Consider adding "undiscovered" locations (future goals) shown as faded/locked markers.
- Region labels (e.g., "The Realm of Education", "The Working Lands") would add flavor.

### Data
- All location names, titles, and descriptions are placeholder.
- Positions are arbitrary percentages — should be arranged to tell a coherent geographic story.
- Need more locations to fill out the map.
