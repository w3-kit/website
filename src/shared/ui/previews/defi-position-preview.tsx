const POSITIONS = [
  {
    id: "1",
    protocol: "Aave V3",
    type: "Lending",
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
    type: "Lending",
    token: "USDC",
    amount: "10,000",
    value: 10000.0,
    apy: 5.67,
    healthFactor: 1.48,
    risk: "medium" as const,
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
  const totalValue = POSITIONS.reduce((s, p) => s + p.value, 0);

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--w3-gray-500)",
          }}
        >
          DeFi Positions
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--w3-gray-900)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatCurrency(totalValue)}
        </span>
      </div>

      {/* Positions */}
      {POSITIONS.map((pos, i) => {
        const badge = riskBadgeStyle(pos.risk);
        const hfColor = healthColor(pos.healthFactor);
        const hfBarWidth = Math.min((pos.healthFactor / 3) * 100, 100);

        return (
          <div
            key={pos.id}
            style={{
              padding: "12px 14px",
              borderBottom:
                i < POSITIONS.length - 1
                  ? "1px solid var(--w3-border-subtle)"
                  : "none",
            }}
          >
            {/* Top row: token info + value */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                {/* Token icon */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--w3-accent-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--w3-accent)",
                  }}
                >
                  {pos.token.charAt(0)}
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--w3-gray-900)",
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
                    {pos.protocol} · {pos.type}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    fontVariantNumeric: "tabular-nums",
                    display: "block",
                  }}
                >
                  {formatCurrency(pos.value)}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontVariantNumeric: "tabular-nums",
                    color: pos.apy >= 0 ? "#22c55e" : "#ef4444",
                  }}
                >
                  +{pos.apy}% APY
                </span>
              </div>
            </div>

            {/* Health factor bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: hfColor,
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
              >
                HF {pos.healthFactor.toFixed(2)}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 4,
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
          </div>
        );
      })}
    </div>
  );
}
