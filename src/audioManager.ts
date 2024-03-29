/**
 * AudioManager module does 2 things:
 * - Let you play sounds
 * - Let you play music
 *
 * Music is different from sounds because (1) only one music playing at a time (2) music sounds loop
 *
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

// TODO: separate sound/music sliders for fancy volume management

export function toggleMute(): boolean {
  let mutedNow = (mute = mute === false);
  Howler.mute(mutedNow);
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
  if (soundAssets[sound] === undefined) {
    console.warn(`No such sound: ${sound}`);
  }

  soundAssets[sound]?.play();
};

export const playMusic = (music: MusicType) => {
  if (musicAssets[music] === undefined) {
    console.warn(`No such music: ${music}`);
  }

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
