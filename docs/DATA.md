# Data Layer

All portfolio content is stored as typed TypeScript objects in `src/data/`. There is no database, CMS, or API — everything is static and compiled into the bundle.

## File Overview

| File | Section | Key Export | Description |
|------|---------|------------|-------------|
| `skills.ts` | Skills | `skills: SkillCategory[]` | 8 skill categories with constellation data |
| `projects.ts` | Items | `projects: Project[]` | 8 projects with stats and tech stack |
| `locations.ts` | Map | `locations: Location[]`, `paths` | 6 locations with coordinates and 7 path connections |
| `resume.ts` | Magic | `spellSchools: SpellSchool[]` | 6 resume sections with 22 total entries |

## How to Edit Content

### Adding a New Skill

Edit `src/data/skills.ts`. Add a new object to the `skills` array:

```typescript
{
  id: "new-skill",
  name: "New Skill",
  level: 60,
  description: "Skyrim-style flavor text describing this skill.",
  constellation: [
    // Each node needs x (0-800) and y (0-500) coordinates within the SVG viewBox
    { x: 400, y: 120, label: "Sub-skill 1" },
    { x: 300, y: 250, label: "Sub-skill 2" },
    // ... more nodes
  ],
  connections: [
    // Pairs of indices into the constellation array
    [0, 1],  // connects node 0 to node 1
    // ... more connections
  ],
}
```

### Adding a New Project

Edit `src/data/projects.ts`. Add a new object to the `projects` array:

```typescript
{
  id: "new-project",
  name: "Project Name",
  category: "weapons",  // "weapons" | "armor" | "potions" | "scrolls"
  rarity: "rare",       // "common" | "uncommon" | "rare" | "legendary"
  weight: 5,            // 1-10 complexity
  value: 600,           // Gold value (impact)
  description: "Description of the project.",
  enchantments: ["React", "TypeScript"],  // Tech stack
  github: "https://github.com/user/repo",
  demo: "https://demo-url.com",
}
```

### Adding a New Map Location

Edit `src/data/locations.ts`. Add to `locations` array and optionally to `paths`:

```typescript
// In locations array:
{
  id: "new-location",
  name: "Fantasy Location Name",
  type: "work",  // "education" | "work" | "project"
  x: 60,         // Percentage position on map (0-100)
  y: 45,         // Percentage position on map (0-100)
  title: "Real Job Title",
  period: "2024 - Present",
  description: "What you did there.",
}

// In paths array (optional):
["existing-location-id", "new-location"]
```

### Adding a New Resume Entry

Edit `src/data/resume.ts`. Add to an existing school's `entries` array, or add a new school:

```typescript
// New entry in existing school:
{ id: "new1", name: "Entry Name", description: "What this is about", level: "Expert" }

// New school:
{
  id: "new-school",
  name: "Real Section Name",
  skyrimName: "Mysticism",
  icon: "🌀",
  entries: [
    { id: "m1", name: "Entry", description: "Description", level: "2024" },
  ],
}
```

## Data Relationships

The Conjuration school in resume.ts references projects that also exist in projects.ts. These are not formally linked (no foreign keys) — they're just thematically related. A future improvement could add `projectId` fields to cross-link them.

## All Content is Placeholder

Every piece of text in the data files is placeholder content. Before deploying:

1. Replace all skill names, levels, descriptions, and constellation layouts with real data
2. Replace all project entries with real projects, real GitHub URLs, real descriptions
3. Replace all map locations with real education/work history
4. Replace all resume entries with real CV content
5. Update character info (Name, Level, Race) in `page.tsx`, `TopBar.tsx`, and `ConstellationView.tsx`
