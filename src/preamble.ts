/**
 * This file initializes kontra before the main script, so that the canvas object, pointer events etc
 * are available in scenes.
 */
import kontra from "kontra";

const canvasElement: HTMLCanvasElement = document.getElementById(
  "game-canvas",
) as HTMLCanvasElement;

// Uncomment below if you have enough time to sort out pixel ratio nonsense - you will lose control of exactly how big
// the game canvas is in "internal" dimensions, but it'll sharpen up rendering.

// const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D;
// const pixelRatio = window.devicePixelRatio || 1;

// const bounds = canvasElement.getBoundingClientRect();
// ctx.canvas.width =
//   Math.round(pixelRatio * bounds.right) - Math.round(pixelRatio * bounds.left);
// ctx.canvas.height =
//   Math.round(pixelRatio * bounds.bottom) - Math.round(pixelRatio * bounds.top);

// initialize kontra
kontra.init(canvasElement, {});
// Keyboard support
kontra.initKeys();
// Mouse support
kontra.initPointer();
