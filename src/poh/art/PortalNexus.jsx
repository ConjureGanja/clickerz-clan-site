import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Crystal, Rug } from "./glyphs";

export default function PortalNexusArt({ room }) {
  const amulet = at(room, "amulet");
  const curtain = at(room, "curtain");
  const rug = at(room, "rug");
  const nexus = at(room, "nexus");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="stone">
      <Hotspot name="rug">
        <Rug x={rug.x} y={rug.y} w={40} h={26} fill="#3b0764" />
      </Hotspot>
      <Hotspot name="curtain">
        <rect x={curtain.x - 4} y={curtain.y - 10} width="8" height="18" fill="#6d28d9" />
      </Hotspot>
      <Hotspot name="amulet">
        <circle cx={amulet.x} cy={amulet.y} r="5" fill="none" stroke="#f0c84a" strokeWidth="2" />
        <circle cx={amulet.x} cy={amulet.y} r="2" fill="#f0c84a" />
      </Hotspot>
      <Hotspot name="nexus">
        <Crystal x={nexus.x} y={nexus.y} />
      </Hotspot>
    </RoomSvg>
  );
}
