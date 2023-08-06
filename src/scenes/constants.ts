/**
 * Outside of this folder, just import from "scenes/index.ts", but
 * the enum has to live here to avoid circular references
 */
export enum SceneID {
  LOADING = "loading",
  MENU = "menu",
  GAME = "game",
  CREDITS = "credits",
  OPTIONS = "options",
}
