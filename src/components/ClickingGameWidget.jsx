import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatClickCount, useClickerzScore } from "../utils/clickingGame";

const SOUNDCLOUD_PROFILE_URL = "https://soundcloud.com/clickerz-cc";
const SOUNDCLOUD_ORIGIN = "https://w.soundcloud.com";
const SOUNDCLOUD_EMBED_SRC = `${SOUNDCLOUD_ORIGIN}/player/?url=${encodeURIComponent(
  SOUNDCLOUD_PROFILE_URL,
)}&color=%23ffd700&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=false`;
const PREFS_KEY = "clickerz-soundcloud-player";
const UNLOCK_EVENTS = ["pointerdown", "click", "touchstart", "scroll", "wheel"];

function readPrefs() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PREFS_KEY) || "");
    return {
      paused: parsed?.paused === true,
      muted: parsed?.muted === true,
    };
  } catch {
    return { paused: false, muted: false };
  }
}

function writePrefs(prefs) {
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify({
      paused: prefs.paused === true,
      muted: prefs.muted === true,
    }));
  } catch {
    // Private browsing can reject storage. Playback still works for this visit.
  }
}

function readWidgetMessage(data) {
  if (!data) return null;
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return typeof data === "object" ? data : null;
}

function commandWidget(iframe, method, value) {
  const frame = iframe?.contentWindow;
  if (!frame) return;
  const payload = { method };
  if (value !== undefined) payload.value = value;
  frame.postMessage(JSON.stringify(payload), SOUNDCLOUD_ORIGIN);
}

function subscribeWidget(iframe) {
  ["ready", "play", "pause", "finish", "error"].forEach((eventName) => {
    commandWidget(iframe, "addEventListener", eventName);
  });
}

export default function ClickingGameWidget() {
  const { score, addScore } = useClickerzScore();
  const location = useLocation();
  const isGamePage = location.pathname === "/clicking-game";
  const [prefs] = useState(readPrefs);
  const pendingScoreRef = useRef(0);
  const iframeRef = useRef(null);
  const wantsPlayRef = useRef(false);
  const pausedByUserRef = useRef(prefs.paused);
  const mutedRef = useRef(prefs.muted);
  const disarmRef = useRef(() => {});
  const [displayScore, setDisplayScore] = useState(score);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(prefs.muted);

  useEffect(() => {
    setDisplayScore(score + pendingScoreRef.current);
  }, [score]);

  useEffect(() => {
    mutedRef.current = muted;
    commandWidget(iframeRef.current, "setVolume", muted ? 0 : 80);
  }, [muted]);

  useEffect(() => {
    let flushTimeoutId = null;

    const flushPendingScore = () => {
      if (pendingScoreRef.current <= 0) return;
      const pendingScore = pendingScoreRef.current;
      pendingScoreRef.current = 0;
      addScore(pendingScore);
    };

    const scheduleFlush = () => {
      if (flushTimeoutId !== null) return;
      flushTimeoutId = window.setTimeout(() => {
        flushTimeoutId = null;
        flushPendingScore();
      }, 200);
    };

    const handleDocumentClick = (event) => {
      if (event.button !== 0) return;
      pendingScoreRef.current += 1;
      setDisplayScore((value) => value + 1);
      scheduleFlush();
    };

    const handlePageHide = () => {
      if (flushTimeoutId !== null) {
        window.clearTimeout(flushTimeoutId);
        flushTimeoutId = null;
      }
      flushPendingScore();
    };

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("pagehide", handlePageHide);
      if (flushTimeoutId !== null) window.clearTimeout(flushTimeoutId);
      flushPendingScore();
    };
  }, [addScore]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== SOUNDCLOUD_ORIGIN) return;
      const message = readWidgetMessage(event.data);
      const method = String(message?.method || "").toLowerCase();
      if (!method) return;

      if (method === "ready") {
        subscribeWidget(iframeRef.current);
        if (wantsPlayRef.current && !pausedByUserRef.current) {
          commandWidget(iframeRef.current, "play");
          commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
        }
      }

      if (method === "play") {
        setPlaying(true);
        commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
        disarmRef.current();
      }

      if (method === "pause" || method === "finish" || method === "error") {
        setPlaying(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (pausedByUserRef.current) return undefined;

    const options = { capture: true, passive: true };
    let lastAttempt = 0;
    const requestPlay = () => {
      const now = Date.now();
      if (now - lastAttempt < 400) return;
      lastAttempt = now;
      wantsPlayRef.current = true;
      commandWidget(iframeRef.current, "play");
      commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
    };
    const onInteract = (event) => {
      if (pausedByUserRef.current) return;
      const target = event.target;
      if (target instanceof Element && target.closest("[data-music-control]")) return;
      requestPlay();
    };

    UNLOCK_EVENTS.forEach((eventName) => window.addEventListener(eventName, onInteract, options));
    disarmRef.current = () => {
      UNLOCK_EVENTS.forEach((eventName) => window.removeEventListener(eventName, onInteract, options));
    };

    return () => {
      disarmRef.current();
      disarmRef.current = () => {};
    };
  }, []);

  const handleFrameLoad = () => {
    subscribeWidget(iframeRef.current);
    if (wantsPlayRef.current && !pausedByUserRef.current) {
      commandWidget(iframeRef.current, "play");
      commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
    }
  };

  const togglePlay = () => {
    if (playing) {
      pausedByUserRef.current = true;
      wantsPlayRef.current = false;
      disarmRef.current();
      commandWidget(iframeRef.current, "pause");
      setPlaying(false);
      writePrefs({ paused: true, muted: mutedRef.current });
      return;
    }

    pausedByUserRef.current = false;
    wantsPlayRef.current = true;
    commandWidget(iframeRef.current, "play");
    commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
    setPlaying(true);
    writePrefs({ paused: false, muted: mutedRef.current });
  };

  const toggleMute = () => {
    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);
    commandWidget(iframeRef.current, "setVolume", nextMuted ? 0 : 80);
    writePrefs({ paused: pausedByUserRef.current, muted: nextMuted });
  };

  return (
    <aside className="clicker-widget" aria-label="Click score and SoundCloud player">
      <div className="clicker-widget__scorebox">
        <div className="clicker-widget__label">Clicks</div>
        <div className="clicker-widget__score">{formatClickCount(displayScore)}</div>
        <Link className="clicker-widget__link" to="/clicking-game">
          {isGamePage ? "Keep clicking" : "Our Soundcloud"}
        </Link>
      </div>

      <hr className="clicker-widget__divider" />

      <div className="clicker-widget__music">
        <div className="clicker-widget__music-label">SoundCloud</div>
        <div className="clicker-widget__music-row">
          <button
            type="button"
            className="clicker-widget__btn"
            data-music-control=""
            aria-pressed={playing}
            onClick={togglePlay}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            className="clicker-widget__btn"
            data-music-control=""
            aria-pressed={muted}
            onClick={toggleMute}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
          <span className="clicker-widget__vol">{muted ? "Muted" : playing ? "On" : "Ready"}</span>
        </div>
        <iframe
          ref={iframeRef}
          className="clicker-widget__frame"
          title="Clickerz SoundCloud player"
          src={SOUNDCLOUD_EMBED_SRC}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          onLoad={handleFrameLoad}
        />
      </div>
    </aside>
  );
}
