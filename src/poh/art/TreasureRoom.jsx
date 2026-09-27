import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Chest } from "./glyphs";

export default function TreasureRoomArt({ room }) {
  const deco = at(room, "decoration");
  const door = at(room, "door");
  const lighting = at(room, "lighting");
  const monster = at(room, "monster");
  const treasure = at(room, "treasure");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="dungeon">
      <Hotspot name="treasure">
        <Chest x={treasure.x} y={treasure.y} fill="#f0c84a" />
      </Hotspot>
      <Hotspot name="monster">
        <circle cx={monster.x} cy={monster.y - 4} r="6" fill="#166534" />
        <rect x={monster.x - 7} y={monster.y + 2} width="14" height="10" fill="#14532d" />
      </Hotspot>
      <Hotspot name="decoration">
        <circle cx={deco.x} cy={deco.y} r="5" fill="#e7e5e4" />
      </Hotspot>
      <Hotspot name="lighting">
        <circle cx={lighting.x} cy={lighting.y} r="3" fill="#fbbf24" />
      </Hotspot>
      <Hotspot name="door">
        <rect x={door.x - 12} y={door.y - 4} width="24" height="8" fill="#e7e5e4" stroke="#444" />
      </Hotspot>
    </RoomSvg>
  );
}
