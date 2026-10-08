import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Chest, Ring } from "./glyphs";

export default function CombatRoomArt({ room }) {
  const dummy = at(room, "dummy");
  const ring = at(room, "ring");
  const deco = at(room, "decoration");
  const storage = at(room, "storage");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="stone">
      <Hotspot name="ring">
        <Ring x={ring.x} y={ring.y} />
      </Hotspot>
      <Hotspot name="dummy">
        <line x1={dummy.x} y1={dummy.y - 10} x2={dummy.x} y2={dummy.y + 8} stroke="#d6d3d1" strokeWidth="3" />
        <circle cx={dummy.x} cy={dummy.y - 10} r="3" fill="#e7e5e4" />
      </Hotspot>
      <Hotspot name="decoration">
        <rect x={deco.x - 6} y={deco.y - 6} width="12" height="12" fill="#b91c1c" />
      </Hotspot>
      <Hotspot name="storage">
        <Chest x={storage.x} y={storage.y} />
      </Hotspot>
    </RoomSvg>
  );
}
