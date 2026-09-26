/**
 * Shared room frame. Door openings are drawn from the wiki default `doors`
 * list. The planner rotates the whole SVG, so doors and furniture turn together.
 * Hotspot groups use data-hotspot (not id) so two copies of a room stay valid.
 */

const WALL = "#1a140f";
const OPEN = "#070b16";
const SILL = "#f0d78a";
const THICK = 7;
const GAP = 34;

function has(doors, side) {
  return doors.includes(side);
}

function bars(door) {
  const start = (100 - GAP) / 2;
  const end = start + GAP;
  if (!door) return [[0, 100]];
  return [
    [0, start],
    [end, 100],
  ];
}

export function DoorWalls({ doors }) {
  const parts = [];
  const addH = (side, y) => {
    bars(has(doors, side)).forEach(([a, b], index) => {
      parts.push(
        <rect key={`${side}-${index}`} x={a} y={y} width={b - a} height={THICK} fill={WALL} />,
      );
    });
  };
  const addV = (side, x) => {
    bars(has(doors, side)).forEach(([a, b], index) => {
      parts.push(
        <rect key={`${side}-${index}`} x={x} y={a} width={THICK} height={b - a} fill={WALL} />,
      );
    });
  };
  addH("N", 0);
  addH("S", 100 - THICK);
  addV("W", 0);
  addV("E", 100 - THICK);

  const openings = [];
  const sill = (side) => {
    const a = (100 - GAP) / 2;
    if (side === "N") {
      openings.push(<rect key="o-n" x={a} y={0} width={GAP} height={THICK} fill={OPEN} />);
      openings.push(<rect key="s-n" x={a + 4} y={THICK - 1.6} width={GAP - 8} height={2.2} fill={SILL} />);
    } else if (side === "S") {
      openings.push(<rect key="o-s" x={a} y={100 - THICK} width={GAP} height={THICK} fill={OPEN} />);
      openings.push(<rect key="s-s" x={a + 4} y={100 - THICK - 0.6} width={GAP - 8} height={2.2} fill={SILL} />);
    } else if (side === "W") {
      openings.push(<rect key="o-w" x={0} y={a} width={THICK} height={GAP} fill={OPEN} />);
      openings.push(<rect key="s-w" x={THICK - 1.6} y={a + 4} width={2.2} height={GAP - 8} fill={SILL} />);
    } else if (side === "E") {
      openings.push(<rect key="o-e" x={100 - THICK} y={a} width={THICK} height={GAP} fill={OPEN} />);
      openings.push(<rect key="s-e" x={100 - THICK - 0.6} y={a + 4} width={2.2} height={GAP - 8} fill={SILL} />);
    }
  };
  ["N", "E", "S", "W"].forEach((side) => {
    if (has(doors, side)) sill(side);
  });

  return (
    <g data-layer="doors">
      {openings}
      {parts}
    </g>
  );
}

export function Hotspot({ name, children }) {
  return <g data-hotspot={name}>{children}</g>;
}

export function RoomSvg({ floor, doors, title, pattern = "stone", children }) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={title} className="poh-room-svg">
      <rect width="100" height="100" fill={floor} />
      {pattern === "grass" && <Grass />}
      {pattern === "wood" && <Wood />}
      {pattern === "stone" && <Stone />}
      {pattern === "carpet" && <Carpet />}
      {pattern === "dungeon" && <DungeonFloor />}
      {children}
      <DoorWalls doors={doors} />
    </svg>
  );
}

function Grass() {
  return (
    <g opacity="0.45">
      <circle cx="18" cy="20" r="7" fill="#67b15a" />
      <circle cx="80" cy="18" r="5" fill="#2f6a32" />
      <circle cx="16" cy="80" r="6" fill="#2f6a32" />
      <circle cx="86" cy="78" r="7" fill="#67b15a" />
      <circle cx="48" cy="16" r="3" fill="#8ed37a" />
    </g>
  );
}

function Wood() {
  return (
    <g stroke="#3a2a1c" strokeWidth="2" opacity="0.35">
      <line x1="8" y1="28" x2="92" y2="28" />
      <line x1="8" y1="46" x2="92" y2="46" />
      <line x1="8" y1="64" x2="92" y2="64" />
      <line x1="8" y1="82" x2="92" y2="82" />
    </g>
  );
}

function Stone() {
  return (
    <g fill="#000" opacity="0.12">
      <rect x="14" y="16" width="22" height="14" />
      <rect x="40" y="18" width="28" height="12" />
      <rect x="18" y="40" width="30" height="16" />
      <rect x="52" y="42" width="28" height="16" />
      <rect x="20" y="66" width="26" height="14" />
      <rect x="50" y="68" width="30" height="14" />
    </g>
  );
}

function Carpet() {
  return <rect x="16" y="16" width="68" height="68" fill="#000" opacity="0.15" />;
}

function DungeonFloor() {
  return (
    <g stroke="#2a1c16" strokeWidth="1.4" opacity="0.7">
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => (
          <rect
            key={`${row}-${col}`}
            x={12 + col * 20}
            y={12 + row * 20}
            width="16"
            height="16"
            fill="#5a4036"
          />
        )),
      )}
    </g>
  );
}

