import kontra, { Text, GameObject, onInput, offInput } from "kontra";
import { SceneID } from "./constants";
import { EventType } from "../constants";
import TextButton from "../entities/TextButton";

const canvas = kontra.getCanvas();

// Semi-transparent overlay background
const overlay = GameObject({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  render() {
    const ctx = kontra.getContext();
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
});

// Inventory panel background
const panelWidth = 400;
const panelHeight = 300;
const panel = GameObject({
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
  width: panelWidth,
  height: panelHeight,
  render() {
    const ctx = kontra.getContext();

    // Panel background (render is relative to GameObject position)
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, panelWidth, panelHeight);

    // Panel border
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, panelWidth, panelHeight);
  },
});

// Title
const title = Text({
  x: canvas.width / 2,
  y: canvas.height / 2 - 120,
  anchor: { x: 0.5, y: 0 },
  color: "#fff",
  font: "24px monospace",
  text: "Inventory",
  textAlign: "center",
});

// Items
const items = [
  { name: "Health Potion", count: 3 },
  { name: "Magic Scroll", count: 1 },
  { name: "Rusty Sword", count: 1 },
];

let itemTexts: Text[] = [];
let deleteButtons: any[] = [];

// Close button
const closeButton = TextButton({
  x: canvas.width / 2,
  y: canvas.height / 2 + 110,
  label: "Close (ESC)",
  font: "14px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#888",
    hovered: "#fff",
    active: "#fff",
  },
  onUp: () => {
    kontra.emit(EventType.POP_SCENE);
  },
});

const scene = kontra.Scene({
  id: "",
  onShow() {
    // Create item displays
    itemTexts = items.map((item, i) => {
      return Text({
        x: canvas.width / 2 - 120,
        y: canvas.height / 2 - 60 + i * 40,
        color: "#ccc",
        font: "16px monospace",
        text: `${item.name} x${item.count}`,
      });
    });

    // Create delete buttons for each item
    deleteButtons = items.map((_, i) => {
      return TextButton({
        x: canvas.width / 2 + 120,
        y: canvas.height / 2 - 60 + i * 40,
        label: "Delete",
        font: "12px monospace",
        anchor: { x: 0.5, y: 0.5 },
        colors: {
          normal: "#c44",
          hovered: "#f66",
          active: "#fff",
        },
        onUp: () => {
          // Push confirmation modal
          kontra.emit(EventType.PUSH_SCENE, SceneID.CONFIRM_MODAL);
        },
      });
    });

    this.add(overlay);
    this.add(panel);
    this.add(title);
    itemTexts.forEach((t) => this.add(t));
    deleteButtons.forEach((b) => this.add(b));
    this.add(closeButton);

    // ESC key to close
    onInput(["esc"], () => {
      kontra.emit(EventType.POP_SCENE);
    });
  },

  onHide() {
    this.remove(overlay);
    this.remove(panel);
    this.remove(title);
    itemTexts.forEach((t) => this.remove(t));
    deleteButtons.forEach((b) => this.remove(b));
    this.remove(closeButton);
    itemTexts = [];
    deleteButtons = [];

    // Clean up ESC key handler
    offInput(["esc"]);
  },
});

export default scene;
