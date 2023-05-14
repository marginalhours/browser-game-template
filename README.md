# browser-game-template

A ready-to-go game jam template using Kontra.js and GitHub actions

[KontraJS Examples](https://github.com/straker/kontra/tree/main/examples)
[KontraJS Docs](https://straker.github.io/kontra/api/animation)

[Link to running template](http://marginalhours.net/browser-game-template/)

## Adding an audio asset

1. Add the file to the `assets/sounds` folder.
2. Add an entry with the filename to the `SoundType` enum in `soundManager.ts`
3. Modify `assetLoader.ts` to import the path to the file and add it to the `audioFiles` array
4. Play the sound with `playSound(SoundType.<whatever>)`


## Post-LD-53 todo list

- Slicker sound management (and explicit music management!) (and mute functionality)
- Rework asset loading to be easier (glob folders? one-function-attach?)
- Query parameter deeplink-to-screen for testing purposes
- tileset usage
- FULLSCREEN
- Custom fonts
- stub entities (clickable, keyboard controlled)
- utility classes (hoverable button, progress dot, keycap symbols)
- utility _scenes_ (ImageScene with a static image and a back button, MenuScene etc) 
- work harder at figuring out the kontra factory-vs-class pattern to be a bit slicker
- camera shenanigans
- collision detection (?)
- localStorage example
- multiscreen instructions example
- JRPG dialogue example
- matterjs integration example
- achievements (woo)
