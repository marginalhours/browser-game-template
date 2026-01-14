import kontra, { Text, onInput, offInput } from "kontra";
import { SceneID } from "../constants";
import { EventType } from "../../constants";
import TextButton from "../../entities/TextButton";
import Slider from "../../entities/Slider";
import RadioButton from "../../entities/RadioButton";
import {
  playMusic,
  playSound,
  MusicType,
  SoundType,
  setSfxVolume,
  setMusicVolume,
  getSfxVolume,
  getMusicVolume,
  toggleSfxMute,
  toggleMusicMute,
  isSfxMuted,
  isMusicMuted,
  stopMusic,
  isMusicPlaying,
} from "../../audioManager";

const canvas = kontra.getCanvas();

// Title
const titleText = Text({
  x: canvas.width / 2,
  y: 60,
  anchor: { x: 0.5, y: 0 },
  color: "#fff",
  font: "24px monospace",
  text: "Audio Demo",
  textAlign: "center",
});

// Music Selection Label
const musicLabel = Text({
  x: canvas.width / 2,
  y: 120,
  anchor: { x: 0.5, y: 0 },
  color: "#ccc",
  font: "14px monospace",
  text: "Music Selection:",
  textAlign: "center",
});

let currentTrack: MusicType | undefined;

// Radio Buttons for Music Selection
const track1Radio = RadioButton({
  x: canvas.width / 2 - 100,
  y: 150,
  label: "Track 1",
  selected: false,
  onSelect: () => {
    if (currentTrack !== MusicType.TRACK1) {
      playMusic(MusicType.TRACK1, true); // Enable crossfade
      currentTrack = MusicType.TRACK1;
      (track1Radio as any).setSelected(true);
      (track2Radio as any).setSelected(false);
    }
  },
});

const track2Radio = RadioButton({
  x: canvas.width / 2 + 20,
  y: 150,
  label: "Track 2",
  selected: false,
  onSelect: () => {
    if (currentTrack !== MusicType.TRACK2) {
      playMusic(MusicType.TRACK2, true); // Enable crossfade
      currentTrack = MusicType.TRACK2;
      (track1Radio as any).setSelected(false);
      (track2Radio as any).setSelected(true);
    }
  },
});

// Sliders
const musicVolumeSlider = Slider({
  x: canvas.width / 2 - 100,
  y: 200,
  width: 200,
  label: "Music Volume",
  value: getMusicVolume(),
  onChange: (val: number) => {
    setMusicVolume(val);
  },
});

const sfxVolumeSlider = Slider({
  x: canvas.width / 2 - 100,
  y: 250,
  width: 200,
  label: "SFX Volume",
  value: getSfxVolume(),
  onChange: (val: number) => {
    setSfxVolume(val);
  },
});

// Mute Buttons
const musicMuteButton = TextButton({
  x: canvas.width / 2 - 80,
  y: 300,
  label: isMusicMuted() ? "Unmute Music" : "Mute Music",
  font: "14px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#888",
    hovered: "#ff0",
    active: "#fff",
  },
  onUp: () => {
    const muted = toggleMusicMute();
    musicMuteButton.textNode.text = muted ? "Unmute Music" : "Mute Music";
  },
});

const sfxMuteButton = TextButton({
  x: canvas.width / 2 + 80,
  y: 300,
  label: isSfxMuted() ? "Unmute SFX" : "Mute SFX",
  font: "14px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#888",
    hovered: "#ff0",
    active: "#fff",
  },
  onUp: () => {
    const muted = toggleSfxMute();
    sfxMuteButton.textNode.text = muted ? "Unmute SFX" : "Mute SFX";
  },
});

// Play Sound Button
const playSoundButton = TextButton({
  x: canvas.width / 2,
  y: 350,
  label: "Play Sound Effect",
  font: "16px monospace",
  anchor: { x: 0.5, y: 0.5 },
  colors: {
    normal: "#0f0",
    hovered: "#ff0",
    active: "#fff",
  },
  onUp: () => {
    playSound(SoundType.BOING);
  },
});

// Instructions
const instructionsText = Text({
  x: canvas.width / 2,
  y: 400,
  anchor: { x: 0.5, y: 0 },
  color: "#666",
  font: "11px monospace",
  text: "Keyboard: M = toggle music mute, S = toggle sfx mute, Space = play sound",
  textAlign: "center",
});

// Back Button
const backButton = TextButton({
  x: canvas.width / 2,
  y: canvas.height - 40,
  label: "Back to Menu",
  font: "14px monospace",
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

const scene = kontra.Scene({
  id: "",
  onShow() {
    // Initialize UI state from current settings
    (musicVolumeSlider as any).setValue(getMusicVolume());
    (sfxVolumeSlider as any).setValue(getSfxVolume());
    musicMuteButton.textNode.text = isMusicMuted()
      ? "Unmute Music"
      : "Mute Music";
    sfxMuteButton.textNode.text = isSfxMuted() ? "Unmute SFX" : "Mute SFX";

    // Start with Track 1 playing
    if (!isMusicPlaying()) {
      playMusic(MusicType.TRACK1, false);
      currentTrack = MusicType.TRACK1;
      (track1Radio as any).setSelected(true);
      (track2Radio as any).setSelected(false);
    }

    // Register keyboard shortcuts
    onInput(["m"], () => {
      const muted = toggleMusicMute();
      musicMuteButton.textNode.text = muted ? "Unmute Music" : "Mute Music";
    });

    onInput(["s"], () => {
      const muted = toggleSfxMute();
      sfxMuteButton.textNode.text = muted ? "Unmute SFX" : "Mute SFX";
    });

    onInput(["space"], () => {
      playSound(SoundType.BOING);
    });
  },

  onHide() {
    // Clean up keyboard handlers
    offInput(["m"]);
    offInput(["s"]);
    offInput(["space"]);

    stopMusic(true);
  },
});

scene.add(titleText);
scene.add(musicLabel);
scene.add(track1Radio);
scene.add(track2Radio);
scene.add(musicVolumeSlider);
scene.add(sfxVolumeSlider);
scene.add(musicMuteButton);
scene.add(sfxMuteButton);
scene.add(playSoundButton);
scene.add(instructionsText);
scene.add(backButton);

export default scene;
