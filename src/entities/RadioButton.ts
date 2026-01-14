/**
 * RadioButton component for selecting one option from a group
 * Shows a circle that fills when selected
 */

import kontra from "kontra";
import HoverButton from "./HoverButton";

interface RadioButtonProps {
  x?: number;
  y?: number;
  label?: string;
  selected?: boolean;
  onSelect?: () => void;
  colors?: {
    normal: string;
    selected: string;
    hovered: string;
    label: string;
  };
  [prop: string]: any;
}

export default function factory({
  x = 0,
  y = 0,
  label = "",
  selected = false,
  onSelect = () => {},
  colors = {
    normal: "#666",
    selected: "#ff0",
    hovered: "#fff",
    label: "#fff",
  },
  ...props
}: RadioButtonProps) {
  let isSelected = selected;
  const circleRadius = 8;
  const innerRadius = 5;
  const labelOffsetX = circleRadius + 8;

  const button = HoverButton({
    x,
    y,
    width: 200, // Approximate width for hit detection
    height: circleRadius * 2,
    anchor: { x: 0, y: 0.5 },

    render() {
      const ctx = kontra.getContext();

      // Draw circle outline
      ctx.strokeStyle = this.hovered ? colors.hovered : colors.normal;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(circleRadius, 0, circleRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw filled circle if selected
      if (isSelected) {
        ctx.fillStyle = colors.selected;
        ctx.beginPath();
        ctx.arc(circleRadius, 0, innerRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw label
      if (label) {
        ctx.fillStyle = colors.label;
        ctx.font = "14px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(label, labelOffsetX, 0);
      }
    },

    onUp() {
      onSelect();
    },

    setSelected(newSelected: boolean) {
      isSelected = newSelected;
    },

    isSelected() {
      return isSelected;
    },

    ...props,
  } as any);

  return button;
}
