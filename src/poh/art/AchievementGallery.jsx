import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Altar, JewelleryBox, Rug } from "./glyphs";

export default function AchievementGalleryArt({ room }) {
  const log = at(room, "adventure-log");
  const altar = at(room, "altar");
  const boss = at(room, "boss-lair");
  const display = at(room, "display");
  const box = at(room, "jewellery-box");
  const quest = at(room, "quest-list");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="carpet">
      <Hotspot name="adventure-log">
        <Rug x="50" y="52" w="46" h="54" fill="#7f1d1d" />
        <rect x={log.x - 8} y={log.y - 6} width="16" height="12" fill="#fef3c7" stroke="#92400e" />
      </Hotspot>
      <Hotspot name="boss-lair">
        <rect x={boss.x - 8} y={boss.y - 8} width="16" height="16" fill="#1c1917" stroke="#f0c84a" />
      </Hotspot>
      <Hotspot name="display">
        <rect x={display.x - 8} y={display.y - 10} width="16" height="18" fill="#44403c" stroke="#e7e5e4" />
      </Hotspot>
      <Hotspot name="altar">
        <Altar x={altar.x} y={altar.y} />
      </Hotspot>
      <Hotspot name="quest-list">
        <rect x={quest.x - 10} y={quest.y - 6} width="20" height="12" fill="#1e3a8a" stroke="#93c5fd" />
      </Hotspot>
      <Hotspot name="jewellery-box">
        <JewelleryBox x={box.x} y={box.y} />
      </Hotspot>
    </RoomSvg>
  );
}
