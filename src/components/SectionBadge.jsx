import { TONE_COLORS } from "../utils/colors";

const TONE_STYLES = {
  sky:    { color: "#87ceeb", bg: "rgba(135,206,235,0.1)" },
  gold:   { color: "#ffd700", bg: "rgba(255,215,0,0.1)" },
  purple: { color: "#7c8aff", bg: "rgba(124,138,255,0.1)" },
  teal:   { color: "#56c8e8", bg: "rgba(86,200,232,0.1)" },
};

export { TONE_COLORS };

export default function SectionBadge({ children, tone = "sky" }) {
  const style = TONE_STYLES[tone] ?? TONE_STYLES.sky;
  return (
    <span
      className="section-badge"
      style={{ color: style.color, background: style.bg }}
    >
      {children}
    </span>
  );
}
