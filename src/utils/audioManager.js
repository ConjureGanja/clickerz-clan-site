import { useEffect, useState } from "react";
import { CLICKERZ_AUDIO_SRC } from "./clickingGame";

class AudioManager {
  constructor() {
    this._audio = null;
    this._volume = 0.35;
    this._playing = false;
    this._userPaused = false;
    this._listeners = new Set();
  }

  _init() {
    if (this._audio || typeof window === "undefined") return;
    this._audio = new Audio(CLICKERZ_AUDIO_SRC);
    this._audio.loop = true;
    this._audio.volume = this._volume;
    this._audio.addEventListener("play", () => {
      this._playing = true;
      this._notify();
    });
    this._audio.addEventListener("pause", () => {
      this._playing = false;
      this._notify();
    });
  }

  get isPlaying() {
    return this._playing;
  }

  get volume() {
    return this._volume;
  }

  play() {
    this._init();
    if (!this._audio) return Promise.resolve();
    this._userPaused = false;
    return this._audio.play();
  }

  pause() {
    this._userPaused = true;
    if (this._audio) this._audio.pause();
  }

  toggle() {
    if (this._playing) this.pause();
    else this.play().catch(() => {});
  }

  setVolume(v) {
    this._volume = Math.min(1, Math.max(0, Number(v.toFixed(2))));
    if (this._audio) this._audio.volume = this._volume;
    this._notify();
  }

  adjustVolume(delta) {
    this.setVolume(this._volume + delta);
  }

  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  _notify() {
    this._listeners.forEach((fn) => fn());
  }

  tryAutoplay() {
    this._init();
    if (!this._audio) return;
    this._audio.play().catch(() => {
      const unlock = () => {
        if (!this._userPaused) this._audio.play().catch(() => {});
      };
      document.addEventListener("click", unlock, { capture: true, once: true });
      document.addEventListener("keydown", unlock, { capture: true, once: true });
    });
  }
}

export const audioManager = new AudioManager();

export function useAudioManager() {
  const [, rerender] = useState(0);
  useEffect(() => audioManager.subscribe(() => rerender((n) => n + 1)), []);
  return audioManager;
}
