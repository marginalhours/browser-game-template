/*
 * This file stitches together the howlerjs and kontra loading systems
 * to handle audio and image loading respectively
 */
import kontra from 'kontra';
import { Howl } from 'howler';
import { registerSound } from './soundManager';
import { EventType } from './constants';

// Audio imports
import boingSrc from './assets/sounds/boing.ogg';

// Image imports
import walkerSrc from './assets/images/walker.png';

// Audio
const audioFiles = [boingSrc];

// Images
const imageFiles = [walkerSrc];

// Percentage tracking
const assetsToLoadCount = audioFiles.length + imageFiles.length;
let loadedAssetsCount = 0;

// Used via kontra/howl to report loading progress
const loadingProgressCallback = (kind: string, path: string) => {
  kontra.emit(EventType.SINGLE_ASSET_LOADED, kind, path);

  loadedAssetsCount += 1;

  kontra.emit(
    EventType.LOADING_PROGRESS,
    loadedAssetsCount / assetsToLoadCount
  );

  if (loadedAssetsCount === assetsToLoadCount) {
    kontra.emit(EventType.LOADING_COMPLETE);
  }
};

kontra.on(EventType._KONTRA_ASSET_LOADED, loadingProgressCallback);

export const startAssetLoading = () => {
  // Audio file loading via howl
  audioFiles.map((source) => {
    registerSound(
      source,
      new Howl({
        src: [source],
        autoplay: false,
        loop: false,
        rate: 1.0,
        volume: 0.25,
        onload: () => loadingProgressCallback('sound', source),
      })
    );
  });

  // Image file loading via kontra
  kontra.load(...imageFiles);
};
