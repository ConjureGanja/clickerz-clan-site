import { beforeEach, describe, expect, it, vi } from "vitest";
import { AudioManager, CLICKERZ_AUDIO_ENABLED_KEY } from "./audioManager";
import { CLICKERZ_AUDIO_SRC } from "./clickingGame";

let playError;

class FakeAudio {
  constructor(src) {
    this.src = src;
    this.loop = false;
    this.preload = "";
    this.volume = 1;
    this.paused = true;
    this.ended = false;
    this.listeners = new Map();
  }

  addEventListener(type, handler) {
    this.listeners.set(type, handler);
  }

  play() {
    if (playError) {
      return Promise.reject(playError);
    }

    this.paused = false;
    this.listeners.get("playing")?.();
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
    this.listeners.get("pause")?.();
  }
}

beforeEach(() => {
  playError = null;
  vi.stubGlobal("Audio", FakeAudio);
});

describe("AudioManager", () => {
  it("configures the clicking game audio file and stores play intent", async () => {
    const manager = new AudioManager();

    await manager.play();

    expect(manager.status).toBe("playing");
    expect(manager.isPlaying).toBe(true);
    expect(manager.message).toBe("Looping game music is playing.");
    expect(manager._audio.src).toBe(CLICKERZ_AUDIO_SRC);
    expect(manager._audio.loop).toBe(true);
    expect(manager._audio.preload).toBe("auto");
    expect(localStorage.getItem(CLICKERZ_AUDIO_ENABLED_KEY)).toBe("true");
  });

  it("resumes stored music after refresh on the first desktop interaction when autoplay is blocked", async () => {
    localStorage.setItem(CLICKERZ_AUDIO_ENABLED_KEY, "true");
    const notAllowed = new Error("Autoplay blocked");
    notAllowed.name = "NotAllowedError";
    playError = notAllowed;
    const manager = new AudioManager();

    await manager.tryAutoplay();

    expect(manager.status).toBe("blocked");
    expect(manager.message).toBe("Click anywhere to resume the music after refresh.");
    expect(localStorage.getItem(CLICKERZ_AUDIO_ENABLED_KEY)).toBe("true");

    playError = null;
    document.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    await Promise.resolve();

    expect(manager.status).toBe("playing");
    expect(manager.isPlaying).toBe(true);
  });

  it("does not save autoplay intent when a browser blocks an unsolicited autoplay attempt", async () => {
    const notAllowed = new Error("Autoplay blocked");
    notAllowed.name = "NotAllowedError";
    playError = notAllowed;
    const manager = new AudioManager();

    await manager.tryAutoplay();

    expect(manager.status).toBe("blocked");
    expect(manager.message).toBe("Click anywhere or press Play to start the music.");
    expect(localStorage.getItem(CLICKERZ_AUDIO_ENABLED_KEY)).toBeNull();
  });

  it("clears stored play intent when paused", async () => {
    const manager = new AudioManager();

    await manager.play();
    manager.pause();

    expect(manager.status).toBe("paused");
    expect(manager.isPlaying).toBe(false);
    expect(localStorage.getItem(CLICKERZ_AUDIO_ENABLED_KEY)).toBe("false");
  });
});
