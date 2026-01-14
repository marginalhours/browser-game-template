/**
 * AudioManager module does 2 things:
 * - Let you play sounds
 * - Let you play music
 *
 * Music is different from sounds because (1) only one music playing at a time (2) music sounds loop
 *
 * Features:
 * - Separate volume controls for SFX and music
 * - Independent mute controls
 * - Optional crossfade transitions for music
 * - Settings persisted to localStorage via preferences module
 */

import { Howl } from "howler";
import { SoundType, soundAssets } from "./assets/sounds";
import { MusicType, musicAssets } from "./assets/music";
import {
  getSfxVolume,
  getMusicVolume,
  isSfxMuted,
  isMusicMuted,
  setSfxVolume as setPreferencesSfxVolume,
  setMusicVolume as setPreferencesMusicVolume,
  setSfxMuted as setPreferencesSfxMuted,
  setMusicMuted as setPreferencesMusicMuted,
} from "./preferences";

export { SoundType } from "./assets/sounds";
export { MusicType } from "./assets/music";

// Re-export preference getters for convenience
export {
  getSfxVolume,
  getMusicVolume,
  isSfxMuted,
  isMusicMuted,
} from "./preferences";

let mute = false;
let currentMusicType: MusicType | undefined;
let currentMusic: Howl | undefined;

export function isMuted(): boolean {
  return mute;
}

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
    return;
  }

  const howl = soundAssets[sound];
  howl.volume(isSfxMuted() ? 0 : getSfxVolume());
  howl.play();
};

export const playMusic = (
  music: MusicType,
  crossfade: boolean = false,
  fadeDuration: number = 1000,
) => {
  if (musicAssets[music] === undefined) {
    console.warn(`No such music: ${music}`);
    return;
  }

  if (currentMusicType === music) {
    return;
  }

  const newMusic = musicAssets[music];
  const targetVolume = isMusicMuted() ? 0 : getMusicVolume();

  if (crossfade && currentMusic) {
    // Fade out current music
    currentMusic.fade(currentMusic.volume(), 0, fadeDuration);

    const oldMusic = currentMusic;
    currentMusic.once("fade", () => {
      oldMusic.stop();
    });

    // Fade in new music
    newMusic.volume(0);
    newMusic.play();
    newMusic.fade(0, targetVolume, fadeDuration);
  } else {
    // Immediate switch
    currentMusic?.stop();
    newMusic.volume(targetVolume);
    newMusic.play();
  }

  currentMusicType = music;
  currentMusic = newMusic;
};

export const stopMusic = (
  crossfade: boolean = false,
  fadeDuration: number = 1000,
) => {
  if (crossfade && currentMusic) {
    currentMusic.fade(currentMusic.volume(), 0, fadeDuration);

    const oldMusic = currentMusic;
    currentMusic.once("fade", () => {
      oldMusic.stop();
    });
  } else {
    currentMusic?.stop();
  }

  currentMusicType = undefined;
  currentMusic = undefined;
};

// === Volume Control Functions ===

/**
 * Set SFX volume (0-1) and apply retroactively to all sound assets
 */
export function setSfxVolume(volume: number): void {
  setPreferencesSfxVolume(volume);

  const finalVolume = isSfxMuted() ? 0 : volume;
  for (const howl of Object.values(soundAssets)) {
    howl.volume(finalVolume);
  }
}

/**
 * Set music volume (0-1) and apply retroactively to current music
 */
export function setMusicVolume(volume: number): void {
  setPreferencesMusicVolume(volume);

  if (currentMusic) {
    currentMusic.volume(isMusicMuted() ? 0 : volume);
  }
}

/**
 * Toggle SFX mute
 */
export function toggleSfxMute(): boolean {
  const newMuted = !isSfxMuted();
  setPreferencesSfxMuted(newMuted);

  const finalVolume = newMuted ? 0 : getSfxVolume();
  for (const howl of Object.values(soundAssets)) {
    howl.volume(finalVolume);
  }

  return newMuted;
}

/**
 * Toggle music mute
 */
export function toggleMusicMute(): boolean {
  const newMuted = !isMusicMuted();
  setPreferencesMusicMuted(newMuted);

  if (currentMusic) {
    currentMusic.volume(newMuted ? 0 : getMusicVolume());
  }

  return newMuted;
}

export function isMusicPlaying(): boolean {
  return currentMusic != null;
}
