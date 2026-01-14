/**
 * Slider component for numeric value selection (0-1 range)
 * Supports click-to-set and drag interaction
 */

import kontra from "kontra";
import HoverButton from "./HoverButton";

interface SliderProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  colors?: {
    bar: string;
    handle: string;
    handleHover: string;
    label: string;
  };
  [prop: string]: any;
}

export default function factory({
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  value = 0.5,
  onChange = (_val: number) => {},
  label = "",
  colors = {
    bar: "#444",
    handle: "#888",
    handleHover: "#ff0",
    label: "#fff",
  },
  ...props
}: SliderProps) {
  let currentValue = Math.max(0, Math.min(1, value));
  let isDragging = false;

  const button = HoverButton({
    x,
    y,
    width,
    height,
    anchor: { x: 0, y: 0.5 },

    render() {
      const ctx = kontra.getContext();

      // Draw label if provided
      if (label) {
        ctx.fillStyle = colors.label;
        ctx.font = "12px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(label, 0, -height);
      }

      // Draw bar
      ctx.fillStyle = colors.bar;
      ctx.fillRect(0, -2, width, 4);

      // Draw handle
      const handleX = currentValue * width;
      const handleRadius = 8;
      ctx.fillStyle =
        this.hovered || isDragging ? colors.handleHover : colors.handle;
      ctx.beginPath();
      ctx.arc(handleX, 0, handleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw value percentage
      ctx.fillStyle = colors.label;
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(`${Math.round(currentValue * 100)}%`, width + 10, 0);
    },

    onDown() {
      isDragging = true;
      this.updateValueFromMouse();
    },

    onUp() {
      isDragging = false;
    },

    update() {
      // Track mouse during drag
      if (isDragging && kontra.pointerPressed("left")) {
        this.updateValueFromMouse();
      }
    },

    updateValueFromMouse() {
      const pointer = kontra.getPointer();
      // Convert pointer position to local coordinates
      const localX = pointer.x - this.x;
      const newValue = Math.max(0, Math.min(1, localX / width));

      if (Math.abs(newValue - currentValue) > 0.001) {
        currentValue = newValue;
        onChange(currentValue);
      }
    },

    setValue(newValue: number) {
      currentValue = Math.max(0, Math.min(1, newValue));
    },

    getValue() {
      return currentValue;
    },

    ...props,
  } as any);

  return button;
}
