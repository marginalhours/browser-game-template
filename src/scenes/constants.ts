/**
 * Scene IDs are automatically derived from file paths.
 * This enum is OPTIONAL - add scene IDs here for TypeScript autocomplete,
 * but you can also use string literals directly.
 *
 * File path → Scene ID mapping:
 * - ./menu.ts → "menu"
 * - ./game/inventory.ts → "game/inventory"
 * - ./game/index.ts → "game"
 *
 * Examples:
 *   kontra.emit(EventType.PUSH_SCENE, SceneID.MENU);      // Typed
 *   kontra.emit(EventType.PUSH_SCENE, "game/inventory");  // String literal
 */
export enum SceneID {
  LOADING = "loading",
  MENU = "examples/menu",
  SPRITE = "examples/sprite",
  BACKGROUND = "examples/background",
  PROGRESS_DOTS_DEMO = "examples/progressDotsDemo",
  STACK = "examples/stack",
  INVENTORY = "examples/inventory",
  INVENTORY_CONFIRM_MODAL = "examples/inventory/confirmModal",
  AUDIO_DEMO = "examples/audioDemo",
}
