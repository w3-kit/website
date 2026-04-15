import { useState } from "react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";
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

const FEATURED = [
  { id: "connect-wallet", label: "Wallet" },
  { id: "network-switcher", label: "Network" },
  { id: "wallet-balance", label: "Balance" },
  { id: "token-swap", label: "Swap" },
  { id: "smart-contract-scanner", label: "Scanner" },
  { id: "nft-card", label: "NFT" },
] as const;

function getPreview(id: string) {
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

export function UiFeaturedShowcase() {
  const [active, setActive] = useState(0);
  const containerRef = useScrollReveal({ stagger: 0.1 });

  const current = FEATURED[active];

  return (
    <SectionContainer className="pb-20">
      <div ref={containerRef}>
        {/* Section heading */}
        <div data-reveal className="mb-8 text-center">
          <p
            className="mb-2 text-sm font-medium uppercase tracking-wider"
            style={{ color: "var(--w3-accent)" }}
          >
            Featured
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
          >
            See them in action
          </h2>
        </div>

        {/* Tabs + preview */}
        <div
          data-reveal
          className="mx-auto max-w-2xl overflow-hidden rounded-xl"
          style={{
            background: "var(--w3-glass-bg)",
            border: "1px solid var(--w3-glass-border)",
            boxShadow: "var(--w3-glass-shadow)",
          }}
        >
          {/* Tab bar */}
          <div
            className="flex gap-1 p-2"
            style={{ borderBottom: "1px solid var(--w3-border-subtle)" }}
          >
            {FEATURED.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActive(i)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                  background:
                    active === i ? "var(--w3-accent)" : "transparent",
                  color: active === i ? "#fff" : "var(--w3-gray-600)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Live preview */}
          <div
            className="max-h-[380px] overflow-y-auto p-4"
            style={{ background: "var(--w3-glass-inner-bg)" }}
          >
            {getPreview(current.id)}
          </div>

          {/* Footer link */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: "1px solid var(--w3-border-subtle)" }}
          >
            <code
              className="text-xs"
              style={{
                color: "var(--w3-gray-500)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
              }}
            >
              npx w3-kit add {current.id}
            </code>
            <a
              href={`${getSectionUrl("ui")}/${current.id}`}
              className="text-xs font-medium transition-colors hover:underline"
              style={{ color: "var(--w3-accent)" }}
            >
              View docs →
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
