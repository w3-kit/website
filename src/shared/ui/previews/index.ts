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

// ── Preview components (self-contained with mock data) ──────────────────
export { LiquidityPoolPreview } from "./liquidity-pool-preview";
export { NFTCollectionPreview } from "./nft-collection-preview";
export { NFTMarketplacePreview } from "./nft-marketplace-preview";
export { AssetPortfolioPreview } from "./asset-portfolio-preview";
export { PriceTickerPreview } from "./price-ticker-preview";
export { TokenCardPreview } from "./token-card-preview";
export { TokenListPreview } from "./token-list-preview";
export { AddressBookPreview } from "./address-book-preview";
export { MultisigWalletPreview } from "./multisig-wallet-preview";
export { StakingInterfacePreview } from "./staking-interface-preview";
export { BridgePreview } from "./bridge-preview";
export { DefiPositionPreview } from "./defi-position-preview";
export { FlashLoanPreview } from "./flash-loan-preview";
export { LimitOrderPreview } from "./limit-order-preview";
export { TransactionHistoryPreview } from "./transaction-history-preview";
export { ContractInteractionPreview } from "./contract-interaction-preview";
export { ENSResolverPreview } from "./ens-resolver-preview";
export { GasCalculatorPreview } from "./gas-calculator-preview";
export { SubscriptionPreview } from "./subscription-preview";
export { TokenAirdropPreview } from "./token-airdrop-preview";
export { TokenVestingPreview } from "./token-vesting-preview";

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
  "liquidity-pool-stats",
  "nft-collection-grid",
  "nft-marketplace-aggregator",
  "asset-portfolio",
  "price-ticker",
  "token-card",
  "token-list",
  "address-book",
  "multisig-wallet",
  "staking-interface",
  "bridge",
  "defi-position-manager",
  "flash-loan-executor",
  "limit-order-manager",
  "transaction-history",
  "contract-interaction",
  "ens-resolver",
  "gas-calculator",
  "subscription-payments",
  "token-airdrop",
  "token-vesting",
] as const;

export type PreviewComponentId = (typeof PREVIEW_COMPONENT_IDS)[number];
