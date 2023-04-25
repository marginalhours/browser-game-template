import './style.css';

import kontra, { Scene, GameLoop } from 'kontra';
import { allScenes } from './scenes';
import menuScene from './scenes/menu';
import { EventType } from './constants';

// Store the current scene in a global
let activeScene: Scene = menuScene;

// Event handling for scene transitions
kontra.on(EventType.CHANGE_SCENE, (sceneName: string) => {
  console.log(`Changing scene to ${sceneName}`);
  if (allScenes[sceneName] !== undefined) {
    const nextScene = allScenes[sceneName];
    activeScene.hide();
    nextScene.show();
    activeScene = nextScene;
  }
});

// Main game loop
const loop: GameLoop = GameLoop({
  update: () => activeScene.update(),
  render: () => activeScene.render(),
});

// Kick off game updates
loop.start();
