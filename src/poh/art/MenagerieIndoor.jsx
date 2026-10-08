import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";

export default function MenagerieIndoorArt({ room }) {
  const arena = at(room, "arena");
  const habitat = at(room, "habitat");
  const feeder = at(room, "pet-feeder");
  const house = at(room, "pet-house");
  const list = at(room, "pet-list");
  const post = at(room, "scratching-post");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="wood">
      <Hotspot name="arena">
        <ellipse cx={arena.x} cy={arena.y} rx="16" ry="10" fill="#44403c" stroke="#f0c84a" />
      </Hotspot>
      <Hotspot name="habitat">
        <rect x={habitat.x - 10} y={habitat.y - 8} width="20" height="16" fill="#78716c" />
      </Hotspot>
      <Hotspot name="pet-feeder">
        <rect x={feeder.x - 6} y={feeder.y - 4} width="12" height="8" fill="#a16207" />
      </Hotspot>
      <Hotspot name="pet-house">
        <polygon points={`${house.x},${house.y - 10} ${house.x + 10},${house.y} ${house.x - 10},${house.y}`} fill="#b91c1c" />
        <rect x={house.x - 7} y={house.y} width="14" height="10" fill="#a16207" />
      </Hotspot>
      <Hotspot name="pet-list">
        <rect x={list.x - 6} y={list.y - 8} width="12" height="14" fill="#fef3c7" />
      </Hotspot>
      <Hotspot name="scratching-post">
        <rect x={post.x - 2} y={post.y - 8} width="4" height="14" fill="#d6d3d1" />
      </Hotspot>
    </RoomSvg>
  );
}
