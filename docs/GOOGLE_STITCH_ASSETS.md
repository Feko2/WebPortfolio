# Google Stitch — Asset Generation Specifications

This document specifies every visual asset needed from Google Stitch (or similar AI image generation) for each section of the Skyrim-themed portfolio. Each asset description is written as a detailed prompt with exact specifications for style, dimensions, and usage context.

> **Note (Updated):** Many UI assets (bar frames, card frames, dividers, map markers, icons, fonts) are now covered by the integrated SkyUI asset pack in `public/SkyUI/`. The remaining assets below are ones that **still need to be generated** — primarily backgrounds, constellation icons, and the favicon/social images. Items marked with ~~strikethrough~~ are covered by SkyUI.

---

## 1. Main Menu Background

### Asset: `main-menu-bg.webp`
**Usage**: Full-screen background for the landing page compass menu.
**Dimensions**: 2560x1440 (16:9, high-res for retina)
**Style**: Photorealistic with cinematic depth of field

**Prompt**:
A misty forest scene inspired by Skyrim's pause menu. Dense pine trees in the foreground with soft bokeh blur. Dappled sunlight filtering through branches. A dirt path visible at the bottom. Atmospheric fog rolling through the middle ground. Cool blue-green color grading. The scene should be slightly out of focus (Gaussian blur effect) to serve as a background behind UI elements. No characters, no text, no UI elements. Cinematic, moody, northern wilderness atmosphere. Color palette: deep greens, muted blues, soft golden light rays.

---

## 2. Skills Section — Nebula Background

### Asset: `nebula-bg.webp`
**Usage**: Full-screen background for the constellation skill tree section.
**Dimensions**: 2560x1440
**Style**: Space art / astrophotography style

**Prompt**:
A deep space nebula scene inspired by Skyrim's skill constellation background. Rich teal and deep blue gas clouds dominating the center. Scattered bright stars of varying sizes. Subtle purple and cyan highlights in the nebula wisps. The nebula should be concentrated in the upper-center area, fading to near-black at the edges (especially bottom and sides) to allow UI text to be readable. No planets, no galaxies, no specific recognizable nebulae. Abstract cosmic clouds with a mystical, magical quality. The overall tone should be dark with luminous accents.

---

## 3. Skills Section — Constellation Icons (8 needed)

These are the large "school icon" constellations that appear above the skill name, similar to how Skyrim shows a large glowing symbol (like the Destruction hand) for each skill school.

### Asset: `constellation-react.svg` (or .webp)
**Dimensions**: 400x400, transparent background
**Style**: Glowing constellation line art on transparent/dark background

**Prompt**:
A constellation pattern forming the shape of the React atom logo (three elliptical orbits around a central dot). Made of bright cyan-white glowing star points connected by thin luminous lines. Each intersection/node is a bright star with a soft glow halo. The lines between stars have a subtle cyan glow. The overall shape should be recognizable as the React logo but abstracted into a star constellation. Dark transparent background. Ethereal, magical, celestial quality.

### Asset: `constellation-typescript.svg`
**Prompt**: A constellation pattern forming the letters "TS" in a stylized blocky shape (like the TypeScript logo). Bright star nodes at corners and intersections, connected by glowing cyan lines. Constellation style, not solid — just dots and lines suggesting the shape.

### Asset: `constellation-python.svg`
**Prompt**: A constellation pattern forming two intertwined snakes (like the Python logo). Star nodes at key points of the snake bodies, connected by glowing lines. The two snakes should be distinguishable. Cyan-white glow on dark transparent background.

### Asset: `constellation-nodejs.svg`
**Prompt**: A constellation pattern forming a hexagonal shape (like the Node.js logo). Star nodes at the six corners and center, with additional stars along the edges. Connected by glowing cyan lines. Geometric and clean.

### Asset: `constellation-css.svg`
**Prompt**: A constellation pattern forming a shield/badge shape with the number "3" inside (referencing CSS3). Star nodes outlining the shield and forming the numeral. Glowing cyan lines connecting the stars.

### Asset: `constellation-git.svg`
**Prompt**: A constellation pattern forming a branching tree structure (representing git branches). A main vertical line of stars with branches splitting off to the sides. Star nodes at branch points and endpoints. Organic, tree-like shape.

