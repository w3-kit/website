import { useState } from "react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";
import { Badge } from "../../../shared/ui/badge";
import { componentRegistry } from "../../../entities/component";
import type { ComponentCategory } from "../../../entities/component";
import {
  ConnectWalletButton,
  NetworkSwitcher,
  WalletBalance,
  TokenSwapWidget,
  SmartContractScanner,
  NFTCard,
  AddressBookPreview,
  MultisigWalletPreview,
  StakingInterfacePreview,
  BridgePreview,
  DefiPositionPreview,
  FlashLoanPreview,
  LimitOrderPreview,
  LiquidityPoolPreview,
  NFTCollectionPreview,
  NFTMarketplacePreview,
  AssetPortfolioPreview,
  PriceTickerPreview,
  TokenCardPreview,
  TokenListPreview,
  TransactionHistoryPreview,
  ContractInteractionPreview,
  ENSResolverPreview,
  GasCalculatorPreview,
  SubscriptionPreview,
  TokenAirdropPreview,
  TokenVestingPreview,
} from "../../../shared/ui/previews";
import {
  DEMO_NETWORKS,
  DEMO_BALANCE_TOKENS,
  DEMO_NFT,
} from "../../../shared/ui/previews/demo-data";

const categories: { label: string; value: ComponentCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Wallet", value: "wallet" },
  { label: "DeFi", value: "defi" },
  { label: "NFT", value: "nft" },
  { label: "Data", value: "data" },
  { label: "Utility", value: "utility" },
];

const categoryLabels: Record<ComponentCategory, string> = {
  wallet: "Wallet",
  defi: "DeFi",
  nft: "NFT",
  data: "Data",
  utility: "Utility",
};

function getPreview(id: string): React.ReactNode {
  switch (id) {
    case "connect-wallet":
      return <ConnectWalletButton className="w-full" />;
    case "network-switcher":
      return <NetworkSwitcher networks={DEMO_NETWORKS} testNetworks={[]} onSwitch={() => {}} />;
    case "wallet-balance":
      return <WalletBalance tokens={DEMO_BALANCE_TOKENS} variant="compact" />;
    case "address-book":
      return <AddressBookPreview />;
    case "multisig-wallet":
      return <MultisigWalletPreview />;
    case "token-swap":
      return <TokenSwapWidget onSwap={async () => {}} />;
    case "staking-interface":
      return <StakingInterfacePreview />;
    case "bridge":
      return <BridgePreview />;
    case "defi-position-manager":
      return <DefiPositionPreview />;
    case "flash-loan-executor":
      return <FlashLoanPreview />;
    case "limit-order-manager":
      return <LimitOrderPreview />;
    case "liquidity-pool-stats":
      return <LiquidityPoolPreview />;
    case "nft-card":
      return <NFTCard nft={DEMO_NFT} variant="default" />;
    case "nft-collection-grid":
      return <NFTCollectionPreview />;
    case "nft-marketplace-aggregator":
      return <NFTMarketplacePreview />;
    case "asset-portfolio":
      return <AssetPortfolioPreview />;
    case "price-ticker":
      return <PriceTickerPreview />;
    case "token-card":
      return <TokenCardPreview />;
    case "token-list":
      return <TokenListPreview />;
    case "transaction-history":
      return <TransactionHistoryPreview />;
    case "smart-contract-scanner":
      return <SmartContractScanner variant="compact" />;
    case "contract-interaction":
      return <ContractInteractionPreview />;
    case "ens-resolver":
      return <ENSResolverPreview />;
    case "gas-calculator":
      return <GasCalculatorPreview />;
    case "subscription-payments":
      return <SubscriptionPreview />;
    case "token-airdrop":
      return <TokenAirdropPreview />;
    case "token-vesting":
      return <TokenVestingPreview />;
    default:
      return null;
  }
}

export function UiComponentGrid() {
  const [active, setActive] = useState<ComponentCategory | "all">("all");
  const gridRef = useScrollReveal({ stagger: 0.06, y: 30 });

  const filtered =
    active === "all"
      ? componentRegistry
      : componentRegistry.filter((c) => c.category === active);

  return (
    <SectionContainer>
      <div id="components" className="scroll-mt-20 pb-24">
        {/* Section header */}
        <div className="mb-8">
          <h2
            className="mb-2 text-2xl font-semibold tracking-tight"
            style={{ color: "var(--w3-gray-900)" }}
          >
            Components
          </h2>
          <p className="text-sm" style={{ color: "var(--w3-gray-600)" }}>
            {componentRegistry.length} interactive web3 components. Click to explore.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all"
              style={{
                background:
                  active === cat.value
                    ? "var(--w3-accent)"
                    : "var(--w3-surface-elevated)",
                color:
                  active === cat.value ? "#fff" : "var(--w3-gray-700)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live preview grid */}
        <div
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((component) => (
            <a
              key={component.id}
              href={`${getSectionUrl("ui")}/${component.id}`}
              data-reveal
              className="group flex flex-col overflow-hidden rounded-xl transition-all hover:translate-y-[-2px]"
              style={{
                background: "var(--w3-glass-bg)",
                border: "1px solid var(--w3-glass-border)",
                boxShadow: "var(--w3-glass-shadow)",
              }}
            >
              {/* Live preview area */}
              <div
                className="pointer-events-none max-h-[260px] overflow-hidden p-3"
                style={{ background: "var(--w3-glass-inner-bg)" }}
              >
                <div className="origin-top-left scale-[0.85]">
                  {getPreview(component.id)}
                </div>
              </div>

              {/* Info bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: "1px solid var(--w3-border-subtle)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--w3-gray-900)" }}
                  >
                    {component.name}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {categoryLabels[component.category]}
                  </Badge>
                </div>
                <span
                  className="text-xs transition-colors group-hover:underline"
                  style={{ color: "var(--w3-accent)" }}
                >
                  View →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
