import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Stairs } from "./glyphs";

export default function DungeonStairsArt({ room }) {
  const deco = at(room, "decoration");
  const door = at(room, "door");
  const guard = at(room, "guard");
  const lighting = at(room, "lighting");
  const rug = at(room, "rug");
  const trap = at(room, "trap");
  const stair = at(room, "stair");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="dungeon">
      <Hotspot name="rug">
        <rect x={rug.x - 12} y={rug.y - 12} width="24" height="24" fill="#44403c" />
      </Hotspot>
      <Hotspot name="stair">
        <Stairs x={stair.x} y={stair.y} />
      </Hotspot>
      <Hotspot name="decoration">
        <circle cx={deco.x} cy={deco.y} r="4" fill="#7f1d1d" />
      </Hotspot>
      <Hotspot name="lighting">
        <circle cx={lighting.x} cy={lighting.y} r="3" fill="#fbbf24" />
      </Hotspot>
      <Hotspot name="guard">
        <rect x={guard.x - 4} y={guard.y - 8} width="8" height="14" fill="#e7e5e4" />
      </Hotspot>
      <Hotspot name="trap">
        <polygon points={`${trap.x},${trap.y - 5} ${trap.x + 5},${trap.y + 4} ${trap.x - 5},${trap.y + 4}`} fill="#a8a29e" />
      </Hotspot>
      <Hotspot name="door">
        <rect x={door.x - 10} y={door.y - 3} width="20" height="6" fill="#d6d3d1" stroke="#444" />
      </Hotspot>
    </RoomSvg>
  );
}
