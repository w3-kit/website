import { useState } from "react";
import { Fuel, Zap, ArrowLeftRight, Image, FileCode } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";

type Speed = "economy" | "standard" | "fast";
type TxType = "transfer" | "swap" | "nft" | "contract";

interface SpeedOption { key: Speed; label: string; gwei: number; time: string; }
interface TxTypeOption { key: TxType; label: string; icon: typeof Zap; gasLimit: number; }

const SPEEDS: SpeedOption[] = [
  { key: "economy", label: "Economy", gwei: 12, time: "~2 min" },
  { key: "standard", label: "Standard", gwei: 18, time: "~30s" },
  { key: "fast", label: "Fast", gwei: 25, time: "~15s" },
];

const TX_TYPES: TxTypeOption[] = [
  { key: "transfer", label: "Transfer", icon: Zap, gasLimit: 21000 },
  { key: "swap", label: "Swap", icon: ArrowLeftRight, gasLimit: 150000 },
  { key: "nft", label: "NFT Mint", icon: Image, gasLimit: 120000 },
  { key: "contract", label: "Contract", icon: FileCode, gasLimit: 200000 },
];

const ETH_PRICE = 3420;

function formatEth(wei: number): string {
  const eth = wei / 1e18;
  if (eth < 0.0001) return "<0.0001";
  return eth.toFixed(eth < 0.01 ? 6 : 4);
}

function formatUsd(wei: number): string {
  const usd = (wei / 1e18) * ETH_PRICE;
  return `$${usd.toFixed(2)}`;
}

export function GasCalculatorPreview() {
  const [speed, setSpeed] = useState<Speed>("standard");
  const [txType, setTxType] = useState<TxType>("transfer");

  const currentSpeed = SPEEDS.find((s) => s.key === speed)!;
  const currentTx = TX_TYPES.find((t) => t.key === txType)!;
  const costWei = currentSpeed.gwei * 1e9 * currentTx.gasLimit;

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Fuel size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Gas Estimator</span>
        </div>
        <span style={{ fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-500)" }}>
          ETH ${ETH_PRICE.toLocaleString()}
        </span>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Transaction type */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 8 }}>
            Transaction Type
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {TX_TYPES.map((t) => {
              const isActive = txType === t.key;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setTxType(t.key)}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    padding: "8px 4px", borderRadius: 10,
                    border: isActive ? "1.5px solid var(--w3-accent)" : "1px solid var(--w3-border-subtle)",
                    background: isActive ? "var(--w3-accent-subtle)" : "transparent",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  <Icon size={14} style={{ color: isActive ? "var(--w3-accent)" : "var(--w3-gray-500)" }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? "var(--w3-gray-900)" : "var(--w3-gray-600)" }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Speed */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 8 }}>
            Speed
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {SPEEDS.map((s) => {
              const isActive = speed === s.key;
              const cost = s.gwei * 1e9 * currentTx.gasLimit;
              return (
                <button
                  key={s.key}
                  onClick={() => setSpeed(s.key)}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    padding: "12px 8px", borderRadius: 12,
                    border: isActive ? "1.5px solid var(--w3-accent)" : "1px solid var(--w3-border-subtle)",
                    background: isActive ? "var(--w3-accent-subtle)" : "transparent",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>{s.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, fontFamily: monoFont, color: isActive ? "var(--w3-accent)" : "var(--w3-gray-900)" }}>{s.gwei} gwei</span>
                  <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>{s.time}</span>
                  <span style={{ fontSize: 11, fontFamily: monoFont, color: "var(--w3-gray-500)" }}>{formatUsd(cost)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cost breakdown */}
        <div style={{ borderRadius: 12, padding: "14px 16px", background: "var(--w3-glass-inner-bg)", border: "1px solid var(--w3-border-subtle)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>Estimated Cost</span>
            <span style={{ fontSize: 11, fontFamily: monoFont, color: "var(--w3-gray-500)" }}>{currentTx.gasLimit.toLocaleString()} gas</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, fontFamily: monoFont, color: "var(--w3-gray-900)" }}>
              {formatEth(costWei)} ETH
            </span>
            <span style={{ fontSize: 14, color: "var(--w3-gray-600)" }}>
              {formatUsd(costWei)}
            </span>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: "var(--w3-gray-500)" }}>
            <span>Base: 10 gwei</span>
            <span>Priority: {currentSpeed.gwei - 10} gwei</span>
            <span>Total: {currentSpeed.gwei} gwei</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>Ethereum mainnet</span>
      </div>
    </div>
  );
}
