import kontra from 'kontra';
import { SceneID } from './constants';
import { EventType } from '../constants';

const { Button } = kontra;
const canvas = kontra.getCanvas();

let startButton = Button({
  text: {
    color: 'white',
    font: '30px Monospace',
    text: 'Start',
    anchor: { x: 0.5, y: 0.5 },
  },
  anchor: { x: 0.5, y: 0.5 },
  x: canvas.width / 2,
  y: canvas.height / 2,
  onUp() {
    console.log('Change to game');
    kontra.emit(EventType.CHANGE_SCENE, SceneID.GAME);
  },
  render() {
    this.draw();

    if (this.focused || this.hovered) {
      this.textNode.color = 'red';
    } else {
      this.textNode.color = 'white';
    }
  },
});

kontra.track(startButton);

const menuScene = kontra.Scene({
  id: SceneID.MENU,
  onShow() {
    startButton.text = 'Start';
    startButton.focus();
  },
  focus() {
    startButton.focus();
  },
});

menuScene.add(startButton);

export default menuScene;
