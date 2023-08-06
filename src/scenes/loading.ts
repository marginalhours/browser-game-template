import kontra from "kontra";
import { SceneID } from "./constants";
import { EventType } from "../constants";
import { startAssetLoading } from "../assetLoader";

const { Text, Sprite } = kontra;
const canvas = kontra.getCanvas();

const loadingBar = Sprite({
  x: 0,
  y: canvas.height / 2,
  anchor: { x: 0.0, y: 0.5 },
  width: 0,
  height: 20,
  color: "#55a",
  targetWidth: 0,
  update: function () {
    this.width = kontra.lerp(this.width as number, this.targetWidth, 0.5);
  },
});

let text = Text({
  text: "loading...",
  font: "16px monospace",
  color: "white",
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

kontra.on(EventType.LOADING_PROGRESS, (fraction: number) => {
  loadingBar.targetWidth = fraction * canvas.width;
});

kontra.on(EventType.LOADING_COMPLETE, () => {
  // Nifty query-string hack from LD#53
  // <url>?<scene-id> will load <scene-id> as first scene, good for quick debugging
  const sceneId = getFirstSceneId();
  setTimeout(() => kontra.emit(EventType.CHANGE_SCENE, sceneId), 500);
});

const getFirstSceneId = () => {
  const searchSceneId = location.search.slice(1);
  if ((<any>Object).values(SceneID).includes(searchSceneId)) {
    return searchSceneId;
  }
  return SceneID.MENU;
};

const loadingScene = kontra.Scene({
  id: SceneID.LOADING,
  onShow() {
    startAssetLoading();
  },
});

loadingScene.add(loadingBar);
loadingScene.add(text);

export default loadingScene;
