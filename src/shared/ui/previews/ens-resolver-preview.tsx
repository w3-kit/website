import { useState, useCallback, useRef, useEffect } from "react";
import { AtSign, Search, Copy, Check, Loader2, ArrowDownUp, ExternalLink } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";

type State = "idle" | "resolving" | "resolved" | "error";

interface ENSResult {
  ensName: string;
  address: string;
  avatar?: string;
}

const MOCK_RESULTS: Record<string, ENSResult> = {
  "vitalik.eth": { ensName: "vitalik.eth", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
  "nick.eth": { ensName: "nick.eth", address: "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5" },
  "brantly.eth": { ensName: "brantly.eth", address: "0x983110309620D911731Ac0932219af06091b6744" },
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": { ensName: "vitalik.eth", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
};

const SUGGESTIONS = ["vitalik.eth", "nick.eth", "brantly.eth"];

export function ENSResolverPreview() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<ENSResult | null>(null);
  const [copied, setCopied] = useState<"name" | "address" | null>(null);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safe = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);

  const handleResolve = () => {
    if (!query.trim()) return;
    setState("resolving");
    setResult(null);
    safe(() => {
      const found = MOCK_RESULTS[query.toLowerCase().trim()];
      if (found) {
        setResult(found);
        setState("resolved");
      } else {
        setState("error");
      }
    }, 1200);
  };

  const handleCopy = (type: "name" | "address") => {
    setCopied(type);
    safe(() => setCopied(null), 2000);
  };

  const reset = () => {
    setQuery("");
    setState("idle");
    setResult(null);
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AtSign size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>ENS Resolver</span>
        </div>
        {state === "resolved" && (
          <button onClick={reset} style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-accent)", background: "none", border: "none", cursor: "pointer" }}>
            New lookup
          </button>
        )}
      </div>

      {/* IDLE — search input */}
      {(state === "idle" || state === "error") && (
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 8 }}>
            Lookup
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (state === "error") setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && handleResolve()}
              placeholder="ENS name or 0x address"
              style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: state === "error" ? "1px solid #ef4444" : "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 14, fontFamily: monoFont, color: "var(--w3-gray-900)", outline: "none" }}
            />
            <button
              onClick={handleResolve}
              disabled={!query.trim()}
              style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: query.trim() ? "var(--w3-accent)" : "var(--w3-gray-300)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: query.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 6, opacity: query.trim() ? 1 : 0.5, flexShrink: 0 }}
            >
              <Search size={14} />
              Resolve
            </button>
          </div>

          {state === "error" && (
            <div style={{ marginTop: 8, fontSize: 12, color: "#ef4444" }}>
              Could not resolve "{query}" — try an ENS name or address
            </div>
          )}

          {state === "idle" && !query && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, color: "var(--w3-gray-500)", marginBottom: 6 }}>Try:</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); }}
                    style={{ padding: "4px 10px", borderRadius: 8, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 12, fontFamily: monoFont, color: "var(--w3-accent)", cursor: "pointer" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESOLVING — loading */}
      {state === "resolving" && (
        <div style={{ padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <Loader2 size={32} style={{ color: "var(--w3-accent)", animation: "spin 1s linear infinite" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>Resolving...</div>
            <div style={{ fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-500)", marginTop: 4 }}>{query}</div>
          </div>
        </div>
      )}

      {/* RESOLVED — result */}
      {state === "resolved" && result && (
        <div style={{ padding: "20px" }}>
          {/* ENS name */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px", borderRadius: 12, background: "var(--w3-accent-subtle)", marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--w3-surface-elevated)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: "var(--w3-accent)", flexShrink: 0 }}>
              {result.ensName.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 2 }}>ENS Name</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>{result.ensName}</div>
            </div>
            <button onClick={() => handleCopy("name")} style={{ padding: 6, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: copied === "name" ? "#22c55e" : "var(--w3-gray-400)", display: "flex" }}>
              {copied === "name" ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          {/* Bidirectional arrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "4px 0" }}>
            <ArrowDownUp size={16} style={{ color: "var(--w3-gray-400)" }} />
          </div>

          {/* Address */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px", borderRadius: 12, background: "var(--w3-glass-inner-bg)", marginTop: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 2 }}>Address</div>
              <div style={{ fontSize: 14, fontFamily: monoFont, color: "var(--w3-gray-900)", wordBreak: "break-all" }}>{result.address}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
              <button onClick={() => handleCopy("address")} style={{ padding: 6, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: copied === "address" ? "#22c55e" : "var(--w3-gray-400)", display: "flex" }}>
                {copied === "address" ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <a href={`https://etherscan.io/address/${result.address}`} target="_blank" rel="noopener noreferrer" style={{ padding: 6, borderRadius: 6, display: "flex", color: "var(--w3-gray-400)" }}>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {state === "resolved" ? "Resolved on Ethereum" : state === "resolving" ? "Looking up..." : "Enter a name or address"}
        </span>
      </div>
    </div>
  );
}
