import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Cage } from "./glyphs";

export default function OublietteArt({ room }) {
  const deco = at(room, "decoration");
  const floor = at(room, "floor");
  const guard = at(room, "guard");
  const ladder = at(room, "ladder");
  const lighting = at(room, "lighting");
  const prison = at(room, "prison");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="dungeon">
      <Hotspot name="floor">
        <rect x={floor.x - 8} y={floor.y - 8} width="16" height="16" fill="#292524" />
      </Hotspot>
      <Hotspot name="prison">
        <Cage x={prison.x} y={prison.y} />
      </Hotspot>
      <Hotspot name="decoration">
        <circle cx={deco.x} cy={deco.y} r="4" fill="#7f1d1d" />
      </Hotspot>
      <Hotspot name="guard">
        <circle cx={guard.x} cy={guard.y - 4} r="3" fill="#e7e5e4" />
        <rect x={guard.x - 4} y={guard.y} width="8" height="10" fill="#44403c" />
      </Hotspot>
      <Hotspot name="ladder">
        <line x1={ladder.x} y1={ladder.y - 10} x2={ladder.x} y2={ladder.y + 10} stroke="#d6d3d1" strokeWidth="2" />
        <line x1={ladder.x - 4} y1={ladder.y - 6} x2={ladder.x + 4} y2={ladder.y - 6} stroke="#d6d3d1" />
        <line x1={ladder.x - 4} y1={ladder.y} x2={ladder.x + 4} y2={ladder.y} stroke="#d6d3d1" />
        <line x1={ladder.x - 4} y1={ladder.y + 6} x2={ladder.x + 4} y2={ladder.y + 6} stroke="#d6d3d1" />
      </Hotspot>
      <Hotspot name="lighting">
        <circle cx={lighting.x} cy={lighting.y} r="3" fill="#fbbf24" />
      </Hotspot>
    </RoomSvg>
  );
}
