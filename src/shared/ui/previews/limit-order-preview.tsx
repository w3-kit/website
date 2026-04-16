import { useEffect } from "react";
import { ListOrdered, X } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const ORDERS = [
  {
    id: "1",
    type: "buy" as const,
    token: "ETH",
    amount: "2.5",
    price: "3,180.00",
    status: "active" as const,
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "sell" as const,
    token: "ETH",
    amount: "1.0",
    price: "3,450.00",
    status: "filled" as const,
    timestamp: "1 hr ago",
  },
  {
    id: "3",
    type: "buy" as const,
    token: "USDC",
    amount: "5,000",
    price: "1.00",
    status: "active" as const,
    timestamp: "3 hr ago",
  },
];

const activeCount = ORDERS.filter((o) => o.status === "active").length;

function statusStyle(status: "active" | "filled" | "cancelled") {
  switch (status) {
    case "active":
      return { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" };
    case "filled":
      return { bg: "rgba(34,197,94,0.12)", color: "#22c55e" };
    case "cancelled":
      return { bg: "rgba(161,161,170,0.15)", color: "#a1a1aa" };
  }
}

function typeBadgeStyle(type: "buy" | "sell") {
  return type === "buy"
    ? { bg: "rgba(16,185,129,0.12)", color: "#10b981" }
    : { bg: "rgba(239,68,68,0.12)", color: "#ef4444" };
}

export function LimitOrderPreview() {
  useEffect(() => {
    preloadCryptoLogos(ORDERS.map((o) => o.token));
  }, []);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ListOrdered size={16} style={{ color: "var(--w3-gray-900)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Limit Orders
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 18,
              minWidth: 18,
              padding: "0 5px",
              borderRadius: 9,
              background: "rgba(59,130,246,0.12)",
              color: "#3b82f6",
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {activeCount}
          </span>
        </div>
        <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
          {ORDERS.length} orders
        </span>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, padding: "10px 16px 4px" }}>
        {(["Active", "Filled", "All"] as const).map((label, i) => (
          <span
            key={label}
            style={{
              padding: "3px 10px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 500,
              background: i === 0 ? "var(--w3-gray-900)" : "transparent",
              color: i === 0 ? "#fff" : "var(--w3-gray-500)",
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Orders */}
      {ORDERS.map((order, _i) => {
        const sStyle = statusStyle(order.status);
        const tStyle = typeBadgeStyle(order.type);

        return (
          <div
            key={order.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderTop: "1px solid var(--w3-border-subtle)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src={cryptoLogo(order.token)}
                alt={order.token}
                width={32}
                height={32}
                style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                loading="lazy"
              />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      padding: "2px 5px",
                      borderRadius: 4,
                      background: tStyle.bg,
                      color: tStyle.color,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {order.type}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--w3-gray-900)",
                      fontVariantNumeric: "tabular-nums",
                      fontFamily: monoFont,
                    }}
                  >
                    {order.amount} {order.token}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--w3-gray-500)",
                    fontVariantNumeric: "tabular-nums",
                    fontFamily: monoFont,
                  }}
                >
                  @ ${order.price} · {order.timestamp}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  padding: "2px 7px",
                  borderRadius: 8,
                  background: sStyle.bg,
                  color: sStyle.color,
                  textTransform: "capitalize",
                }}
              >
                {order.status}
              </span>
              {order.status === "active" && (
                <X
                  size={12}
                  style={{ color: "var(--w3-gray-400)", cursor: "pointer", flexShrink: 0 }}
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--w3-border-subtle)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
          {ORDERS.length} orders total
        </span>
      </div>
    </div>
  );
}
