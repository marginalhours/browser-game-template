import kontra from 'kontra';
import { SceneID } from './constants';
import { EventType } from '../constants';
import { startAssetLoading } from '../assetLoader';

kontra.on(EventType.LOADING_COMPLETE, () => {
  kontra.emit(EventType.CHANGE_SCENE, SceneID.MENU);
});

const loadingScene = kontra.Scene({
  id: SceneID.LOADING,
  onShow() {
    startAssetLoading();
  },
});

export default loadingScene;
