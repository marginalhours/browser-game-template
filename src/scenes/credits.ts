import kontra, { Sprite, imageAssets } from "kontra";
import { SceneID } from "./constants";

import billboardBG from "../assets/images/backgrounds/Billboard.png";

const creditsScene = kontra.Scene({
  id: SceneID.BACKGROUND,
  onShow() {
    const background = Sprite({
      x: 0,
      y: 0,
      image: imageAssets[billboardBG],
    });
    this.add(background);
  },
  focus() {},
});

export default creditsScene;
