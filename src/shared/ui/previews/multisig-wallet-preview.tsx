import { useState } from "react";
import { Check, X, Clock } from "lucide-react";

const SIGNERS = [
  { name: "Alice", address: "0x1234...5678", approved: true },
  { name: "Bob", address: "0xaBcD...eF01", approved: true },
  { name: "Carol", address: "0x9876...5432", approved: false },
];

const PENDING_TX = {
  id: "tx-1",
  description: "Transfer to Treasury",
  to: "0xdead...beef",
  value: "1.5",
  approvals: 2,
  required: 3,
};

function truncateAddress(addr: string) {
  return addr.length > 13 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;
}

export function MultisigWalletPreview() {
  const [approvals, setApprovals] = useState(PENDING_TX.approvals);
  const [signers, setSigners] = useState(SIGNERS);

  const handleApprove = () => {
    if (approvals < PENDING_TX.required) {
      setApprovals((a) => a + 1);
      setSigners((prev) =>
        prev.map((s, i) => (i === 2 ? { ...s, approved: true } : s)),
      );
    }
  };

  const progress = Math.min((approvals / PENDING_TX.required) * 100, 100);
  const isComplete = approvals >= PENDING_TX.required;

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
            Multisig Wallet
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              color: "var(--w3-gray-500)",
            }}
          >
            0x7a25...3fC8
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 8,
          }}
        >
          <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
            {PENDING_TX.required} of {SIGNERS.length} required
          </span>
          {/* Signer avatars */}
          <div style={{ display: "flex", marginLeft: -2 }}>
            {signers.map((s, i) => (
              <div
                key={i}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: s.approved
                    ? "var(--w3-accent-subtle)"
                    : "var(--w3-glass-inner-bg)",
                  border: "2px solid var(--w3-surface-elevated)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 600,
                  color: s.approved
                    ? "var(--w3-accent)"
                    : "var(--w3-gray-500)",
                  marginLeft: i > 0 ? -4 : 0,
                  position: "relative",
                  zIndex: SIGNERS.length - i,
                }}
              >
                {s.name.charAt(0)}
              </div>
            ))}
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 500,
              color: isComplete ? "#22c55e" : "#f59e0b",
            }}
          >
            <Clock size={11} />
            {isComplete ? "Ready" : "1 pending"}
          </div>
        </div>
      </div>

      {/* Signers */}
      <div
        style={{
          padding: "8px 14px",
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
          Signers
        </span>
        <div
          style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}
        >
          {signers.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: s.approved ? "#22c55e" : "var(--w3-gray-300)",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                  }}
                >
                  {s.name}
                </span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  color: "var(--w3-gray-500)",
                }}
              >
                {s.address}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Transaction */}
      <div style={{ padding: "10px 14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--w3-gray-900)",
              }}
            >
              {PENDING_TX.description}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                padding: "1px 6px",
                borderRadius: 6,
                background: isComplete
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(245,158,11,0.12)",
                color: isComplete ? "#22c55e" : "#f59e0b",
              }}
            >
              {isComplete ? "Ready" : "Pending"}
            </span>
          </div>
          <span
            style={{
              fontSize: 11,
              color: "var(--w3-gray-500)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {PENDING_TX.value} ETH
          </span>
        </div>

        {/* To address */}
        <div style={{ marginTop: 4 }}>
          <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
            To:{" "}
            <span
              style={{
                fontFamily: '"Geist Mono", ui-monospace, monospace',
              }}
            >
              {PENDING_TX.to}
            </span>
          </span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontVariantNumeric: "tabular-nums",
              color: "var(--w3-gray-500)",
            }}
          >
            {approvals}/{PENDING_TX.required}
          </span>
          <div
            style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              background: "var(--w3-glass-inner-bg)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: 3,
                background: isComplete ? "#22c55e" : "#f59e0b",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Approve / Reject buttons */}
        {!isComplete && (
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <button
              onClick={handleApprove}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "6px 0",
                borderRadius: 8,
                border: "none",
                background: "var(--w3-accent)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Check size={12} /> Approve
            </button>
            <button
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "6px 0",
                borderRadius: 8,
                border: "1px solid var(--w3-border-subtle)",
                background: "transparent",
                color: "var(--w3-gray-600)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <X size={12} /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
