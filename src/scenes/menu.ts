import kontra, { Grid } from "kontra";
import { SceneID } from "./constants";
import { EventType } from "../constants";
import TextButton from "../entities/TextButton";

const canvas = kontra.getCanvas();

const startButton = TextButton({
  label: "Sprite Demo",
  font: "16px monospace",
  onUp: () => {
    setTimeout(() => kontra.emit(EventType.CHANGE_SCENE, SceneID.GAME), 50);
  },
});

const backgroundButton = TextButton({
  label: "Background Image Demo",
  font: "16px monospace",
  onUp: () => {
    setTimeout(
      () => kontra.emit(EventType.CHANGE_SCENE, SceneID.BACKGROUND),
      50,
    );
  },
});

let menuGrid = Grid({
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
  rowGap: 15,
  justify: "center",
  align: "center",
  children: [startButton, backgroundButton],
});

const menuScene = kontra.Scene({
  id: SceneID.MENU,
});

menuScene.add(menuGrid);

export default menuScene;
