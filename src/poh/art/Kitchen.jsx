import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Table } from "./glyphs";

export default function KitchenArt({ room }) {
  const barrel = at(room, "barrel");
  const cat = at(room, "cat-basket");
  const larder = at(room, "larder");
  const shelf = at(room, "shelf");
  const sink = at(room, "sink");
  const spice = at(room, "spice-rack");
  const stove = at(room, "stove");
  const table = at(room, "table");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="stone">
      <Hotspot name="larder">
        <rect x={larder.x - 8} y={larder.y - 10} width="16" height="18" fill="#a16207" stroke="#451a03" />
      </Hotspot>
      <Hotspot name="shelf">
        <rect x={shelf.x - 12} y={shelf.y - 3} width="24" height="5" fill="#d6d3d1" />
      </Hotspot>
      <Hotspot name="spice-rack">
        <rect x={spice.x - 4} y={spice.y - 8} width="8" height="16" fill="#b45309" />
      </Hotspot>
      <Hotspot name="sink">
        <rect x={sink.x - 8} y={sink.y - 6} width="16" height="12" fill="#94a3b8" />
        <ellipse cx={sink.x} cy={sink.y} rx="4" ry="3" fill="#38bdf8" />
      </Hotspot>
      <Hotspot name="stove">
        <rect x={stove.x - 10} y={stove.y - 6} width="20" height="12" fill="#44403c" />
        <circle cx={stove.x - 4} cy={stove.y} r="2" fill="#f97316" />
        <circle cx={stove.x + 4} cy={stove.y} r="2" fill="#f97316" />
      </Hotspot>
      <Hotspot name="table">
        <Table x={table.x} y={table.y} />
      </Hotspot>
      <Hotspot name="barrel">
        <ellipse cx={barrel.x} cy={barrel.y} rx="6" ry="8" fill="#a16207" />
      </Hotspot>
      <Hotspot name="cat-basket">
        <ellipse cx={cat.x} cy={cat.y} rx="7" ry="4" fill="#e7e5e4" stroke="#a8a29e" />
      </Hotspot>
    </RoomSvg>
  );
}
