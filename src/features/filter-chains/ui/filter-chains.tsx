import { ECOSYSTEM_LABELS, type Chain, type Ecosystem } from "../../../entities/chain";

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
  { value: "evm", label: ECOSYSTEM_LABELS.evm },
  { value: "solana", label: ECOSYSTEM_LABELS.solana },
];

export function FilterChains({
  value,
  onChange,
}: {
  value: ChainFilter;
  onChange: (next: ChainFilter) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex gap-1">
        {OPTIONS.map((opt) => {
          const active = value.ecosystem === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...value, ecosystem: opt.value })}
              aria-pressed={active}
              className={`h-11 px-4 text-w3-small font-medium transition-colors ${
                active ? "bg-w3-ink text-w3-ground" : "bg-w3-tone text-w3-ink hover:bg-w3-tone-2"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-w3-small text-w3-ink">
        <input
          type="checkbox"
          className="h-4 w-4 accent-[var(--w3-accent)]"
          checked={value.includeTestnets}
          onChange={(e) => onChange({ ...value, includeTestnets: e.target.checked })}
        />
        Include testnets
      </label>
    </div>
  );
}
