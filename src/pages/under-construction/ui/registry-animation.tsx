import { useAnimatedSvg, STROKE, SVG_STYLE, SVG_VIEWBOX } from "../../../shared/lib/animation";

const cols = [60, 130, 200, 270, 340];
const rows = [60, 100, 140, 180, 220, 260];

export function RegistryAnimation() {
  const svgRef = useAnimatedSvg((tl) => {
    tl.fromTo(
      ".header-line",
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" }
    );
    tl.fromTo(
      ".grid-h",
      { x: -400, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power2.out" },
      "-=0.3"
    );
    tl.fromTo(
      ".grid-v",
      { y: -300, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
      "-=0.4"
    );
    tl.fromTo(
      ".data-dot",
      { scale: 0, transformOrigin: "center" },
      { scale: 1, duration: 0.3, stagger: 0.02, ease: "power3.out" },
      "-=0.2"
    );
  });

  const { gray300: g3, gray400: g4, accent: a } = STROKE;

  return (
    <svg ref={svgRef} viewBox={SVG_VIEWBOX} style={SVG_STYLE}>
      <line className="header-line" x1="40" y1="40" x2="370" y2="40" stroke={a} strokeWidth="1" />
      {cols.map((x, i) => (
        <rect key={`hdr${i}`} className="header-line" x={x - 20} y="25" width={40} height={4} rx="1" fill={a} opacity="0.6" />
      ))}
      {rows.map((y, i) => (
        <line key={`gh${i}`} className="grid-h" x1="40" y1={y} x2="370" y2={y} stroke={g4} strokeWidth="0.5" />
      ))}
      {cols.map((x, i) => (
        <line key={`gv${i}`} className="grid-v" x1={x} y1="40" x2={x} y2="280" stroke={g4} strokeWidth="0.5" />
      ))}
      {cols.map((x) =>
        rows.map((y) => (
          <circle key={`dot-${x}-${y}`} className="data-dot" cx={x} cy={y} r="2" fill={y === 60 ? a : g3} />
        ))
      )}
    </svg>
  );
}
