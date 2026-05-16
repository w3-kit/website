import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DEMOS } from "../../../shared/ui/w3-kit-demos";

interface CatalogItem {
  /** Display index ("001", …) */
  id: string;
  /** Slug from the ui registry — used to look up the real component demo. */
  slug: string;
  /** Component display name */
  name: string;
  /** Catalog category (informational chip) */
  cat: string;
  /** Render scale for the preview. Default 0.55. */
  scale?: number;
  /** Width of the inner stage in pixels at 1× before scaling. Default 380. */
  stage?: number;
}

const ITEMS: CatalogItem[] = [
  { id: "001", slug: "connect-wallet", name: "ConnectWallet", cat: "wallet", scale: 0.55, stage: 360 },
  { id: "002", slug: "token-swap", name: "TokenSwap", cat: "defi", scale: 0.5, stage: 380 },
  { id: "003", slug: "network-switcher", name: "NetworkSwitcher", cat: "chain", scale: 0.6, stage: 360 },
  { id: "004", slug: "wallet-balance", name: "WalletBalance", cat: "wallet", scale: 0.45, stage: 420 },
  { id: "005", slug: "nft-card", name: "NFTCard", cat: "nft", scale: 0.7, stage: 280 },
  { id: "006", slug: "gas-calculator", name: "GasCalculator", cat: "chain", scale: 0.6, stage: 380 },
  { id: "007", slug: "contract-interaction", name: "ContractInteraction", cat: "smart", scale: 0.6, stage: 360 },
  { id: "008", slug: "ens-resolver", name: "EnsResolver", cat: "identity", scale: 0.7, stage: 360 },
  { id: "009", slug: "transaction-history", name: "TransactionHistory", cat: "wallet", scale: 0.55, stage: 380 },
  { id: "010", slug: "staking-interface", name: "Staking", cat: "defi", scale: 0.45, stage: 440 },
  { id: "011", slug: "multisig-wallet", name: "Multisig", cat: "wallet", scale: 0.45, stage: 420 },
  { id: "012", slug: "price-ticker", name: "PriceTicker", cat: "market", scale: 0.55, stage: 380 },
];

const CATS = ["all", "wallet", "defi", "chain", "nft", "smart", "identity", "market"];

export function CatalogSection() {
  const [filter, setFilter] = useState("all");
  const shown = ITEMS.filter((i) => filter === "all" || i.cat === filter);

  return (
    <section className="border-b border-w3-border-subtle">
      {/* Section header */}
      <div className="flex items-end justify-between border-b border-w3-border-subtle px-20 pb-5 pt-12">
        <div>
          <div className="font-mono text-[11px] tracking-[0.1em] text-w3-gray-500">
            02 - UI / CATALOG
          </div>
          <h2 className="mt-2 text-[40px] font-medium leading-tight tracking-[-0.03em] text-w3-gray-900">
            Featured demos.
            <br />
            <span className="text-w3-gray-600">
              Each one previews a real component,{" "}
              <span className="font-serif-display italic text-w3-accent">well</span>.
            </span>
          </h2>
        </div>
        <div className="flex max-w-[520px] flex-wrap justify-end gap-1.5">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="rounded-full px-[11px] py-[5px] font-mono text-[11px] uppercase tracking-[0.08em] transition-colors"
              style={{
                background: filter === c ? "var(--w3-gray-900)" : "transparent",
                color: filter === c ? "var(--w3-gray-100)" : "var(--w3-gray-600)",
                border: `1px solid ${filter === c ? "var(--w3-gray-900)" : "var(--w3-border-standard)"}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid with coordinate labels */}
      <div className="grid grid-cols-[60px_repeat(4,1fr)] auto-rows-[260px]">
        {/* Column headers */}
        <div />
        {["A", "B", "C", "D"].map((c) => (
          <div
            key={c}
            className="border-b border-l border-w3-border-subtle px-4 py-2.5 font-mono text-[10px] text-w3-gray-500"
          >
            {c}
          </div>
        ))}

        {/* Cards */}
        {shown.map((item, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const showRowLabel = col === 0;
          return (
            <div key={item.id} className="contents">
              {showRowLabel && (
                <div className="flex items-start border-t border-w3-border-subtle px-4 py-3 font-mono text-[10px] text-w3-gray-500">
                  {String(row + 1).padStart(2, "0")}
                </div>
              )}
              <div className="catalog-cell group relative flex cursor-pointer flex-col border-l border-t border-w3-border-subtle bg-w3-surface transition-colors hover:bg-w3-surface-alt">
                {/* ID badge */}
                <div className="absolute right-3 top-2.5 z-[2] font-mono text-[9px] text-w3-gray-500">
                  {item.id}
                </div>
                {/* Component preview — real component, scaled to fit */}
                <div className="pointer-events-none relative flex-1 select-none overflow-hidden">
                  <div
                    className="absolute left-1/2 top-3 origin-top"
                    style={{
                      transform: `translateX(-50%) scale(${item.scale ?? 0.55})`,
                      width: item.stage ?? 380,
                    }}
                  >
                    {(() => {
                      const Demo = DEMOS[item.slug];
                      return Demo ? <Demo /> : null;
                    })()}
                  </div>
                  {/* Soft fade so cropping reads as deliberate */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-w3-surface to-transparent group-hover:from-w3-surface-alt" />
                </div>
                {/* Name bar */}
                <div className="relative z-[2] flex items-center justify-between border-t border-w3-border-subtle bg-w3-gray-100 px-3.5 py-2">
                  <div>
                    <div className="text-xs font-medium transition-colors group-hover:text-w3-accent">
                      {item.name}
                    </div>
                    <div className="font-mono text-[10px] text-w3-gray-500">{item.cat}</div>
                  </div>
                  <ArrowUpRight
                    size={13}
                    className="text-w3-gray-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-w3-accent"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Fill remaining cells with hatched pattern */}
        {Array.from({ length: Math.max(0, 4 - ((shown.length % 4) || 4)) }).map((_, i) => (
          <div
            key={`pad-${i}`}
            className="border-l border-t border-w3-border-subtle"
            style={{
              background: "repeating-linear-gradient(45deg, transparent 0 12px, var(--w3-grid-line) 12px 13px)",
            }}
          />
        ))}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-t border-w3-border-subtle px-20 py-3.5">
        <span className="font-mono text-[11px] text-w3-gray-500">
          Showing {shown.length} featured demos
        </span>
        <a
          href="/ui"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-w3-accent"
        >
          Browse all components <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
