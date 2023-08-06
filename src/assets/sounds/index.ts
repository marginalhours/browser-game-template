/**
 * Add new sounds to the game like this:
 * - Add a file to the `assets/sounds` folder or subfolder
 * - Add that relative path (under a useful alias) to the `SoundType` enum
 */
import { Howl } from "howler";

/**
 * Enum maps from how to refer to the sound in-game (SoundType.BOING)
 * to filename *relative to assets/sounds* eg "boing.ogg" is "assets/sounds/boing.ogg"
 * and "barks/yes.mp3" is "assets/sounds/barks/yes.mp3"
 */
export enum SoundType {
  BOING = "boing.ogg",
}

export const soundAssets: { [key in SoundType]?: Howl } = {};
