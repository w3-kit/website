import { Shield, ShieldCheck, ShieldAlert, Check, AlertTriangle } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";

const ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const SCORE = 88;

const checks = [
  { name: "Ownership Renounced", desc: "Contract ownership has been renounced", status: "safe" as const },
  { name: "No Proxy Contract", desc: "Direct implementation, no upgradeable proxy", status: "safe" as const },
  { name: "Liquidity Locked", desc: "LP tokens locked for 12 months", status: "safe" as const },
  { name: "Mint Function", desc: "Owner can mint new tokens", status: "warning" as const },
  { name: "Verified Source", desc: "Source code verified on Etherscan", status: "safe" as const },
];

const safeCount = checks.filter((c) => c.status === "safe").length;
const warnCount = checks.filter((c) => c.status === "warning").length;

export function SmartContractScannerPreview() {
  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Shield size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Security Audit</span>
        </div>
      </div>

      {/* Contract info + Score — side by side */}
      <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: 20 }}>
        {/* Score */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            border: `3px solid ${SCORE >= 70 ? "#22c55e" : SCORE >= 40 ? "#f59e0b" : "#ef4444"}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "var(--w3-gray-900)", lineHeight: 1 }}>{SCORE}</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#22c55e", marginTop: 6 }}>Low Risk</span>
        </div>

        {/* Contract details */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 4 }}>Contract</div>
            <span style={{ fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-900)", padding: "4px 8px", borderRadius: 6, background: "var(--w3-surface-elevated)", display: "inline-block" }}>
              {truncateAddress(ADDRESS)}
            </span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 13, color: "var(--w3-gray-600)" }}>{safeCount} passed</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
              <span style={{ fontSize: 13, color: "var(--w3-gray-600)" }}>{warnCount} warning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div style={{ margin: "0 20px", borderTop: "1px solid var(--w3-border-subtle)" }} />

      {/* Check list */}
      <div style={{ padding: "12px 20px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 8, padding: "0 14px" }}>
          Checks
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {checks.map((c) => {
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

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {safeCount}/{checks.length} checks passed
        </span>
      </div>
    </div>
  );
}
