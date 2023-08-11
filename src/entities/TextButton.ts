import HoverButton from "./HoverButton";

/**
 * A purely text-based minimal button with colors for hover/active
 */
interface TextButtonFactoryProps {
  label?: string;
  font?: string;
  anchor?: { x?: number; y?: number };
  colors?: {
    normal: string;
    hovered: string;
    active: string;
  };
  onDown?: () => void;
  onUp?: () => void;
  [prop: string]: any;
}

export default function factory({
  label = "My Button",
  font = "32px monospace",
  anchor = { x: 0, y: 0 },
  colors = {
    normal: "#ff0",
    hovered: "#f00",
    active: "#fff",
  },
  onUp,
  onDown,
  ...props
}: TextButtonFactoryProps) {
  return HoverButton({
    text: {
      color: "black",
      font,
      text: label,
      anchor,
    },
    anchor,
    render() {
      this.draw();

      if (this.pressed) {
        this.textNode.color = colors.normal;
      } else if (this.focused || this.hovered) {
        this.textNode.color = colors.hovered;
      } else {
        this.textNode.color = colors.active;
      }
    },
    onDown,
    onUp,
    ...props,
  });
}
