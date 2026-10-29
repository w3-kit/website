import { CHAINS } from "../../../entities/chain";
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
    <label className="flex items-center gap-3 text-w3-small text-w3-ink">
      <span>Filter by chain</span>
      <select
        aria-label="Filter by chain"
        value={value.chainId ?? ""}
        onChange={(e) =>
          onChange({ chainId: e.target.value === "" ? null : Number(e.target.value) })
        }
        className="h-11 bg-w3-tone px-3 text-w3-small text-w3-ink"
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
