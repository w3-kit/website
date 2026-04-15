import { useState } from "react";
import { Clock, Lock } from "lucide-react";

export function TokenVestingPreview() {
  const [claiming, setClaiming] = useState(false);

  const totalAmount = 100000;
  const vestedAmount = 42500;
  const claimableAmount = 12500;
  const progress = (vestedAmount / totalAmount) * 100;

  const handleClaim = () => {
    setClaiming(true);
    setTimeout(() => setClaiming(false), 1500);
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
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 14px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <Clock size={14} style={{ color: "var(--w3-gray-500)" }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--w3-gray-900)",
          }}
        >
          Token Vesting
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            fontWeight: 500,
            padding: "2px 7px",
            borderRadius: 6,
            background: "rgba(34,197,94,0.1)",
            color: "#22c55e",
          }}
        >
          Active
        </span>
      </div>

      <div style={{ padding: 14 }}>
        {/* Token + amounts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "var(--w3-accent-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 600,
                color: "var(--w3-accent)",
                flexShrink: 0,
              }}
            >
              W3
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--w3-gray-900)",
              }}
            >
              W3K Token
            </span>
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              color: "var(--w3-gray-900)",
            }}
          >
            {vestedAmount.toLocaleString()} / {totalAmount.toLocaleString()}
          </span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: 6,
            borderRadius: 3,
            background: "var(--w3-glass-inner-bg)",
            overflow: "hidden",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: 3,
              background: "var(--w3-gray-900)",
              transition: "width 0.3s",
            }}
          />
        </div>

        {/* Progress label */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "var(--w3-gray-500)",
            marginBottom: 14,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span>{progress.toFixed(1)}% vested</span>
          <span>{(totalAmount - vestedAmount).toLocaleString()} remaining</span>
        </div>

        {/* Schedule details */}
        <div
          style={{
            borderRadius: 10,
            background: "var(--w3-glass-inner-bg)",
            padding: 12,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--w3-gray-500)",
                  marginBottom: 2,
                }}
              >
                Cliff Date
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Lock size={10} style={{ color: "var(--w3-gray-400)" }} />
                Jun 15, 2025
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--w3-gray-500)",
                  marginBottom: 2,
                }}
              >
                End Date
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                }}
              >
                Jun 15, 2027
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--w3-gray-500)",
                  marginBottom: 2,
                }}
              >
                Claimable Now
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#22c55e",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {claimableAmount.toLocaleString()} W3K
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--w3-gray-500)",
                  marginBottom: 2,
                }}
              >
                Release
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                }}
              >
                Linear / monthly
              </div>
            </div>
          </div>
        </div>

        {/* Claim button */}
        <button
          onClick={handleClaim}
          disabled={claiming}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: "var(--w3-gray-900)",
            color: "var(--w3-gray-100)",
            fontSize: 12,
            fontWeight: 500,
            cursor: claiming ? "not-allowed" : "pointer",
            opacity: claiming ? 0.6 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {claiming
            ? "Claiming..."
            : `Claim ${claimableAmount.toLocaleString()} W3K`}
        </button>
      </div>
    </div>
  );
}
