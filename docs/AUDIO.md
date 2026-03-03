# Audio System

**Hook**: `src/hooks/useAudio.ts`
**Library**: Howler.js v2.2.4
**Sound files**: `public/sounds/`

The audio system provides ambient background music and UI sound effects, managed through a custom React hook.

## Current Implementation

### useAudio Hook

The hook exposes:

```typescript
{
  muted: boolean;           // Current mute state
  toggleMute: () => void;   // Toggle mute on/off
  playSound: (name: SoundName) => void;  // Play a UI sound
  initAudio: () => void;    // Initialize all Howl instances
  startAmbient: () => void; // Start ambient loop
  stopAmbient: () => void;  // Pause ambient loop
  initialized: boolean;     // Whether audio has been initialized
}
```

### Sound Registry

| Sound | File | Volume | Usage |
|-------|------|--------|-------|
| hover | `/sounds/hover.mp3` | 0.3 | Mouse enters a navigation button |
| click | `/sounds/click.mp3` | 0.3 | Button click confirmation |
| open | `/sounds/open.mp3` | 0.3 | Section opens (navigate into a section) |
| close | `/sounds/close.mp3` | 0.3 | Section closes (navigate back to menu) |
| ambient | `/sounds/ambient.mp3` | 0.15 | Background loop (continuous) |

### Initialization Flow

1. User lands on page — no audio loaded (browser autoplay policy)
2. User interacts (hovers or clicks any compass direction)
3. `handleFirstInteraction()` calls `initAudio()`:
   - Creates Howl instances for all 4 UI sounds
   - Creates Howl instance for ambient (loop: true)
   - Sets `initialized = true`
4. After 500ms delay, `startAmbient()` is called
5. Ambient plays continuously until muted or page closed

### Mute Behavior

- Mute state stored in `localStorage` under key `skyrim-portfolio-muted`
- On mount, reads saved preference
- `toggleMute()`:
  - Flips state
  - Saves to localStorage
  - If muting: pauses ambient, calls `Howler.mute(true)`
  - If unmuting: resumes ambient, calls `Howler.mute(false)`

## What Needs Work

### Sound Files
All `.mp3` files are currently **empty 0-byte placeholders**. Real audio files need to be sourced:

- **Ambient**: A looping atmospheric track. Options:
  - Wind/nature sounds (forest ambiance)
  - Skyrim-inspired ambient music (must be royalty-free)
  - Subtle synth pad with fantasy feel
  - Recommended: 1-3 minute loop, seamless, very low-key
- **Hover**: Short whoosh/breath sound (~0.2s)
- **Click**: Crisp confirmation sound (~0.3s)
- **Open**: Menu opening sound — stone/metal slide or magical reveal (~0.5s)
- **Close**: Menu closing sound — reverse of open or soft thud (~0.4s)

### Recommended Sources for Royalty-Free Audio
- freesound.org (CC0 and CC-BY sounds)
- pixabay.com/sound-effects (free for commercial use)
- mixkit.co/free-sound-effects
- zapsplat.com (free with attribution)

### Missing Features
- No section-specific ambient changes (e.g., different ambiance for map vs skills)
- No volume control slider — only mute/unmute toggle
- No fade transitions between ambient tracks
- No sound for constellation star hover/click
- No sound for inventory item selection
- No sound for map marker click
- No sound for spell school selection
- Consider adding a subtle "page turn" sound for the magic section

### Technical Improvements
- Sounds should preload more aggressively (currently lazy)
- Consider using Web Audio API directly for more control (Howler abstracts this)
- Add error handling for failed audio loads (currently silent failure)
- The 500ms delay before ambient start is arbitrary — should be tied to animation completion
