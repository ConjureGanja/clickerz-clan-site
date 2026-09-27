export function at(room, id) {
  const spot = room.hotspots.find((entry) => entry.id === id);
  return spot ? spot.anchor : { x: 50, y: 50 };
}
