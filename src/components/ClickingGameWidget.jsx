import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatClickCount, useClickerzScore } from "../utils/clickingGame";
import {
  CLICKER_WIDGET_DOCK_ID,
  SOUNDCLOUD_EMBED_SRC,
  SOUNDCLOUD_ORIGIN,
  dockPosition,
  isSoundcloudPage,
  normalizeSoundcloudTracks,
  readSoundIndex,
  readWidgetMessage,
  subscribeSoundcloudDock,
  widgetCommandPayload,
  widgetMethod,
} from "../utils/soundcloudPlayer";

const PREFS_KEY = "clickerz-soundcloud-player";
const UNLOCK_EVENTS = ["pointerdown", "click", "touchstart", "scroll", "wheel"];
const WIDGET_EVENTS = ["ready", "play", "pause", "finish", "error", "playProgress", "seek"];
const PLAYLIST_RETRY_DELAYS = [500, 1500, 3000];

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

function commandWidget(iframe, method, value) {
  const frame = iframe?.contentWindow;
  if (!frame) return;
  frame.postMessage(JSON.stringify(widgetCommandPayload(method, value)), SOUNDCLOUD_ORIGIN);
}

function subscribeWidget(iframe) {
  WIDGET_EVENTS.forEach((eventName) => {
    commandWidget(iframe, "addEventListener", eventName);
  });
}

function requestPlaylist(iframe) {
  commandWidget(iframe, "getSounds");
  commandWidget(iframe, "getCurrentSoundIndex");
  commandWidget(iframe, "getCurrentSound");
}

function sameTracks(current, next) {
  if (current.length !== next.length) return false;
  return current.every((track, index) => track.id === next[index].id && track.title === next[index].title);
}

function clearDockStyles(node) {
  if (!node) return;
  ["position", "top", "left", "width", "right", "bottom", "transform"].forEach((prop) => {
    node.style[prop] = "";
  });
  delete node.dataset.docked;
}

function applyDockPosition(node, position) {
  node.style.position = "absolute";
  node.style.top = `${position.top}px`;
  node.style.left = `${position.left}px`;
  node.style.width = `${position.width}px`;
  node.style.right = "auto";
  node.style.bottom = "auto";
  node.style.transform = "none";
  node.dataset.docked = "true";
}

function syncDockHeight(node, slot) {
  const height = Math.ceil(node.getBoundingClientRect().height);
  if (height > 0 && slot.style.minHeight !== `${height}px`) {
    slot.style.minHeight = `${height}px`;
  }
}

