import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Clock } from "lucide-react";

type TxStatus = "success" | "pending" | "failed";
type TxType = "send" | "receive" | "swap";

interface MockTx {
  id: string;
  type: TxType;
  hash: string;
  amount: string;
  symbol: string;
  status: TxStatus;
  time: string;
}

const MOCK_TXS: MockTx[] = [
  {
    id: "1",
    type: "send",
    hash: "0x8a3f...e4b2",
    amount: "0.25",
    symbol: "ETH",
    status: "success",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "receive",
    hash: "0xb1c7...9f03",
    amount: "1,200",
    symbol: "USDC",
    status: "success",
    time: "18 min ago",
  },
  {
    id: "3",
    type: "swap",
    hash: "0xf29d...7a11",
    amount: "0.5",
    symbol: "ETH",
    status: "pending",
    time: "34 min ago",
  },
  {
    id: "4",
    type: "send",
    hash: "0x3e0a...c8d5",
    amount: "500",
    symbol: "DAI",
    status: "success",
    time: "1 hr ago",
  },
];

const typeIcon: Record<TxType, typeof ArrowUpRight> = {
  send: ArrowUpRight,
  receive: ArrowDownLeft,
  swap: ArrowLeftRight,
};

const typeLabel: Record<TxType, string> = {
  send: "Sent",
  receive: "Received",
  swap: "Swap",
};

const statusColor: Record<TxStatus, string> = {
  success: "#22c55e",
  pending: "#f59e0b",
  failed: "#ef4444",
};

const statusLabel: Record<TxStatus, string> = {
  success: "Success",
  pending: "Pending",
  failed: "Failed",
};

export function TransactionHistoryPreview() {
  const [selected, setSelected] = useState<string | null>(null);

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
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--w3-gray-500)",
          }}
        >
          Transactions
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 500,
              color: "#f59e0b",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#f59e0b",
                display: "inline-block",
              }}
            />
            1
          </span>
          <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
            {MOCK_TXS.length} total
          </span>
        </div>
      </div>

      {/* Transaction list */}
      <div>
        {MOCK_TXS.map((tx, i) => {
          const Icon = typeIcon[tx.type];
          const isSelected = selected === tx.id;
          return (
            <div
              key={tx.id}
              onClick={() => setSelected(isSelected ? null : tx.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderBottom:
                  i < MOCK_TXS.length - 1
                    ? "1px solid var(--w3-border-subtle)"
                    : "none",
                cursor: "pointer",
                background: isSelected
                  ? "var(--w3-glass-inner-bg)"
                  : "transparent",
                transition: "background 0.15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      tx.type === "receive"
                        ? "rgba(34,197,94,0.1)"
                        : "var(--w3-glass-inner-bg)",
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    size={14}
                    style={{
                      color:
                        tx.type === "receive"
                          ? "#22c55e"
                          : "var(--w3-gray-500)",
                    }}
                  />
                </div>

                {/* Label + Hash */}
                <div style={{ minWidth: 0 }}>
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
                      {typeLabel[tx.type]}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        padding: "1px 6px",
                        borderRadius: 6,
                        background:
                          tx.status === "success"
                            ? "rgba(34,197,94,0.1)"
                            : tx.status === "pending"
                              ? "rgba(245,158,11,0.1)"
                              : "rgba(239,68,68,0.1)",
                        color: statusColor[tx.status],
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: statusColor[tx.status],
                          display: "inline-block",
                        }}
                      />
                      {statusLabel[tx.status]}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: '"Geist Mono", ui-monospace, monospace',
                      color: "var(--w3-gray-500)",
                    }}
                  >
                    {tx.hash}
                  </span>
                </div>
              </div>

              {/* Amount + Time */}
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                    color:
                      tx.type === "receive"
                        ? "#22c55e"
                        : "var(--w3-gray-900)",
                  }}
                >
                  {tx.type === "receive" ? "+" : tx.type === "send" ? "-" : ""}
                  {tx.amount} {tx.symbol}
                </span>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--w3-gray-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 3,
                  }}
                >
                  <Clock size={10} />
                  {tx.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
