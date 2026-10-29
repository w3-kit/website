import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy } from "lucide-react";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { PROGRAMS } from "../../../entities/program/model/programs.gen";
import { ChainRows, ProgramRows, TokenRows } from "../../../widgets/registry-rows";
import { RegistryPageHead } from "../../../widgets/registry-page-head";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";

const INSTALL = "npm install @w3-kit/registry";
const PREVIEW_ROWS = 6;
const mainnets = CHAINS.filter((c) => !c.testnet);

export function RegistryHomePage() {
  const [copied, copy] = useCopyToClipboard(INSTALL);

  return (
    <>
      <RegistryPageHead title="Every address," subtitle="typed and checked.">
        <p className="text-w3-body">
          {CHAINS.length} chains, {TOKENS.length} tokens and {PROGRAMS.length} Solana programs, with
          the IDs, RPCs and contract addresses your app needs. Browse them here or import them.
        </p>
        <button
          type="button"
          onClick={copy}
          className="w3-press inline-flex h-12 items-center gap-3 bg-w3-accent px-5 text-w3-on-accent hover:bg-w3-accent-hover"
        >
          <code className="text-[15px]">{INSTALL}</code>
          {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          <span className="sr-only">{copied ? "Copied" : "Copy command"}</span>
        </button>
      </RegistryPageHead>

      <Block title="Chains" count={CHAINS.length} to="/registry/chains">
        <ChainRows chains={mainnets.slice(0, PREVIEW_ROWS)} />
      </Block>
      <Block title="Tokens" count={TOKENS.length} to="/registry/tokens">
        <TokenRows tokens={TOKENS.slice(0, PREVIEW_ROWS)} />
      </Block>
      <Block title="Solana programs" count={PROGRAMS.length} to="/registry/programs">
        <ProgramRows programs={PROGRAMS.slice(0, PREVIEW_ROWS)} />
      </Block>
    </>
  );
}

function Block({
  title,
  count,
  to,
  children,
}: {
  title: string;
  count: number;
  to: "/registry/chains" | "/registry/tokens" | "/registry/programs";
  children: React.ReactNode;
}) {
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section aria-labelledby={id} className="pb-20 md:pb-28">
      <div className="mb-6 flex items-end justify-between gap-6">
        <h2 id={id} className="text-w3-statement font-medium">
          {title}
        </h2>
        <Link
          to={to}
          className="group inline-flex items-center gap-2 text-w3-small font-medium text-w3-accent"
        >
          All {count}
          <ArrowRight
            size={16}
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
      {children}
    </section>
  );
}
