import kontra from 'kontra';
import { EventType } from '../constants';
const { Button, SpriteSheet, SpriteClass, Sprite, imageAssets } = kontra;
const canvas = kontra.getCanvas();
import { SceneID } from './constants';

import { playSound, SoundType } from '../soundManager';

import walker from '../assets/images/walker.png';

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
  color: 'red', // fill color of the sprite rectangle
  width: 20, // width and height of the sprite rectangle
  height: 20,
  dx: 2, // move the sprite 2px to the right every frame
  dy: 2,
});

let winButton = Button({
  text: {
    color: 'red',
    font: '16px monospace',
    text: 'win game',
    anchor: { x: 0.5, y: 0.5 },
  },
  anchor: { x: 0.5, y: 0.5 },
  x: canvas.width / 2,
  y: canvas.height / 2,
  onDown() {
    (this.y as number) += 1;
  },
  onUp() {
    (this.y as number) -= 1;
    setTimeout(() => kontra.emit(EventType.CHANGE_SCENE, SceneID.MENU), 50);
  },
  render() {
    this.draw();

    if (this.pressed) {
      this.textNode.color = '#aaa';
    } else if (this.focused || this.hovered) {
      this.textNode.color = '#ccc';
    } else {
      this.textNode.color = '#fff';
    }
  },
});

kontra.track(winButton);

const gameScene = kontra.Scene({
  id: SceneID.GAME,
  onShow() {
    winButton.focus();
  },
  focus() {
    winButton.focus();
  },
});

class WalkSprite extends SpriteClass {
  draw() {
    this.context.save();
    this.context.translate(-this.width / 2, -this.height / 2);
    this.context.rotate(this.heading);
    super.draw();
    this.context.restore();
  }

  update() {
    this.x += this.speed * Math.cos(this.heading);
    this.y += this.speed * Math.sin(this.heading);

    super.update();
    if (this.y > canvas.height - this.width || this.y <= 0 + this.width) {
      this.angle = this.angle === 0 ? Math.PI : 0;
      this.dx = -this.dx;
    }
  }
}

kontra.on(EventType.LOADING_COMPLETE, () => {
  const walkSpriteSheet = SpriteSheet({
    image: imageAssets[walker],
    frameWidth: 32,
    frameHeight: 32,
    animations: {
      walk: {
        frames: '0..7',
        frameRate: 24,
      },
    },
  });

  let sprite = new WalkSprite({
    x: 200,
    y: 100,
    speed: 1.0,
    heading: Math.PI / 2,
    anchor: { x: 0.5, y: 0.5 },
    scaleX: 2.0,
    scaleY: 2.0,
    animations: walkSpriteSheet.animations,
  });

  gameScene.add(sprite);
});

gameScene.add(bounceSprite);
gameScene.add(winButton);

export default gameScene;
