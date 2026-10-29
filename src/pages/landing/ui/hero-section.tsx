import { INIT_COMMAND } from "../../../shared/lib/commands";
import { CopyCommand } from "../../../features/copy-address";
import { CHAINS } from "../../../entities/chain";
import { TOKENS } from "../../../entities/token";
import { DEMOS } from "../../../shared/ui/w3-kit-demos";
import { getSectionUrl } from "../../../shared/lib/urls";

const HeroFragment = DEMOS["token-swap"];

export function HeroSection() {
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
            <CopyCommand command={INIT_COMMAND} />
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
