import { Howl } from 'howler';

// Filenames in the assets/audio folder
// Use MP3 where possible; it's got better browser compatibility
export enum SoundType {
  BOING = 'boing.ogg',
}

const audioAssets: Record<string, Howl> = {};

export const registerSound = (path: string, sound: Howl) => {
  const filename = path.split('/').slice(-1).pop() as SoundType;
  audioAssets[filename] = sound;
};

export const playSound = (sound: SoundType) => {
  audioAssets[sound].play();
};
