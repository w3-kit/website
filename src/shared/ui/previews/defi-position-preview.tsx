import { useEffect } from "react";
import { BarChart3, Shield, TrendingUp } from "lucide-react";
import { domainLogo, preloadDomainLogos, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const POSITIONS = [
  {
    id: "1",
    protocol: "Aave",
    protocolDomain: "aave.com",
    token: "ETH",
    amount: "5.24",
    value: 16892.0,
    apy: 3.42,
    healthFactor: 2.15,
    risk: "low" as const,
  },
  {
    id: "2",
    protocol: "Compound",
    protocolDomain: "compound.finance",
    token: "USDC",
    amount: "10,000",
    value: 10000.0,
    apy: 5.67,
    healthFactor: 1.48,
    risk: "medium" as const,
  },
  {
    id: "3",
    protocol: "Aave",
    protocolDomain: "aave.com",
    token: "WBTC",
    amount: "0.85",
    value: 54230.0,
    apy: 1.23,
    healthFactor: 2.82,
    risk: "low" as const,
  },
];

function formatCurrency(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

function healthColor(hf: number) {
  if (hf >= 2) return "#22c55e";
  if (hf >= 1.5) return "#f59e0b";
  return "#ef4444";
}

function riskBadgeStyle(risk: "low" | "medium" | "high") {
  const map = {
    low: { bg: "rgba(34,197,94,0.12)", color: "#22c55e" },
    medium: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
    high: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  };
  return map[risk];
}

export function DefiPositionPreview() {
  useEffect(() => {
    preloadDomainLogos([...new Set(POSITIONS.map((p) => p.protocolDomain))]);
    preloadCryptoLogos(POSITIONS.map((p) => p.token));
  }, []);

  const totalValue = POSITIONS.reduce((s, p) => s + p.value, 0);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BarChart3 size={16} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            DeFi Positions
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--w3-gray-900)",
            fontFamily: monoFont,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatCurrency(totalValue)}
        </span>
      </div>

      {/* Position rows */}
      {POSITIONS.map((pos, i) => {
        const badge = riskBadgeStyle(pos.risk);
        const hfColor = healthColor(pos.healthFactor);
        const hfBarWidth = Math.min((pos.healthFactor / 3) * 100, 100);

        return (
          <div
            key={pos.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderTop: i > 0 ? "1px solid var(--w3-border-subtle)" : undefined,
              cursor: "pointer",
            }}
          >
            {/* Protocol logo */}
            <img
              src={domainLogo(pos.protocolDomain, 64)}
              alt={pos.protocol}
              width={32}
              height={32}
              style={{ borderRadius: "50%", flexShrink: 0, display: "block" }}
              loading="lazy"
            />

            {/* Token info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    fontFamily: monoFont,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {pos.amount} {pos.token}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: "1px 6px",
                    borderRadius: 6,
                    background: badge.bg,
                    color: badge.color,
                    textTransform: "capitalize",
                  }}
                >
                  {pos.risk}
                </span>
              </div>
              <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
                {pos.protocol}
              </span>
            </div>

            {/* Health factor bar */}
            <div style={{ width: 72, flexShrink: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <Shield size={10} style={{ color: "var(--w3-gray-400)" }} />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: hfColor,
                    fontFamily: monoFont,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {pos.healthFactor.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  borderRadius: 2,
                  background: "var(--w3-glass-inner-bg)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${hfBarWidth}%`,
                    height: "100%",
                    borderRadius: 2,
                    background: hfColor,
                  }}
                />
              </div>
            </div>

            {/* Value + APY */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  fontFamily: monoFont,
                  fontVariantNumeric: "tabular-nums",
                  display: "block",
                }}
              >
                {formatCurrency(pos.value)}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 3,
                  fontSize: 11,
                  fontFamily: monoFont,
                  fontVariantNumeric: "tabular-nums",
                  color: "#22c55e",
                }}
              >
                <TrendingUp size={10} />
                {pos.apy}%
              </span>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--w3-border-subtle)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
          {POSITIONS.length} positions
        </span>
      </div>
    </div>
  );
}
