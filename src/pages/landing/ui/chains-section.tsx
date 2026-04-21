import { ChainMark, TokenMark } from "./catalog-cards";

const CHAINS = ["ETH", "BASE", "ARB", "OP", "POLY", "SOL", "AVAX", "BNB", "LINEA", "ZK"];
const TOKENS = ["USDC", "USDT", "DAI", "WETH", "WBTC", "LINK", "UNI", "AAVE", "ARB", "OP"];

export function ChainsSection() {
  return (
    <section className="grid grid-cols-[200px_1fr] items-center gap-10 border-b border-w3-border-subtle px-10 py-9">
      <div>
        <div className="font-mono text-[11px] text-w3-gray-500">03 — REGISTRY</div>
        <div className="mt-1 text-lg font-medium">
          Ships with every
          <br />
          chain you care about.
        </div>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-12 font-mono text-[10px] text-w3-gray-500">CHAINS</span>
          {CHAINS.map((c) => (
            <ChainMark key={c} k={c} size={28} />
          ))}
          <span className="font-mono text-[10px] text-w3-gray-500">+4 more</span>
        </div>
        <div className="mt-3.5 flex flex-wrap items-center gap-3">
          <span className="w-12 font-mono text-[10px] text-w3-gray-500">TOKENS</span>
          {TOKENS.map((t) => (
            <TokenMark key={t} k={t} size={28} />
          ))}
          <span className="font-mono text-[10px] text-w3-gray-500">+8 more</span>
        </div>
      </div>
    </section>
  );
}
