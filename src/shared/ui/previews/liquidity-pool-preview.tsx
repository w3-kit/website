import { useState } from "react";
import { TrendingUp, TrendingDown, Droplets } from "lucide-react";

const POOL = {
  pair: "ETH / USDC",
  feeTier: "0.30%",
  tvl: 184_520_000,
  tvlChange: 3.21,
  volume24h: 42_870_000,
  volumeChange: -1.45,
  apr: 18.42,
  fees24h: 128_610,
  txCount: 12_483,
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function StatBox({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: number;
}) {
  return (
    <div
      style={{
        background: "var(--w3-glass-inner-bg)",
        borderRadius: 8,
        padding: "10px 12px",
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
        {label}
      </p>
      <p
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "var(--w3-gray-900)",
          margin: "4px 0 0",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </p>
      {change != null && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            fontSize: 11,
            fontVariantNumeric: "tabular-nums",
            color: change >= 0 ? "#16a34a" : "#dc2626",
            marginTop: 2,
          }}
        >
          {change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </span>
      )}
    </div>
  );
}

export function LiquidityPoolPreview() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
        transition: "box-shadow 0.2s",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--w3-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--w3-accent-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Droplets size={16} style={{ color: "var(--w3-accent)" }} />
          </div>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--w3-gray-900)",
                margin: 0,
              }}
            >
              {POOL.pair}
            </p>
            <p style={{ fontSize: 11, color: "var(--w3-gray-500)", margin: 0 }}>
              {POOL.feeTier} fee tier
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#16a34a",
              margin: 0,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {POOL.apr}%
          </p>
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
            APR
          </p>
        </div>
      </div>

      {/* Stat grid */}
      <div
        style={{
          padding: 12,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <StatBox label="TVL" value={fmt(POOL.tvl)} change={POOL.tvlChange} />
        <StatBox label="Volume (24h)" value={fmt(POOL.volume24h)} change={POOL.volumeChange} />
        <StatBox label="Fees (24h)" value={fmt(POOL.fees24h)} />
        <StatBox label="Transactions" value={POOL.txCount.toLocaleString()} />
      </div>
    </div>
  );
}
