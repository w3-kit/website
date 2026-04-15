import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  change24h: number;
  color: string;
}

const TOTAL_VALUE = 28_742.5;
const TOTAL_CHANGE = 2.84;

const ASSETS: Asset[] = [
  { symbol: "ETH", name: "Ethereum", balance: "4.2100", value: 14_112, change24h: 3.12, color: "#627eea" },
  { symbol: "BTC", name: "Bitcoin", balance: "0.1250", value: 8_437, change24h: 1.87, color: "#f7931a" },
  { symbol: "USDC", name: "USD Coin", balance: "3,850.00", value: 3_850, change24h: 0.01, color: "#2775ca" },
  { symbol: "SOL", name: "Solana", balance: "15.8000", value: 2_343.5, change24h: -2.45, color: "#9945ff" },
];

function fmtCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtPct(n: number) {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

export function AssetPortfolioPreview() {
  const [hovered, setHovered] = useState<string | null>(null);
  const isPositive = TOTAL_CHANGE >= 0;

  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
      }}
    >
      {/* Summary header */}
      <div
        style={{
          padding: "14px 16px 12px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--w3-gray-500)",
            margin: 0,
          }}
        >
          Portfolio Value
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginTop: 4,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--w3-gray-900)",
            }}
          >
            {fmtCurrency(TOTAL_VALUE)}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
              fontSize: 12,
              fontWeight: 500,
              color: isPositive ? "#16a34a" : "#dc2626",
            }}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {fmtPct(TOTAL_CHANGE)}
            <span style={{ color: "var(--w3-gray-500)", fontWeight: 400, marginLeft: 2, fontSize: 11 }}>
              24h
            </span>
          </span>
        </div>

        {/* Allocation bar */}
        <div
          style={{
            display: "flex",
            height: 6,
            borderRadius: 9999,
            overflow: "hidden",
            marginTop: 10,
            background: "var(--w3-glass-inner-bg)",
          }}
        >
          {ASSETS.map((a) => (
            <div
              key={a.symbol}
              onMouseEnter={() => setHovered(a.symbol)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: `${(a.value / TOTAL_VALUE) * 100}%`,
                backgroundColor: a.color,
                transition: "opacity 0.15s",
                opacity: hovered && hovered !== a.symbol ? 0.3 : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Asset rows */}
      {ASSETS.map((asset, i) => {
        const pos = asset.change24h >= 0;
        const pct = ((asset.value / TOTAL_VALUE) * 100).toFixed(1);
        const isFaded = hovered && hovered !== asset.symbol;

        return (
          <div
            key={asset.symbol}
            onMouseEnter={() => setHovered(asset.symbol)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: i < ASSETS.length - 1 ? "1px solid var(--w3-border-subtle)" : "none",
              transition: "opacity 0.15s, background 0.15s",
              opacity: isFaded ? 0.5 : 1,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Color dot */}
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: asset.color,
                  flexShrink: 0,
                }}
              />
              {/* Symbol block */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "var(--w3-glass-inner-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 600,
                  color: "var(--w3-gray-700)",
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  flexShrink: 0,
                }}
              >
                {asset.symbol.slice(0, 3)}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)", margin: 0 }}>
                  {asset.symbol}
                </p>
                <p style={{ fontSize: 11, color: "var(--w3-gray-500)", margin: 0 }}>
                  {asset.name} &middot; {asset.balance} &middot; {pct}%
                </p>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmtCurrency(asset.value)}
              </p>
              <p
                style={{
                  fontSize: 11,
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                  color: pos ? "#16a34a" : "#dc2626",
                }}
              >
                {fmtPct(asset.change24h)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
