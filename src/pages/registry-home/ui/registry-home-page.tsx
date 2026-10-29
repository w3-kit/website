import { REGISTRY_INSTALL_COMMAND } from "../../../shared/lib/commands";
import { CopyCommand } from "../../../features/copy-address";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CHAINS, MAINNETS } from "../../../entities/chain";
import { TOKENS } from "../../../entities/token";
import { PROGRAMS } from "../../../entities/program";
import { ChainRows, ProgramRows, TokenRows } from "../../../widgets/registry-rows";
import { RegistryPageHead } from "../../../widgets/registry-page-head";

const PREVIEW_ROWS = 6;

export function RegistryHomePage() {
  return (
    <>
      <RegistryPageHead title="Every address," subtitle="typed and checked.">
        <p className="text-w3-body">
          {CHAINS.length} chains, {TOKENS.length} tokens and {PROGRAMS.length} Solana programs, with
          the IDs, RPCs and contract addresses your app needs. Browse them here or import them.
        </p>
        <CopyCommand command={REGISTRY_INSTALL_COMMAND} />
      </RegistryPageHead>

      <Block title="Chains" count={CHAINS.length} to="/registry/chains">
        <ChainRows chains={MAINNETS.slice(0, PREVIEW_ROWS)} />
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
