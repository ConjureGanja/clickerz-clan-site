import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { ExitPortal, Flower, Tree } from "./glyphs";

export default function GardenArt({ room }) {
  const plants = ["big-plant-1", "big-plant-2"].map((id) => at(room, id));
  const bigTree = at(room, "big-tree");
  const centre = at(room, "centrepiece");
  const small = [at(room, "small-plant-1"), at(room, "small-plant-2")];
  const tree = at(room, "tree");
  const tip = at(room, "tip-jar");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="grass">
      <path d="M50 8 L50 40 L68 70" fill="none" stroke="#c4b48a" strokeWidth="6" strokeLinecap="square" />
      <Hotspot name="big-tree">
        <Tree x={bigTree.x} y={bigTree.y} r={10} />
      </Hotspot>
      <Hotspot name="tree">
        <Tree x={tree.x} y={tree.y} r={7} />
      </Hotspot>
      <Hotspot name="big-plant-1">
        <circle cx={plants[0].x} cy={plants[0].y} r="7" fill="#166534" />
      </Hotspot>
      <Hotspot name="big-plant-2">
        <circle cx={plants[1].x} cy={plants[1].y} r="7" fill="#14532d" />
      </Hotspot>
      <Hotspot name="small-plant-1">
        <Flower x={small[0].x} y={small[0].y} />
      </Hotspot>
      <Hotspot name="small-plant-2">
        <Flower x={small[1].x} y={small[1].y} fill="#fb7185" />
      </Hotspot>
      <Hotspot name="centrepiece">
        <ExitPortal x={centre.x} y={centre.y} />
      </Hotspot>
      <Hotspot name="tip-jar">
        <rect x={tip.x - 3} y={tip.y - 5} width="6" height="8" rx="1" fill="#a16207" />
      </Hotspot>
    </RoomSvg>
  );
}
