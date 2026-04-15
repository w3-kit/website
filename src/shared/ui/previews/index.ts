// Barrel file – re-exports every live-preview component from its canonical
// location inside the landing page so that both the landing page AND the
// UI detail pages can import from a single shared path.
//
// IMPORTANT: no files were moved.  This module only re-exports.

// ── Components ──────────────────────────────────────────────────────────
export { ConnectWalletButton } from "../../../pages/landing/ui/connect-wallet/connect-wallet";
export { NetworkSwitcher } from "../../../pages/landing/ui/network-switcher/network-switcher";
export { WalletBalance } from "../../../pages/landing/ui/wallet-balance/wallet-balance";
export { TokenSwapWidget } from "../../../pages/landing/ui/token-swap/token-swap";
export { SmartContractScanner } from "../../../pages/landing/ui/smart-contract-scanner/smart-contract-scanner";
export { NFTCard } from "../../../pages/landing/ui/nft-card/nft-card";

// ── Types ───────────────────────────────────────────────────────────────
// connect-wallet
export type {
  ConnectWalletButtonProps,
  ButtonVariant,
  WalletType,
} from "../../../pages/landing/ui/connect-wallet/types";

// network-switcher
export type {
  Network,
  NetworkSwitcherProps,
} from "../../../pages/landing/ui/network-switcher/types";

// wallet-balance  (Token is re-exported with an alias to avoid collision
// with the token-swap Token type)
export type {
  Token as WalletBalanceToken,
  WalletBalanceProps,
  SortOption,
} from "../../../pages/landing/ui/wallet-balance/types";

// token-swap
export type {
  Token as TokenSwapToken,
  TokenSwapWidgetProps,
} from "../../../pages/landing/ui/token-swap/types";

// smart-contract-scanner
export type {
  ContractInfo,
  ContractFunction,
  SecurityCheck,
  SmartContractScannerProps,
} from "../../../pages/landing/ui/smart-contract-scanner/types";
export { ContractError } from "../../../pages/landing/ui/smart-contract-scanner/types";

// nft-card
export type {
  NFT,
  NFTCardProps,
} from "../../../pages/landing/ui/nft-card/types";

// ── Constant: which component IDs ship with a live preview ──────────────
export const PREVIEW_COMPONENT_IDS = [
  "connect-wallet",
  "network-switcher",
  "wallet-balance",
  "token-swap",
  "smart-contract-scanner",
  "nft-card",
] as const;

export type PreviewComponentId = (typeof PREVIEW_COMPONENT_IDS)[number];
