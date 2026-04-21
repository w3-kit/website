import { useState, type ComponentType } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  ConnectWalletMini, TokenSwapMini, NetworkSwitcherMini,
  WalletBalanceMini, NFTCardMini, GasTrackerMini,
  ContractCallMini, ENSResolverMini, TxHistoryMini,
  StakingMini, MultisigMini, PriceTickerMini,
} from "./catalog-cards";

interface CatalogItem {
  id: string;
  name: string;
  cat: string;
  C: ComponentType;
}

const ITEMS: CatalogItem[] = [
  { id: "001", name: "ConnectWallet", cat: "wallet", C: ConnectWalletMini },
  { id: "002", name: "TokenSwap", cat: "defi", C: TokenSwapMini },
  { id: "003", name: "NetworkSwitcher", cat: "chain", C: NetworkSwitcherMini },
  { id: "004", name: "WalletBalance", cat: "wallet", C: WalletBalanceMini },
  { id: "005", name: "NFTCard", cat: "nft", C: NFTCardMini },
  { id: "006", name: "GasTracker", cat: "chain", C: GasTrackerMini },
  { id: "007", name: "ContractCall", cat: "smart", C: ContractCallMini },
  { id: "008", name: "ENSResolver", cat: "identity", C: ENSResolverMini },
  { id: "009", name: "TxHistory", cat: "wallet", C: TxHistoryMini },
  { id: "010", name: "Staking", cat: "defi", C: StakingMini },
  { id: "011", name: "Multisig", cat: "wallet", C: MultisigMini },
  { id: "012", name: "PriceTicker", cat: "market", C: PriceTickerMini },
];

const CATS = ["all", "wallet", "defi", "chain", "nft", "smart", "identity", "market"];

export function CatalogSection() {
  const [filter, setFilter] = useState("all");
  const shown = ITEMS.filter((i) => filter === "all" || i.cat === filter);

  return (
    <section className="border-b border-w3-border-subtle">
      {/* Section header */}
      <div className="flex items-end justify-between border-b border-w3-border-subtle px-10 pb-5 pt-12">
        <div>
          <div className="font-mono text-[11px] tracking-[0.1em] text-w3-gray-500">
            02 — UI / CATALOG
          </div>
          <h2 className="mt-2 text-[40px] font-medium leading-tight tracking-[-0.03em] text-w3-gray-900">
            Fifty-four components.
            <br />
            <span className="text-w3-gray-600">
              Each one does one thing,{" "}
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
      <div className="grid grid-cols-[60px_repeat(4,1fr)] auto-rows-[220px]">
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
                {/* Component preview */}
                <div className="flex-1 overflow-hidden">
                  <item.C />
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
      <div className="flex items-center justify-between border-t border-w3-border-subtle px-10 py-3.5">
        <span className="font-mono text-[11px] text-w3-gray-500">
          Showing {shown.length} of 54
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
