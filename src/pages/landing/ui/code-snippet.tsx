import { useState, useCallback, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "../../../shared/ui/button";
import { Separator } from "../../../shared/ui/separator";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code, language = "bash" }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [visibleCode, setVisibleCode] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  // Typewriter effect triggered by IntersectionObserver
  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisibleCode(code);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleCode(code.slice(0, i));
            if (i >= code.length) clearInterval(interval);
          }, 18);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [code]);

  // Blinking cursor
  const cursorRef = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      if (!cursorRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-xl"
      style={{
        background: "var(--w3-gray-200)",
        border: "1px solid var(--w3-border-subtle)",
      }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">{language}</span>
        </div>
        <Button variant="ghost" size="xs" onClick={handleCopy} className="gap-1">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <Separator />

      {/* Code content with typewriter */}
      <pre className="overflow-x-auto p-5">
        <code
          className="text-sm leading-relaxed"
          style={{
            color: "var(--w3-gray-900)",
            fontFamily: '"Geist Mono", ui-monospace, monospace',
          }}
        >
          {visibleCode}
          {visibleCode.length < code.length && (
            <span
              ref={cursorRef}
              className="inline-block h-4 w-[2px] translate-y-[2px]"
              style={{ background: "var(--w3-accent)" }}
            />
          )}
        </code>
      </pre>
    </div>
  );
}
