import { TOKENS } from "./tokens.gen";
import type { Token } from "./types";

/** For tokens the page is built around: a missing one is a registry data error, not a 404. */
export function requireToken(symbol: string): Token {
  const token = TOKENS.find((t) => t.symbol === symbol);
  if (!token) throw new Error(`Token ${symbol} is missing from the registry data`);
  return token;
}

export const tokensOnChain = (chainId: number): Token[] =>
  TOKENS.filter((t) => t.chains.some((d) => d.chainId === chainId));

export const addressOn = (token: Token, chainId: number) =>
  token.chains.find((d) => d.chainId === chainId)?.address;

export const chainCountLabel = (token: Token) =>
  `${token.chains.length} ${token.chains.length === 1 ? "chain" : "chains"}`;
