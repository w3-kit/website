import { CHAINS } from "../../../entities/chain/model/chains.gen";
import type { Token } from "../../../entities/token";

export type TokenFilter = { chainId: number | null };
export const DEFAULT_TOKEN_FILTER: TokenFilter = { chainId: null };

export function applyTokenFilter(tokens: Token[], filter: TokenFilter): Token[] {
  if (filter.chainId === null) return tokens;
  return tokens.filter((t) => t.chains.some((d) => d.chainId === filter.chainId));
}

export function FilterTokens({
  value,
  onChange,
}: {
  value: TokenFilter;
  onChange: (next: TokenFilter) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-[12px] text-w3-gray-700">
      <span>Filter by chain</span>
      <select
        aria-label="Filter by chain"
        value={value.chainId ?? ""}
        onChange={(e) =>
          onChange({ chainId: e.target.value === "" ? null : Number(e.target.value) })
        }
        className="rounded border border-w3-border-subtle bg-w3-surface-elevated px-2 py-1 text-[12px]"
      >
        <option value="">All chains</option>
        {CHAINS.map((c) => (
          <option key={c.chainId} value={c.chainId}>
            {c.name}
          </option>
        ))}
      </select>
    </label>
  );
}
