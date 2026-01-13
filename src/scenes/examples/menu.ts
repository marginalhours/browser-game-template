import kontra, { Grid } from "kontra";
import { SceneID } from "../constants";
import { EventType } from "../../constants";
import TextButton from "../../entities/TextButton";

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

const progressDotsButton = TextButton({
  label: "Progress Dots Demo",
  font: "16px monospace",
  onUp: () => {
    setTimeout(
      () => kontra.emit(EventType.CHANGE_SCENE, SceneID.PROGRESS_DOTS_DEMO),
      50,
    );
  },
});

const sceneStackButton = TextButton({
  label: "Scene Stack Demo (I for inventory)",
  font: "14px monospace",
  onUp: () => {
    setTimeout(() => kontra.emit(EventType.CHANGE_SCENE, SceneID.GAME), 50);
  },
});

let menuGrid = Grid({
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
  rowGap: 15,
  justify: "center",
  align: "center",
  children: [
    startButton,
    backgroundButton,
    progressDotsButton,
    sceneStackButton,
  ],
});

const menuScene = kontra.Scene({ id: "" });

menuScene.add(menuGrid);

export default menuScene;
