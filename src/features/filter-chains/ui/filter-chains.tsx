import type { Chain, Ecosystem } from "../../../entities/chain";

export type EcosystemFilter = "all" | Ecosystem;
export type ChainFilter = { ecosystem: EcosystemFilter; includeTestnets: boolean };

export const DEFAULT_CHAIN_FILTER: ChainFilter = {
  ecosystem: "all",
  includeTestnets: false,
};

export function applyChainFilter(chains: Chain[], filter: ChainFilter): Chain[] {
  return chains.filter((c) => {
    if (filter.ecosystem !== "all" && c.ecosystem !== filter.ecosystem) return false;
    if (!filter.includeTestnets && c.testnet) return false;
    return true;
  });
}

const OPTIONS: { value: EcosystemFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "evm", label: "EVM" },
  { value: "solana", label: "Solana" },
];

export function FilterChains({
  value,
  onChange,
}: {
  value: ChainFilter;
  onChange: (next: ChainFilter) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex gap-2">
        {OPTIONS.map((opt) => {
          const active = value.ecosystem === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...value, ecosystem: opt.value })}
              className={`rounded-full px-3 py-1 text-[12px] transition-colors ${
                active
                  ? "bg-w3-gray-900 text-w3-gray-100"
                  : "border border-w3-border-subtle text-w3-gray-700 hover:border-w3-accent"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <label className="flex items-center gap-1.5 text-[12px] text-w3-gray-700">
        <input
          type="checkbox"
          checked={value.includeTestnets}
          onChange={(e) => onChange({ ...value, includeTestnets: e.target.checked })}
        />
        Include testnets
      </label>
    </div>
  );
}
