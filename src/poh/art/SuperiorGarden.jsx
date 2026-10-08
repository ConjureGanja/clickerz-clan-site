import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Bench, FairyRing, Flower, Pool, SpiritTree } from "./glyphs";

export default function SuperiorGardenArt({ room }) {
  const fence = at(room, "fence");
  const pool = at(room, "pool");
  const teleport = at(room, "teleport");
  const theme = at(room, "theme");
  const topiary = at(room, "topiary");
  const seating = at(room, "seating");
  const seating2 = at(room, "seating-2");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="grass">
      <Hotspot name="fence">
        <rect x={fence.x - 18} y={fence.y - 3} width="36" height="6" fill="#d6d3d1" stroke="#444" />
      </Hotspot>
      <Hotspot name="theme">
        <circle cx={theme.x} cy={theme.y} r="6" fill="#7c2d12" />
      </Hotspot>
      <Hotspot name="topiary">
        <circle cx={topiary.x} cy={topiary.y - 4} r="6" fill="#166534" />
        <rect x={topiary.x - 1} y={topiary.y} width="2" height="6" fill="#6b3f1f" />
      </Hotspot>
      <Hotspot name="teleport">
        <FairyRing x={teleport.x} y={teleport.y} />
        <SpiritTree x={teleport.x - 2} y={teleport.y + 16} />
      </Hotspot>
      <Hotspot name="pool">
        <Pool x={pool.x} y={pool.y} />
      </Hotspot>
      <Hotspot name="seating">
        <Bench x={seating.x} y={seating.y} />
      </Hotspot>
      <Hotspot name="seating-2">
        <Bench x={seating2.x} y={seating2.y} />
      </Hotspot>
      <Flower x="46" y="40" />
      <Flower x="60" y="58" fill="#fde68a" />
    </RoomSvg>
  );
}
