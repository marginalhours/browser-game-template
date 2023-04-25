import kontra from 'kontra';
import { EventType } from '../constants';
const { Button, Sprite } = kontra;
const canvas = kontra.getCanvas();
import { SceneID } from './constants';

let sprite = Sprite({
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
    color: 'white',
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
  update() {
    sprite.update();
    if (sprite.x > canvas.width - sprite.width || sprite.x <= 0) {
      sprite.dx = -sprite.dx;
    }
    if (sprite.y > canvas.height - sprite.height || sprite.y <= 0) {
      sprite.dy = -sprite.dy;
    }
  },
});

gameScene.add(sprite);
gameScene.add(winButton);

export default gameScene;
