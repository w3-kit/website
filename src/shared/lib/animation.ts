import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const STROKE = {
  gray300: "var(--w3-gray-300)",
  gray400: "var(--w3-gray-400)",
  accent: "var(--w3-accent)",
} as const;

export const SVG_STYLE = { width: "80%", height: "80%" } as const;
export const SVG_VIEWBOX = "0 0 400 300";

export function useAnimatedSvg(
  buildTimeline: (tl: gsap.core.Timeline) => void
) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();
        buildTimeline(tl);
        return () => tl.revert();
      });
      return () => mm.revert();
    },
    { scope: svgRef }
  );

  return svgRef;
}
