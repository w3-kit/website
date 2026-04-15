import { useState } from "react";
import { Eye, Edit3, Play, ChevronRight } from "lucide-react";

type Tab = "read" | "write";

interface MockFn {
  name: string;
  inputs: number;
  description: string;
}

const READ_FNS: MockFn[] = [
  { name: "balanceOf", inputs: 1, description: "Get token balance" },
  { name: "totalSupply", inputs: 0, description: "Total token supply" },
];

const WRITE_FNS: MockFn[] = [
  { name: "transfer", inputs: 2, description: "Transfer tokens" },
  { name: "approve", inputs: 2, description: "Approve spender" },
];

export function ContractInteractionPreview() {
  const [tab, setTab] = useState<Tab>("read");
  const [selectedFn, setSelectedFn] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const fns = tab === "read" ? READ_FNS : WRITE_FNS;

  const handleExecute = (name: string) => {
    if (tab === "read") {
      setResult(
        name === "balanceOf"
          ? "1,420,000.00 USDC"
          : "10,000,000,000 USDC",
      );
    } else {
      setResult("Tx: 0x7f3a...b2c1 (confirmed)");
    }
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
      {/* Header + Address */}
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--w3-gray-900)",
          }}
        >
          Contract Interaction
        </span>
        <div
          style={{
            marginTop: 8,
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid var(--w3-border-subtle)",
            background: "var(--w3-glass-inner-bg)",
            fontSize: 12,
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            color: "var(--w3-gray-700)",
          }}
        >
          0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        {(["read", "write"] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setSelectedFn(null);
              setResult(null);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 500,
              background: "transparent",
              border: "none",
              borderBottom:
                tab === t
                  ? "2px solid var(--w3-gray-900)"
                  : "2px solid transparent",
              color:
                tab === t ? "var(--w3-gray-900)" : "var(--w3-gray-500)",
              cursor: "pointer",
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            {t === "read" ? <Eye size={13} /> : <Edit3 size={13} />}
            {t === "read" ? "Read" : "Write"}
          </button>
        ))}
      </div>

      {/* Function list */}
      <div style={{ padding: "8px 10px" }}>
        {fns.map((fn) => {
          const isSelected = selectedFn === fn.name;
          return (
            <div key={fn.name}>
              <button
                onClick={() =>
                  setSelectedFn(isSelected ? null : fn.name)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: isSelected
                    ? "var(--w3-glass-inner-bg)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  textAlign: "left",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily:
                        '"Geist Mono", ui-monospace, monospace',
                      color: "var(--w3-gray-900)",
                    }}
                  >
                    {fn.name}
                  </span>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--w3-gray-500)",
                    }}
                  >
                    {fn.description}
                  </div>
                </div>
                <span
                  style={{ fontSize: 11, color: "var(--w3-gray-400)" }}
                >
                  {fn.inputs} {fn.inputs === 1 ? "input" : "inputs"}
                </span>
              </button>

              {/* Inputs + Execute */}
              {isSelected && (
                <div style={{ padding: "6px 10px 10px" }}>
                  {fn.inputs > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        marginBottom: 8,
                      }}
                    >
                      {Array.from({ length: fn.inputs }).map(
                        (_, idx) => (
                          <input
                            key={idx}
                            placeholder={
                              fn.name === "balanceOf"
                                ? "address"
                                : fn.name === "transfer"
                                  ? idx === 0
                                    ? "recipient (address)"
                                    : "amount (uint256)"
                                  : idx === 0
                                    ? "spender (address)"
                                    : "amount (uint256)"
                            }
                            readOnly
                            style={{
                              padding: "6px 10px",
                              borderRadius: 8,
                              border:
                                "1px solid var(--w3-border-subtle)",
                              background: "var(--w3-glass-inner-bg)",
                              fontSize: 12,
                              fontFamily:
                                '"Geist Mono", ui-monospace, monospace',
                              color: "var(--w3-gray-700)",
                              outline: "none",
                            }}
                          />
                        ),
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => handleExecute(fn.name)}
                    style={{
                      width: "100%",
                      padding: "7px 12px",
                      borderRadius: 8,
                      border: "none",
                      background: "var(--w3-gray-900)",
                      color: "var(--w3-gray-100)",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    }}
                  >
                    <Play size={12} />
                    Execute {fn.name}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result area */}
      {result && (
        <div
          style={{
            borderTop: "1px solid var(--w3-border-subtle)",
            padding: "8px 14px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              marginBottom: 4,
            }}
          >
            Result
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ChevronRight size={12} style={{ color: "#22c55e" }} />
            <span
              style={{
                fontSize: 12,
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                color: "var(--w3-gray-900)",
              }}
            >
              {result}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
