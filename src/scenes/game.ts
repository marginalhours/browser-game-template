import kontra from 'kontra';
import { EventType } from '../constants';
const { Button } = kontra;
const canvas = kontra.getCanvas();
import { SceneID } from './constants';

let winButton = Button({
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
    console.log('change to menu');
    kontra.emit(EventType.CHANGE_SCENE, SceneID.MENU);
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

kontra.track(winButton);

const gameScene = kontra.Scene({
  id: SceneID.GAME,
  onShow() {
    winButton.text = 'Win';
    winButton.focus();
  },
  focus() {
    winButton.focus();
  },
});

gameScene.add(winButton);

export default gameScene;