export default function ClickingGameWidget() {
  const { score, addScore } = useClickerzScore();
  const location = useLocation();
  const onSoundcloudPage = isSoundcloudPage(location.pathname);
  const [prefs] = useState(readPrefs);
  const pendingScoreRef = useRef(0);
  const widgetRef = useRef(null);
  const iframeRef = useRef(null);
  const trackListRef = useRef(null);
  const wantsPlayRef = useRef(false);
  const pausedByUserRef = useRef(prefs.paused);
  const mutedRef = useRef(prefs.muted);
  const playingRef = useRef(false);
  const readyRef = useRef(false);
  const currentIndexRef = useRef(0);
  const tracksCountRef = useRef(0);
  const pendingSkipRef = useRef(null);
  const retryTimersRef = useRef([]);
  const lastIndexPollRef = useRef(0);
  const disarmRef = useRef(() => {});
  const [displayScore, setDisplayScore] = useState(score);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(prefs.muted);
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [playlistStatus, setPlaylistStatus] = useState("loading");

  const activeTrack = tracks[currentIndex] || nowPlaying;

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
    const clearPlaylistRetries = () => {
      retryTimersRef.current.forEach((id) => window.clearTimeout(id));
      retryTimersRef.current = [];
    };

    const schedulePlaylistRetries = () => {
      clearPlaylistRetries();
      PLAYLIST_RETRY_DELAYS.forEach((delay, index) => {
        const id = window.setTimeout(() => {
          if (tracksCountRef.current > 0) return;
          requestPlaylist(iframeRef.current);
          if (index === PLAYLIST_RETRY_DELAYS.length - 1) setPlaylistStatus("empty");
        }, delay);
        retryTimersRef.current.push(id);
      });
    };

    const rememberIndex = (index) => {
      currentIndexRef.current = index;
      setCurrentIndex((current) => (current === index ? current : index));
    };

    const applyPendingSkip = () => {
      const index = pendingSkipRef.current;
      if (index === null) return;
      commandWidget(iframeRef.current, "skip", index);
      commandWidget(iframeRef.current, "play");
      commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
    };

    const handleMessage = (event) => {
      if (event.origin !== SOUNDCLOUD_ORIGIN) return;
      const message = readWidgetMessage(event.data);
      const method = widgetMethod(message);
      if (!method) return;

      if (method === "ready") {
        readyRef.current = true;
        subscribeWidget(iframeRef.current);
        requestPlaylist(iframeRef.current);
        if (tracksCountRef.current === 0) schedulePlaylistRetries();
        if (pendingSkipRef.current !== null) applyPendingSkip();
        else if (wantsPlayRef.current && !pausedByUserRef.current) {
          commandWidget(iframeRef.current, "play");
          commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
        }
      }

      if (method === "getsounds") {
        const nextTracks = normalizeSoundcloudTracks(message.value);
        if (nextTracks.length > 0) {
          tracksCountRef.current = nextTracks.length;
          clearPlaylistRetries();
          setPlaylistStatus("ready");
          setTracks((current) => (sameTracks(current, nextTracks) ? current : nextTracks));
        }
      }

      if (method === "getcurrentsoundindex") {
        const index = readSoundIndex(message.value);
        if (index !== null) rememberIndex(index);
      }

      if (method === "getcurrentsound") {
        const [sound] = normalizeSoundcloudTracks([message.value]);
        if (sound) setNowPlaying(sound);
      }

      if (method === "play") {
        playingRef.current = true;
        setPlaying(true);
        commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
        commandWidget(iframeRef.current, "getCurrentSoundIndex");
        commandWidget(iframeRef.current, "getCurrentSound");
        disarmRef.current();
      }

      if (method === "playprogress") {
        const now = Date.now();
        if (now - lastIndexPollRef.current >= 1500) {
          lastIndexPollRef.current = now;
          commandWidget(iframeRef.current, "getCurrentSoundIndex");
        }
      }

      if (method === "seek" || method === "finish") {
        commandWidget(iframeRef.current, "getCurrentSoundIndex");
      }

      if (method === "pause" || method === "finish" || method === "error") {
        playingRef.current = false;
        setPlaying(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      clearPlaylistRetries();
      window.removeEventListener("message", handleMessage);
    };
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

  useLayoutEffect(() => {
    const node = widgetRef.current;
    if (!node) return undefined;

    let lastKey = "";
    let frameId = 0;

    const sync = (measureHeight) => {
      if (!onSoundcloudPage) {
        lastKey = "";
        clearDockStyles(node);
        return;
      }

      const slot = document.getElementById(CLICKER_WIDGET_DOCK_ID);
      if (!slot?.isConnected) {
        if (node.dataset.docked === "true") {
          lastKey = "";
          clearDockStyles(node);
        }
        return;
      }

      const rect = slot.getBoundingClientRect();
      if (rect.width < 8) return;
      const position = dockPosition(rect, window.scrollX, window.scrollY);
      const key = `${position.top}|${position.left}|${position.width}`;
      const moved = key !== lastKey || node.dataset.docked !== "true";
      if (moved) {
        lastKey = key;
        applyDockPosition(node, position);
        syncDockHeight(node, slot);
        return;
      }
      if (measureHeight) syncDockHeight(node, slot);
    };

    const loop = () => {
      sync(false);
      frameId = document.hidden ? 0 : window.requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (!document.hidden && !frameId) frameId = window.requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(() => {
      const slot = document.getElementById(CLICKER_WIDGET_DOCK_ID);
      if (onSoundcloudPage && slot?.isConnected && node.dataset.docked === "true") {
        syncDockHeight(node, slot);
      }
    });
    resizeObserver.observe(node);

    const unsubscribe = subscribeSoundcloudDock(() => sync(true));
    frameId = window.requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (frameId) window.cancelAnimationFrame(frameId);
      clearDockStyles(node);
    };
  }, [onSoundcloudPage]);

  useEffect(() => {
    const list = trackListRef.current;
    if (!list) return;
    const current = list.querySelector("[aria-current='true']");
    if (!(current instanceof HTMLElement)) return;
    const listRect = list.getBoundingClientRect();
    const itemRect = current.getBoundingClientRect();
    if (itemRect.top < listRect.top) list.scrollTop -= listRect.top - itemRect.top;
    else if (itemRect.bottom > listRect.bottom) list.scrollTop += itemRect.bottom - listRect.bottom;
  }, [currentIndex, tracks]);

  const handleFrameLoad = () => {
    subscribeWidget(iframeRef.current);
    requestPlaylist(iframeRef.current);
    if (pendingSkipRef.current !== null && readyRef.current) {
      commandWidget(iframeRef.current, "skip", pendingSkipRef.current);
    }
    if (wantsPlayRef.current && !pausedByUserRef.current) {
      commandWidget(iframeRef.current, "play");
      commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
    }
  };

  const togglePlay = () => {
    if (playingRef.current) {
      pausedByUserRef.current = true;
      wantsPlayRef.current = false;
      playingRef.current = false;
      disarmRef.current();
      commandWidget(iframeRef.current, "pause");
      setPlaying(false);
      writePrefs({ paused: true, muted: mutedRef.current });
      return;
    }

    pausedByUserRef.current = false;
    wantsPlayRef.current = true;
    playingRef.current = true;
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

  const selectTrack = (index) => {
    const safeIndex = readSoundIndex(index);
    if (safeIndex === null) return;
    if (safeIndex === currentIndexRef.current && playingRef.current) return;

    pausedByUserRef.current = false;
    wantsPlayRef.current = true;
    pendingSkipRef.current = safeIndex;
    currentIndexRef.current = safeIndex;
    playingRef.current = true;
    setCurrentIndex(safeIndex);
    setPlaying(true);
    writePrefs({ paused: false, muted: mutedRef.current });

    if (!readyRef.current) return;
    commandWidget(iframeRef.current, "skip", safeIndex);
    commandWidget(iframeRef.current, "play");
    commandWidget(iframeRef.current, "setVolume", mutedRef.current ? 0 : 80);
  };

  return (
    <aside
      ref={widgetRef}
      className="clicker-widget"
      aria-label="Click score and SoundCloud player"
    >
      <div className="clicker-widget__scorebox">
        <div className="clicker-widget__label">Clicks</div>
        <div className="clicker-widget__score">{formatClickCount(displayScore)}</div>
        <Link className="clicker-widget__link clicker-widget__link--popout" to="/clicking-game">
          Our Soundcloud
        </Link>
        <span className="clicker-widget__dock-note">Docked on this page</span>
      </div>

      <hr className="clicker-widget__divider" />

      <div className="clicker-widget__music">
        <div className="clicker-widget__music-label">
          {activeTrack ? `Now playing: ${activeTrack.title}` : "SoundCloud"}
        </div>
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

        <div className="clicker-widget__player">
          {/* Kept mounted for the whole visit. Docking only moves this aside, so the iframe never reloads. */}
          <iframe
            ref={iframeRef}
            className="clicker-widget__frame"
            title="Clickerz SoundCloud playlist"
            src={SOUNDCLOUD_EMBED_SRC}
            allow="autoplay; encrypted-media"
            scrolling="no"
            onLoad={handleFrameLoad}
          />

          <div className="clicker-widget__playlist">
            <div className="clicker-widget__tracks-heading" id="clicker-widget-tracks-label">
              Playlist{tracks.length > 0 ? ` (${tracks.length})` : ""}
            </div>
            {tracks.length === 0 ? (
              <p className="clicker-widget__tracks-empty">
                {playlistStatus === "empty"
                  ? "SoundCloud has not sent the track list yet. Pick a track in the player above."
                  : "Loading tracks from SoundCloud…"}
              </p>
            ) : (
              <ul
                ref={trackListRef}
                className="clicker-widget__tracks"
                aria-labelledby="clicker-widget-tracks-label"
              >
                {tracks.map((track, index) => {
                  const selected = index === currentIndex;
                  return (
                    <li key={track.id}>
                      <button
                        type="button"
                        className="clicker-widget__track"
                        data-music-control=""
                        aria-current={selected ? "true" : undefined}
                        onClick={() => selectTrack(index)}
                      >
                        <span className="clicker-widget__track-index">{index + 1}</span>
                        <span className="clicker-widget__track-title">{track.title}</span>
                        {track.durationLabel && (
                          <span className="clicker-widget__track-time">{track.durationLabel}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
