/**
 * G I Clickerz team house — the 3×3 block from the clan guide.
 *
 * Grid coordinates: x grows east, y grows south, (0,0) is the north-west
 * cell of the 9×9 yard. The block sits in the middle of that yard.
 *
 * Rotations are clockwise quarter-turns from each room's wiki default
 * doors, chosen so the guest paths connect:
 *   spawn → west → pool → south → jewellery box
 *   spawn → east → nexus
 *   spawn → south → chapel altar (altar ends on the west wall)
 *
 * See rooms.js for why the chapel uses rotation 3.
 */

export const GI_CLICKERZ_LAYOUT = {
  version: 1,
  name: "G I Clickerz Team House",
  presetId: "gi-clickerz",
  activeFloor: "ground",
  floors: {
    ground: [
      { uid: "sg", roomId: "superior-garden", x: 3, y: 3, rotation: 0 },
      { uid: "eg", roomId: "garden", x: 4, y: 3, rotation: 0 },
      { uid: "pn", roomId: "portal-nexus", x: 5, y: 3, rotation: 0 },
      { uid: "ag", roomId: "achievement-gallery", x: 3, y: 4, rotation: 0 },
      { uid: "ch", roomId: "chapel", x: 4, y: 4, rotation: 3 },
      { uid: "ws", roomId: "workshop", x: 5, y: 4, rotation: 1 },
      { uid: "cr", roomId: "costume-room", x: 3, y: 5, rotation: 2 },
      { uid: "qh", roomId: "quest-hall", x: 4, y: 5, rotation: 0 },
      { uid: "st", roomId: "study", x: 5, y: 5, rotation: 0 },
    ],
    upper: [],
    dungeon: [],
  },
  /**
   * Guest-flow arrows drawn while this preset is loaded.
   * `from` / `to` are [x, y] room coordinates.
   */
  flow: [
    { from: [4, 3], to: [3, 3] },
    { from: [3, 3], to: [3, 4] },
    { from: [4, 3], to: [5, 3] },
    { from: [4, 3], to: [4, 4] },
  ],
};

export function emptyLayout(name = "Untitled layout") {
  return {
    version: 1,
    name,
    presetId: null,
    activeFloor: "ground",
    floors: { ground: [], upper: [], dungeon: [] },
    flow: [],
  };
}

export function cloneLayout(layout) {
  return JSON.parse(JSON.stringify(layout));
}
