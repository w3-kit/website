import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { PROGRAMS } from "../../../entities/program/model/programs.gen";

const FEATURED_CHAINS = [1, 8453, 101];
const FEATURED_TOKENS = ["USDC", "USDT", "WETH"];

export function RegistryHomePage() {
  const featuredChains = FEATURED_CHAINS.map((id) =>
    CHAINS.find((c) => c.chainId === id),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const featuredTokens = FEATURED_TOKENS.map((s) => TOKENS.find((t) => t.symbol === s)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-[40px] font-medium leading-tight tracking-[-0.03em]">Registry</h1>
      <p className="mt-2 max-w-prose text-w3-gray-600">
        Browse the chains, tokens, and Solana programs that ship with{" "}
        <code className="font-mono text-[13px]">@w3-kit/registry</code>.
      </p>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <a
          href="/registry/chains"
          className="rounded-xl border border-w3-border-subtle p-5 transition-colors hover:border-w3-accent"
        >
          <div className="text-3xl font-medium">{CHAINS.length} chains</div>
          <div className="mt-1 text-sm text-w3-gray-600">EVM and Solana</div>
        </a>
        <a
          href="/registry/tokens"
          className="rounded-xl border border-w3-border-subtle p-5 transition-colors hover:border-w3-accent"
        >
          <div className="text-3xl font-medium">{TOKENS.length} tokens</div>
          <div className="mt-1 text-sm text-w3-gray-600">Stablecoins, blue chips, more</div>
        </a>
        <a
          href="/registry/programs"
          className="rounded-xl border border-w3-border-subtle p-5 transition-colors hover:border-w3-accent"
        >
          <div className="text-3xl font-medium">{PROGRAMS.length} Solana programs</div>
          <div className="mt-1 text-sm text-w3-gray-600">System, SPL, more</div>
        </a>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          Featured chains
        </h2>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {featuredChains.map((c) => (
            <li key={c.chainId}>
              <a
                href={`/registry/chains/${c.chainId}`}
                className="block rounded-lg border border-w3-border-subtle px-4 py-3 hover:border-w3-accent"
              >
                <div className="text-sm font-medium">{c.name}</div>
                <div className="font-mono text-[11px] text-w3-gray-500">chainId {c.chainId}</div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          Featured tokens
        </h2>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {featuredTokens.map((t) => (
            <li key={t.symbol}>
              <a
                href={`/registry/tokens/${t.symbol}`}
                className="block rounded-lg border border-w3-border-subtle px-4 py-3 hover:border-w3-accent"
              >
                <div className="text-sm font-medium">{t.symbol}</div>
                <div className="text-[12px] text-w3-gray-500">{t.name}</div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
