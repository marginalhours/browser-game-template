import kontra from "kontra";
import { SceneID } from "./constants";
import { EventType } from "../constants";

const { ButtonClass } = kontra;
const canvas = kontra.getCanvas();

const noop = () => {};

interface HoverableButtonProps {
  onOver: () => void;
  onOut: () => void;
  props: any;
}

class HoverableButton extends ButtonClass {
  init({ onOver, onOut, ...props }: HoverableButtonProps) {
    this._oo = onOver || noop;
    this._ooo = onOut || noop;
    super.init(props);
  }

  onOver() {
    this._oo();
    super.onOver();
  }

  onOut() {
    this._ooo();
    super.onOut();
  }
}

let startButton = new HoverableButton({
  text: {
    color: "white",
    font: "16px monospace",
    background: "#f00",
    text: "start game",
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
    setTimeout(() => kontra.emit(EventType.CHANGE_SCENE, SceneID.GAME), 50);
  },
  onOver() {
    canvas.style.cursor = "pointer";
  },
  onOut() {
    canvas.style.cursor = "auto";
  },
  render() {
    this.draw();

    if (this.pressed) {
      this.textNode.color = "#aaa";
    } else if (this.focused || this.hovered) {
      this.textNode.color = "#ccc";
    } else {
      this.textNode.color = "#fff";
    }
  },
});

kontra.track(startButton);

const menuScene = kontra.Scene({
  id: SceneID.MENU,
  onShow() {
    startButton.focus();
  },
  focus() {
    startButton.focus();
  },
});

menuScene.add(startButton);

export default menuScene;
