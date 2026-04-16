import { useState } from "react";
import { TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";
import { cryptoLogo } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const POOL = {
  pair: "ETH / USDC",
  fee: "0.30%",
  tvl: 184_520_000,
  tvlChange: 3.21,
  volume24h: 42_870_000,
  volumeChange: -1.45,
  apr: 18.42,
  fees24h: 128_610,
  txCount: 12_483,
  holders: 4_821,
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
          fontFamily: monoFont,
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
        ...previewCard,
        maxWidth: 400,
        width: "100%",
        margin: "0 auto",
        transition: "box-shadow 0.2s",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={cryptoLogo("ETH")}
              alt="ETH"
              width={28}
              height={28}
              style={{ borderRadius: "50%", display: "block", border: "2px solid var(--w3-surface-elevated)" }}
              loading="lazy"
            />
            <img
              src={cryptoLogo("USDC")}
              alt="USDC"
              width={28}
              height={28}
              style={{ borderRadius: "50%", display: "block", marginLeft: -8, border: "2px solid var(--w3-surface-elevated)" }}
              loading="lazy"
            />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
                {POOL.pair}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  padding: "2px 6px",
                  borderRadius: 99,
                  background: "var(--w3-glass-inner-bg)",
                  color: "var(--w3-gray-500)",
                }}
              >
                {POOL.fee}
              </span>
            </div>
            <p style={{ fontSize: 11, color: "var(--w3-gray-500)", margin: "2px 0 0" }}>
              Uniswap V3
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#16a34a",
              margin: 0,
              fontFamily: monoFont,
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

      {/* Stat grid — 2x3 */}
      <div
        style={{
          padding: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
        }}
      >
        <StatBox label="TVL" value={fmt(POOL.tvl)} change={POOL.tvlChange} />
        <StatBox label="Volume (24h)" value={fmt(POOL.volume24h)} change={POOL.volumeChange} />
        <StatBox label="Fees (24h)" value={fmt(POOL.fees24h)} />
        <StatBox label="Transactions" value={POOL.txCount.toLocaleString()} />
        <StatBox label="Holders" value={POOL.holders.toLocaleString()} />
        <StatBox label="APR" value={`${POOL.apr}%`} />
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "0 10px 10px",
        }}
      >
        <button
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: "8px 0",
            borderRadius: 8,
            border: "none",
            background: "var(--w3-accent)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <Plus size={14} />
          Add Liquidity
        </button>
        <button
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: "8px 0",
            borderRadius: 8,
            border: "1px solid var(--w3-border-subtle)",
            background: "transparent",
            color: "var(--w3-gray-700)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <Minus size={14} />
          Remove
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--w3-border-subtle)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
          Props-driven pool stats card with action buttons
        </span>
      </div>
    </div>
  );
}
