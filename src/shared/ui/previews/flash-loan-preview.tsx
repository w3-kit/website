import { useState } from "react";
import { Zap } from "lucide-react";

const PROTOCOLS = [
  { name: "Aave", abbr: "A" },
  { name: "dYdX", abbr: "D" },
];

const TOKENS = [
  { symbol: "ETH", abbr: "E" },
  { symbol: "USDC", abbr: "U" },
  { symbol: "DAI", abbr: "D" },
];

export function FlashLoanPreview() {
  const [selectedProtocol, setSelectedProtocol] = useState(0);
  const [selectedToken, setSelectedToken] = useState(0);
  const [amount, setAmount] = useState("1000");

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
          gap: 6,
          padding: "10px 14px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <Zap size={14} style={{ color: "#f59e0b" }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--w3-gray-900)",
          }}
        >
          Flash Loan
        </span>
      </div>

      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Protocol selector */}
        <div>
          <span
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Protocol
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {PROTOCOLS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setSelectedProtocol(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: 8,
                  border:
                    selectedProtocol === i
                      ? "1px solid var(--w3-gray-900)"
                      : "1px solid var(--w3-border-subtle)",
                  background:
                    selectedProtocol === i
                      ? "var(--w3-glass-inner-bg)"
                      : "transparent",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "var(--w3-accent-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--w3-accent)",
                  }}
                >
                  {p.abbr}
                </div>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Token selector */}
        <div>
          <span
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Token
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {TOKENS.map((t, i) => (
              <button
                key={t.symbol}
                onClick={() => setSelectedToken(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: 8,
                  border:
                    selectedToken === i
                      ? "1px solid var(--w3-gray-900)"
                      : "1px solid var(--w3-border-subtle)",
                  background:
                    selectedToken === i
                      ? "var(--w3-glass-inner-bg)"
                      : "transparent",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "var(--w3-accent-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--w3-accent)",
                  }}
                >
                  {t.abbr}
                </div>
                {t.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Amount input */}
        <div>
          <span
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Amount
          </span>
          <div
            style={{
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
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
              {TOKENS[selectedToken].symbol}
            </span>
          </div>

          {/* Fee estimate */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <span style={{ fontSize: 10, color: "var(--w3-gray-500)" }}>
              Fee: 0.09%
            </span>
            <span
              style={{
                fontSize: 10,
                color: "var(--w3-gray-500)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ~{(parseFloat(amount || "0") * 0.0009).toFixed(2)}{" "}
              {TOKENS[selectedToken].symbol}
            </span>
          </div>
        </div>

        {/* Execute button */}
        <button
          style={{
            width: "100%",
            padding: "9px 0",
            borderRadius: 8,
            border: "none",
            background: "var(--w3-accent)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Zap size={13} />
          Execute Flash Loan
        </button>
      </div>
    </div>
  );
}
