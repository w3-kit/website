import { useState } from "react";
import { CHAINS } from "../../../entities/chain";
import {
  FilterChains,
  applyChainFilter,
  DEFAULT_CHAIN_FILTER,
  type ChainFilter,
} from "../../../features/filter-chains";
import { ChainRows } from "../../../widgets/registry-rows";
import { RegistryPageHead } from "../../../widgets/registry-page-head";

export function ChainsListPage() {
  const [filter, setFilter] = useState<ChainFilter>(DEFAULT_CHAIN_FILTER);
  const filtered = applyChainFilter(CHAINS, filter);

  return (
    <>
      <RegistryPageHead title="Chains" subtitle={`${filtered.length} of ${CHAINS.length} shown`}>
        <p className="text-w3-body">
          Chain IDs, native tokens, RPCs and explorers for each network.
        </p>
      </RegistryPageHead>
      <div className="mb-6">
        <FilterChains value={filter} onChange={setFilter} />
      </div>
      <ChainRows chains={filtered} />
    </>
  );
}
