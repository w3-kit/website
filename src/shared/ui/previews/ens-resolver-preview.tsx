import { useState } from "react";
import { Search, Copy, Check, User } from "lucide-react";

interface ResolvedResult {
  ensName: string;
  address: string;
}

export function ENSResolverPreview() {
  const [query, setQuery] = useState("vitalik.eth");
  const [resolved, setResolved] = useState<ResolvedResult | null>({
    ensName: "vitalik.eth",
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  });
  const [copied, setCopied] = useState<"name" | "address" | null>(null);

  const handleResolve = () => {
    if (query.endsWith(".eth")) {
      setResolved({
        ensName: query,
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      });
    } else if (query.startsWith("0x")) {
      setResolved({
        ensName: "vitalik.eth",
        address: query,
      });
    }
  };

  const handleCopy = (type: "name" | "address") => {
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

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
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--w3-gray-500)",
          }}
        >
          ENS Resolver
        </span>
      </div>

      <div style={{ padding: 14 }}>
        {/* Search input */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleResolve()}
            placeholder="vitalik.eth or 0x..."
            style={{
              flex: 1,
              padding: "7px 10px",
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              background: "var(--w3-glass-inner-bg)",
              fontSize: 12,
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              color: "var(--w3-gray-700)",
              outline: "none",
            }}
          />
          <button
            onClick={handleResolve}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: "none",
              background: "var(--w3-gray-900)",
              color: "var(--w3-gray-100)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Search size={14} />
          </button>
        </div>

        {/* Result */}
        {resolved ? (
          <div
            style={{
              borderRadius: 10,
              background: "var(--w3-glass-inner-bg)",
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* ENS name row */}
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
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--w3-accent-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <User
                    size={14}
                    style={{ color: "var(--w3-accent)" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "var(--w3-gray-500)",
                    }}
                  >
                    ENS Name
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--w3-gray-900)",
                    }}
                  >
                    {resolved.ensName}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy("name")}
                style={{
                  padding: 5,
                  background: "transparent",
                  border: "none",
                  color:
                    copied === "name"
                      ? "#22c55e"
                      : "var(--w3-gray-400)",
                  cursor: "pointer",
                  borderRadius: 6,
                }}
              >
                {copied === "name" ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            {/* Divider with arrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "var(--w3-border-subtle)",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--w3-gray-400)",
                }}
              >
                ↕
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "var(--w3-border-subtle)",
                }}
              />
            </div>

            {/* Address row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                  }}
                >
                  Address
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily:
                      '"Geist Mono", ui-monospace, monospace',
                    color: "var(--w3-gray-900)",
                  }}
                >
                  {truncateAddress(resolved.address)}
                </div>
              </div>
              <button
                onClick={() => handleCopy("address")}
                style={{
                  padding: 5,
                  background: "transparent",
                  border: "none",
                  color:
                    copied === "address"
                      ? "#22c55e"
                      : "var(--w3-gray-400)",
                  cursor: "pointer",
                  borderRadius: 6,
                }}
              >
                {copied === "address" ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "16px 0",
              fontSize: 12,
              color: "var(--w3-gray-400)",
            }}
          >
            Enter an ENS name or address to resolve
          </div>
        )}
      </div>
    </div>
  );
}
