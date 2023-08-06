import kontra, { Sprite, imageAssets } from "kontra";
import { SceneID } from "./constants";

const creditsScene = kontra.Scene({
  id: SceneID.CREDITS,
  onShow() {
    // const creditsBackground = Sprite({
    //   x: 0,
    //   y: 0,
    //   image: imageAssets[credits],
    // });
    // backButton.focus();
    // this.add(creditsBackground);
    // this.add(backButton);
  },
  focus() {
    // backButton.focus();
  },
});

export default creditsScene;
