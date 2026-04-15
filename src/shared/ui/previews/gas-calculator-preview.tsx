import { useState } from "react";
import { Clock, Wallet, Zap } from "lucide-react";

type Speed = "economy" | "standard" | "fast";

interface SpeedOption {
  key: Speed;
  label: string;
  icon: typeof Clock;
  desc: string;
  gwei: number;
  usd: string;
}

const SPEEDS: SpeedOption[] = [
  {
    key: "economy",
    label: "Economy",
    icon: Clock,
    desc: "~5 min",
    gwei: 12,
    usd: "$0.38",
  },
  {
    key: "standard",
    label: "Standard",
    icon: Wallet,
    desc: "~2 min",
    gwei: 18,
    usd: "$0.57",
  },
  {
    key: "fast",
    label: "Fast",
    icon: Zap,
    desc: "~15 sec",
    gwei: 28,
    usd: "$0.89",
  },
];

export function GasCalculatorPreview() {
  const [selected, setSelected] = useState<Speed>("standard");

  const current = SPEEDS.find((s) => s.key === selected)!;

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
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--w3-gray-500)",
          }}
        >
          Gas Calculator
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: "2px 7px",
            borderRadius: 6,
            background: "rgba(34,197,94,0.1)",
            color: "#22c55e",
          }}
        >
          Live
        </span>
      </div>

      <div style={{ padding: 14 }}>
        {/* Speed selector cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {SPEEDS.map((speed) => {
            const Icon = speed.icon;
            const isActive = selected === speed.key;
            return (
              <button
                key={speed.key}
                onClick={() => setSelected(speed.key)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 6px",
                  borderRadius: 10,
                  border: isActive
                    ? "1.5px solid var(--w3-gray-900)"
                    : "1px solid var(--w3-border-subtle)",
                  background: isActive
                    ? "var(--w3-glass-inner-bg)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  gap: 3,
                }}
              >
                <Icon
                  size={14}
                  style={{
                    color: isActive
                      ? "var(--w3-gray-900)"
                      : "var(--w3-gray-400)",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                  }}
                >
                  {speed.label}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--w3-gray-500)",
                  }}
                >
                  {speed.desc}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--w3-gray-900)",
                    marginTop: 2,
                  }}
                >
                  {speed.gwei} gwei
                </span>
              </button>
            );
          })}
        </div>

        {/* Estimated cost */}
        <div
          style={{
            borderRadius: 10,
            background: "var(--w3-glass-inner-bg)",
            padding: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--w3-gray-500)",
              marginBottom: 4,
            }}
          >
            Estimated Cost
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
                color: "var(--w3-gray-900)",
              }}
            >
              {(current.gwei * 21000 / 1e9).toFixed(6)} ETH
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--w3-gray-500)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ≈ {current.usd}
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              marginTop: 2,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {current.gwei} gwei · 21,000 gas · base 10 gwei
          </div>
        </div>
      </div>
    </div>
  );
}
