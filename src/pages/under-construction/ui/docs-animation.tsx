import { useAnimatedSvg, STROKE, SVG_STYLE, SVG_VIEWBOX } from "../../../shared/lib/animation";

const lines = [
  { y: 30, w: 120, h: 4, isHeading: true },
  { y: 50, w: 200, h: 2, isHeading: false },
  { y: 62, w: 180, h: 2, isHeading: false },
  { y: 74, w: 220, h: 2, isHeading: false },
  { y: 86, w: 160, h: 2, isHeading: false },
  { y: 110, w: 100, h: 4, isHeading: true },
  { y: 130, w: 240, h: 2, isHeading: false },
  { y: 142, w: 210, h: 2, isHeading: false },
  { y: 154, w: 230, h: 2, isHeading: false },
  { y: 166, w: 190, h: 2, isHeading: false },
  { y: 178, w: 200, h: 2, isHeading: false },
  { y: 202, w: 110, h: 4, isHeading: true },
  { y: 222, w: 250, h: 2, isHeading: false },
  { y: 234, w: 220, h: 2, isHeading: false },
  { y: 246, w: 200, h: 2, isHeading: false },
  { y: 258, w: 240, h: 2, isHeading: false },
];

export function DocsAnimation() {
  const svgRef = useAnimatedSvg((tl) => {
    tl.fromTo(
      ".sidebar",
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1, ease: "power2.out" }
    );
    tl.fromTo(
      ".text-line",
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.out" },
      "-=0.6"
    );
  });

  const { gray300: g3, gray400: g4, accent: a } = STROKE;

  return (
    <svg ref={svgRef} viewBox={SVG_VIEWBOX} style={SVG_STYLE}>
      <line className="sidebar" x1="60" y1="20" x2="60" y2="280" stroke={a} strokeWidth="1" />
      {lines.map((line, i) => (
        <rect
          key={i}
          className="text-line"
          x="80" y={line.y} width={line.w} height={line.h} rx="1"
          fill={line.isHeading ? a : g4}
          opacity={line.isHeading ? 0.8 : 0.4}
        />
      ))}
      {[45, 120, 210].map((y, i) => (
        <circle key={i} className="text-line" cx="40" cy={y} r="3" fill={i === 0 ? a : g3} />
      ))}
    </svg>
  );
}
