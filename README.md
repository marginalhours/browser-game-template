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

Add a `.ts` file somewhere in the folder hierarchy under `scenes/`. The file should export a kontra `Scene` object as the default export. The scene ID is automatically derived from the file path:

- `scenes/menu.ts` → ID: `"menu"`
- `scenes/game/inventory.ts` → ID: `"game/inventory"`
- `scenes/game/index.ts` → ID: `"game"`

Optionally, add the scene ID to the `SceneID` enum in `scenes/constants.ts` for TypeScript autocomplete.
