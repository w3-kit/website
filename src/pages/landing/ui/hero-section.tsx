import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import { Badge } from "../../../shared/ui/badge";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useEntranceAnimation } from "../../../shared/lib/use-scroll-animation";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import { HeroVisual } from "./hero-visual";
import { GitHubIcon } from "../../../shared/ui/github-icon";

export function HeroSection() {
  const containerRef = useEntranceAnimation({ stagger: 0.18, y: 30, delay: 0.3 });
  const [copied, handleCopy] = useCopyToClipboard("npx w3-kit init");

  return (
    <div className="relative flex min-h-[100svh] items-center pb-32 md:pb-40">
      <HeroVisual />

      <SectionContainer className="relative z-10">
        <div ref={containerRef} className="flex flex-col items-center gap-8 text-center">
          {/* Badge */}
          <div data-entrance>
            <Badge variant="outline" className="gap-2 px-3 py-1">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--w3-accent)" }}
              />
              Open Source
            </Badge>
          </div>

          {/* Headline */}
          <h1
            data-entrance
            className="max-w-3xl text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-[72px]"
            style={{
              color: "var(--w3-gray-900)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            The Web3
            <br />
            Developer Toolkit
          </h1>

          {/* Subtitle */}
          <p
            data-entrance
            className="max-w-lg text-lg md:text-xl"
            style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}
          >
            Ship dApps faster with typed components, recipes, and CLI tooling.
          </p>

          {/* CTAs */}
          <div data-entrance className="flex flex-wrap items-center justify-center gap-3">
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
              GitHub
            </Button>
          </div>

          <div data-entrance>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all active:scale-95"
              style={{
                background: "var(--w3-surface-translucent)",
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
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
