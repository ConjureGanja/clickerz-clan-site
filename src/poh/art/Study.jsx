import { at } from "./anchors";
import { Hotspot, RoomSvg } from "./RoomSvg";
import { Bookcase, Lectern, Rug, Teacup } from "./glyphs";

export default function StudyArt({ room }) {
  const book = at(room, "bookcase");
  const ball = at(room, "crystal-ball");
  const globe = at(room, "globe");
  const lectern = at(room, "lectern");
  const telescope = at(room, "telescope");
  const tea = at(room, "tea");
  const chart = at(room, "wall-chart");
  return (
    <RoomSvg floor={room.floorColor} doors={room.doors} title={room.name} pattern="carpet">
      <Rug x="52" y="56" w="48" h="36" fill="#1e3a8a" />
      <Hotspot name="lectern">
        <Lectern x={lectern.x} y={lectern.y} />
      </Hotspot>
      <Hotspot name="tea">
        <Teacup x={tea.x} y={tea.y} />
      </Hotspot>
      <Hotspot name="bookcase">
        <Bookcase x={book.x} y={book.y} />
      </Hotspot>
      <Hotspot name="crystal-ball">
        <circle cx={ball.x} cy={ball.y} r="6" fill="#bae6fd" stroke="#0369a1" />
      </Hotspot>
      <Hotspot name="globe">
        <circle cx={globe.x} cy={globe.y} r="7" fill="#0369a1" stroke="#e7d3a1" />
      </Hotspot>
      <Hotspot name="telescope">
        <line x1={telescope.x - 6} y1={telescope.y + 4} x2={telescope.x + 6} y2={telescope.y - 6} stroke="#d6d3d1" strokeWidth="3" />
      </Hotspot>
      <Hotspot name="wall-chart">
        <rect x={chart.x - 7} y={chart.y - 8} width="14" height="12" fill="#fef3c7" stroke="#92400e" />
      </Hotspot>
    </RoomSvg>
  );
}
