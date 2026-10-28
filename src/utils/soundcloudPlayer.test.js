import process from "node:process";
import {
  SOUNDCLOUD_ORIGIN,
  SOUNDCLOUD_PROFILE_URL,
  buildSoundcloudEmbedSrc,
  dockPosition,
  extractSoundList,
  formatTrackDuration,
  isSoundcloudPage,
  normalizeSoundcloudTracks,
  readSoundIndex,
  readWidgetMessage,
  widgetCommandPayload,
  widgetMethod,
} from "./soundcloudPlayer.js";

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

const src = buildSoundcloudEmbedSrc();
expect(src.startsWith(`${SOUNDCLOUD_ORIGIN}/player/?`), "embed stays on the SoundCloud widget origin");
expect(src.includes(encodeURIComponent(SOUNDCLOUD_PROFILE_URL)), "embed points at the clan profile");
expect(src.includes("visual=false"), "classic playlist view keeps visual=false");
expect(src.includes("show_artwork=false"), "artwork stays off so the tracklist has room");
expect(src.includes("show_comments=false") && src.includes("buying=false"), "extra chrome stays hidden");
expect(isSoundcloudPage("/clicking-game") && !isSoundcloudPage("/events") && !isSoundcloudPage("/"), "only Our Soundcloud docks the player");

expect(readWidgetMessage('{"method":"getSounds","value":[]}')?.method === "getSounds", "string widget messages parse");
expect(readWidgetMessage({ method: "play" })?.method === "play", "object widget messages pass through");
expect(readWidgetMessage("nope") === null && readWidgetMessage(null) === null, "bad widget messages are ignored");
expect(widgetMethod({ method: "PLAY_PROGRESS" }) === "play_progress", "widget methods compare case-insensitively");
expect(widgetMethod({}) === "", "missing methods are empty");

const skip = widgetCommandPayload("skip", 0);
const play = widgetCommandPayload("play");
expect(skip.method === "skip" && skip.value === 0, "skip index 0 is sent");
expect(play.method === "play" && !Object.hasOwn(play, "value"), "commands without a value omit it");

expect(formatTrackDuration(125000) === "2:05", "durations format as minutes and seconds");
expect(formatTrackDuration(0) === "" && formatTrackDuration("nope") === "", "missing durations stay blank");

const tracks = normalizeSoundcloudTracks([
  { id: 10, title: "  Anthem  ", duration: 61000, permalink_url: "https://soundcloud.com/clickerz-cc/anthem" },
  { id: 10, title: "", duration: 1000 },
  { title: "Third", duration: -5 },
  null,
]);
expect(tracks.length === 4, "every playlist entry becomes a row");
expect(tracks[0].id === "10" && tracks[0].title === "Anthem" && tracks[0].durationLabel === "1:01", "titles and durations are cleaned");
expect(tracks[1].id === "10-1" && tracks[1].title === "Track 2", "duplicate or blank tracks get a stable label");
expect(tracks[2].durationMs === 0 && tracks[3].title === "Track 4", "invalid rows still stay selectable");

const wrapped = normalizeSoundcloudTracks('{"collection":[{"id":"a","title":"Wrapped"}]}');
expect(wrapped.length === 1 && wrapped[0].title === "Wrapped", "stringified collection payloads parse");
expect(extractSoundList({ sounds: [{ id: 1 }] }).length === 1, "sounds payloads are accepted");
expect(extractSoundList({ nope: true }).length === 0, "unknown payloads yield no tracks");

expect(readSoundIndex(0) === 0 && readSoundIndex("3") === 3, "sound indexes accept numbers and numeric strings");
expect(readSoundIndex(-1) === null && readSoundIndex("1.5") === null && readSoundIndex("") === null, "bad indexes are rejected");

const placed = dockPosition({ top: 12.4, left: 8.2, width: 640.6 }, 4, 100);
expect(placed.top === 112 && placed.left === 12 && placed.width === 641, "dock position follows the page slot");
expect(dockPosition({}).width === 0, "missing slot measurements do not invent a width");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("ok soundcloud player");
