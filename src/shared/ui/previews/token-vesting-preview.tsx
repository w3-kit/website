import { useState, useCallback, useRef, useEffect } from "react";
import { Clock, ChevronDown, Loader2, Check, Unlock } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";

interface Schedule {
  id: string;
  token: string;
  ticker: string;
  total: number;
  vested: number;
  claimable: number;
  claimed: number;
  cliff: string;
  end: string;
  status: "active" | "completed" | "pending";
}

const SCHEDULES: Schedule[] = [
  { id: "1", token: "W3K Token", ticker: "ETH", total: 100000, vested: 42500, claimable: 12500, claimed: 30000, cliff: "Jun 2025", end: "Jun 2027", status: "active" },
  { id: "2", token: "Governance", ticker: "ARB", total: 50000, vested: 50000, claimable: 0, claimed: 50000, cliff: "Jan 2025", end: "Jan 2026", status: "completed" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  active: { bg: "rgba(34,197,94,0.1)", color: "#22c55e", label: "Active" },
  completed: { bg: "var(--w3-surface-elevated)", color: "var(--w3-gray-600)", label: "Complete" },
  pending: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", label: "Pending" },
};

function fmt(n: number) { return n.toLocaleString("en-US"); }

export function TokenVestingPreview() {
  useEffect(() => { preloadCryptoLogos(SCHEDULES.map((s) => s.ticker)); }, []);

  const [expanded, setExpanded] = useState<string | null>("1");
  const [claiming, setClaiming] = useState<string | null>(null);
  const [claimedExtra, setClaimedExtra] = useState<Record<string, number>>({});

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safe = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);

  const handleClaim = (s: Schedule) => {
    if (s.claimable <= 0) return;
    setClaiming(s.id);
    safe(() => {
      setClaimedExtra((prev) => ({ ...prev, [s.id]: (prev[s.id] ?? 0) + s.claimable }));
      setClaiming(null);
    }, 1200);
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Clock size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Vesting</span>
          <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{SCHEDULES.length}</span>
        </div>
      </div>

      {/* Schedule list */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {SCHEDULES.map((s) => {
          const isExpanded = expanded === s.id;
          const extra = claimedExtra[s.id] ?? 0;
          const effectiveClaimable = Math.max(0, s.claimable - extra);
          const effectiveClaimed = s.claimed + extra;
          const progress = (s.vested / s.total) * 100;
          const st = STATUS_STYLE[s.status];
          const isClaiming = claiming === s.id;

          return (
            <div key={s.id} style={{ borderRadius: 12, overflow: "hidden", background: isExpanded ? "var(--w3-glass-inner-bg)" : "transparent", transition: "background 0.15s" }}>
              {/* Row */}
              <button
                onClick={() => setExpanded(isExpanded ? null : s.id)}
                style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "12px 14px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}
              >
                <img src={cryptoLogo(s.ticker)} alt="" width={32} height={32} style={{ borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>{s.token}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 5, background: st.bg, color: st.color }}>{st.label}</span>
                  </div>
                  <span style={{ fontSize: 13, color: "var(--w3-gray-600)", fontFamily: monoFont }}>{fmt(s.vested)} / {fmt(s.total)}</span>
                </div>
                <ChevronDown size={14} style={{ color: "var(--w3-gray-400)", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "none", flexShrink: 0 }} />
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Progress bar */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: "var(--w3-gray-500)", fontFamily: monoFont }}>{progress.toFixed(1)}% vested</span>
                      <span style={{ fontSize: 12, color: "var(--w3-gray-500)", fontFamily: monoFont }}>{fmt(s.total - s.vested)} remaining</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "var(--w3-border-subtle)", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 3, background: s.status === "completed" ? "#22c55e" : "var(--w3-accent)", width: `${progress}%`, transition: "width 0.3s" }} />
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--w3-surface-elevated)" }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 4 }}>Cliff</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>{s.cliff}</div>
                    </div>
                    <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--w3-surface-elevated)" }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 4 }}>End</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>{s.end}</div>
                    </div>
                    <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--w3-surface-elevated)" }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 4 }}>Claimed</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)", fontFamily: monoFont }}>{fmt(effectiveClaimed)}</div>
                    </div>
                    <div style={{ padding: "10px 12px", borderRadius: 10, background: effectiveClaimable > 0 ? "rgba(34,197,94,0.06)" : "var(--w3-surface-elevated)", border: effectiveClaimable > 0 ? "1px solid rgba(34,197,94,0.15)" : "none" }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 4 }}>Claimable</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: effectiveClaimable > 0 ? "#22c55e" : "var(--w3-gray-900)", fontFamily: monoFont }}>{fmt(effectiveClaimable)}</div>
                    </div>
                  </div>

                  {/* Claim button */}
                  {effectiveClaimable > 0 && (
                    <button
                      onClick={() => handleClaim(s)}
                      disabled={isClaiming}
                      style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", background: "var(--w3-accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: isClaiming ? "wait" : "pointer", opacity: isClaiming ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                    >
                      {isClaiming ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Unlock size={14} />}
                      {isClaiming ? "Claiming..." : `Claim ${fmt(effectiveClaimable)}`}
                    </button>
                  )}

                  {effectiveClaimable === 0 && s.status === "completed" && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 10, borderRadius: 10, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                      <Check size={14} style={{ color: "#22c55e" }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#22c55e" }}>Fully vested & claimed</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{SCHEDULES.length} schedules</span>
      </div>
    </div>
  );
}
