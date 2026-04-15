import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

const MOCK_ENTRIES = [
  {
    id: "1",
    name: "Vitalik",
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    ensName: "vitalik.eth",
  },
  {
    id: "2",
    name: "Treasury",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    ensName: undefined,
  },
  {
    id: "3",
    name: "Deployer",
    address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    ensName: "deployer.eth",
  },
];

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function AddressBookPreview() {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [showForm, setShowForm] = useState(false);

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
          Address Book
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
            {entries.length} addresses
          </span>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--w3-gray-500)",
              cursor: "pointer",
            }}
          >
            {showForm ? <X size={13} /> : <Plus size={13} />}
          </button>
        </div>
      </div>

      {/* Add form (collapsed by default) */}
      {showForm && (
        <div
          style={{
            padding: "10px 14px",
            borderBottom: "1px solid var(--w3-border-subtle)",
            display: "flex",
            gap: 8,
          }}
        >
          <input
            placeholder="Name"
            readOnly
            style={{
              flex: 1,
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              background: "var(--w3-glass-inner-bg)",
              fontSize: 12,
              color: "var(--w3-gray-700)",
              outline: "none",
            }}
          />
          <input
            placeholder="0x..."
            readOnly
            style={{
              flex: 1,
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              background: "var(--w3-glass-inner-bg)",
              fontSize: 12,
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              color: "var(--w3-gray-700)",
              outline: "none",
            }}
          />
        </div>
      )}

      {/* Entries */}
      <div>
        {entries.map((entry, i) => (
          <div
            key={entry.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderBottom:
                i < entries.length - 1
                  ? "1px solid var(--w3-border-subtle)"
                  : "none",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                  }}
                >
                  {entry.name}
                </span>
                {entry.ensName && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      padding: "1px 6px",
                      borderRadius: 6,
                      background: "var(--w3-accent-subtle)",
                      color: "var(--w3-accent)",
                    }}
                  >
                    ENS
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  color: "var(--w3-gray-500)",
                }}
              >
                {truncateAddress(entry.address)}
              </span>
            </div>
            <button
              onClick={() =>
                setEntries((prev) => prev.filter((e) => e.id !== entry.id))
              }
              style={{
                padding: 4,
                background: "transparent",
                border: "none",
                color: "var(--w3-gray-400)",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
