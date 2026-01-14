/**
 * Preferences module handles persistent user settings via localStorage.
 * Currently manages audio settings, extensible for future preferences.
 */

const STORAGE_KEYS = {
  SFX_VOLUME: "audio_sfx_volume",
  MUSIC_VOLUME: "audio_music_volume",
  SFX_MUTED: "audio_sfx_muted",
  MUSIC_MUTED: "audio_music_muted",
};

// Default values
const DEFAULTS = {
  SFX_VOLUME: 0.5,
  MUSIC_VOLUME: 0.5,
  SFX_MUTED: false,
  MUSIC_MUTED: false,
};

// In-memory state
let sfxVolume = DEFAULTS.SFX_VOLUME;
let musicVolume = DEFAULTS.MUSIC_VOLUME;
let sfxMuted = DEFAULTS.SFX_MUTED;
let musicMuted = DEFAULTS.MUSIC_MUTED;

/**
 * Load value from localStorage with fallback to default
 */
function loadFromStorage(key: string, defaultValue: any): any {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e);
    return defaultValue;
  }
}

/**
 * Save value to localStorage
 */
function saveToStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e);
  }
}

/**
 * Initialize preferences from localStorage
 * Call this once at app startup
 */
export function initPreferences(): void {
  sfxVolume = loadFromStorage(STORAGE_KEYS.SFX_VOLUME, DEFAULTS.SFX_VOLUME);
  musicVolume = loadFromStorage(
    STORAGE_KEYS.MUSIC_VOLUME,
    DEFAULTS.MUSIC_VOLUME,
  );
  sfxMuted = loadFromStorage(STORAGE_KEYS.SFX_MUTED, DEFAULTS.SFX_MUTED);
  musicMuted = loadFromStorage(STORAGE_KEYS.MUSIC_MUTED, DEFAULTS.MUSIC_MUTED);

  // Clamp volumes to valid range [0, 1]
  sfxVolume = Math.max(0, Math.min(1, sfxVolume));
  musicVolume = Math.max(0, Math.min(1, musicVolume));
}

// === SFX Volume ===

export function getSfxVolume(): number {
  return sfxVolume;
}

export function setSfxVolume(volume: number): void {
  sfxVolume = Math.max(0, Math.min(1, volume));
  saveToStorage(STORAGE_KEYS.SFX_VOLUME, sfxVolume);
}

// === Music Volume ===

export function getMusicVolume(): number {
  return musicVolume;
}

export function setMusicVolume(volume: number): void {
  musicVolume = Math.max(0, Math.min(1, volume));
  saveToStorage(STORAGE_KEYS.MUSIC_VOLUME, musicVolume);
}

// === SFX Mute ===

export function isSfxMuted(): boolean {
  return sfxMuted;
}

export function setSfxMuted(muted: boolean): void {
  sfxMuted = muted;
  saveToStorage(STORAGE_KEYS.SFX_MUTED, sfxMuted);
}

// === Music Mute ===

export function isMusicMuted(): boolean {
  return musicMuted;
}

export function setMusicMuted(muted: boolean): void {
  musicMuted = muted;
  saveToStorage(STORAGE_KEYS.MUSIC_MUTED, musicMuted);
}
