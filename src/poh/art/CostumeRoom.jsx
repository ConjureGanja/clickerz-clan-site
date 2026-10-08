import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Chest } from "./glyphs";

export default function CostumeRoomArt({ room }) {
  const armour = at(room, "armour-case");
  const cape = at(room, "cape-rack");
  const dress = at(room, "fancy-dress");
  const wardrobe = at(room, "magic-wardrobe");
  const toy = at(room, "toy-box");
  const chest = at(room, "treasure-chest");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="wood">
      <Hotspot name="cape-rack">
        <rect x={cape.x - 14} y={cape.y - 8} width="28" height="6" fill="#44403c" />
        <path d={`M${cape.x - 8} ${cape.y - 2} l4 14 h6 l-2 -14`} fill="#dc2626" />
        <path d={`M${cape.x + 2} ${cape.y - 2} l3 12 h5 l-2 -12`} fill="#2563eb" />
      </Hotspot>
      <Hotspot name="armour-case">
        <rect x={armour.x - 8} y={armour.y - 10} width="16" height="18" fill="#78716c" stroke="#e7e5e4" />
      </Hotspot>
      <Hotspot name="fancy-dress">
        <Chest x={dress.x} y={dress.y} fill="#db2777" />
      </Hotspot>
      <Hotspot name="magic-wardrobe">
        <rect x={wardrobe.x - 8} y={wardrobe.y - 12} width="16" height="22" fill="#1e1b4b" stroke="#c4b5fd" />
      </Hotspot>
      <Hotspot name="toy-box">
        <Chest x={toy.x} y={toy.y} fill="#ea580c" />
      </Hotspot>
      <Hotspot name="treasure-chest">
        <Chest x={chest.x} y={chest.y} fill="#ca8a04" />
      </Hotspot>
    </RoomSvg>
  );
}
