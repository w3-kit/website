import { useState } from "react";
import { Lock, Percent } from "lucide-react";

export function StakingInterfacePreview() {
  const [isStaking, setIsStaking] = useState(true);
  const [amount, setAmount] = useState("");

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
          Staking Pools
        </span>
        <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
          1 pool
        </span>
      </div>

      {/* Pool card */}
      <div style={{ padding: "12px 14px" }}>
        {/* Pool info row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Token icon placeholder */}
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--w3-accent-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--w3-accent)",
              }}
            >
              E
            </div>
            <div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  display: "block",
                }}
              >
                ETH Staking Pool
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#22c55e",
                  }}
                >
                  <Percent size={11} />
                  4.8% APR
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    fontSize: 11,
                    color: "var(--w3-gray-500)",
                  }}
                >
                  <Lock size={11} />
                  30d lock
                </span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--w3-gray-500)",
                display: "block",
              }}
            >
              Total Staked
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--w3-gray-900)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              12,450 ETH
            </span>
          </div>
        </div>

        {/* Stake / Unstake toggle */}
        <div
          style={{
            display: "flex",
            gap: 2,
            padding: 3,
            background: "var(--w3-glass-inner-bg)",
            borderRadius: 8,
            marginTop: 14,
          }}
        >
          {(["Stake", "Unstake"] as const).map((label) => {
            const active =
              (label === "Stake" && isStaking) ||
              (label === "Unstake" && !isStaking);
            return (
              <button
                key={label}
                onClick={() => setIsStaking(label === "Stake")}
                style={{
                  flex: 1,
                  padding: "6px 0",
                  borderRadius: 6,
                  border: "none",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: active
                    ? "var(--w3-surface-elevated)"
                    : "transparent",
                  color: active ? "var(--w3-gray-900)" : "var(--w3-gray-500)",
                  boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Amount input */}
        <div
          style={{
            marginTop: 10,
            borderRadius: 8,
            border: "1px solid var(--w3-border-subtle)",
            background: "var(--w3-glass-inner-bg)",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <input
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--w3-gray-900)",
              fontVariantNumeric: "tabular-nums",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--w3-gray-500)",
            }}
          >
            ETH
          </span>
        </div>

        <p
          style={{
            fontSize: 10,
            color: "var(--w3-gray-500)",
            marginTop: 4,
          }}
        >
          Min: 0.01 ETH
        </p>

        {/* Action button */}
        <button
          style={{
            width: "100%",
            padding: "8px 0",
            marginTop: 10,
            borderRadius: 8,
            border: "none",
            background: "var(--w3-accent)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {isStaking ? "Stake" : "Unstake"} ETH
        </button>
      </div>
    </div>
  );
}
