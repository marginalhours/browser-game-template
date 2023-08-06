/**
 * SoundManager module does 2 things:
 * - Let you play sounds
 * - Let you play music
 *
 * Music is different from sounds because (1) only one music playing at a time (2) music sounds loop
 */
import { Howl } from "howler";
import { SoundType, soundAssets } from "./assets/sounds";
import { MusicType, musicAssets } from "./assets/music";

export { SoundType } from "./assets/sounds";
export { MusicType } from "./assets/music";

let mute = false;
let currentMusicType: MusicType | undefined;
let currentMusic: Howl | undefined;

export function isMuted(): boolean {
  return mute;
}

export function toggleMute(): boolean {
  let mutedNow = (mute = mute === false);
  Howler.volume(mutedNow ? 0.0 : 1.0);

  return mutedNow;
}

export const registerSound = (path: string, sound: Howl) => {
  const filename = path.split("/").slice(-1).pop() as SoundType;
  soundAssets[filename] = sound;
};

export const registerMusic = (path: string, music: Howl) => {
  const filename = path.split("/").slice(-1).pop() as MusicType;
  musicAssets[filename] = music;
};

export const playSound = (sound: SoundType) => {
  soundAssets[sound]?.play();
};

export const playMusic = (music: MusicType) => {
  if (currentMusicType === music) {
    return;
  }

  currentMusic?.stop();
  currentMusicType = music;
  currentMusic = musicAssets[music];

  currentMusic?.play();
};

export const stopMusic = () => {
  currentMusic?.stop();
  currentMusicType = undefined;
  currentMusic = undefined;
};
