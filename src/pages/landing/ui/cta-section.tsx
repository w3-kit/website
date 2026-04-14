import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { GitHubIcon } from "./github-icon";

export function CtaSection() {
  const containerRef = useScrollReveal({ y: 20 });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx w3-kit init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionContainer className="py-16 md:py-24">
      <div ref={containerRef} className="relative">
        {/* Accent glow */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-3xl opacity-40 blur-3xl"
          style={{ background: "var(--w3-glow-accent)" }}
          aria-hidden="true"
        />

        <div
          data-reveal
          className="relative flex flex-col items-center gap-8 rounded-2xl px-8 py-12 text-center backdrop-blur-xl md:px-16 md:py-16"
          style={{
            background: "var(--w3-glass-bg)",
            border: "1px solid var(--w3-glass-border)",
            boxShadow: "var(--w3-glass-shadow)",
          }}
        >
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
          >
            Ready to build?
          </h2>

          <p
            className="max-w-md text-base"
            style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}
          >
            Open source and free forever. Start shipping in minutes.
          </p>

          {/* Install command */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-3 rounded-lg px-5 py-2.5 text-sm transition-all active:scale-95"
            style={{
              background: "var(--w3-glass-inner-bg)",
              border: "1px solid var(--w3-border-subtle)",
              color: "var(--w3-gray-700)",
              fontFamily: '"Geist Mono", ui-monospace, monospace',
            }}
          >
            npx w3-kit init
            {copied ? (
              <Check size={14} style={{ color: "var(--w3-accent)" }} />
            ) : (
              <Copy size={14} style={{ color: "var(--w3-gray-400)" }} />
            )}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="gap-2 px-6 py-5 text-sm"
              render={<a href="https://docs.w3-kit.com/getting-started" />}
            >
              Get Started
              <ArrowRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-6 py-5 text-sm"
              render={
                <a href="https://github.com/w3-kit" target="_blank" rel="noopener noreferrer" />
              }
            >
              <GitHubIcon size={16} />
              Star on GitHub
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
