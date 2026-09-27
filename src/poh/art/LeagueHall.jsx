import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Rug } from "./glyphs";

export default function LeagueHallArt({ room }) {
  const banner = at(room, "banner");
  const rug = at(room, "rug");
  const outfit = at(room, "outfit");
  const pedestal = at(room, "pedestal");
  const scroll = at(room, "scroll");
  const statue = at(room, "statue");
  const trophy = at(room, "trophy-case");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="carpet">
      <Hotspot name="rug">
        <Rug x={rug.x} y={rug.y} fill="#312e81" />
      </Hotspot>
      <Hotspot name="banner">
        <rect x={banner.x - 4} y={banner.y - 10} width="8" height="18" fill="#facc15" />
      </Hotspot>
      <Hotspot name="trophy-case">
        <rect x={trophy.x - 12} y={trophy.y - 6} width="24" height="12" fill="#44403c" stroke="#f0c84a" />
      </Hotspot>
      <Hotspot name="pedestal">
        <rect x={pedestal.x - 5} y={pedestal.y - 6} width="10" height="12" fill="#d6d3d1" />
      </Hotspot>
      <Hotspot name="scroll">
        <rect x={scroll.x - 6} y={scroll.y - 4} width="12" height="8" fill="#fef3c7" />
      </Hotspot>
      <Hotspot name="outfit">
        <rect x={outfit.x - 5} y={outfit.y - 10} width="10" height="16" fill="#1d4ed8" />
      </Hotspot>
      <Hotspot name="statue">
        <rect x={statue.x - 4} y={statue.y - 10} width="8" height="16" rx="3" fill="#e7e5e4" />
      </Hotspot>
    </RoomSvg>
  );
}
