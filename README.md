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

## Post-LD-53 todo list

- utility _scenes_ (ImageScene with a static image and a back button, MenuScene etc)
- tileset usage
- Custom fonts
- stub entities (clickable, keyboard controlled)
- utility classes (hoverable button, progress dot, keycap symbols)
- work harder at figuring out the kontra factory-vs-class pattern to be a bit slicker
- camera shenanigans
- collision detection (?)
- localStorage example
- multiscreen instructions example
- JRPG dialogue example
- matterjs integration example
- achievements (woo)
