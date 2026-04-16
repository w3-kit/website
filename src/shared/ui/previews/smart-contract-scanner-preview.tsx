import { useState, useCallback, useRef, useEffect } from "react";
import { Shield, ShieldCheck, ShieldAlert, Search, Loader2 } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";

const MOCK_RESULTS: Record<string, { score: number; label: string; color: string; checks: { name: string; desc: string; status: "safe" | "warning" }[] }> = {
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
    score: 92, label: "Low Risk", color: "#22c55e",
    checks: [
      { name: "Ownership Renounced", desc: "Contract ownership has been renounced", status: "safe" },
      { name: "No Proxy Contract", desc: "Direct implementation, no upgradeable proxy", status: "safe" },
      { name: "Liquidity Locked", desc: "LP tokens locked for 12 months", status: "safe" },
      { name: "Verified Source", desc: "Source code verified on Etherscan", status: "safe" },
      { name: "No Mint Function", desc: "Owner cannot mint new tokens", status: "safe" },
    ],
  },
  default: {
    score: 64, label: "Medium Risk", color: "#f59e0b",
    checks: [
      { name: "Ownership Active", desc: "Contract still has an active owner", status: "warning" },
      { name: "No Proxy Contract", desc: "Direct implementation", status: "safe" },
      { name: "Liquidity Unlocked", desc: "LP tokens are not locked", status: "warning" },
      { name: "Mint Function", desc: "Owner can mint new tokens", status: "warning" },
      { name: "Verified Source", desc: "Source code verified", status: "safe" },
    ],
  },
};

type State = "idle" | "scanning" | "results";

export function SmartContractScannerPreview() {
  const [state, setState] = useState<State>("idle");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<typeof MOCK_RESULTS["default"] | null>(null);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safe = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);

  const handleScan = () => {
    if (!address.trim()) return;
    setState("scanning");
    safe(() => {
      const r = MOCK_RESULTS[address.trim()] ?? MOCK_RESULTS["default"];
      setResult(r);
      setState("results");
    }, 1500);
  };

  const handleReset = () => {
    setState("idle");
    setAddress("");
    setResult(null);
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Shield size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Security Audit</span>
        </div>
        {state === "results" && (
          <button onClick={handleReset} style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-accent)", background: "none", border: "none", cursor: "pointer" }}>
            New scan
          </button>
        )}
      </div>

      {/* IDLE — Address input */}
      {state === "idle" && (
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 8 }}>
            Contract Address
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="0x... paste contract address"
              style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-900)", outline: "none" }}
            />
            <button
              onClick={handleScan}
              disabled={!address.trim()}
              style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: address.trim() ? "var(--w3-accent)" : "var(--w3-gray-300)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: address.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 6, opacity: address.trim() ? 1 : 0.5 }}
            >
              <Search size={14} />
              Scan
            </button>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--w3-gray-500)" }}>
            Try: <button onClick={() => setAddress("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")} style={{ fontFamily: monoFont, fontSize: 12, color: "var(--w3-accent)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>USDC contract</button>
          </div>
        </div>
      )}

      {/* SCANNING — Loading */}
      {state === "scanning" && (
        <div style={{ padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <Loader2 size={32} style={{ color: "var(--w3-accent)", animation: "spin 1s linear infinite" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>Scanning contract...</div>
            <div style={{ fontSize: 13, color: "var(--w3-gray-500)", fontFamily: monoFont, marginTop: 4 }}>{truncateAddress(address)}</div>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {state === "results" && result && (
        <>
          {/* Score + contract info */}
          <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", border: `3px solid ${result.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: "var(--w3-gray-900)", lineHeight: 1 }}>{result.score}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: result.color, marginTop: 6 }}>{result.label}</span>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 4 }}>Contract</div>
                <span style={{ fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-900)", padding: "4px 8px", borderRadius: 6, background: "var(--w3-surface-elevated)", display: "inline-block" }}>
                  {truncateAddress(address)}
                </span>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontSize: 13, color: "var(--w3-gray-600)" }}>{result.checks.filter((c) => c.status === "safe").length} passed</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ fontSize: 13, color: "var(--w3-gray-600)" }}>{result.checks.filter((c) => c.status === "warning").length} warnings</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ margin: "0 20px", borderTop: "1px solid var(--w3-border-subtle)" }} />

          {/* Check list */}
          <div style={{ padding: "12px 20px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 8, padding: "0 14px" }}>Checks</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {result.checks.map((c) => {
                const isSafe = c.status === "safe";
                const color = isSafe ? "#22c55e" : "#f59e0b";
                const Icon = isSafe ? ShieldCheck : ShieldAlert;
                return (
                  <div
                    key={c.name}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, transition: "background 0.15s", cursor: "default" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--w3-accent-subtle)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: isSafe ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>{c.name}</span>
                      <span style={{ fontSize: 12, color: "var(--w3-gray-500)", display: "block", marginTop: 1 }}>{c.desc}</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: isSafe ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)", color, flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                      {isSafe ? "Pass" : "Warn"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {state === "results" && result
            ? `${result.checks.filter((c) => c.status === "safe").length}/${result.checks.length} checks passed`
            : "Paste a contract address to scan"}
        </span>
      </div>
    </div>
  );
}
