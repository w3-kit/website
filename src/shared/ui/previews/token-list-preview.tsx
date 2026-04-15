const TOKENS = [
  { symbol: "ETH", name: "Ethereum", balance: "4.2100", price: 3_355.18 },
  { symbol: "USDC", name: "USD Coin", balance: "2,500.00", price: 1.0 },
  { symbol: "LINK", name: "Chainlink", balance: "85.0000", price: 14.82 },
  { symbol: "UNI", name: "Uniswap", balance: "120.0000", price: 7.43 },
];

function fmtCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtBalance(b: string) {
  const n = parseFloat(b.replace(/,/g, ""));
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return b;
}

export function TokenListPreview() {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
      }}
    >
      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 90px 100px",
          gap: 8,
          padding: "8px 16px",
          borderBottom: "1px solid var(--w3-border-subtle)",
          fontSize: 10,
          color: "var(--w3-gray-500)",
        }}
      >
        <span>Token</span>
        <span style={{ textAlign: "right" }}>Balance</span>
        <span style={{ textAlign: "right" }}>Value</span>
      </div>

      {/* Rows */}
      {TOKENS.map((t, i) => {
        const raw = parseFloat(t.balance.replace(/,/g, ""));
        const value = raw * t.price;

        return (
          <div
            key={t.symbol}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 90px 100px",
              gap: 8,
              alignItems: "center",
              padding: "10px 16px",
              borderBottom: i < TOKENS.length - 1 ? "1px solid var(--w3-border-subtle)" : "none",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "var(--w3-glass-inner-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
            }}
          >
            {/* Token info */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "var(--w3-glass-inner-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 600,
                  color: "var(--w3-gray-700)",
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  flexShrink: 0,
                }}
              >
                {t.symbol.slice(0, 4)}
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.name}
                </p>
                <p style={{ fontSize: 11, color: "var(--w3-gray-500)", margin: 0 }}>{t.symbol}</p>
              </div>
            </div>

            {/* Balance */}
            <span
              style={{
                fontSize: 13,
                color: "var(--w3-gray-900)",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmtBalance(t.balance)}
            </span>

            {/* Value */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--w3-gray-900)",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmtCurrency(value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
