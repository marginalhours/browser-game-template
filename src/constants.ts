export enum EventType {
  _KONTRA_ASSET_LOADED = "assetLoaded", // Kontra internal event
  CHANGE_SCENE = "changeScene",
  SINGLE_ASSET_LOADED = "singleAssetLoaded",
  LOADING_PROGRESS = "assetLoadingPercentage",
  LOADING_COMPLETE = "assetLoadingComplete",
}

export enum AssetType {
  IMAGE = "image",
  SOUND = "sound",
  MUSIC = "music",
}
