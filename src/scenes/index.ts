/**
 * Scene management!
 * Every typescript file in this folder (and subfolders) except this one and `constants.ts`
 * will be treated as if its default export is a scene object with an ID that can be transitioned to
 */
import { Scene } from "kontra";
export { SceneID } from "./constants";

const sceneArray: Scene[] = Object.values(
  import.meta.glob(["./**/*.ts", "!./index.ts", "!./constants.ts"], {
    import: "default",
    eager: true,
  }),
);

// Dictionary of scene ID to Scene
export const allScenes: Record<string, Scene> = sceneArray.reduce(
  (scenes, scene) => ({ ...scenes, [scene.id]: scene }),
  {},
);
