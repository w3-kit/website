const ORDERS = [
  {
    id: "1",
    type: "Buy" as const,
    token: "ETH",
    amount: "2.5",
    price: "3,180.00",
    status: "active" as const,
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "Sell" as const,
    token: "ETH",
    amount: "1.0",
    price: "3,450.00",
    status: "filled" as const,
    timestamp: "1 hr ago",
  },
  {
    id: "3",
    type: "Buy" as const,
    token: "USDC",
    amount: "5,000",
    price: "1.00",
    status: "active" as const,
    timestamp: "3 hr ago",
  },
];

function statusStyle(status: "active" | "filled" | "cancelled") {
  switch (status) {
    case "active":
      return { bg: "rgba(59,130,246,0.12)", color: "#3b82f6", dot: "#3b82f6" };
    case "filled":
      return { bg: "rgba(34,197,94,0.12)", color: "#22c55e", dot: "#22c55e" };
    case "cancelled":
      return { bg: "rgba(239,68,68,0.12)", color: "#ef4444", dot: "#ef4444" };
  }
}

function typeBadgeStyle(type: "Buy" | "Sell") {
  return type === "Buy"
    ? { bg: "rgba(34,197,94,0.12)", color: "#22c55e" }
    : { bg: "rgba(239,68,68,0.12)", color: "#ef4444" };
}

export function LimitOrderPreview() {
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
          justifyContent: "space-between",
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
          Limit Orders
        </span>
        <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
          {ORDERS.length} orders
        </span>
      </div>

      {/* Orders */}
      {ORDERS.map((order, i) => {
        const sStyle = statusStyle(order.status);
        const tStyle = typeBadgeStyle(order.type);

        return (
          <div
            key={order.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderBottom:
                i < ORDERS.length - 1
                  ? "1px solid var(--w3-border-subtle)"
                  : "none",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              {/* Token icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--w3-accent-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--w3-accent)",
                }}
              >
                {order.token.charAt(0)}
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
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {order.amount} {order.token}
                  </span>
                  {/* Status badge */}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      padding: "1px 6px",
                      borderRadius: 6,
                      background: sStyle.bg,
                      color: sStyle.color,
                      textTransform: "capitalize",
                    }}
                  >
                    {order.status}
                  </span>
                  {/* Type badge */}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      padding: "1px 6px",
                      borderRadius: 4,
                      background: tStyle.bg,
                      color: tStyle.color,
                    }}
                  >
                    {order.type}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--w3-gray-500)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  @ ${order.price} · {order.timestamp}
                </span>
              </div>
            </div>

            {/* Status dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: sStyle.dot,
                flexShrink: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
