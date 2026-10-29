import { useState } from "react";
import { TOKENS } from "../../../entities/token";
import {
  FilterTokens,
  applyTokenFilter,
  DEFAULT_TOKEN_FILTER,
  type TokenFilter,
} from "../../../features/filter-tokens";
import { TokenRows } from "../../../widgets/registry-rows";
import { RegistryPageHead } from "../../../widgets/registry-page-head";

export function TokensListPage() {
  const [filter, setFilter] = useState<TokenFilter>(DEFAULT_TOKEN_FILTER);
  const filtered = applyTokenFilter(TOKENS, filter);

  return (
    <>
      <RegistryPageHead title="Tokens" subtitle={`${filtered.length} of ${TOKENS.length} shown`}>
        <p className="text-w3-body">Each token's address on every chain it lives on.</p>
      </RegistryPageHead>
      <div className="mb-6">
        <FilterTokens value={filter} onChange={setFilter} />
      </div>
      <TokenRows tokens={filtered} />
    </>
  );
}
