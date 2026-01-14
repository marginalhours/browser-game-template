import kontra, { onInput } from "kontra";
import { EventType } from "../../constants";
const canvas = kontra.getCanvas();
import { SceneID } from "../constants";

import TextButton from "../../entities/TextButton";

// ESC pops overlay scenes, I opens inventory
onInput(["esc"], () => kontra.emit(EventType.POP_SCENE));
onInput(["i"], () => kontra.emit(EventType.PUSH_SCENE, SceneID.INVENTORY));

const winButton = TextButton({
  font: "16px monospace",
  label: "Back",
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
  onUp() {
    setTimeout(() => kontra.emit(EventType.CHANGE_SCENE, SceneID.MENU), 50);
  },
});

const inventoryButton = TextButton({
  font: "14px monospace",
  label: "Open Inventory (I)",
  x: canvas.width / 2,
  y: canvas.height / 2 + 40,
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#48f",
    hovered: "#6af",
    active: "#fff",
  },
  onUp() {
    kontra.emit(EventType.PUSH_SCENE, SceneID.INVENTORY);
  },
});

const gameScene = kontra.Scene({ id: "" });

gameScene.add(winButton);
gameScene.add(inventoryButton);

export default gameScene;