### Asset: `constellation-docker.svg`
**Prompt**: A constellation pattern forming a whale shape carrying rectangular containers on its back (like the Docker logo). Star nodes at key outline points, connected by glowing lines. Playful but celestial.

### Asset: `constellation-databases.svg`
**Prompt**: A constellation pattern forming stacked cylinder shapes (representing database storage). Three overlapping cylindrical outlines made of star nodes and connecting lines. Clean, geometric constellation.

---

## 4. Map Section — Parchment Background

### Asset: `parchment-map.webp`
**Usage**: Full background for the world map section. Location markers and paths will be overlaid on top via code.
**Dimensions**: 3000x2000 (wider than viewport to allow panning)
**Style**: Antique cartography / aged parchment

**Prompt**:
An aged parchment paper texture for a fantasy world map. The parchment should have:
- Warm tan/beige base color with natural variation
- Subtle stain marks and age spots scattered across the surface
- Darker burnt/worn edges around the perimeter
- Faint fold creases
- Paper fiber texture visible at close inspection
- No text, no drawings, no map features — just the blank aged paper
- The center should be lighter/cleaner, getting darker and more worn toward edges
- Color palette: tan (#d2b48c), warm brown (#b8956a), dark brown edges (#8b6914)
- Should look like a real medieval document that's been handled for centuries

### Asset: `map-terrain.webp` (optional overlay)
**Usage**: Semi-transparent overlay on the parchment showing terrain features.
**Dimensions**: 3000x2000, transparent background
**Style**: Hand-drawn cartography illustration

**Prompt**:
Hand-drawn fantasy map terrain features in an old cartography style. Include:
- Mountain ranges (small triangular peaks in clusters)
- Forest areas (tiny tree symbols grouped together)
- A coastline along the edges (wavy lines suggesting ocean)
- Rivers flowing from mountains to coast
- Rolling hills indicated by small curved lines
All drawn in dark brown ink on transparent background. The style should match medieval/Renaissance cartography — no modern map symbols. Pen-and-ink illustration quality. The terrain should be scattered across the image leaving open spaces for location markers to be placed.

### Asset: `compass-rose.svg`
**Usage**: Decorative compass rose on the map
**Dimensions**: 200x200, transparent background
**Style**: Ornate medieval compass rose

**Prompt**:
An ornate medieval compass rose illustration. Detailed 8-pointed star design with:
- Elaborate filigree and scrollwork between the points
- "N" marked at the north point in a serif font
- Smaller "E", "S", "W" at other cardinal points
- Concentric circles and decorative rings
- Drawn in dark brown ink (#5c3a1a) on transparent background
- Style: Renaissance-era nautical chart compass rose
- Highly detailed with fine line work

---

## ~~5. Map Section — Location Marker Icons (3 types)~~ — COVERED BY SKYUI

These are now provided by the SkyUI asset pack:
- Education: `public/SkyUI/markers/college.png`
- Work: `public/SkyUI/markers/fort.png`
- Project: `public/SkyUI/markers/standing-stone.png`
- Additional markers available: `camp.png`, `cave.png`, `farm.png`, `landmark.png`, `mine.png`, `settlement.png`, `shrine.png`, `town.png`, `whiterun.png`

---

## 6. Magic Section — Spell School Icons (6 needed)

These replace the current emoji icons in the spell book sidebar.

### Asset: `spell-destruction.svg`
**Dimensions**: 48x48, transparent background
**Style**: Glowing magical icon, Skyrim spell school style

**Prompt**: A stylized fire/flame icon representing the Destruction school of magic. Three flames rising from a hand silhouette. Rendered in warm orange-red tones with a subtle glow effect. Clean vector style with magical luminosity. Dark transparent background.

### Asset: `spell-restoration.svg`
**Prompt**: A stylized healing hands icon representing the Restoration school. Two open hands with a glowing light between them. Rendered in warm golden-white tones with a soft radiance. Clean vector, magical quality.

### Asset: `spell-alteration.svg`
**Prompt**: A stylized transformation icon representing the Alteration school. A geometric shape morphing/shifting — like a cube becoming a sphere. Rendered in purple-blue tones with arcane glow. Clean vector, mystical quality.

### Asset: `spell-conjuration.svg`
**Prompt**: A stylized summoning portal icon representing the Conjuration school. A circular portal with mystical energy swirling around it. Rendered in blue-purple tones with ethereal glow. Clean vector, otherworldly quality.

### Asset: `spell-illusion.svg`
**Prompt**: A stylized eye icon representing the Illusion school. A single eye with magical energy radiating from it. Rendered in teal-cyan tones with a hypnotic glow. Clean vector, mysterious quality.

### Asset: `spell-enchanting.svg`
**Prompt**: A stylized gem/crystal icon representing the Enchanting school. A faceted gemstone with magical energy lines flowing into it. Rendered in diamond-white and blue tones with prismatic glow. Clean vector, precious quality.

---

## 7. Items Section — Category Icons (4 needed)

These replace the current emoji icons in the inventory category filters.

### Asset: `category-weapons.svg`
**Dimensions**: 32x32, transparent background
**Style**: Skyrim inventory icon style (clean, slightly weathered)

**Prompt**: A crossed swords icon in Skyrim's inventory style. Two simple medieval swords crossed in an X pattern. Rendered in warm gray/silver tones. Clean silhouette with subtle metallic sheen. Transparent background.

### Asset: `category-armor.svg`
**Prompt**: A shield icon in Skyrim's inventory style. A simple medieval kite shield with a subtle emblem. Warm gray/silver tones. Clean silhouette.

### Asset: `category-potions.svg`
**Prompt**: A potion bottle icon in Skyrim's inventory style. A round-bottomed flask with a cork stopper and liquid inside. Warm tones with a subtle green/blue liquid glow.

### Asset: `category-scrolls.svg`
**Prompt**: A scroll icon in Skyrim's inventory style. A rolled parchment scroll with visible text lines. Warm parchment tones with a subtle magical glow at the edges.

---

## 8. Favicon and Social

### Asset: `favicon.svg`
**Dimensions**: 32x32 and 512x512 versions
**Prompt**: A minimalist Skyrim-inspired compass rose icon. Four-pointed star with a small Celtic knot in the center. Warm white (#d4c9a8) on dark background (#0a0a0a). Clean, recognizable at small sizes.

### Asset: `og-image.webp`
**Dimensions**: 1200x630 (Open Graph standard)
**Prompt**: A dark atmospheric banner showing the Skyrim portfolio compass rose in the center with "SKILLS", "ITEMS", "MAP", "MAGIC" labels at the four cardinal directions. Misty forest background with star field overlay. The text "SENA — DRAGONBORN DEVELOPER" at the bottom. Cinematic, moody, dark fantasy aesthetic.

---

## Assets Already Covered by SkyUI Pack

The following asset categories are **no longer needed** from Google Stitch, as they are provided by the integrated SkyUI asset pack (`public/SkyUI/`):

| Category | SkyUI Coverage |
|----------|---------------|
| Bar frames (HUD) | `bars/condensed-bar.png`, `bars/empty-bar.png`, `bars/wider-top-bar.png` |
| Card frames | `boxes/info-card-empty.png`, `boxes/bottom-bar-thin.png` |
| Dividers | `dividers/ornate-l.png`, `dividers/ornate-r.png`, `dividers/mid.png` |
| Map markers | `markers/college.png`, `markers/fort.png`, `markers/standing-stone.png`, + 10 more |
| UI icons | `icons/dragon.png`, `icons/selector-left.png`, `icons/selector-right.png` |
| Key icons | `keys/escape.png` |
| Fonts | Futura Condensed (Light, Medium, Bold) TTFs in `public/fonts/` |

## Asset Delivery Notes

- All `.webp` images should be optimized for web (quality 80-85, no larger than 500KB each)
- All `.svg` files should be clean vector with no embedded raster images
- Transparent backgrounds where specified (use alpha channel, not white)
- Color accuracy is important — use the exact hex values specified
- Assets will be placed in `public/images/` and referenced in components
- The parchment map background is the highest priority asset — it transforms the map section from CSS gradients to a realistic antique map feel
