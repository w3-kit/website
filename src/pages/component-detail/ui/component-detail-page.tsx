import { useParams } from "@tanstack/react-router";
import { UiShell } from "../../../widgets/ui-shell";
import { getSectionUrl } from "../../../shared/lib/urls";
import {
  componentRegistry,
  useComponent,
  type ComponentCategory,
} from "../../../entities/component";
import {
  ConnectWalletPreview,
  NetworkSwitcherPreview,
  WalletBalancePreview,
  TokenSwapPreview,
  SmartContractScannerPreview,
  NFTCardPreview,
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
import { ComponentHeader } from "./component-header";
import { ComponentPreview } from "./component-preview";
import { PropsTable } from "./props-table";
import { QuickInfo } from "./quick-info";
import { DOC_PAGES, DOC_PAGE_IDS } from "./doc-pages";

// Group components by category for sidebar
const categoryLabels: Record<ComponentCategory, string> = {
  wallet: "Wallet",
  defi: "DeFi",
  nft: "NFT",
  data: "Data",
  utility: "Utility",
};

const sidebarSections = (Object.keys(categoryLabels) as ComponentCategory[]).map((cat) => ({
  title: categoryLabels[cat],
  items: componentRegistry
    .filter((c) => c.category === cat)
    .map((c) => ({ label: c.name, id: c.id })),
}));

const docPageIds = new Set<string>(DOC_PAGE_IDS);

/** Map every component ID to its live preview JSX */
function getPreviewContent(id: string): React.ReactNode | null {
  switch (id) {
    // Wallet
    case "connect-wallet":
      return <ConnectWalletPreview />;
    case "network-switcher":
      return <NetworkSwitcherPreview />;
    case "wallet-balance":
      return <WalletBalancePreview />;
    case "address-book":
      return <AddressBookPreview />;
    case "multisig-wallet":
      return <MultisigWalletPreview />;
    // DeFi
    case "token-swap":
      return <TokenSwapPreview />;
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
    // NFT
    case "nft-card":
      return <NFTCardPreview />;
    case "nft-collection-grid":
      return <NFTCollectionPreview />;
    case "nft-marketplace-aggregator":
      return <NFTMarketplacePreview />;
    // Data
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
    // Utility
    case "smart-contract-scanner":
      return <SmartContractScannerPreview />;
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

function SidebarLink({ label, id, active }: { label: string; id: string; active: boolean }) {
  return (
    <a
      href={`${getSectionUrl("ui")}/${id}`}
      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all"
      style={{
        color: active ? "var(--w3-gray-900)" : "var(--w3-gray-600)",
        background: active ? "var(--w3-surface-elevated)" : "transparent",
        fontWeight: active ? 500 : 400,
      }}
    >
      <span
        className="h-4 w-0.5 shrink-0 rounded-full transition-all"
        style={{
          background: active ? "var(--w3-accent)" : "transparent",
        }}
      />
      {label}
    </a>
  );
}

function Sidebar({ activeId }: { activeId: string }) {
  return (
    <aside className="hidden w-56 shrink-0 overflow-y-auto md:block">
      <div className="flex flex-col gap-5 py-8 pr-2">
        {/* Getting Started */}
        <div className="flex flex-col gap-1">
          <span
            className="px-3 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--w3-gray-500)" }}
          >
            Getting Started
          </span>
          <SidebarLink
            label="Introduction"
            id="introduction"
            active={activeId === "introduction"}
          />
          <SidebarLink
            label="Installation"
            id="installation"
            active={activeId === "installation"}
          />
          <SidebarLink label="Usage" id="usage" active={activeId === "usage"} />
          <SidebarLink label="Theming" id="theming" active={activeId === "theming"} />
          <SidebarLink label="Dark Mode" id="dark-mode" active={activeId === "dark-mode"} />
        </div>

        {/* CLI */}
        <div className="flex flex-col gap-1">
          <span
            className="px-3 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--w3-gray-500)" }}
          >
            CLI
          </span>
          <SidebarLink label="w3-kit init" id="cli-init" active={activeId === "cli-init"} />
          <SidebarLink label="w3-kit add" id="cli-add" active={activeId === "cli-add"} />
        </div>

        {/* Integrations */}
        <div className="flex flex-col gap-1">
          <span
            className="px-3 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--w3-gray-500)" }}
          >
            Integrations
          </span>
          <SidebarLink label="MCP Server" id="mcp" active={activeId === "mcp"} />
          <SidebarLink label="shadcn Registry" id="shadcn" active={activeId === "shadcn"} />
          <SidebarLink label="Figma" id="figma" active={activeId === "figma"} />
        </div>

        {/* Separator */}
        <div className="mx-3" style={{ borderTop: "1px solid var(--w3-border-subtle)" }} />

        {/* Components */}
        <div className="flex flex-col gap-1">
          <a
            href={getSectionUrl("ui")}
            className="px-3 text-[10px] font-semibold uppercase tracking-wider transition-colors hover:underline"
            style={{ color: "var(--w3-gray-500)" }}
          >
            Components
          </a>
        </div>

        {sidebarSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <span
              className="px-3 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--w3-gray-500)" }}
            >
              {section.title}
            </span>
            {section.items.map((item) => (
              <SidebarLink
                key={item.id}
                label={item.label}
                id={item.id}
                active={activeId === item.id}
              />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

export function ComponentDetailPage() {
  const { componentId } = useParams({ strict: false });
  const slug = componentId ?? "";

  // Check if this is a documentation page
  const isDocPage = docPageIds.has(slug);

  if (isDocPage) {
    const DocPageComponent = DOC_PAGES[slug as keyof typeof DOC_PAGES];
    return (
      <UiShell>
        <div className="mx-auto flex h-[calc(100vh-57px)] max-w-[1200px] gap-0 px-6 md:px-8 lg:px-16">
          {/* Left sidebar */}
          <Sidebar activeId={slug} />

          {/* Main content — wider since no right sidebar */}
          <main
            className="min-w-0 flex-1 overflow-y-auto py-8 md:border-l md:px-10"
            style={{ borderColor: "var(--w3-border-subtle)" }}
          >
            <DocPageComponent />
          </main>
        </div>
      </UiShell>
    );
  }

  // Existing component detail logic
  const component = useComponent(slug);

  if (!component) {
    return (
      <UiShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-semibold" style={{ color: "var(--w3-gray-900)" }}>
              Component Not Found
            </h1>
            <p className="mb-6 text-sm" style={{ color: "var(--w3-gray-600)" }}>
              The component &ldquo;{slug}&rdquo; doesn&apos;t exist.
            </p>
            <a
              href={getSectionUrl("ui")}
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: "var(--w3-accent)" }}
            >
              Back to all components
            </a>
          </div>
        </div>
      </UiShell>
    );
  }

  const preview = getPreviewContent(component.id);

  return (
    <UiShell>
      <div className="mx-auto flex h-[calc(100vh-57px)] max-w-[1200px] gap-0 px-6 md:px-8 lg:px-16">
        {/* Left sidebar */}
        <Sidebar activeId={slug} />

        {/* Main content */}
        <main
          className="min-w-0 flex-1 overflow-y-auto py-8 md:border-l md:px-10"
          style={{ borderColor: "var(--w3-border-subtle)" }}
        >
          <ComponentHeader component={component} />
          <ComponentPreview component={component}>{preview}</ComponentPreview>
          <PropsTable props={component.props} />
        </main>

        {/* Right sidebar — quick info */}
        <aside
          className="hidden w-44 shrink-0 overflow-y-auto border-l xl:block"
          style={{ borderColor: "var(--w3-border-subtle)" }}
        >
          <div className="pl-8">
            <QuickInfo component={component} />
          </div>
        </aside>
      </div>
    </UiShell>
  );
}
