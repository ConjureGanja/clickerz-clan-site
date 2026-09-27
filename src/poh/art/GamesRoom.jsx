import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Chest } from "./glyphs";

export default function GamesRoomArt({ room }) {
  const balance = at(room, "elemental-balance");
  const game = at(room, "game");
  const prize = at(room, "prize-chest");
  const ranging = at(room, "ranging");
  const stone = at(room, "stone");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="wood">
      <Hotspot name="elemental-balance">
        <circle cx={balance.x} cy={balance.y} r="8" fill="#0f172a" stroke="#38bdf8" />
      </Hotspot>
      <Hotspot name="game">
        <rect x={game.x - 10} y={game.y - 8} width="20" height="16" fill="#1e293b" stroke="#e7e5e4" />
      </Hotspot>
      <Hotspot name="prize-chest">
        <Chest x={prize.x} y={prize.y} fill="#ca8a04" />
      </Hotspot>
      <Hotspot name="ranging">
        <circle cx={ranging.x} cy={ranging.y} r="8" fill="none" stroke="#ef4444" strokeWidth="3" />
        <circle cx={ranging.x} cy={ranging.y} r="3" fill="#ef4444" />
      </Hotspot>
      <Hotspot name="stone">
        <circle cx={stone.x} cy={stone.y} r="6" fill="#78716c" />
      </Hotspot>
    </RoomSvg>
  );
}
