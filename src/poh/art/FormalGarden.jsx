import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { ExitPortal, Flower } from "./glyphs";

export default function FormalGardenArt({ room }) {
  const big = at(room, "big-plant");
  const big2 = at(room, "big-plant-2");
  const centre = at(room, "centrepiece");
  const fence = at(room, "fencing");
  const hedge = at(room, "hedging");
  const small = at(room, "small-plant");
  const small2 = at(room, "small-plant-2");
  const tip = at(room, "tip-jar");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="grass">
      <Hotspot name="fencing">
        <rect x={fence.x - 20} y={fence.y - 2} width="40" height="4" fill="#e7e5e4" />
      </Hotspot>
      <Hotspot name="hedging">
        <rect x={hedge.x - 3} y={hedge.y - 16} width="6" height="32" fill="#14532d" />
      </Hotspot>
      <Hotspot name="big-plant">
        <circle cx={big.x} cy={big.y} r="7" fill="#eab308" />
      </Hotspot>
      <Hotspot name="big-plant-2">
        <circle cx={big2.x} cy={big2.y} r="7" fill="#eab308" />
      </Hotspot>
      <Hotspot name="small-plant">
        <Flower x={small.x} y={small.y} fill="#fb7185" />
      </Hotspot>
      <Hotspot name="small-plant-2">
        <Flower x={small2.x} y={small2.y} />
      </Hotspot>
      <Hotspot name="centrepiece">
        <ExitPortal x={centre.x} y={centre.y} />
      </Hotspot>
      <Hotspot name="tip-jar">
        <rect x={tip.x - 3} y={tip.y - 5} width="6" height="8" fill="#a16207" />
      </Hotspot>
    </RoomSvg>
  );
}
