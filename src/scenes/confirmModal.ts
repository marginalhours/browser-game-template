import kontra, { Text, GameObject, onInput, offInput } from "kontra";
import { EventType } from "../constants";
import TextButton from "../entities/TextButton";

const canvas = kontra.getCanvas();

// Semi-transparent overlay (darker than inventory since it's on top)
const overlay = GameObject({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  render() {
    const ctx = kontra.getContext();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
});

// Modal panel
const modalWidth = 300;
const modalHeight = 180;
const modal = GameObject({
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
  width: modalWidth,
  height: modalHeight,
  render() {
    const ctx = kontra.getContext();

    // Modal background (render is relative to GameObject position)
    ctx.fillStyle = "#3a3a3a";
    ctx.fillRect(0, 0, modalWidth, modalHeight);

    // Modal border (highlighted to show it's on top)
    ctx.strokeStyle = "#f90";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, modalWidth, modalHeight);
  },
});

// Title
const title = Text({
  x: canvas.width / 2,
  y: canvas.height / 2 - 60,
  anchor: { x: 0.5, y: 0 },
  color: "#fff",
  font: "18px monospace",
  text: "Confirm Delete",
  textAlign: "center",
});

// Message
const message = Text({
  x: canvas.width / 2,
  y: canvas.height / 2 - 20,
  anchor: { x: 0.5, y: 0 },
  color: "#ccc",
  font: "14px monospace",
  text: "Are you sure?",
  textAlign: "center",
});

// Yes button
const yesButton = TextButton({
  x: canvas.width / 2 - 50,
  y: canvas.height / 2 + 40,
  label: "Yes",
  font: "14px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#4c4",
    hovered: "#6f6",
    active: "#fff",
  },
  onUp: () => {
    // In a real game, would delete the item here
    console.log("Item deleted!");
    kontra.emit(EventType.POP_SCENE);
  },
});

// No button
const noButton = TextButton({
  x: canvas.width / 2 + 50,
  y: canvas.height / 2 + 40,
  label: "No",
  font: "14px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#c44",
    hovered: "#f66",
    active: "#fff",
  },
  onUp: () => {
    kontra.emit(EventType.POP_SCENE);
  },
});

const scene = kontra.Scene({
  id: "",
  onShow() {
    this.add(overlay);
    this.add(modal);
    this.add(title);
    this.add(message);
    this.add(yesButton);
    this.add(noButton);

    // ESC key to cancel
    onInput(["esc"], () => {
      kontra.emit(EventType.POP_SCENE);
    });
  },

  onHide() {
    this.remove(overlay);
    this.remove(modal);
    this.remove(title);
    this.remove(message);
    this.remove(yesButton);
    this.remove(noButton);

    // Clean up ESC key handler
    offInput(["esc"]);
  },
});

export default scene;
