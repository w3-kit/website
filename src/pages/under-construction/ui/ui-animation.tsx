import { useAnimatedSvg, STROKE, SVG_STYLE, SVG_VIEWBOX } from "../../../shared/lib/animation";

export function UiAnimation() {
  const svgRef = useAnimatedSvg((tl) => {
    tl.fromTo(
      ".comp",
      { scale: 0, transformOrigin: "center", opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
    tl.fromTo(
      ".inner-line",
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
      "-=0.3"
    );
  });

  const { gray300: g3, gray400: g4, accent: a } = STROKE;

  return (
    <svg ref={svgRef} viewBox={SVG_VIEWBOX} style={SVG_STYLE}>
      <rect className="comp" x="30" y="30" width="100" height="36" rx="4" fill="none" stroke={g3} strokeWidth="0.5" />
      <line className="inner-line" x1="50" y1="48" x2="110" y2="48" stroke={g4} strokeWidth="2" />
      <rect className="comp" x="150" y="30" width="100" height="36" rx="4" fill="none" stroke={a} strokeWidth="1" />
      <line className="inner-line" x1="170" y1="48" x2="230" y2="48" stroke={a} strokeWidth="2" />
      <rect className="comp" x="30" y="90" width="160" height="120" rx="4" fill="none" stroke={g3} strokeWidth="0.5" />
      <line className="inner-line" x1="45" y1="115" x2="130" y2="115" stroke={g4} strokeWidth="2" />
      <line className="inner-line" x1="45" y1="135" x2="170" y2="135" stroke={g4} strokeWidth="1" />
      <line className="inner-line" x1="45" y1="150" x2="155" y2="150" stroke={g4} strokeWidth="1" />
      <line className="inner-line" x1="45" y1="165" x2="140" y2="165" stroke={g4} strokeWidth="1" />
      <rect className="comp" x="45" y="180" width="60" height="20" rx="3" fill="none" stroke={a} strokeWidth="0.5" />
      <rect className="comp" x="210" y="90" width="160" height="36" rx="4" fill="none" stroke={g3} strokeWidth="0.5" />
      <line className="inner-line" x1="225" y1="108" x2="290" y2="108" stroke={g4} strokeWidth="1" />
      <rect className="comp" x="210" y="145" width="60" height="24" rx="12" fill="none" stroke={g3} strokeWidth="0.5" />
      <rect className="comp" x="280" y="145" width="60" height="24" rx="12" fill="none" stroke={a} strokeWidth="0.5" />
      <rect className="comp" x="210" y="190" width="48" height="24" rx="12" fill="none" stroke={g3} strokeWidth="0.5" />
      <circle className="comp" cx="246" cy="202" r="8" fill="none" stroke={a} strokeWidth="0.5" />
      <rect className="comp" x="30" y="240" width="32" height="32" rx="4" fill="none" stroke={g3} strokeWidth="0.5" />
      <rect className="comp" x="75" y="240" width="32" height="32" rx="4" fill="none" stroke={g3} strokeWidth="0.5" />
      <rect className="comp" x="120" y="240" width="32" height="32" rx="4" fill="none" stroke={g4} strokeWidth="0.5" />
      <rect className="comp" x="165" y="240" width="32" height="32" rx="4" fill="none" stroke={a} strokeWidth="0.5" />
    </svg>
  );
}
