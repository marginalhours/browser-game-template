import kontra, { Sprite, imageAssets } from "kontra";
import { SceneID } from "../constants";

import billboardBG from "../../assets/images/backgrounds/Billboard.png";
import TextButton from "../../entities/TextButton";
import { EventType } from "../../constants";

const canvas = kontra.getCanvas();

const backButton = TextButton({
  label: "Back",
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
  onUp: () => {
    setTimeout(() => kontra.emit(EventType.CHANGE_SCENE, SceneID.MENU), 50);
  },
});

const creditsScene = kontra.Scene({
  id: SceneID.BACKGROUND,
  onShow() {
    const background = Sprite({
      x: 0,
      y: 0,
      image: imageAssets[billboardBG],
    });
    this.add(background);
    this.add(backButton);
  },
});

export default creditsScene;
