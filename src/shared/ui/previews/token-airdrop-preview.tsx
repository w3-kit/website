import { useState } from "react";
import { Gift, Check } from "lucide-react";

interface MockAirdrop {
  id: string;
  tokenSymbol: string;
  tokenName: string;
  amount: string;
  status: "claimable" | "claimed";
  startDate: string;
  endDate: string;
}

const MOCK_AIRDROPS: MockAirdrop[] = [
  {
    id: "1",
    tokenSymbol: "ARB",
    tokenName: "Arbitrum",
    amount: "1,250",
    status: "claimable",
    startDate: "Mar 15, 2026",
    endDate: "Apr 30, 2026",
  },
  {
    id: "2",
    tokenSymbol: "OP",
    tokenName: "Optimism",
    amount: "480",
    status: "claimed",
    startDate: "Jan 10, 2026",
    endDate: "Mar 01, 2026",
  },
];

export function TokenAirdropPreview() {
  const [claiming, setClaiming] = useState<string | null>(null);
  const [airdrops, setAirdrops] = useState(MOCK_AIRDROPS);

  const handleClaim = (id: string) => {
    setClaiming(id);
    setTimeout(() => {
      setAirdrops((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: "claimed" as const } : a,
        ),
      );
      setClaiming(null);
    }, 1500);
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
        <Gift size={14} style={{ color: "var(--w3-gray-500)" }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--w3-gray-900)",
          }}
        >
          Token Airdrops
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: "var(--w3-gray-500)",
          }}
        >
          {airdrops.length} airdrops
        </span>
      </div>

      {/* Airdrop entries */}
      <div>
        {airdrops.map((airdrop, i) => {
          const isClaiming = claiming === airdrop.id;
          const isClaimable = airdrop.status === "claimable";
          return (
            <div
              key={airdrop.id}
              style={{
                padding: "12px 14px",
                borderBottom:
                  i < airdrops.length - 1
                    ? "1px solid var(--w3-border-subtle)"
                    : "none",
              }}
            >
              {/* Top row: token info + status/action */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {/* Token icon placeholder */}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isClaimable
                        ? "var(--w3-accent-subtle)"
                        : "var(--w3-glass-inner-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 600,
                      color: isClaimable
                        ? "var(--w3-accent)"
                        : "var(--w3-gray-500)",
                      flexShrink: 0,
                    }}
                  >
                    {airdrop.tokenSymbol.slice(0, 2)}
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
                        }}
                      >
                        {airdrop.amount} {airdrop.tokenSymbol}
                      </span>
                      {!isClaimable && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 500,
                            padding: "1px 6px",
                            borderRadius: 6,
                            background: "rgba(34,197,94,0.1)",
                            color: "#22c55e",
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <Check size={9} />
                          Claimed
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--w3-gray-500)",
                      }}
                    >
                      {airdrop.tokenName}
                    </span>
                  </div>
                </div>

                {isClaimable && (
                  <button
                    onClick={() => handleClaim(airdrop.id)}
                    disabled={isClaiming}
                    style={{
                      padding: "5px 14px",
                      borderRadius: 8,
                      border: "none",
                      background: "var(--w3-gray-900)",
                      color: "var(--w3-gray-100)",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: isClaiming ? "not-allowed" : "pointer",
                      opacity: isClaiming ? 0.6 : 1,
                      transition: "opacity 0.15s",
                      flexShrink: 0,
                    }}
                  >
                    {isClaiming ? "Claiming..." : "Claim"}
                  </button>
                )}
              </div>

              {/* Date row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--w3-gray-500)",
                }}
              >
                <span>Start: {airdrop.startDate}</span>
                <span>End: {airdrop.endDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
