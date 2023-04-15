/**
 * This file initializes kontra before the main script, so that the canvas object, pointer events etc
 * are available in scenes.
 */
import kontra from 'kontra';

const canvasElement: HTMLCanvasElement = document.getElementById(
  '#game-canvas'
) as HTMLCanvasElement;

// initialize kontra
kontra.init(canvasElement);
// Keyboard support
kontra.initKeys();
// Mouse support
kontra.initPointer();
