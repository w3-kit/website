import { useState } from "react";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import {
  FilterTokens,
  applyTokenFilter,
  DEFAULT_TOKEN_FILTER,
  type TokenFilter,
} from "../../../features/filter-tokens";

export function TokensListPage() {
  const [filter, setFilter] = useState<TokenFilter>(DEFAULT_TOKEN_FILTER);
  const filtered = applyTokenFilter(TOKENS, filter);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-[32px] font-medium leading-tight tracking-[-0.03em]">Tokens</h1>
      <p className="mt-2 text-w3-gray-600">
        {filtered.length} of {TOKENS.length} tokens.
      </p>

      <div className="mt-6">
        <FilterTokens value={filter} onChange={setFilter} />
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((t) => (
          <li key={t.symbol}>
            <a
              href={`/registry/tokens/${t.symbol}`}
              className="flex items-center justify-between rounded-lg border border-w3-border-subtle p-4 transition-colors hover:border-w3-accent"
            >
              <div>
                <div className="text-sm font-medium">{t.symbol}</div>
                <div className="mt-0.5 text-[12px] text-w3-gray-500">{t.name}</div>
              </div>
              <span className="font-mono text-[11px] text-w3-gray-500">
                {t.chains.length} chains
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
