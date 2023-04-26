import kontra from 'kontra';
import { EventType } from './constants';

const { load, setImagePath, imageAssets, setAudioPath, audioAssets } = kontra;

// Audio imports
import bounceSrc from './assets/sounds/boing.ogg';

// Image imports
import walkerSrc from './assets/images/walker.png';

// Audio
const audioFiles = [bounceSrc];

// Images
const imageFiles = [walkerSrc];

// Percentage tracking
const assetsToLoadCount = audioFiles.length + imageFiles.length;
let loadedAssetsCount = 0;

kontra.on(EventType._KONTRA_ASSET_LOADED, () => {
  loadedAssetsCount += 1;

  kontra.emit(
    EventType.LOADING_PROGRESS,
    assetsToLoadCount / loadedAssetsCount
  );
});

export const startAssetLoading = () => {
  load(audioFiles, imageFiles).then(() => {
    kontra.emit(EventType.LOADING_COMPLETE);
  });
};
