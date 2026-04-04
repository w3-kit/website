import { useAnimatedSvg, STROKE, SVG_STYLE, SVG_VIEWBOX } from "../../../shared/lib/animation";

export function LandingAnimation() {
  const svgRef = useAnimatedSvg((tl) => {
    tl.fromTo(
      ".h-line",
      { x: -500, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" }
    );
    tl.fromTo(
      ".v-line",
      { y: -400, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" },
      "-=0.4"
    );
    tl.fromTo(
      ".rect",
      { scale: 0, transformOrigin: "center" },
      { scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
      "-=0.3"
    );
  });

  const { gray300: g3, gray400: g4, accent: a } = STROKE;

  return (
    <svg ref={svgRef} viewBox={SVG_VIEWBOX} style={SVG_STYLE}>
      {[50, 100, 200, 250].map((y, i) => (
        <line key={`h${i}`} className="h-line" x1="20" y1={y} x2="380" y2={y}
          stroke={g4} strokeWidth="0.5" />
      ))}
      <line className="h-line" x1="20" y1="150" x2="380" y2="150" stroke={a} strokeWidth="1" />
      {[80, 240, 320].map((x, i) => (
        <line key={`v${i}`} className="v-line" x1={x} y1="20" x2={x} y2="280"
          stroke={g4} strokeWidth="0.5" />
      ))}
      <line className="v-line" x1="160" y1="20" x2="160" y2="280" stroke={g4} strokeWidth="0.5" />
      <line className="v-line" x1="200" y1="20" x2="200" y2="280" stroke={a} strokeWidth="1" />
      <rect className="rect" x="72" y="92" width="30" height="20" rx="1" fill="none" stroke={g3} strokeWidth="0.5" />
      <rect className="rect" x="152" y="142" width="40" height="25" rx="1" fill="none" stroke={a} strokeWidth="0.5" />
      <rect className="rect" x="232" y="192" width="35" height="20" rx="1" fill="none" stroke={g3} strokeWidth="0.5" />
      <rect className="rect" x="312" y="92" width="25" height="30" rx="1" fill="none" stroke={g3} strokeWidth="0.5" />
      <rect className="rect" x="72" y="192" width="40" height="25" rx="1" fill="none" stroke={g3} strokeWidth="0.5" />
    </svg>
  );
}
