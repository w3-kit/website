import { useParams } from "@tanstack/react-router";
import { UiShell } from "../../../widgets/ui-shell";
import { getSectionUrl } from "../../../shared/lib/urls";
import {
  componentRegistry,
  useComponent,
  type ComponentCategory,
} from "../../../entities/component";
import {
  ConnectWalletButton,
  NetworkSwitcher,
  WalletBalance,
  TokenSwapWidget,
  SmartContractScanner,
  NFTCard,
} from "../../../shared/ui/previews";
import {
  DEMO_NETWORKS,
  DEMO_BALANCE_TOKENS,
  DEMO_NFT,
} from "../../../shared/ui/previews/demo-data";
import { ComponentHeader } from "./component-header";
import { ComponentPreview } from "./component-preview";
import { PropsTable } from "./props-table";
import { QuickInfo } from "./quick-info";

// Group components by category for sidebar
const categoryLabels: Record<ComponentCategory, string> = {
  wallet: "Wallet",
  defi: "DeFi",
  nft: "NFT",
  data: "Data",
  utility: "Utility",
};

const sidebarSections = (
  Object.keys(categoryLabels) as ComponentCategory[]
).map((cat) => ({
  title: categoryLabels[cat],
  items: componentRegistry
    .filter((c) => c.category === cat)
    .map((c) => ({ label: c.name, id: c.id })),
}));

/** Map component IDs to their live preview JSX */
function getPreviewContent(id: string): React.ReactNode | null {
  switch (id) {
    case "connect-wallet":
      return <ConnectWalletButton className="w-full" />;
    case "network-switcher":
      return (
        <NetworkSwitcher
          networks={DEMO_NETWORKS}
          testNetworks={[]}
          onSwitch={() => {}}
        />
      );
    case "wallet-balance":
      return <WalletBalance tokens={DEMO_BALANCE_TOKENS} variant="compact" />;
    case "token-swap":
      return <TokenSwapWidget onSwap={async () => {}} />;
    case "smart-contract-scanner":
      return <SmartContractScanner variant="compact" />;
    case "nft-card":
      return <NFTCard nft={DEMO_NFT} variant="default" />;
    default:
      return null;
  }
}

function SidebarLink({
  label,
  id,
  active,
}: {
  label: string;
  id: string;
  active: boolean;
}) {
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

export function ComponentDetailPage() {
  const { componentId } = useParams({ strict: false });
  const component = useComponent(componentId ?? "");

  if (!component) {
    return (
      <UiShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1
              className="mb-2 text-2xl font-semibold"
              style={{ color: "var(--w3-gray-900)" }}
            >
              Component Not Found
            </h1>
            <p className="mb-6 text-sm" style={{ color: "var(--w3-gray-600)" }}>
              The component &ldquo;{componentId}&rdquo; doesn&apos;t exist.
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
      <div className="mx-auto flex max-w-[1200px] gap-0 px-6 md:px-8 lg:px-16">
        {/* Left sidebar — component nav */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-20 flex flex-col gap-6 py-8">
            <a
              href={getSectionUrl("ui")}
              className="text-sm font-semibold transition-colors hover:underline"
              style={{ color: "var(--w3-gray-900)" }}
            >
              Components
            </a>

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
                    active={componentId === item.id}
                  />
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main
          className="min-w-0 flex-1 py-8 md:border-l md:pl-10"
          style={{ borderColor: "var(--w3-border-subtle)" }}
        >
          <ComponentHeader component={component} />
          <ComponentPreview component={component}>
            {preview}
          </ComponentPreview>
          <PropsTable props={component.props} />
        </main>

        {/* Right sidebar — quick info */}
        <aside
          className="hidden w-48 shrink-0 border-l lg:block"
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
