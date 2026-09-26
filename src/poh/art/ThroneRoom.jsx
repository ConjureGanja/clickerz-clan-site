import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Rug, Throne } from "./glyphs";

export default function ThroneRoomArt({ room }) {
  const deco = at(room, "decoration");
  const floor = at(room, "floor");
  const lever = at(room, "lever");
  const seating = at(room, "seating");
  const throne = at(room, "throne");
  const trap = at(room, "trapdoor");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="carpet">
      <Hotspot name="floor">
        <Rug x={floor.x} y={floor.y} w={28} h={40} fill="#7f1d1d" />
      </Hotspot>
      <Hotspot name="throne">
        <Throne x={throne.x} y={throne.y} />
      </Hotspot>
      <Hotspot name="decoration">
        <rect x={deco.x - 5} y={deco.y - 8} width="10" height="14" fill="#f0c84a" />
      </Hotspot>
      <Hotspot name="lever">
        <line x1={lever.x} y1={lever.y + 6} x2={lever.x + 6} y2={lever.y - 8} stroke="#d6d3d1" strokeWidth="3" />
        <circle cx={lever.x + 6} cy={lever.y - 8} r="3" fill="#ef4444" />
      </Hotspot>
      <Hotspot name="seating">
        <rect x={seating.x - 10} y={seating.y - 4} width="18" height="8" fill="#44403c" />
      </Hotspot>
      <Hotspot name="trapdoor">
        <rect x={trap.x - 7} y={trap.y - 7} width="14" height="14" fill="#1c1917" stroke="#a8a29e" />
      </Hotspot>
    </RoomSvg>
  );
}
