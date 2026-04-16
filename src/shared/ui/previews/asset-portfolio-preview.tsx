import { useState, useEffect } from "react";
import { PieChart } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

interface Asset {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  change24h: number;
  color: string;
}

const ASSETS: Asset[] = [
  { symbol: "ETH", name: "Ethereum", balance: "4.2100", value: 14_112, change24h: 3.12, color: "#627EEA" },
  { symbol: "BTC", name: "Bitcoin", balance: "0.1250", value: 8_437, change24h: 1.87, color: "#F7931A" },
  { symbol: "USDC", name: "USD Coin", balance: "3850.00", value: 3_850, change24h: 0.01, color: "#2775CA" },
  { symbol: "SOL", name: "Solana", balance: "15.8000", value: 2_343.5, change24h: -2.45, color: "#9945FF" },
];

const TOTAL_VALUE = 28_742.5;
const weightedChange = ASSETS.reduce((sum, a) => sum + (a.value / TOTAL_VALUE) * a.change24h, 0);

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function AssetPortfolioPreview() {
  useEffect(() => { preloadCryptoLogos(ASSETS.map((a) => a.symbol)); }, []);

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <PieChart size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Portfolio
          </span>
        </div>
      </div>

      {/* Total value + allocation */}
      <div style={{ padding: "16px 20px 12px" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 6 }}>
          Total Value
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: "var(--w3-gray-900)" }}>
            {fmt(TOTAL_VALUE)}
          </span>
          <span style={{ fontSize: 14, fontWeight: 500, color: weightedChange >= 0 ? "#22c55e" : "#ef4444" }}>
            {weightedChange >= 0 ? "+" : ""}{weightedChange.toFixed(2)}%
          </span>
        </div>

        {/* Allocation bar */}
        <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", marginTop: 14, gap: 3 }}>
          {ASSETS.map((a, i) => {
            const pct = (a.value / TOTAL_VALUE) * 100;
            return (
              <div
                key={a.symbol}
                style={{
                  flex: pct,
                  background: a.color,
                  borderRadius: 3,
                  opacity: hovered !== null && hovered !== i ? 0.25 : 1,
                  transition: "opacity 0.2s",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Token list */}
      <div style={{ padding: "8px 20px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
        {ASSETS.map((a, i) => {
          const isHovered = hovered === i;
          return (
            <div
              key={a.symbol}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                borderRadius: 12,
                background: isHovered ? "var(--w3-accent-subtle)" : "transparent",
                opacity: hovered !== null && !isHovered ? 0.5 : 1,
                transition: "background 0.15s, opacity 0.2s",
                cursor: "default",
              }}
            >
              <img
                src={cryptoLogo(a.symbol)}
                alt={a.symbol}
                width={32}
                height={32}
                style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                loading="lazy"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                    {a.symbol}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: a.change24h >= 0 ? "#22c55e" : "#ef4444" }}>
                    {a.change24h >= 0 ? "+" : ""}{a.change24h.toFixed(1)}%
                  </span>
                </div>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)", display: "block", marginTop: 1 }}>
                  {a.name} &middot; {a.balance}
                </span>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                  {fmt(a.value)}
                </div>
                <div style={{ fontSize: 13, color: "var(--w3-gray-600)", marginTop: 1, fontFamily: monoFont }}>
                  {a.change24h >= 0 ? "+" : ""}{a.change24h.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {ASSETS.length} assets &middot; {fmt(TOTAL_VALUE)}
        </span>
      </div>
    </div>
  );
}
