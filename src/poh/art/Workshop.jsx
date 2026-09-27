import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { ArmourStand } from "./glyphs";

export default function WorkshopArt({ room }) {
  const clock = at(room, "clockmaking");
  const heraldry = at(room, "heraldry");
  const repair = at(room, "repair");
  const tool = at(room, "tool");
  const bench = at(room, "workbench");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="stone">
      <Hotspot name="clockmaking">
        <circle cx={clock.x} cy={clock.y} r="7" fill="#e7e5e4" stroke="#444" />
        <line x1={clock.x} y1={clock.y} x2={clock.x} y2={clock.y - 4} stroke="#111" />
      </Hotspot>
      <Hotspot name="heraldry">
        <rect x={heraldry.x - 6} y={heraldry.y - 8} width="12" height="16" fill="#b91c1c" stroke="#f0c84a" />
      </Hotspot>
      <Hotspot name="tool">
        <rect x={tool.x - 8} y={tool.y - 8} width="16" height="14" fill="#78716c" />
      </Hotspot>
      <Hotspot name="workbench">
        <rect x={bench.x - 12} y={bench.y - 6} width="24" height="12" fill="#a16207" stroke="#451a03" />
      </Hotspot>
      <Hotspot name="repair">
        <ArmourStand x={repair.x} y={repair.y} />
      </Hotspot>
    </RoomSvg>
  );
}
