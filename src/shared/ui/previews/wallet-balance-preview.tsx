import { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader } from "./_shared";

const tokens = [
  { symbol: "ETH", name: "Ethereum", balance: "1.4201", price: 3834.27, change: 2.41, color: "#627EEA" },
  { symbol: "USDC", name: "USD Coin", balance: "2500.00", price: 1.0, change: 0.01, color: "#2775CA" },
  { symbol: "LINK", name: "Chainlink", balance: "84.50", price: 14.82, change: -1.32, color: "#2A5ADA" },
  { symbol: "SOL", name: "Solana", balance: "12.80", price: 148.50, change: 4.22, color: "#14F195" },
];

const totalValue = tokens.reduce((sum, t) => sum + parseFloat(t.balance) * t.price, 0);
const weightedChange = tokens.reduce((sum, t) => {
  const val = parseFloat(t.balance) * t.price;
  return sum + (val / totalValue) * t.change;
}, 0);

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function WalletBalancePreview() {
  useEffect(() => { preloadCryptoLogos(tokens.map((t) => t.symbol)); }, []);

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Wallet size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Balance
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
            {fmt(totalValue)}
          </span>
          <span style={{ fontSize: 14, fontWeight: 500, color: weightedChange >= 0 ? "#22c55e" : "#ef4444" }}>
            {weightedChange >= 0 ? "+" : ""}{weightedChange.toFixed(2)}%
          </span>
        </div>

        {/* Allocation bar */}
        <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", marginTop: 14, gap: 3 }}>
          {tokens.map((t, i) => {
            const pct = (parseFloat(t.balance) * t.price / totalValue) * 100;
            return (
              <div
                key={t.symbol}
                style={{
                  flex: pct,
                  background: t.color,
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
        {tokens.map((t, i) => {
          const value = parseFloat(t.balance) * t.price;
          const isHovered = hovered === i;
          return (
            <div
              key={t.symbol}
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
                src={cryptoLogo(t.symbol)}
                alt={t.symbol}
                width={32}
                height={32}
                style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                loading="lazy"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                    {t.symbol}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: t.change >= 0 ? "#22c55e" : "#ef4444" }}>
                    {t.change >= 0 ? "+" : ""}{t.change.toFixed(1)}%
                  </span>
                </div>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)", display: "block", marginTop: 1 }}>
                  {t.name}
                </span>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                  {parseFloat(t.balance).toLocaleString("en-US", { maximumFractionDigits: 4 })}
                </div>
                <div style={{ fontSize: 13, color: "var(--w3-gray-600)", marginTop: 1 }}>
                  {fmt(value)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {tokens.length} tokens · {fmt(totalValue)}
        </span>
      </div>
    </div>
  );
}
