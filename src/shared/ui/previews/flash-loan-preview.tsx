import { useState, useEffect } from "react";
import { Zap, ChevronDown } from "lucide-react";
import { domainLogo, cryptoLogo, preloadDomainLogos, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const PROTOCOLS = [
  { id: "aave", name: "Aave", domain: "aave.com", fee: 0.0009 },
  { id: "dydx", name: "dYdX", domain: "dydx.exchange", fee: 0.0 },
];

const TOKENS = [
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDC", name: "USD Coin" },
];

export function FlashLoanPreview() {
  useEffect(() => {
    preloadDomainLogos(PROTOCOLS.map((p) => p.domain));
    preloadCryptoLogos(TOKENS.map((t) => t.symbol));
  }, []);

  const [protocolIdx, setProtocolIdx] = useState(0);
  const [tokenIdx, setTokenIdx] = useState(0);
  const [amount, setAmount] = useState("1000");
  const [showDropdown, setShowDropdown] = useState(false);

  const protocol = PROTOCOLS[protocolIdx];
  const token = TOKENS[tokenIdx];
  const fee =
    parseFloat(amount || "0") > 0
      ? (parseFloat(amount) * protocol.fee).toFixed(4)
      : "0.00";

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={previewHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Zap size={16} style={{ color: "#f59e0b" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Flash Loan
          </span>
        </div>
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Protocol selector */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--w3-gray-500)", display: "block", marginBottom: 6 }}>
            Protocol
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {PROTOCOLS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setProtocolIdx(i)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: protocolIdx === i
                    ? "1px solid var(--w3-gray-900)"
                    : "1px solid var(--w3-border-subtle)",
                  background: protocolIdx === i
                    ? "var(--w3-glass-inner-bg)"
                    : "transparent",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <img
                  src={domainLogo(p.domain, 40)}
                  alt={p.name}
                  width={20}
                  height={20}
                  style={{ borderRadius: "50%" }}
                  loading="lazy"
                />
                {p.name}
                <span style={{ fontSize: 11, color: "var(--w3-gray-400)" }}>
                  {(p.fee * 100).toFixed(2)}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Token + Amount */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--w3-gray-500)", display: "block", marginBottom: 6 }}>
            Token & Amount
          </span>
          <div
            style={{
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) =>
                  /^\d*\.?\d*$/.test(e.target.value) && setAmount(e.target.value)
                }
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  fontFamily: monoFont,
                  fontVariantNumeric: "tabular-nums",
                }}
              />
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: "none",
                    background: "var(--w3-glass-inner-bg)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={cryptoLogo(token.symbol)}
                    alt={token.symbol}
                    width={16}
                    height={16}
                    style={{ borderRadius: "50%" }}
                  />
                  {token.symbol}
                  <ChevronDown size={12} style={{ color: "var(--w3-gray-400)" }} />
                </button>
                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 4px)",
                      minWidth: 140,
                      borderRadius: 8,
                      border: "1px solid var(--w3-border-subtle)",
                      background: "var(--w3-surface-elevated)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      padding: 4,
                      zIndex: 10,
                    }}
                  >
                    {TOKENS.map((t, i) => (
                      <button
                        key={t.symbol}
                        onClick={() => {
                          setTokenIdx(i);
                          setShowDropdown(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          width: "100%",
                          padding: "7px 10px",
                          borderRadius: 6,
                          border: "none",
                          background: tokenIdx === i ? "var(--w3-glass-inner-bg)" : "transparent",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--w3-gray-900)",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={cryptoLogo(t.symbol)}
                          alt={t.symbol}
                          width={16}
                          height={16}
                          style={{ borderRadius: "50%" }}
                        />
                        {t.symbol}
                        <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>{t.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Fee row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "7px 12px",
                borderTop: "1px solid var(--w3-border-subtle)",
                background: "var(--w3-glass-inner-bg)",
              }}
            >
              <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
                Fee ({(protocol.fee * 100).toFixed(2)}%)
              </span>
              <span style={{ fontSize: 11, color: "var(--w3-gray-500)", fontFamily: monoFont }}>
                {fee} {token.symbol}
              </span>
            </div>
          </div>
        </div>

        {/* Execute button */}
        <button
          disabled={!amount || parseFloat(amount) <= 0}
          style={{
            width: "100%",
            padding: "9px 0",
            borderRadius: 8,
            border: "none",
            background:
              amount && parseFloat(amount) > 0
                ? "var(--w3-accent)"
                : "var(--w3-gray-300)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor:
              amount && parseFloat(amount) > 0 ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            opacity: amount && parseFloat(amount) > 0 ? 1 : 0.5,
          }}
        >
          <Zap size={13} />
          Execute Flash Loan
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--w3-border-subtle)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
          Loan is repaid within the same transaction
        </span>
      </div>
    </div>
  );
}
