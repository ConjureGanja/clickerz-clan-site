import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Bookcase, Fireplace, Rug } from "./glyphs";

export default function ParlourArt({ room }) {
  const book = at(room, "bookcase");
  const chair = at(room, "chair");
  const curtain = at(room, "curtain");
  const fire = at(room, "fireplace");
  const rug = at(room, "rug");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="wood">
      <Hotspot name="rug">
        <Rug x={rug.x} y={rug.y} w={40} h={24} fill="#7f1d1d" />
      </Hotspot>
      <Hotspot name="fireplace">
        <Fireplace x={fire.x} y={fire.y} />
      </Hotspot>
      <Hotspot name="bookcase">
        <Bookcase x={book.x} y={book.y} />
      </Hotspot>
      <Hotspot name="curtain">
        <rect x={curtain.x - 3} y={curtain.y - 8} width="7" height="16" fill="#b91c1c" />
      </Hotspot>
      <Hotspot name="chair">
        <rect x={chair.x - 16} y={chair.y - 5} width="12" height="10" rx="2" fill="#a16207" />
        <rect x={chair.x + 4} y={chair.y - 5} width="12" height="10" rx="2" fill="#a16207" />
      </Hotspot>
    </RoomSvg>
  );
}
