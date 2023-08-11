/**
 * A common extension of `Button` which takes additional `onOver` / `onOut` callbacks
 * and some better CSS handling
 */

import kontra, { ButtonClass } from "kontra";

const canvas = kontra.getCanvas();

const noop = () => {};

export interface HoverButtonProps {
  onOver: () => void;
  onOut: () => void;
  [prop: string]: any;
}

class HoverButton extends ButtonClass {
  init({ onOver, onOut, ...props }: HoverButtonProps) {
    this._oo = onOver || noop;
    this._ooo = onOut || noop;
    super.init(props);
  }

  onOver() {
    canvas.style.cursor = "pointer";
    this._oo();
    super.onOver();
  }

  onOut() {
    canvas.style.cursor = "auto";
    this._ooo();
    super.onOut();
  }
}

export default function factory(properties: any) {
  return new HoverButton(properties);
}
export { HoverButton as HoverButtonClass };
