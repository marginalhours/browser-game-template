import "./style.css";

import kontra, { Scene, GameLoop } from "kontra";
import { allScenes } from "./scenes";
import loadingScene from "./scenes/loading";
import { EventType } from "./constants";

// Scene stack (bottom to top)
// Rendering: All scenes render from bottom to top (unless opaque flag stops it)
// Updating: Only the top scene receives updates
let sceneStack: Scene[] = [loadingScene];

// CHANGE_SCENE: Replace entire stack with new scene (backward compatible)
kontra.on(EventType.CHANGE_SCENE, (sceneName: string) => {
  console.debug(`Scene change: ${sceneName}`);
  if (allScenes[sceneName] !== undefined) {
    const nextScene = allScenes[sceneName];
    // Hide all scenes in stack
    sceneStack.forEach((s) => s.hide());
    // Replace stack with new scene
    sceneStack = [nextScene];
    nextScene.show();
  } else {
    console.error(`No such scene: ${sceneName}`);
  }
});

// PUSH_SCENE: Add scene on top of stack (for overlays, menus, etc.)
kontra.on(EventType.PUSH_SCENE, (sceneName: string) => {
  console.debug(`Push scene: ${sceneName}`);
  if (allScenes[sceneName] !== undefined) {
    const nextScene = allScenes[sceneName];
    sceneStack.push(nextScene);
    nextScene.show();
  } else {
    console.error(`No such scene: ${sceneName}`);
  }
});

// POP_SCENE: Remove top scene from stack
kontra.on(EventType.POP_SCENE, () => {
  if (sceneStack.length > 1) {
    const poppedScene = sceneStack.pop();
    console.debug(`Pop scene: ${poppedScene?.id}`);
    poppedScene?.hide();
  } else {
    console.warn("Cannot pop last scene from stack");
  }
});

// Main game loop
const loop: GameLoop = GameLoop({
  update: () => {
    // Only update the top scene
    const topScene = sceneStack[sceneStack.length - 1];
    topScene.update();
  },
  render: () => {
    // Find the last opaque scene (if any) to skip rendering below it
    let startIndex = 0;
    for (let i = sceneStack.length - 1; i >= 0; i--) {
      if ((sceneStack[i] as any).opaque) {
        startIndex = i;
        break;
      }
    }

    // Render all scenes from startIndex to top
    for (let i = startIndex; i < sceneStack.length; i++) {
      sceneStack[i].render();
    }
  },
});

// Kick off game updates
loop.start();
// Trigger loading scene to load assets
loadingScene.show();
