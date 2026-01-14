/**
 * This file initializes kontra before the main script, so that the canvas object, pointer events etc
 * are available in scenes.
 */
import kontra from "kontra";

// ============================================================================
// GAME DIMENSIONS - Change these at the start of your jam!
// ============================================================================
// These are the logical dimensions your game code will use.
// All positioning, sizing, and layout will be in these coordinates.
// The canvas will automatically scale to high-DPI displays while maintaining
// these logical dimensions.
const LOGICAL_WIDTH = 800;
const LOGICAL_HEIGHT = 600;
// ============================================================================

const canvasElement: HTMLCanvasElement = document.getElementById(
  "game-canvas",
) as HTMLCanvasElement;

const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D;
const pixelRatio = window.devicePixelRatio || 1;

// Set canvas backing store to physical pixels for sharp rendering
canvasElement.width = LOGICAL_WIDTH * pixelRatio;
canvasElement.height = LOGICAL_HEIGHT * pixelRatio;

// Communicate logical dimensions to CSS via custom properties
// This allows CSS to handle display sizing (including fullscreen scaling)
document.documentElement.style.setProperty(
  "--canvas-width",
  LOGICAL_WIDTH + "px",
);
document.documentElement.style.setProperty(
  "--canvas-height",
  LOGICAL_HEIGHT + "px",
);

// Scale all drawing operations to account for pixel ratio
ctx.scale(pixelRatio, pixelRatio);

// initialize kontra
kontra.init(canvasElement, {});
// Keyboard support
kontra.initKeys();
// Mouse support
kontra.initPointer();
