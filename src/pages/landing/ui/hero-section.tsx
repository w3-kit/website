import { Check, Copy } from "lucide-react";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { DEMOS } from "../../../shared/ui/w3-kit-demos";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import { getSectionUrl } from "../../../shared/lib/urls";

const INIT_COMMAND = "npx w3-kit init";
const HeroFragment = DEMOS["token-swap"];

export function HeroSection() {
  const [copied, copy] = useCopyToClipboard(INIT_COMMAND);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden md:min-h-[max(760px,calc(100svh-72px))]"
    >
      <div className="px-4 pt-10 md:px-10 md:pt-16">
        <h1
          id="hero-title"
          className="w3-rise text-[clamp(40px,10vw,96px)] font-medium leading-[0.96] tracking-[-0.045em] text-w3-ink md:text-w3-display"
        >
          <span className="block">Web3 components</span>
          <span className="block">for React apps.</span>
        </h1>
        <div
          className="w3-rise mt-8 max-w-[40ch] md:mt-10 md:max-w-[34ch] lg:max-w-[40ch]"
          style={{ animationDelay: "80ms" }}
        >
          <p className="text-w3-body text-w3-ink">
            Open-source components, a typed registry of {CHAINS.length} chains and {TOKENS.length}{" "}
            tokens, and a CLI that puts them in your project.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              type="button"
              onClick={copy}
              className="w3-press inline-flex h-12 items-center gap-3 bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent hover:bg-w3-accent-hover"
            >
              <code className="text-[15px]">{INIT_COMMAND}</code>
              {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              <span className="sr-only">{copied ? "Copied" : "Copy command"}</span>
            </button>
            <a
              href={getSectionUrl("docs")}
              className="text-w3-small font-medium text-w3-ink underline decoration-w3-tone-2 underline-offset-4 transition-colors hover:decoration-w3-accent"
            >
              Read the docs
            </a>
          </div>
        </div>
      </div>

      {/* The stage: a field of the logo's purple, its corner cut like one of the logo's four brackets. */}
      <div className="w3-shutter relative mt-12 h-[560px] bg-w3-accent [clip-path:polygon(72px_0,100%_0,100%_100%,0_100%,0_72px,72px_72px)] md:absolute md:bottom-0 md:left-[calc(40px+(100%-80px)*5/12)] md:right-0 md:top-[44%] md:mt-0 md:h-auto md:[clip-path:polygon(112px_0,100%_0,100%_100%,0_100%,0_112px,112px_112px)]">
        <div
          data-ui
          className="absolute left-4 top-[88px] w-[400px] md:left-14 md:top-14 md:ml-[112px] md:mt-0"
        >
          {HeroFragment && <HeroFragment />}
        </div>
      </div>
    </section>
  );
}
