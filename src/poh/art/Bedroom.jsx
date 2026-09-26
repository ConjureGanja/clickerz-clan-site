import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Bed, Fireplace, Rug } from "./glyphs";

export default function BedroomArt({ room }) {
  const bed = at(room, "bed");
  const corner = at(room, "corner");
  const curtain = at(room, "curtain");
  const dresser = at(room, "dresser");
  const fire = at(room, "fireplace");
  const rug = at(room, "rug");
  const wardrobe = at(room, "wardrobe");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="wood">
      <Hotspot name="rug">
        <Rug x={rug.x} y={rug.y} w={36} h={20} fill="#9d174d" />
      </Hotspot>
      <Hotspot name="bed">
        <Bed x={bed.x} y={bed.y} />
      </Hotspot>
      <Hotspot name="fireplace">
        <Fireplace x={fire.x} y={fire.y} />
      </Hotspot>
      <Hotspot name="curtain">
        <rect x={curtain.x - 3} y={curtain.y - 8} width="6" height="16" fill="#fbcfe8" />
      </Hotspot>
      <Hotspot name="dresser">
        <rect x={dresser.x - 8} y={dresser.y - 6} width="16" height="12" fill="#a16207" />
      </Hotspot>
      <Hotspot name="wardrobe">
        <rect x={wardrobe.x - 8} y={wardrobe.y - 10} width="16" height="18" fill="#6b3f1f" />
      </Hotspot>
      <Hotspot name="corner">
        <circle cx={corner.x} cy={corner.y} r="5" fill="#e7e5e4" stroke="#444" />
      </Hotspot>
    </RoomSvg>
  );
}
