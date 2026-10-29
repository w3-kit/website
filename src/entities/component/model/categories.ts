import type { ComponentCategory } from "./types";

/** The catalog's categories, in display order. */
export const COMPONENT_CATEGORIES: { value: ComponentCategory; label: string }[] = [
  { value: "wallet", label: "Wallet" },
  { value: "defi", label: "DeFi" },
  { value: "nft", label: "NFT" },
  { value: "data", label: "Data" },
  { value: "utility", label: "Utility" },
];

export const isComponentCategory = (value: unknown): value is ComponentCategory =>
  COMPONENT_CATEGORIES.some((c) => c.value === value);
