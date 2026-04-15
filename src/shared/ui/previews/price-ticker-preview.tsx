import { TrendingUp, TrendingDown } from "lucide-react";

interface Ticker {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
}

const TICKERS: Ticker[] = [
  { symbol: "BTC", name: "Bitcoin", price: 67_498.42, change24h: 1.87, marketCap: 1_327_000_000_000 },
  { symbol: "ETH", name: "Ethereum", price: 3_355.18, change24h: 3.12, marketCap: 403_200_000_000 },
  { symbol: "SOL", name: "Solana", price: 148.32, change24h: -2.45, marketCap: 64_800_000_000 },
  { symbol: "AVAX", name: "Avalanche", price: 35.67, change24h: -0.82, marketCap: 13_100_000_000 },
];

function fmtPrice(n: number) {
  if (n >= 1000) return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${n.toFixed(2)}`;
}

function fmtCap(n: number) {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  return `$${(n / 1_000_000).toFixed(1)}M`;
}

function fmtPct(n: number) {
  return `${Math.abs(n).toFixed(2)}%`;
}

export function PriceTickerPreview() {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--w3-gray-900)" }}>
          Market Prices
        </span>
        <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
          {TICKERS.length} tokens
        </span>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 90px 72px 80px",
          gap: 8,
          padding: "6px 16px",
          borderBottom: "1px solid var(--w3-border-subtle)",
          fontSize: 10,
          color: "var(--w3-gray-500)",
        }}
      >
        <span>Token</span>
        <span style={{ textAlign: "right" }}>Price</span>
        <span style={{ textAlign: "right" }}>24h</span>
        <span style={{ textAlign: "right" }}>Mkt Cap</span>
      </div>

      {/* Rows */}
      {TICKERS.map((t, i) => {
        const pos = t.change24h >= 0;

        return (
          <div
            key={t.symbol}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 90px 72px 80px",
              gap: 8,
              alignItems: "center",
              padding: "10px 16px",
              borderBottom: i < TICKERS.length - 1 ? "1px solid var(--w3-border-subtle)" : "none",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "var(--w3-glass-inner-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
            }}
          >
            {/* Token info */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
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
                {t.symbol.slice(0, 3)}
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.name}
                </p>
                <p style={{ fontSize: 11, color: "var(--w3-gray-500)", margin: 0 }}>{t.symbol}</p>
              </div>
            </div>

            {/* Price */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--w3-gray-900)",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmtPrice(t.price)}
            </span>

            {/* 24h change pill */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  borderRadius: 9999,
                  padding: "2px 7px",
                  fontSize: 11,
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                  background: pos ? "rgba(22, 163, 74, 0.1)" : "rgba(220, 38, 38, 0.1)",
                  color: pos ? "#16a34a" : "#dc2626",
                }}
              >
                {pos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {fmtPct(t.change24h)}
              </span>
            </div>

            {/* Market cap */}
            <span
              style={{
                fontSize: 12,
                color: "var(--w3-gray-500)",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmtCap(t.marketCap)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
