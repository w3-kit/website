import { useEffect, useRef, useState, type ReactNode } from "react";

export function Typewriter({ resetKey, children }: { resetKey: string; children: ReactNode }) {
  const [mode, setMode] = useState<"animating" | "static">("animating");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setMode("static");
      return;
    }
    setMode("animating");
    const el = ref.current;
    if (!el) return;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  }, [resetKey]);

  return (
    <div
      ref={ref}
      data-typewriter={mode}
      className={mode === "animating" ? "w3-typewriter-reveal" : ""}
      style={mode === "static" ? { clipPath: "inset(0 0 0 0)" } : undefined}
    >
      {children}
    </div>
  );
}
