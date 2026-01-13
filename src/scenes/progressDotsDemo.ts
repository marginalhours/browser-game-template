import kontra, { Text } from "kontra";
import { SceneID } from "./constants";
import { EventType } from "../constants";
import ProgressDots from "../entities/ProgressDots";
import TextButton from "../entities/TextButton";

const canvas = kontra.getCanvas();

const slides = [
  {
    title: "Welcome!",
    content:
      "This is a ProgressDots demo.\nUse arrow keys or buttons to navigate.",
  },
  {
    title: "Slide 2",
    content: "ProgressDots shows which page\nyou're currently viewing.",
  },
  {
    title: "Slide 3",
    content: "Perfect for tutorials,\ninstructions, or galleries.",
  },
  {
    title: "Slide 4",
    content: "Fully customizable:\ncolors, size, spacing.",
  },
  {
    title: "Final Slide",
    content: "That's it! Return to menu\nto see other demos.",
  },
];

let currentSlide = 0;

const titleText = Text({
  x: canvas.width / 2,
  y: 100,
  anchor: { x: 0.5, y: 0 },
  color: "#fff",
  font: "24px monospace",
  text: slides[0].title,
  textAlign: "center",
});

const contentText = Text({
  x: canvas.width / 2,
  y: 160,
  anchor: { x: 0.5, y: 0 },
  color: "#ccc",
  font: "16px monospace",
  text: slides[0].content,
  textAlign: "center",
});

const progressDots = ProgressDots({
  x: canvas.width / 2,
  y: canvas.height - 80,
  total: slides.length,
  current: 0,
  dotRadius: 8,
  spacing: 25,
  activeColor: "#0f0",
  inactiveColor: "#444",
});

const prevButton = TextButton({
  x: 100,
  y: canvas.height - 80,
  label: "< Prev",
  font: "14px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#888",
    hovered: "#fff",
    active: "#fff",
  },
  onUp: () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  },
});

const nextButton = TextButton({
  x: canvas.width - 100,
  y: canvas.height - 80,
  label: "Next >",
  font: "14px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#888",
    hovered: "#fff",
    active: "#fff",
  },
  onUp: () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlide();
    }
  },
});

const menuButton = TextButton({
  x: canvas.width / 2,
  y: canvas.height - 30,
  label: "Back to Menu",
  font: "12px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#666",
    hovered: "#ff0",
    active: "#fff",
  },
  onUp: () => {
    setTimeout(() => kontra.emit(EventType.CHANGE_SCENE, SceneID.MENU), 50);
  },
});

function updateSlide() {
  titleText.text = slides[currentSlide].title;
  contentText.text = slides[currentSlide].content;
  progressDots.setCurrent(currentSlide);

  // Update button states
  prevButton.textNode.color = currentSlide > 0 ? "#888" : "#333";
  nextButton.textNode.color =
    currentSlide < slides.length - 1 ? "#888" : "#333";
}

const scene = kontra.Scene({
  id: SceneID.PROGRESS_DOTS_DEMO,

  onShow() {
    currentSlide = 0;
    updateSlide();
  },
});

scene.add(titleText);
scene.add(contentText);
scene.add(progressDots);
scene.add(prevButton);
scene.add(nextButton);
scene.add(menuButton);

// Keyboard navigation
scene.update = function () {
  if (kontra.keyPressed("left") || kontra.keyPressed("arrowleft")) {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  } else if (kontra.keyPressed("right") || kontra.keyPressed("arrowright")) {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlide();
    }
  }
};

export default scene;
