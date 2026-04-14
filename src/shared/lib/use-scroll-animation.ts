import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./gsap-plugins";

interface ScrollRevealOptions {
  /** Selector for elements to animate (default: "[data-reveal]") */
  selector?: string;
  /** ScrollTrigger start position (default: "top 85%") */
  start?: string;
  /** Stagger delay between elements in seconds (default: 0.12) */
  stagger?: number;
  /** Vertical offset in px to animate from (default: 40) */
  y?: number;
  /** Animation duration in seconds (default: 0.8) */
  duration?: number;
  /** GSAP easing (default: "power3.out") */
  ease?: string;
}

/**
 * Scroll-triggered reveal animation for child elements.
 * Attach the returned ref to a container, and add `data-reveal` to children.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    selector = "[data-reveal]",
    start = "top 85%",
    stagger = 0.12,
    y = 40,
    duration = 0.8,
    ease = "power3.out",
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll(selector);
      if (!elements.length) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(elements, { opacity: 0, y });

        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return containerRef;
}

interface ParallaxOptions {
  /** Parallax speed factor (default: 0.3 = 30% of scroll distance) */
  speed?: number;
  /** ScrollTrigger start (default: "top bottom") */
  start?: string;
  /** ScrollTrigger end (default: "bottom top") */
  end?: string;
}

/**
 * Parallax scroll effect on an element.
 * Attach the returned ref to the element that should move.
 */
export function useParallax(options: ParallaxOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { speed = 0.3, start = "top bottom", end = "bottom top" } = options;

  useGSAP(
    () => {
      if (!elementRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(elementRef.current, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: elementRef.current,
            start,
            end,
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: elementRef },
  );

  return elementRef;
}

/**
 * Entrance animation (no scroll trigger, fires on mount).
 * Useful for hero sections that are visible immediately.
 */
export function useEntranceAnimation(
  options: {
    selector?: string;
    stagger?: number;
    y?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {},
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    selector = "[data-entrance]",
    stagger = 0.15,
    y = 30,
    duration = 0.9,
    delay = 0.2,
    ease = "power3.out",
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll(selector);
      if (!elements.length) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(elements, { opacity: 0, y });
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease,
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return containerRef;
}
