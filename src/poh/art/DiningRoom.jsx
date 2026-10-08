import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Fireplace, Table } from "./glyphs";

export default function DiningRoomArt({ room }) {
  const bell = at(room, "bell-pull");
  const curtain = at(room, "curtain");
  const deco = at(room, "decoration");
  const fire = at(room, "fireplace");
  const seating = at(room, "seating");
  const table = at(room, "table");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="wood">
      <Hotspot name="fireplace">
        <Fireplace x={fire.x} y={fire.y} />
      </Hotspot>
      <Hotspot name="decoration">
        <rect x={deco.x - 6} y={deco.y - 4} width="12" height="8" fill="#f0c84a" />
      </Hotspot>
      <Hotspot name="curtain">
        <rect x={curtain.x - 3} y={curtain.y - 8} width="6" height="16" fill="#7f1d1d" />
      </Hotspot>
      <Hotspot name="bell-pull">
        <line x1={bell.x} y1={bell.y - 8} x2={bell.x} y2={bell.y + 6} stroke="#f0c84a" strokeWidth="2" />
        <circle cx={bell.x} cy={bell.y + 8} r="3" fill="#f0c84a" />
      </Hotspot>
      <Hotspot name="table">
        <Table x={table.x} y={table.y} />
      </Hotspot>
      <Hotspot name="seating">
        <rect x={seating.x - 12} y={seating.y - 4} width="24" height="8" fill="#44403c" />
      </Hotspot>
    </RoomSvg>
  );
}
