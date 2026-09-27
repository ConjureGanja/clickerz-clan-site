import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Bookcase, Rug, Stairs } from "./glyphs";

export default function QuestHallArt({ room }) {
  const book = at(room, "bookcase");
  const glory = at(room, "guild-trophy");
  const landscape = at(room, "landscape");
  const map = at(room, "map");
  const portrait = at(room, "portrait");
  const rug = at(room, "rug");
  const stair = at(room, "stair");
  const sword = at(room, "sword");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="stone">
      <Hotspot name="rug">
        <Rug x={rug.x} y={rug.y} w={42} h={30} fill="#14532d" />
      </Hotspot>
      <Hotspot name="bookcase">
        <Bookcase x={book.x} y={book.y} />
      </Hotspot>
      <Hotspot name="guild-trophy">
        <circle cx={glory.x} cy={glory.y} r="6" fill="none" stroke="#f0c84a" strokeWidth="2.4" />
        <path d={`M${glory.x} ${glory.y + 6} v8`} stroke="#f0c84a" strokeWidth="2" />
      </Hotspot>
      <Hotspot name="landscape">
        <rect x={landscape.x - 8} y={landscape.y - 6} width="16" height="12" fill="#7dd3fc" stroke="#0f172a" />
      </Hotspot>
      <Hotspot name="map">
        <rect x={map.x - 8} y={map.y - 6} width="16" height="12" fill="#fef3c7" stroke="#92400e" />
      </Hotspot>
      <Hotspot name="portrait">
        <rect x={portrait.x - 6} y={portrait.y - 8} width="12" height="16" fill="#44403c" stroke="#f0c84a" />
      </Hotspot>
      <Hotspot name="stair">
        <Stairs x={stair.x} y={stair.y} />
      </Hotspot>
      <Hotspot name="sword">
        <line x1={sword.x} y1={sword.y - 8} x2={sword.x} y2={sword.y + 8} stroke="#e7e5e4" strokeWidth="2" />
        <line x1={sword.x - 5} y1={sword.y - 2} x2={sword.x + 5} y2={sword.y - 2} stroke="#f0c84a" strokeWidth="2" />
      </Hotspot>
    </RoomSvg>
  );
}
