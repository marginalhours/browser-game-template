import './style.css';
import kontra from 'kontra';

import { init, GameLoop, Scene, emit } from 'kontra';
import { allScenes } from './scenes';
import menuScene from './scenes/menu';

const canvasElement: HTMLCanvasElement = document.getElementById(
  '#game-canvas'
) as HTMLCanvasElement;

const { canvas } = init(canvasElement);

// Store the current scene in a global
let activeScene: Scene = menuScene;

// Event handling for scene transitions
kontra.on('changeScene', (sceneName: string) => {
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

loop.start();
