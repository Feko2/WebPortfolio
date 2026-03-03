# Magic Section — CV / Resume (Spell Book)

**Direction**: West (left)
**Component**: `src/components/magic/SpellBook.tsx`
**Data**: `src/data/resume.ts`
**Background**: Dark (`#0a0a0a`)

This section recreates Skyrim's magic/spells menu as a CV/Resume viewer. Each "school of magic" maps to a resume section, and each "spell" is a resume line item.

## Visual Reference

Skyrim's magic menu shows:
- A list of spell schools on the left (Destruction, Restoration, Alteration, etc.)
- Each school has an icon and a list of known spells
- Selecting a spell shows its details: name, description, cost, and effects
- Spells can be "equipped" to hands
- The interface has a dark, mystical aesthetic with subtle glow effects

## Current Implementation

### Layout
- Full-height flex layout with `pt-20 pb-16`
- Left panel: 300px wide, contains spell school sidebar + CV download button
- Right panel: flex-1, contains spell entries for the active school
- Separated by `border-r border-foreground/6`

### Spell School Sidebar
- Header: "Schools of Magic" in `.font-skyrim` at 10px
- 6 school buttons, each showing:
  - Emoji icon (left)
  - Skyrim name in `.font-skyrim` (e.g., "DESTRUCTION")
  - Real name below in smaller text (e.g., "Technical Skills")
- Active state: left cyan border + subtle cyan background + `.text-glow-cyan`
- Hover: slides 3px right via Framer Motion
- Staggered entrance animation

### CV Download Button
- At bottom of sidebar, below an **SkyUI ornate divider** (`ornate-l.png` + horizontal rule + `ornate-r.png`, 14x14, 20% opacity)
- Text: "Cast Spell (Download CV)"
- Cyan-themed border and text
- Hover: sweep gradient animation (translates from -100% to 100%)
- Scale animation on hover (1.02) and tap (0.98)
- **Not yet functional** — no actual PDF download wired up

### Spell Entries (Right Panel)
- School header: emoji + Skyrim name (2xl, `.text-glow-cyan`) + **SkyUI `dragon.png` icon** (22x22, 20% opacity) + real name below
- **SkyUI ornate divider** below the school header (`ornate-l.png` + horizontal rule + `ornate-r.png`, 18x18, 20% opacity)
- List of entries, each in a bordered card:
  - Left accent bar: invisible by default, cyan on hover
  - Entry name (14px, 65% opacity → 85% on hover)
  - Level/date badge (9px, `.font-skyrim`, cyan, right-aligned)
  - Description (11px, 30% opacity → 45% on hover)
- Staggered entrance: fade + slide up, 0.06s delay per item
- AnimatePresence with horizontal slide on school change

## Data Schema

```typescript
interface SpellEntry {
  id: string;
  name: string;          // Resume line item name
  description: string;   // Description of skill/experience/certification
  level?: string;        // Proficiency level, date, or status label
}

interface SpellSchool {
  id: string;
  name: string;          // Real resume section name
  skyrimName: string;    // Skyrim school name
  icon: string;          // Emoji icon
  entries: SpellEntry[]; // Resume items in this section
}
```

### School Mapping

| Skyrim School | Icon | Resume Section | Entry Count |
|---------------|------|----------------|-------------|
| Destruction | 🔥 | Technical Skills | 6 |
| Restoration | ✨ | Education | 3 |
| Alteration | 🔮 | Work Experience | 3 |
| Conjuration | 👻 | Notable Projects | 3 |
| Illusion | 👁️ | Soft Skills | 4 |
| Enchanting | 💎 | Certifications | 3 |

### Sample Entries (Destruction / Technical Skills)

| Name | Level | Description |
|------|-------|-------------|
| React & Next.js | Expert | Component architecture, hooks, SSR, and modern UI development |
| TypeScript | Expert | Type-safe development with interfaces, generics, and utility types |
| Python | Advanced | Backend development, data analysis, and automation scripting |
| Node.js & Express | Advanced | Server-side development, REST APIs, and microservices |
| CSS & Tailwind | Expert | Responsive design, animations, and modern styling frameworks |
| SQL & NoSQL | Intermediate | PostgreSQL, MongoDB, Redis — data modeling and optimization |

## What Needs Work

### Visual Fidelity
- The emoji icons should be replaced with custom SVG icons matching Skyrim's spell school symbols (fire for Destruction, healing hands for Restoration, etc.).
- The spell entries are plain cards — could add more mystical styling (parchment texture, rune borders, arcane symbols).
- Missing the spell "casting" visual effect when hovering entries.
- The school icons in Skyrim have a distinctive glow — the emoji approach doesn't capture this.

### Functionality
- **CV Download**: The "Cast Spell" button needs to actually trigger a PDF download. Options:
  - Generate PDF client-side from the resume data (using a library like `jspdf` or `react-pdf`)
  - Link to a pre-built PDF file in `/public/`
  - Use a print-to-PDF approach with a hidden printable resume layout
- **Spell equipping**: Could add a "favorites" or "equipped spells" concept — highlighted skills that appear on the main menu.

### Interaction
- No keyboard navigation between schools.
- Entries could expand on click to show more details.
- The Conjuration (Notable Projects) school should cross-link to the Items section — clicking a project spell should navigate to that project in the inventory.

### Animation
- School transitions are a simple horizontal slide — could add a page-turn or magical swirl effect.
- Entries could have a "reveal" animation like text appearing on a scroll.
- The download button's sweep effect is nice but could be more dramatic (particle burst on click).

### Data
- All entries are placeholder content — needs real resume data.
- Level labels are inconsistent (some use proficiency like "Expert", others use dates like "2023").
- Consider adding more granular data: links, tags, or sub-entries.
