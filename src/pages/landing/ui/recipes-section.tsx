const RECIPES = [
  { t: "5 min", title: "Connect a wallet", desc: "Drop in <ConnectWallet />, done.", code: "npx w3-kit add connect-wallet" },
  { t: "8 min", title: "Show token balances", desc: "Multi-chain, typed, with USD conversion.", code: "npx w3-kit add wallet-balance" },
  { t: "12 min", title: "Swap tokens via 1inch", desc: "Production-ready aggregator UI.", code: "npx w3-kit add token-swap" },
  { t: "15 min", title: "Mint an NFT", desc: "Preview, pay, confirm — three components.", code: "npx w3-kit add nft-mint" },
];

export function RecipesSection() {
  return (
    <section className="border-b border-w3-border-subtle px-10 py-16">
      <div className="mb-8">
        <div className="font-mono text-[11px] text-w3-gray-500">05 — RECIPES</div>
        <h2 className="mt-2 text-[32px] font-medium leading-tight tracking-[-0.03em]">
          Build in the time it takes
          <br />
          <span className="text-w3-gray-600">
            to brew{" "}
            <span className="font-serif-display italic text-w3-accent">a coffee.</span>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-4 border border-w3-border-subtle">
        {RECIPES.map((r, i) => (
          <div
            key={i}
            className="group flex min-h-[240px] cursor-pointer flex-col gap-4 p-6 transition-colors hover:bg-w3-surface-alt"
            style={{ borderLeft: i > 0 ? "1px solid var(--w3-border-subtle)" : "none" }}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-w3-accent-wash px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-w3-accent">
                ~{r.t}
              </span>
              <span className="font-mono text-[10px] text-w3-gray-500">0{i + 1}</span>
            </div>
            <h3 className="m-0 text-lg font-medium tracking-[-0.01em]">{r.title}</h3>
            <p className="m-0 flex-1 text-[13px] leading-relaxed text-w3-gray-600">{r.desc}</p>
            <div className="rounded bg-w3-surface-alt px-2.5 py-2 font-mono text-[11px] text-w3-gray-800 transition-colors group-hover:bg-w3-gray-900 group-hover:text-w3-gray-100">
              <span className="text-w3-gray-500 group-hover:text-w3-gray-600">$ </span>
              {r.code}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
