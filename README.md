# browser-game-template

A ready-to-go game jam template using Kontra.js and GitHub actions

[KontraJS Examples](https://github.com/straker/kontra/tree/main/examples)
[KontraJS Docs](https://straker.github.io/kontra/api/animation)

[Link to running template](http://marginalhours.net/browser-game-template/)

## Assets

### Adding a sound (mp3)

See instructions in `assets/sounds/index.ts`

### Adding music (mp3)

See instructions in `assets/music/index.ts`

### Adding an image (png)

Add the `.png` file to the `assets/images/` folder, then `import` the path to it where you want to use it
and look it up in `imageAssets` (imported from `kontra`)

### Adding a scene

Add the `.ts` file somewhere in the folder hierarchy under `scenes/`. The file should export a kontra `Scene` object as the default export, with its `id` set to a unique new value from the `SceneID` enum in `scenes/constants.ts`

## Post-LD-53 todo list

- Transitions / timers (!!!)
- Particle effects
- Something something cards
- utility _scenes_ (ImageScene with a static image and a back button, MenuScene etc)
- Scene stack (???) to push/pop to instead of just transitioning (for eg battler with overworld)
- tileset usage
- Custom fonts
- stub entities (clickable, keyboard controlled)
- utility classes (hoverable button, progress dot)
- Keycap symbols (eg https://www.miragecraft.com/projects/keymason.html)
- work harder at figuring out the kontra factory-vs-class pattern to be a bit slicker
- camera shenanigans
- collision detection (?)
- localStorage example
- multiscreen instructions example
- JRPG dialogue example
- matterjs integration example
- achievements (woo)
