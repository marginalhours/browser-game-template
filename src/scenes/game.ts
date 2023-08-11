import kontra from "kontra";
import { EventType } from "../constants";
const { SpriteSheet, SpriteClass, imageAssets } = kontra;
const canvas = kontra.getCanvas();
import { SceneID } from "./constants";

import { playSound, SoundType } from "../audioManager";

import walker from "../assets/images/walker.png";
import TextButton from "../entities/TextButton";

class BounceSprite extends SpriteClass {
  update() {
    super.update();
    let hasBounced = false;
    if (this.x > canvas.width - this.width || this.x <= 0) {
      this.dx = -this.dx;
      hasBounced = true;
    }
    if (this.y > canvas.height - this.height || this.y <= 0) {
      this.dy = -this.dy;
      hasBounced = true;
    }

    if (hasBounced) {
      playSound(SoundType.BOING);
    }
  }
}

let bounceSprite = new BounceSprite({
  x: 100, // starting x,y position of the sprite
  y: 80,
  color: "red", // fill color of the sprite rectangle
  width: 20, // width and height of the sprite rectangle
  height: 20,
  dx: 2, // move the sprite 2px to the right every frame
  dy: 2,
});

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

let men: WalkSprite[] = [];

const gameScene = kontra.Scene({
  id: SceneID.GAME,
  onShow() {
    men = Array.from(Array(25).keys()).map((_) => {
      let man = new WalkSprite({
        x: canvas.width * Math.random(),
        y: canvas.height * Math.random(),
        speed: 1.0,
        heading: Math.PI * 2 * Math.random(),
        anchor: { x: 0.0, y: 0.0 },
        scaleX: 2.0,
        scaleY: 2.0,
        animations: walkSpriteSheet.animations,
      });
      return man;
    });
    this.add(...men);
  },
  onHide() {
    this.remove(...men);
  },
});

class WalkSprite extends SpriteClass {
  draw() {
    this.context.save();
    this.context.rotate(this.heading);
    this.context.translate(-this.width / 2, -this.height / 2);
    super.draw();
    this.context.restore();
  }

  update() {
    this.x += this.speed * Math.cos(this.heading);
    this.y += this.speed * Math.sin(this.heading);

    super.update();

    this.x = (this.x + canvas.width) % canvas.width;
    this.y = (this.y + canvas.height) % canvas.height;
  }
}

let walkSpriteSheet: any;

kontra.on(EventType.LOADING_COMPLETE, () => {
  walkSpriteSheet = SpriteSheet({
    image: imageAssets[walker],
    frameWidth: 32,
    frameHeight: 32,
    animations: {
      walk: {
        frames: "0..7",
        frameRate: 12,
      },
    },
  });
});

gameScene.add(bounceSprite);
gameScene.add(winButton);

export default gameScene;
