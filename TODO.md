# TODO List

## Stubbed Components to Complete

These are partially implemented files that need finishing:

- [ ] **SpriteButton** - Image-based button with spritesheet for hover/active states
- [ ] **gridMenu scene** - Example scene showing grid-based menu layout
- [ ] **galleryMenu scene** - Example scene for level selection/gallery navigation

## High Priority Jam Features

Features that add a lot of value quickly in a jam:

- [ ] **Scene stack onBlur handling** - Pressing ESC repeatedly to exit nested scenes doesn't work, need to handle scene blur/unfocus properly
- [ ] **Audio manager rework** - Rework music manager to allow alternate mixing of sound and music (needs demo scene)
  - Separate volume controls (music/SFX sliders)
  - Fade in/out transitions
  - Audio groups/channels
  - Mixing options (duck music during SFX, etc.)
- [ ] **Keyboard navigation for menus** - Currently mouse-only, accessibility + faster testing
- [ ] **State management / save system** - localStorage wrapper for game state persistence
- [ ] **Error handling & logging** - Better error messages and recovery

## Quality of Life Improvements

- [ ] **JSDoc comments** - Improve documentation throughout codebase
- [ ] **Mobile UX improvements** - Better touch handling, safe areas
- [ ] **Testing infrastructure** - Vitest setup for unit tests (optional, maybe overkill for jams)

## Examples & Utilities

From the original README.md todo list:

- [ ] **Transitions / timers** (!!!)
- [ ] **Particle effects**
- [ ] **Something something cards**
- [ ] **Utility scenes** (ImageScene with static image + back button, MenuScene, etc.)
- [ ] **Tileset usage example**
- [ ] **Custom fonts**
- [ ] **Stub entities** - Clickable, keyboard-controlled examples (SpriteButton counts here)
- [ ] **Keycap symbols** (e.g., https://www.miragecraft.com/projects/keymason.html)
- [ ] **Work harder at figuring out Kontra factory-vs-class pattern** to be slicker
- [ ] **Camera shenanigans**
- [ ] **Collision detection** (?)
- [ ] **localStorage example** (overlaps with state management above)
- [ ] **JRPG dialogue example**
- [ ] **Matter.js integration example**
- [ ] **Achievements** (woo)

## Completed (Dropped from original list)

These were in README.md but are now done:

- ✅ **Scene stack** - Push/pop scenes for overlays, pause menus, dialogs
- ✅ **Utility classes** - HoverButton, TextButton, ProgressDots
- ✅ **Multiscreen instructions example** - ProgressDots demo scene

## Not Listed But Also Done Recently

- ✅ Dependency upgrades (TypeScript 5.9, Vite 7, Kontra 10)
- ✅ Pixel ratio handling for sharp high-DPI rendering
- ✅ Fullscreen mode that properly scales
- ✅ Input handling refactor (onInput/offInput pattern)
