import { useEffect, useState } from "react";
import { CLICKERZ_AUDIO_SRC } from "./clickingGame";

class AudioManager {
  constructor() {
    this._audio = null;
    this._volume = 0.35;
    this._playing = false;
    this._wantsToPlay = false;
    this._status = "idle";
    this._message = "Press Play to start the game music.";
    this._unlock = null;
    this._listeners = new Set();
  }

  _init() {
    if (this._audio || typeof window === "undefined") return;
    const audio = new Audio(CLICKERZ_AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = this._volume;
    audio.addEventListener("playing", () => {
      this._playing = true;
      this._wantsToPlay = true;
      this._status = "playing";
      this._message = "Looping game music is playing.";
      this._disarmUnlock();
      this._notify();
    });
    audio.addEventListener("pause", () => {
      this._playing = false;
      if (this._status !== "error" && !audio.ended) {
        this._status = this._wantsToPlay ? "loading" : "paused";
        if (!this._wantsToPlay) this._message = "Music paused.";
      }
      this._notify();
    });
    audio.addEventListener("error", () => {
      this._playing = false;
      this._wantsToPlay = false;
      this._status = "error";
      this._message = "Music file is missing or invalid. Upload a valid MP3 to public/audio/clickerz-clicking-game.mp3.";
      this._notify();
    });
    this._audio = audio;
  }

  get isPlaying() {
    return this._wantsToPlay;
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
    this._wantsToPlay = true;
    if (this._status !== "playing") {
      this._status = "loading";
      this._message = "Starting music…";
    }
    this._notify();

    return this._audio.play()
      .then(() => {
        this._playing = !this._audio.paused;
        if (this._playing) {
          this._status = "playing";
          this._message = "Looping game music is playing.";
          this._disarmUnlock();
        }
        this._notify();
        return this._playing;
      })
      .catch((error) => {
        this._playing = false;
        if (error?.name === "NotAllowedError") {
          // Autoplay was blocked: start on the first user gesture instead.
          this._wantsToPlay = false;
          this._status = "blocked";
          this._message = "Click anywhere or press Play to start the music.";
          this._armUnlock();
        } else if (!this._wantsToPlay || error?.name === "AbortError") {
          // A pause() interrupted this play attempt — benign, not an error.
          if (this._status === "loading") {
            this._status = "paused";
            this._message = "Music paused.";
          }
        } else {
          this._wantsToPlay = false;
          this._status = "error";
          this._message = "Music could not start. Upload a valid MP3 to public/audio/clickerz-clicking-game.mp3.";
        }
        this._notify();
        return false;
      });
  }

  pause() {
    this._wantsToPlay = false;
    this._disarmUnlock();
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
    if (this._wantsToPlay) this.pause();
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

  _armUnlock() {
    if (this._unlock || typeof document === "undefined") return;
    const handler = (event) => {
      // The explicit play/pause button manages its own state via toggle().
      const target = event.target;
      if (target instanceof Element && target.closest("[data-audio-toggle]")) return;
      this._disarmUnlock();
      this.play();
    };
    this._unlock = handler;
    document.addEventListener("pointerdown", handler, true);
    document.addEventListener("keydown", handler, true);
  }

  _disarmUnlock() {
    if (!this._unlock || typeof document === "undefined") return;
    document.removeEventListener("pointerdown", this._unlock, true);
    document.removeEventListener("keydown", this._unlock, true);
    this._unlock = null;
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
    if (!this._audio || (this._wantsToPlay && this._playing)) return;
    this.play();
  }
}

export const audioManager = new AudioManager();

export function useAudioManager() {
  const [, rerender] = useState(0);
  useEffect(() => audioManager.subscribe(() => rerender((n) => n + 1)), []);
  return audioManager;
}
