import { CHAINS } from "./chains.gen";
import type { Chain, Ecosystem } from "./types";

export const ECOSYSTEM_LABELS: Record<Ecosystem, string> = {
  evm: "EVM",
  solana: "Solana",
  sui: "Sui",
  aptos: "Aptos",
};

export const MAINNETS: Chain[] = CHAINS.filter((c) => !c.testnet);

export const findChain = (chainId: number): Chain | undefined =>
  CHAINS.find((c) => c.chainId === chainId);

/** For chains the page is built around: a missing one is a registry data error, not a 404. */
export function requireChain(chainId: number): Chain {
  const chain = findChain(chainId);
  if (!chain) throw new Error(`Chain ${chainId} is missing from the registry data`);
  return chain;
}

export const chainName = (chainId: number) => findChain(chainId)?.name ?? `Chain ${chainId}`;
