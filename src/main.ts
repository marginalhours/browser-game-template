import "./style.css";

import kontra, { Scene, GameLoop } from "kontra";
import { allScenes } from "./scenes";
import loadingScene from "./scenes/loading";
import { EventType } from "./constants";

// Store the current scene in a global
let activeScene: Scene = loadingScene;

// Event handling for scene transitions
kontra.on(EventType.CHANGE_SCENE, (sceneName: string) => {
  console.debug(`Scene change: ${sceneName}`);
  if (allScenes[sceneName] !== undefined) {
    const nextScene = allScenes[sceneName];
    activeScene.hide();
    nextScene.show();
    activeScene = nextScene;
  } else {
    console.error(`No such scene: ${sceneName}`);
  }
});

// Main game loop
const loop: GameLoop = GameLoop({
  update: () => activeScene.update(),
  render: () => activeScene.render(),
});

// Kick off game updates
loop.start();
// Trigger loading scene to load assets
loadingScene.show();
