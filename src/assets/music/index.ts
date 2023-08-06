/**
 * Add new music to the game like this:
 * - Add a file to the `assets/music` folder or subfolder
 * - Add that relative path (under a useful alias) to the `MusicType` enum
 */
import { Howl } from "howler";

/**
 * Enum maps from how to refer to the music in-game (MusicType.BACKGROUND)
 * to filename *relative to assets/music* eg "background.mp3" is "assets/music/background.mp3"
 * and "underworld/track1.mp3" is "assets/music/underworld/track1.mp3"
 */
export enum MusicType {
  BACKGROUND = "background.mp3",
}

export const musicAssets: { [key in MusicType]?: Howl } = {};
