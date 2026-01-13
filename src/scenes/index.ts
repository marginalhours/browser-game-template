/**
 * Scene management!
 * Every typescript file in this folder (and subfolders) except this one and `constants.ts`
 * will be treated as if its default export is a scene object.
 *
 * Scene IDs are derived from file paths:
 * - ./menu.ts → "menu"
 * - ./game/inventory.ts → "game/inventory"
 * - ./game/index.ts → "game"
 *
 * You can optionally add scene IDs to the SceneID enum in constants.ts
 * for autocomplete, but it's not required.
 */
import { Scene } from "kontra";
export { SceneID } from "./constants";

// Import all scene modules with their paths
const sceneModules = import.meta.glob(
  ["./**/*.ts", "!./index.ts", "!./constants.ts"],
  {
    import: "default",
    eager: true,
  },
);

/**
 * Derive scene ID from file path:
 * - "./menu.ts" → "menu"
 * - "./game/inventory.ts" → "game/inventory"
 * - "./game/index.ts" → "game" (index becomes parent folder)
 */
function deriveSceneId(path: string): string {
  // Remove leading "./" and trailing ".ts"
  let id = path.replace(/^\.\//, "").replace(/\.ts$/, "");

  // Special case: "folder/index" becomes just "folder"
  if (id.endsWith("/index")) {
    id = id.replace(/\/index$/, "");
  }

  return id;
}

// Dictionary of scene ID to Scene
export const allScenes: Record<string, Scene> = {};

for (const [path, sceneModule] of Object.entries(sceneModules)) {
  const scene = sceneModule as Scene;
  const id = deriveSceneId(path);

  // Inject the ID into the scene (overrides any manually set ID)
  scene.id = id;

  allScenes[id] = scene;
}

// Debug log to show registered scenes
console.debug("Registered scenes:", Object.keys(allScenes).sort());
