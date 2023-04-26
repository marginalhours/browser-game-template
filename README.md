# browser-game-template

A ready-to-go game jam template using Kontra.js and GitHub actions

[KontraJS Examples](https://github.com/straker/kontra/tree/main/examples)
[KontraJS Docs](https://straker.github.io/kontra/api/animation)

[Link to running template](http://marginalhours.net/browser-game-template/)

# Adding an audio asset

1. Add the file to the `assets/sounds` folder.
2. Modify `assetLoader.ts` to import the path to the file and add it to the `audioFiles` array
3. Add an entry with the filename to the `SoundType` enum in `soundManager.ts`
4. Play the sound with `playSound(SoundType.<whatever>)`
