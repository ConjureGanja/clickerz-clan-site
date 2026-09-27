import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { PortalArch } from "./glyphs";

export default function PortalChamberArt({ room }) {
  const centre = at(room, "centrepiece");
  const p1 = at(room, "portal1");
  const p2 = at(room, "portal2");
  const p3 = at(room, "portal3");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="stone">
      <Hotspot name="centrepiece">
        <ellipse cx={centre.x} cy={centre.y} rx="10" ry="6" fill="#0e7490" stroke="#67e8f9" />
      </Hotspot>
      <Hotspot name="portal1">
        <PortalArch x={p1.x} y={p1.y} rotate={-90} />
      </Hotspot>
      <Hotspot name="portal2">
        <PortalArch x={p2.x} y={p2.y} />
      </Hotspot>
      <Hotspot name="portal3">
        <PortalArch x={p3.x} y={p3.y} rotate={90} />
      </Hotspot>
    </RoomSvg>
  );
}
