import { useEffect, useState } from "react";
import { CLICKERZ_AUDIO_SRC } from "./clickingGame";

class AudioManager {
  constructor() {
    this._audio = null;
    this._volume = 0.35;
    this._playing = false;
    this._status = "idle";
    this._message = "Press Play to start the game music.";
    this._userPaused = false;
    this._listeners = new Set();
  }

  _init() {
    if (this._audio || typeof window === "undefined") return;
    this._audio = new Audio(CLICKERZ_AUDIO_SRC);
    this._audio.loop = true;
    this._audio.preload = "auto";
    this._audio.volume = this._volume;
    this._audio.addEventListener("playing", () => {
      this._playing = true;
      this._status = "playing";
      this._message = "Looping game music is playing.";
      this._notify();
    });
    this._audio.addEventListener("pause", () => {
      this._playing = false;
      if (this._status !== "error" && !this._audio.ended) {
        this._status = "paused";
        this._message = "Music paused.";
      }
      this._notify();
    });
    this._audio.addEventListener("error", () => {
      this._playing = false;
      this._status = "error";
      this._message = "Music file is missing or invalid. Upload a valid MP3 to public/audio/clickerz-clicking-game.mp3.";
      this._notify();
    });
  }

  get isPlaying() {
    return this._playing;
  }

  get volume() {
    return this._volume;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }

  play() {
    this._init();
    if (!this._audio) return Promise.resolve(false);
    this._userPaused = false;
    this._playing = true;
    this._status = "loading";
    this._message = "Starting music…";
    this._notify();

    return this._audio.play()
      .then(() => {
        this._playing = !this._audio.paused;
        this._status = this._playing ? "playing" : "paused";
        this._message = this._playing ? "Looping game music is playing." : "Music paused.";
        this._notify();
        return this._playing;
      })
      .catch((error) => {
        this._playing = false;
        this._status = error?.name === "NotAllowedError" ? "blocked" : "error";
        this._message = this._status === "blocked"
          ? "Press Play to start music if your browser blocks autoplay."
          : "Music could not start. Upload a valid MP3 to public/audio/clickerz-clicking-game.mp3.";
        this._notify();
        return false;
      });
  }

  pause() {
    this._userPaused = true;
    if (this._audio) {
      this._audio.pause();
    } else {
      this._playing = false;
      this._status = "paused";
      this._message = "Music paused.";
      this._notify();
    }
  }

  toggle() {
    if (this._playing || this._status === "loading") this.pause();
    else this.play();
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
    this.play().then((started) => {
      if (started || this._status !== "blocked") return;
      const unlock = () => {
        if (!this._userPaused) this.play();
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
