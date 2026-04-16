import { useState, useEffect } from "react";
import { Check, Globe } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader } from "./_shared";

const networks = [
  { chainId: 1, name: "Ethereum", ticker: "ETH", currency: "ETH" },
  { chainId: 137, name: "Polygon", ticker: "POL", currency: "POL" },
  { chainId: 42161, name: "Arbitrum", ticker: "ARB", currency: "ETH" },
  { chainId: 10, name: "Optimism", ticker: "OP", currency: "ETH" },
  { chainId: 8453, name: "Base", ticker: "BASE", currency: "ETH" },
];

export function NetworkSwitcherPreview() {
  useEffect(() => { preloadCryptoLogos(networks.map((n) => n.ticker)); }, []);

  const [selected, setSelected] = useState(1);
  const [showTestnets, setShowTestnets] = useState(false);

  const active = networks.find((n) => n.chainId === selected);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Globe size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Network
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {active && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 8, background: "var(--w3-accent-subtle)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-accent)" }}>
                {active.name}
              </span>
            </div>
          )}
          <button
            onClick={() => setShowTestnets(!showTestnets)}
            style={{
              fontSize: 12,
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              background: showTestnets ? "var(--w3-accent)" : "transparent",
              color: showTestnets ? "#fff" : "var(--w3-gray-600)",
              cursor: "pointer",
            }}
          >
            Testnets
          </button>
        </div>
      </div>

      {/* Network list */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {networks.map((net) => {
          const isActive = net.chainId === selected;
          return (
            <button
              key={net.chainId}
              onClick={() => setSelected(net.chainId)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                borderRadius: 12,
                border: "none",
                background: isActive ? "var(--w3-accent-subtle)" : "transparent",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              <img
                src={cryptoLogo(net.ticker)}
                alt={net.name}
                width={32}
                height={32}
                style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                loading="lazy"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>
                  {net.name}
                </span>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)", display: "block", marginTop: 1 }}>
                  {net.currency}
                </span>
              </div>
              {isActive ? (
                <Check size={14} style={{ color: "var(--w3-accent)", flexShrink: 0 }} />
              ) : (
                <span style={{ fontSize: 14, color: "var(--w3-gray-500)", flexShrink: 0 }}>→</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {networks.length} networks
        </span>
      </div>
    </div>
  );
}
