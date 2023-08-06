/*
 * This file stitches together the howlerjs and kontra loading systems
 * to handle audio and image loading respectively
 */
import kontra from "kontra";
import { Howl } from "howler";
import {
  registerSound,
  SoundType,
  MusicType,
  registerMusic,
} from "./audioManager";
import { AssetType, EventType } from "./constants";
import { invertEnum } from "./utilities";

/**
 * This is the module entrypoint. When this function is called,
 * it kicks off loading all the assets
 */
export const startAssetLoading = () => {
  // Load sounds via Howl
  soundFiles.map(([name, source]) => {
    registerSound(
      name,
      new Howl({
        src: [source],
        autoplay: false,
        loop: false,
        rate: 1.0,
        volume: 0.25,
        onload: () => loadingProgressCallback(AssetType.SOUND, source),
      }),
    );
  });

  // Load music via Howl
  musicFiles.map(([name, source]) =>
    registerMusic(
      name,
      new Howl({
        src: [source],
        autoplay: false,
        loop: true,
        rate: 1.0,
        volume: 0.1,
        onload: () =>
          loadingProgressCallback(AssetType.MUSIC, source as string),
      }),
    ),
  );

  // Load images via Kontra
  kontra.load(...imageFiles);
};

/**
 * This block dynamically-imports all sound files,
 * then converts them into an array of `[<relative filepath to sound>, <absolute path to sound>]`
 * which is the format the SoundManager expects
 */
const soundLookup = invertEnum(SoundType);
const soundFiles: string[][] = Object.values(
  import.meta.glob("./assets/sounds/**/*.{mp3,ogg}", { eager: true }),
)
  .map((asset: any) => {
    const modPath = asset.default as string;
    const assetPath = modPath.slice(modPath.indexOf("src/assets/sounds/") + 18);

    return [assetPath, modPath];
  })
  .filter(([filename, _]) => soundLookup[filename] !== undefined);

/**
 * This block dynamically-imports all music files,
 * then converts them into an array of `[<relative filepath to music>, <absolute path to music>]`
 * which is the format the SoundManager expects
 */
const musicLookup = invertEnum(MusicType);
const musicFiles: string[][] = Object.values(
  import.meta.glob("./assets/music/**/*.{mp3,ogg}", { eager: true }),
)
  .map((asset: any) => {
    const modPath = asset.default as string;
    const assetPath = modPath.slice(modPath.indexOf("src/assets/music/") + 17);

    return [assetPath, modPath];
  })
  .filter(([filename, _]) => musicLookup[filename] !== undefined);

/**
 * This block dynamically-imports all image files,
 * then makes them available as a big list of paths for Kontra to load
 */
const imageFiles = Object.values(
  import.meta.glob("./assets/images/**/*.png", { eager: true }),
).map((asset: any) => asset.default);

/**
 * This block manages progress events
 */
const assetsToLoadCount =
  imageFiles.length + soundFiles.length + musicFiles.length;

let loadedAssetsCount = 0;

const loadingProgressCallback = (kind: AssetType, path: string) => {
  loadedAssetsCount += 1;
  const progress = loadedAssetsCount / assetsToLoadCount;

  kontra.emit(EventType.SINGLE_ASSET_LOADED, kind, path);
  kontra.emit(EventType.LOADING_PROGRESS, progress);

  loadedAssetsCount === assetsToLoadCount &&
    kontra.emit(EventType.LOADING_COMPLETE);
};

// Make Kontra tell us when assets are ready
kontra.on(EventType._KONTRA_ASSET_LOADED, loadingProgressCallback);
