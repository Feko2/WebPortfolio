# Skills Section — Constellation Skill Tree

**Direction**: North (top)
**Component**: `src/components/skills/ConstellationView.tsx`
**Data**: `src/data/skills.ts`
**Background**: Nebula (deep blue/teal with animated stars)

This section recreates Skyrim's skill constellation screen where each skill category is represented as a constellation of connected stars against a nebula backdrop.

## Visual Reference

The Skyrim skills screen shows:
- A deep blue/teal nebula background with hundreds of twinkling stars
- A large constellation shape in the center representing the active skill school
- The constellation is made of bright glowing star nodes connected by faint lines
- The skill name and level number displayed prominently below (e.g., "DESTRUCTION 33")
- A description paragraph below the name
- A horizontally scrollable row of all skill categories at the bottom
- Character info (Name, Level, Race) and "Perks to increase" at the top

## Current Implementation

### NebulaBackground (internal component)
- Separate canvas element rendering 300 stars
- Stars have twinkling animation via sine waves
- Larger stars get cyan glow halos via `createRadialGradient`
- Layered on top of the `.nebula-bg` CSS class which provides the base gradient:
  ```
  radial-gradient(ellipse at 50% 0%, rgba(10, 40, 60, 0.8) 0%, rgba(10, 10, 10, 1) 70%)
  radial-gradient(ellipse at 30% 50%, rgba(20, 60, 80, 0.3) 0%, transparent 60%)
  radial-gradient(ellipse at 70% 60%, rgba(30, 80, 100, 0.2) 0%, transparent 50%)
  background-color: #050510
  ```

### Constellation SVG
- Rendered in an 800x500 SVG viewBox, responsive via `min(800px, 90vw)` width
- **SVG filters defined**:
  - `#starGlow` — Gaussian blur (stdDeviation=3) composited over source
  - `#lineGlow` — Gaussian blur (stdDeviation=1.5) composited over source
  - `#nodeGlow` — Radial gradient from cyan 30% to transparent
- **Connection lines**: Two layers per connection:
  1. Glow line: `rgba(77, 201, 246, 0.15)`, strokeWidth=4, with `#lineGlow` filter
  2. Sharp line: `rgba(120, 200, 240, 0.5)`, strokeWidth=1
  - Animated: fade in with staggered delay (0.2s + i*0.04s)
- **Star nodes**: Each node renders:
  1. Ambient glow circle (r=20, `#nodeGlow` gradient fill)
  2. Pulsing ring (r=8, animates to r=14 and back, with opacity fade)
  3. Core star (r=4.5, near-white fill with `#starGlow` filter)
  4. Center dot (r=2, pure white)
  5. Label text above the star
  - Animated: spring entrance with staggered delay

### Skill Info Display
- Skill name in `.font-skyrim` with `.text-glow-cyan` (e.g., "REACT 85")
- Description paragraph below, max-width 512px, 45% opacity
- AnimatePresence with fade + vertical slide on skill change

### Bottom Category Selector
- **SkyUI ornate divider line** above the selector bar (`ornate-l.png` + `ornate-r.png` flanking a horizontal rule, 20% opacity)
- **SkyUI `selector-left.png`** and **`selector-right.png`** arrow icons on either side of the skill list (16x16, 30% opacity, hover to 60%)
  - Left arrow: cycles to previous skill category (wraps around)
  - Right arrow: cycles to next skill category (wraps around)
- Horizontal flex row of all skill names between the arrows
- Active skill: full opacity + cyan glow + animated underline indicator
- Underline uses Framer Motion `layoutId` for smooth sliding between tabs
- Inactive skills: 25% opacity, hover to 55%
- All SkyUI assets loaded via `next/image`

## Data Schema

```typescript
interface SkillNode {
  x: number;    // SVG x coordinate (0-800 range)
  y: number;    // SVG y coordinate (0-500 range)
  label: string; // Display name for this sub-skill
}

interface SkillCategory {
  id: string;
  name: string;           // Display name (e.g., "React")
  level: number;          // Proficiency level (0-100)
  description: string;    // Skyrim-style flavor text
  constellation: SkillNode[];        // Star positions
  connections: [number, number][];   // Index pairs defining lines between stars
}
```

### Current Skills (8 categories)

| ID | Name | Level | Stars | Connections |
|----|------|-------|-------|-------------|
| react | React | 85 | 8 | 10 |
| typescript | TypeScript | 78 | 6 | 7 |
| python | Python | 72 | 7 | 8 |
| nodejs | Node.js | 75 | 6 | 7 |
| css | CSS | 80 | 7 | 9 |
| git | Git | 70 | 5 | 6 |
| docker | Docker | 55 | 4 | 5 |
| databases | Databases | 65 | 6 | 7 |

## What Needs Work

### Visual Fidelity
- The constellation shapes are abstract point clouds. They should be designed to resemble recognizable shapes related to each technology (e.g., React constellation could trace the React atom logo, Python could trace a snake shape).
- The nebula background needs more depth — Skyrim uses volumetric cloud-like nebula textures, not just gradient overlays. Consider using a real nebula image or generating one with canvas noise.
- Missing the large "icon" constellation that Skyrim shows (the big glowing symbol above the skill name).

### Interaction
- **Carousel (not focused):** The main carousel area uses three vertical bands relative to the skills panel width — left third → previous skill, right third → next, center third → focused mode. Horizontal swipe still changes the carousel. Keyboard: ←/→ or A/D switch skills; ↑ or W enters focused mode.
- **Focused mode:** Tap exits; arrow keys or WASD move between stars; Esc exits. Star clicks select that node (`ConstellationView.tsx`).
- Skyrim-style perk unlock costs and prerequisites are not implemented; could add tooltips or lore per node.
- The skill level numbers don't visually correspond to anything — could add a progress bar or fill effect.

### Animation
- Constellation transitions could be more dramatic (the current scale 0.85→1 is subtle).
- Consider adding a slow rotation or drift to the constellation.
- The pulsing rings on stars could be more varied in timing.

### Data
- All descriptions are placeholder flavor text — should be personalized.
- Skill levels are arbitrary — should reflect actual proficiency.
- Sub-skill labels are generic — should map to real technologies/concepts the user knows.
