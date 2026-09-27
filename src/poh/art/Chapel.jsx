import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Altar, Rug } from "./glyphs";

export default function ChapelArt({ room }) {
  const altar = at(room, "altar");
  const lamp = at(room, "lamp");
  const icon = at(room, "icon");
  const statue = at(room, "statue");
  const musical = at(room, "musical");
  const rug = at(room, "rug");
  const windowSpot = at(room, "window");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="carpet">
      <Hotspot name="rug">
        <Rug x={rug.x} y={rug.y} w={40} h={36} fill="#1e3a8a" />
      </Hotspot>
      <Hotspot name="window">
        <rect x={windowSpot.x - 3} y={windowSpot.y - 10} width="6" height="18" fill="#7dd3fc" stroke="#f0c84a" />
      </Hotspot>
      <Hotspot name="lamp">
        <circle cx={lamp.x} cy={lamp.y} r="3" fill="#fb923c" />
        <circle cx={lamp.x + 28} cy={lamp.y} r="3" fill="#fb923c" />
      </Hotspot>
      <Hotspot name="altar">
        <Altar x={altar.x} y={altar.y} />
      </Hotspot>
      <Hotspot name="icon">
        <polygon points={`${icon.x},${icon.y - 8} ${icon.x + 7},${icon.y + 6} ${icon.x - 7},${icon.y + 6}`} fill="#f0c84a" />
      </Hotspot>
      <Hotspot name="statue">
        <rect x={statue.x - 4} y={statue.y - 10} width="8" height="16" rx="3" fill="#e7e5e4" />
      </Hotspot>
      <Hotspot name="musical">
        <rect x={musical.x - 8} y={musical.y - 6} width="16" height="12" fill="#44403c" />
        <circle cx={musical.x - 3} cy={musical.y} r="2" fill="#f0c84a" />
        <circle cx={musical.x + 3} cy={musical.y} r="2" fill="#f0c84a" />
      </Hotspot>
      <rect x="34" y="48" width="22" height="5" fill="#1e293b" />
      <rect x="34" y="58" width="22" height="5" fill="#1e293b" />
    </RoomSvg>
  );
}
