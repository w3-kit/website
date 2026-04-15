import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const NETWORKS = [
  { id: "eth", name: "Ethereum", abbr: "ETH" },
  { id: "polygon", name: "Polygon", abbr: "MATIC" },
  { id: "arbitrum", name: "Arbitrum", abbr: "ARB" },
];

const TOKENS = [
  { symbol: "ETH", name: "Ether" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "USDT", name: "Tether" },
];

export function BridgePreview() {
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [tokenIdx, setTokenIdx] = useState(0);
  const [amount, setAmount] = useState("0.5");
  const [openDrop, setOpenDrop] = useState<"from" | "to" | "token" | null>(
    null,
  );

  const switchNetworks = () => {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
  };

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
          Bridge
        </span>
      </div>

      <div style={{ padding: 14 }}>
        {/* Networks row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 8,
            alignItems: "end",
          }}
        >
          {/* From */}
          <div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--w3-gray-500)",
                display: "block",
                marginBottom: 4,
              }}
            >
              From
            </span>
            <div style={{ position: "relative" }}>
              <button
                onClick={() =>
                  setOpenDrop(openDrop === "from" ? null : "from")
                }
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid var(--w3-border-subtle)",
                  background: "transparent",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  cursor: "pointer",
                }}
              >
                {NETWORKS[fromIdx].name}
                <ChevronDown
                  size={12}
                  style={{
                    color: "var(--w3-gray-400)",
                    transform:
                      openDrop === "from" ? "rotate(180deg)" : "none",
                    transition: "transform 0.15s",
                  }}
                />
              </button>
              {openDrop === "from" && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    borderRadius: 8,
                    border: "1px solid var(--w3-border-subtle)",
                    background: "var(--w3-surface-elevated)",
                    zIndex: 10,
                    overflow: "hidden",
                  }}
                >
                  {NETWORKS.map((n, i) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        if (i === toIdx) setToIdx(fromIdx);
                        setFromIdx(i);
                        setOpenDrop(null);
                      }}
                      style={{
                        width: "100%",
                        padding: "6px 10px",
                        border: "none",
                        borderBottom:
                          i < NETWORKS.length - 1
                            ? "1px solid var(--w3-border-subtle)"
                            : "none",
                        background:
                          i === fromIdx
                            ? "var(--w3-glass-inner-bg)"
                            : "transparent",
                        fontSize: 12,
                        color: "var(--w3-gray-900)",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      {n.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Switch button */}
          <button
            onClick={switchNetworks}
            aria-label="Switch networks"
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--w3-gray-500)",
              cursor: "pointer",
              marginBottom: 1,
            }}
          >
            <ArrowRight size={14} />
          </button>

          {/* To */}
          <div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--w3-gray-500)",
                display: "block",
                marginBottom: 4,
              }}
            >
              To
            </span>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setOpenDrop(openDrop === "to" ? null : "to")}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid var(--w3-border-subtle)",
                  background: "transparent",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  cursor: "pointer",
                }}
              >
                {NETWORKS[toIdx].name}
                <ChevronDown
                  size={12}
                  style={{
                    color: "var(--w3-gray-400)",
                    transform: openDrop === "to" ? "rotate(180deg)" : "none",
                    transition: "transform 0.15s",
                  }}
                />
              </button>
              {openDrop === "to" && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    borderRadius: 8,
                    border: "1px solid var(--w3-border-subtle)",
                    background: "var(--w3-surface-elevated)",
                    zIndex: 10,
                    overflow: "hidden",
                  }}
                >
                  {NETWORKS.map((n, i) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        if (i === fromIdx) setFromIdx(toIdx);
                        setToIdx(i);
                        setOpenDrop(null);
                      }}
                      style={{
                        width: "100%",
                        padding: "6px 10px",
                        border: "none",
                        borderBottom:
                          i < NETWORKS.length - 1
                            ? "1px solid var(--w3-border-subtle)"
                            : "none",
                        background:
                          i === toIdx
                            ? "var(--w3-glass-inner-bg)"
                            : "transparent",
                        fontSize: 12,
                        color: "var(--w3-gray-900)",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      {n.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Token selector */}
        <div style={{ marginTop: 12 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--w3-gray-500)",
              display: "block",
              marginBottom: 4,
            }}
          >
            Token
          </span>
          <div style={{ position: "relative" }}>
            <button
              onClick={() =>
                setOpenDrop(openDrop === "token" ? null : "token")
              }
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid var(--w3-border-subtle)",
                background: "transparent",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--w3-gray-900)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
                  {TOKENS[tokenIdx].symbol.charAt(0)}
                </div>
                {TOKENS[tokenIdx].symbol}
              </div>
              <ChevronDown
                size={12}
                style={{
                  color: "var(--w3-gray-400)",
                  transform:
                    openDrop === "token" ? "rotate(180deg)" : "none",
                  transition: "transform 0.15s",
                }}
              />
            </button>
            {openDrop === "token" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  marginTop: 4,
                  borderRadius: 8,
                  border: "1px solid var(--w3-border-subtle)",
                  background: "var(--w3-surface-elevated)",
                  zIndex: 10,
                  overflow: "hidden",
                }}
              >
                {TOKENS.map((t, i) => (
                  <button
                    key={t.symbol}
                    onClick={() => {
                      setTokenIdx(i);
                      setOpenDrop(null);
                    }}
                    style={{
                      width: "100%",
                      padding: "6px 10px",
                      border: "none",
                      borderBottom:
                        i < TOKENS.length - 1
                          ? "1px solid var(--w3-border-subtle)"
                          : "none",
                      background:
                        i === tokenIdx
                          ? "var(--w3-glass-inner-bg)"
                          : "transparent",
                      fontSize: 12,
                      color: "var(--w3-gray-900)",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {t.symbol}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div
          style={{
            marginTop: 12,
            borderRadius: 8,
            background: "var(--w3-glass-inner-bg)",
            padding: "8px 10px",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--w3-gray-500)",
              display: "block",
              marginBottom: 4,
            }}
          >
            Amount
          </span>
          <input
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 18,
              fontWeight: 500,
              color: "var(--w3-gray-900)",
              fontVariantNumeric: "tabular-nums",
            }}
          />
        </div>

        {/* Bridge button */}
        <button
          style={{
            width: "100%",
            padding: "9px 0",
            marginTop: 12,
            borderRadius: 8,
            border: "none",
            background: "var(--w3-accent)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Bridge
        </button>
      </div>
    </div>
  );
}
