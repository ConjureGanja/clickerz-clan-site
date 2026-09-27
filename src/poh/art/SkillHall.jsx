import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { ArmourStand, Rug, Stairs } from "./glyphs";

export default function SkillHallArt({ room }) {
  const armour = at(room, "armour");
  const head = at(room, "head-trophy");
  const fish = at(room, "fishing-trophy");
  const rug = at(room, "rug");
  const runes = at(room, "rune-case");
  const stair = at(room, "stair");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="stone">
      <Hotspot name="rug">
        <Rug x={rug.x} y={rug.y} fill="#1e3a8a" />
      </Hotspot>
      <Hotspot name="armour">
        <ArmourStand x={armour.x} y={armour.y} />
      </Hotspot>
      <Hotspot name="head-trophy">
        <circle cx={head.x} cy={head.y} r="6" fill="#d6d3d1" stroke="#444" />
      </Hotspot>
      <Hotspot name="fishing-trophy">
        <ellipse cx={fish.x} cy={fish.y} rx="8" ry="3" fill="#94a3b8" />
      </Hotspot>
      <Hotspot name="rune-case">
        <rect x={runes.x - 7} y={runes.y - 8} width="14" height="16" fill="#1e1b4b" stroke="#c4b5fd" />
      </Hotspot>
      <Hotspot name="stair">
        <Stairs x={stair.x} y={stair.y} />
      </Hotspot>
    </RoomSvg>
  );
}
