/** Small top-down furniture marks. Colours match the planner legend. */

export const POOL = "#3ec1f0";
export const NEXUS = "#c084fc";
export const ALTAR = "#f0c84a";
export const JEWELLERY = "#3ee0d0";
export const SPAWN = "#ffe14a";

export function Pool({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="16" ry="12" fill="#0e4a68" stroke={POOL} strokeWidth="2" />
      <ellipse cx="0" cy="0" rx="10" ry="7" fill={POOL} />
      <ellipse cx="-3" cy="-2" rx="4" ry="2" fill="#e9fbff" opacity="0.8" />
    </g>
  );
}

export function Crystal({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polygon points="0,-16 10,-4 7,12 -7,12 -10,-4" fill={NEXUS} stroke="#f3e8ff" strokeWidth="1.4" />
      <polygon points="0,-16 4,-4 0,6 -4,-4" fill="#f5e9ff" opacity="0.85" />
      <ellipse cx="0" cy="14" rx="10" ry="3" fill="#3b1760" />
    </g>
  );
}

export function Altar({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-14" y="-8" width="28" height="16" rx="2" fill={ALTAR} stroke="#7a5a10" strokeWidth="1.4" />
      <rect x="-8" y="-4" width="16" height="8" fill="#fff4c4" />
      <polygon points="0,-12 3,-6 -3,-6" fill="#fff" />
    </g>
  );
}

export function JewelleryBox({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-12" y="-8" width="24" height="16" rx="2" fill={JEWELLERY} stroke="#0d5c56" strokeWidth="1.4" />
      <rect x="-8" y="-4" width="16" height="6" fill="#e8fffb" />
      <circle cx="0" cy="5" r="2" fill="#0d5c56" />
    </g>
  );
}

export function PortalArch({ x, y, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d="M-8,8 L-8,-2 Q-8,-12 0,-12 Q8,-12 8,-2 L8,8" fill="#24143f" stroke={NEXUS} strokeWidth="2" />
      <circle cx="0" cy="-2" r="3" fill="#d8b4fe" />
    </g>
  );
}

export function ExitPortal({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="2" rx="11" ry="6" fill="#1a2744" stroke="#f0d78a" strokeWidth="1.6" />
      <path d="M-7,2 L-7,-6 Q0,-14 7,-6 L7,2" fill="#2a3d66" stroke="#f0d78a" strokeWidth="1.4" />
      <circle cx="0" cy="-4" r="2.2" fill="#9fd0ff" />
    </g>
  );
}

export function FairyRing({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="2" rx="12" ry="7" fill="none" stroke="#d7c07a" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={deg}
          cx={Math.cos((deg * Math.PI) / 180) * 10}
          cy={2 + Math.sin((deg * Math.PI) / 180) * 5}
          r="2.1"
          fill="#86efac"
          stroke="#14532d"
          strokeWidth="0.6"
        />
      ))}
    </g>
  );
}

export function SpiritTree({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-2" y="0" width="4" height="10" fill="#6b3f1f" />
      <circle cx="0" cy="-4" r="9" fill="#3f8f4a" stroke="#16361c" strokeWidth="1" />
      <circle cx="-4" cy="-6" r="4" fill="#86efac" opacity="0.8" />
    </g>
  );
}

export function Tree({ x, y, r = 8 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-1.5" y="0" width="3" height="8" fill="#6b3f1f" />
      <circle cx="0" cy={-r * 0.4} r={r} fill="#2f7a3c" />
    </g>
  );
}

export function ArmourStand({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1="0" y1="-12" x2="0" y2="8" stroke="#d6d3d1" strokeWidth="2" />
      <circle cx="0" cy="-12" r="3.2" fill="#e7e5e4" stroke="#78716c" />
      <path d="M-7,-6 L7,-6 L5,4 L-5,4 Z" fill="#9aa3b2" stroke="#444" strokeWidth="0.8" />
      <line x1="-6" y1="8" x2="6" y2="8" stroke="#78716c" strokeWidth="2" />
    </g>
  );
}

export function Lectern({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-2" y="-2" width="4" height="12" fill="#6b3f1f" />
      <polygon points="-10,-2 10,-2 7,-10 -7,-10" fill="#e7d3a1" stroke="#6b3f1f" strokeWidth="1" />
    </g>
  );
}

export function Teacup({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="5" ry="3.2" fill="#f8fafc" stroke="#94a3b8" />
      <path d="M5,0 Q9,0 8,3" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <ellipse cx="0" cy="-1" rx="3" ry="1.4" fill="#b45309" />
    </g>
  );
}

export function Chest({ x, y, fill = "#a16207" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-9" y="-6" width="18" height="12" rx="1" fill={fill} stroke="#451a03" strokeWidth="1" />
      <line x1="-9" y1="0" x2="9" y2="0" stroke="#451a03" />
      <circle cx="0" cy="1" r="1.4" fill="#fde68a" />
    </g>
  );
}

export function Stairs({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1, 2, 3].map((step) => (
        <rect key={step} x={-10 + step * 2} y={-8 + step * 4} width={20 - step * 4} height="4" fill="#d6d3d1" stroke="#444" strokeWidth="0.6" />
      ))}
    </g>
  );
}

export function Throne({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-8" y="-6" width="16" height="16" rx="2" fill="#f0c84a" stroke="#7a5a10" />
      <rect x="-10" y="-12" width="20" height="8" rx="2" fill="#b91c1c" />
    </g>
  );
}

export function Rug({ x, y, w = 36, h = 28, fill = "#1e3a5f" }) {
  return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="2" fill={fill} opacity="0.85" />;
}

export function Table({ x, y }) {
  return <rect x={x - 12} y={y - 8} width="24" height="16" rx="2" fill="#a16207" stroke="#451a03" />;
}

export function Bed({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-14" y="-10" width="28" height="20" rx="2" fill="#f5e6c8" stroke="#6b3f1f" />
      <rect x="-14" y="-10" width="28" height="6" fill="#e7e5e4" />
    </g>
  );
}

export function Cage({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#d6d3d1" strokeWidth="1.2" fill="none">
      <rect x="-10" y="-10" width="20" height="20" />
      <line x1="-5" y1="-10" x2="-5" y2="10" />
      <line x1="0" y1="-10" x2="0" y2="10" />
      <line x1="5" y1="-10" x2="5" y2="10" />
    </g>
  );
}

export function Ring({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="16" ry="11" fill="#3f1d1d" stroke="#f0c84a" strokeWidth="2" />
    </g>
  );
}

export function Fireplace({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-10" y="-6" width="20" height="12" fill="#44403c" />
      <path d="M-4,4 Q0,-4 4,4" fill="#f97316" />
    </g>
  );
}

export function Bookcase({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-8" y="-10" width="16" height="20" fill="#6b3f1f" />
      <line x1="-8" y1="-3" x2="8" y2="-3" stroke="#e7d3a1" />
      <line x1="-8" y1="4" x2="8" y2="4" stroke="#e7d3a1" />
    </g>
  );
}

export function Bench({ x, y }) {
  return <rect x={x - 10} y={y - 4} width="20" height="8" rx="1" fill="#a8a29e" stroke="#444" />;
}

export function Flower({ x, y, fill = "#f472b6" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="3" fill={fill} />
      <circle cx="0" cy="0" r="1.2" fill="#fde68a" />
    </g>
  );
}
