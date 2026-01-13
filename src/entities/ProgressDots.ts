import kontra from "kontra";

/**
 * Progress dots for use with an instruction slideshow
 */

interface ProgressDotsProps {
  x?: number;
  y?: number;
  anchor?: { x?: number; y?: number };
  total: number;
  current: number;
  dotRadius?: number;
  spacing?: number;
  activeColor?: string;
  inactiveColor?: string;
  [prop: string]: any;
}

export default function factory({
  x = 0,
  y = 0,
  anchor = { x: 0.5, y: 0.5 },
  total,
  current,
  dotRadius = 6,
  spacing = 20,
  activeColor = "#fff",
  inactiveColor = "#666",
  ...props
}: ProgressDotsProps) {
  const totalWidth = (total - 1) * spacing;

  return kontra.GameObject({
    x,
    y,
    anchor: { x: anchor.x || 0.5, y: anchor.y || 0.5 },
    width: totalWidth,
    height: dotRadius * 2,

    // Store configuration
    _total: total,
    _current: current,
    _dotRadius: dotRadius,
    _spacing: spacing,
    _activeColor: activeColor,
    _inactiveColor: inactiveColor,

    // Method to update current dot
    setCurrent(index: number) {
      this._current = Math.max(0, Math.min(index, this._total - 1));
    },

    render() {
      const ctx = kontra.getContext();
      const startX = -totalWidth / 2;

      for (let i = 0; i < this._total; i++) {
        const dotX = startX + i * this._spacing;
        const isActive = i === this._current;

        ctx.fillStyle = isActive ? this._activeColor : this._inactiveColor;
        ctx.beginPath();
        ctx.arc(dotX, 0, this._dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    ...props,
  });
}
