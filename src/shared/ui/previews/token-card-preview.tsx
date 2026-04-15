import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const TOKEN = {
  symbol: "ETH",
  name: "Ethereum",
  price: 3_355.18,
  priceChange24h: 3.12,
  balance: "4.2100",
  value: 14_124.86,
};

function fmtCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtPct(n: number) {
  return `${Math.abs(n).toFixed(2)}%`;
}

export function TokenCardPreview() {
  const [hovered, setHovered] = useState(false);
  const pos = TOKEN.priceChange24h >= 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
        padding: 16,
        cursor: "pointer",
        transition: "box-shadow 0.2s, background 0.15s",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Token header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Icon placeholder */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "var(--w3-glass-inner-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--w3-gray-700)",
              fontFamily: '"Geist Mono", ui-monospace, monospace',
            }}
          >
            {TOKEN.symbol}
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--w3-gray-900)", margin: 0 }}>
              {TOKEN.name}
            </p>
            <p style={{ fontSize: 12, color: "var(--w3-gray-500)", margin: 0 }}>{TOKEN.symbol}</p>
          </div>
        </div>

        {/* Change pill */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            borderRadius: 9999,
            padding: "3px 8px",
            fontSize: 12,
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
            background: pos ? "rgba(22, 163, 74, 0.1)" : "rgba(220, 38, 38, 0.1)",
            color: pos ? "#16a34a" : "#dc2626",
          }}
        >
          {pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {fmtPct(TOKEN.priceChange24h)}
        </span>
      </div>

      {/* Stats */}
      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: "1px solid var(--w3-border-subtle)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              margin: "0 0 4px",
            }}
          >
            Price
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--w3-gray-900)",
              margin: 0,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmtCurrency(TOKEN.price)}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              margin: "0 0 4px",
            }}
          >
            Balance
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--w3-gray-900)",
              margin: 0,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {TOKEN.balance} {TOKEN.symbol}
          </p>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <p
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              margin: "0 0 4px",
            }}
          >
            Value
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "var(--w3-gray-900)",
              margin: 0,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmtCurrency(TOKEN.value)}
          </p>
        </div>
      </div>
    </div>
  );
}
