import { useState, useCallback, useRef, useEffect } from "react";
import { Code, Eye, Edit3, Play, Loader2, Check, ChevronDown, Plus, FileCode } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";

type Tab = "read" | "write";

interface AbiFunction {
  name: string;
  type: Tab;
  inputs: { name: string; type: string }[];
  outputs?: string;
  mockResult?: string;
}

interface PresetContract {
  name: string;
  address: string;
  standard: string;
  functions: AbiFunction[];
}

const PRESETS: PresetContract[] = [
  {
    name: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", standard: "ERC-20",
    functions: [
      { name: "balanceOf", type: "read", inputs: [{ name: "account", type: "address" }], outputs: "uint256", mockResult: "1,420,000.00 USDC" },
      { name: "totalSupply", type: "read", inputs: [], outputs: "uint256", mockResult: "26,183,421,907.54 USDC" },
      { name: "decimals", type: "read", inputs: [], outputs: "uint8", mockResult: "6" },
      { name: "allowance", type: "read", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: "uint256", mockResult: "0" },
      { name: "transfer", type: "write", inputs: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }], mockResult: "0x7f3a...b2c1" },
      { name: "approve", type: "write", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], mockResult: "0x8e4b...a3d2" },
    ],
  },
  {
    name: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", standard: "ERC-20 + Wrap",
    functions: [
      { name: "balanceOf", type: "read", inputs: [{ name: "account", type: "address" }], outputs: "uint256", mockResult: "4.2100 WETH" },
      { name: "totalSupply", type: "read", inputs: [], outputs: "uint256", mockResult: "2,847,291.45 WETH" },
      { name: "deposit", type: "write", inputs: [], mockResult: "0xc1d2...e3f4" },
      { name: "withdraw", type: "write", inputs: [{ name: "wad", type: "uint256" }], mockResult: "0xd5e6...f7a8" },
    ],
  },
  {
    name: "ENS Registry", address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", standard: "Registry",
    functions: [
      { name: "owner", type: "read", inputs: [{ name: "node", type: "bytes32" }], outputs: "address", mockResult: "0xd8dA...6045" },
      { name: "resolver", type: "read", inputs: [{ name: "node", type: "bytes32" }], outputs: "address", mockResult: "0x4976...1d0F" },
      { name: "setOwner", type: "write", inputs: [{ name: "node", type: "bytes32" }, { name: "owner", type: "address" }], mockResult: "0xa1b2...c3d4" },
    ],
  },
];

export function ContractInteractionPreview() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showSelector, setShowSelector] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [tab, setTab] = useState<Tab>("read");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string[]>>({});
  const [executing, setExecuting] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safe = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);

  const contract = PRESETS[selectedIdx];
  const fns = contract.functions.filter((f) => f.type === tab);
  const readCount = contract.functions.filter((f) => f.type === "read").length;
  const writeCount = contract.functions.filter((f) => f.type === "write").length;

  const selectContract = (idx: number) => {
    setSelectedIdx(idx);
    setShowSelector(false);
    setTab("read");
    setExpanded(null);
    setResults({});
    setInputValues({});
  };

  const handleExecute = (fn: AbiFunction) => {
    setExecuting(fn.name);
    safe(() => {
      setResults((prev) => ({ ...prev, [fn.name]: fn.mockResult ?? "Success" }));
      setExecuting(null);
    }, 1000);
  };

  const updateInput = (fnName: string, idx: number, value: string) => {
    setInputValues((prev) => {
      const arr = [...(prev[fnName] || [])];
      arr[idx] = value;
      return { ...prev, [fnName]: arr };
    });
  };

  return (
    <div style={{ ...previewCard, maxWidth: 420, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Code size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Contract</span>
        </div>
        <button
          onClick={() => setShowSelector(!showSelector)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 8, border: "1px solid var(--w3-border-subtle)", background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 500, color: "var(--w3-gray-700)" }}
        >
          <FileCode size={12} />
          {contract.name}
          <ChevronDown size={12} style={{ color: "var(--w3-gray-400)", transition: "transform 0.2s", transform: showSelector ? "rotate(180deg)" : "none" }} />
        </button>
      </div>

      {/* Contract selector */}
      {showSelector && (
        <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--w3-border-subtle)", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 4 }}>Select Contract</div>
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => selectContract(i)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none",
                background: i === selectedIdx ? "var(--w3-accent-subtle)" : "transparent",
                cursor: "pointer", width: "100%", textAlign: "left", transition: "background 0.15s",
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>{p.name}</span>
                <span style={{ fontSize: 12, color: "var(--w3-gray-500)", fontFamily: monoFont }}>{truncateAddress(p.address)}</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 6px", borderRadius: 5, background: "var(--w3-surface-elevated)", color: "var(--w3-gray-600)" }}>{p.standard}</span>
            </button>
          ))}

          {/* Custom address hint */}
          <div style={{ marginTop: 4, padding: "8px 12px", borderRadius: 8, background: "var(--w3-glass-inner-bg)", display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={12} style={{ color: "var(--w3-gray-400)" }} />
            <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>Paste any address + ABI to interact</span>
          </div>
        </div>
      )}

      {/* Contract info bar */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--w3-border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-600)" }}>{truncateAddress(contract.address)}</span>
        <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 6, background: "var(--w3-surface-elevated)", color: "var(--w3-gray-600)" }}>{contract.standard}</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--w3-border-subtle)" }}>
        {(["read", "write"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setExpanded(null); }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 20px", fontSize: 13, fontWeight: 500,
              background: "transparent", border: "none",
              borderBottom: tab === t ? "2px solid var(--w3-accent)" : "2px solid transparent",
              color: tab === t ? "var(--w3-gray-900)" : "var(--w3-gray-500)",
              cursor: "pointer",
            }}
          >
            {t === "read" ? <Eye size={14} /> : <Edit3 size={14} />}
            {t === "read" ? "Read" : "Write"}
            <span style={{ fontSize: 11, color: "var(--w3-gray-400)" }}>{t === "read" ? readCount : writeCount}</span>
          </button>
        ))}
      </div>

      {/* Functions */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
        {fns.map((fn) => {
          const isExpanded = expanded === fn.name;
          const isExecuting = executing === fn.name;
          const result = results[fn.name];

          return (
            <div key={fn.name} style={{ borderRadius: 12, overflow: "hidden", background: isExpanded ? "var(--w3-glass-inner-bg)" : "transparent", transition: "background 0.15s" }}>
              <button
                onClick={() => setExpanded(isExpanded ? null : fn.name)}
                style={{ display: "flex", alignItems: "center", width: "100%", padding: "10px 14px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", gap: 8 }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, fontFamily: monoFont, color: "var(--w3-accent)", flex: 1 }}>{fn.name}</span>
                {fn.outputs && <span style={{ fontSize: 10, color: "var(--w3-gray-400)", fontFamily: monoFont }}>→ {fn.outputs}</span>}
                <span style={{ fontSize: 11, color: "var(--w3-gray-400)" }}>{fn.inputs.length > 0 ? `${fn.inputs.length}p` : "∅"}</span>
                <ChevronDown size={14} style={{ color: "var(--w3-gray-400)", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "none" }} />
              </button>

              {isExpanded && (
                <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {fn.inputs.map((input, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--w3-gray-500)", marginBottom: 4 }}>
                        {input.name} <span style={{ color: "var(--w3-gray-400)", fontFamily: monoFont }}>{input.type}</span>
                      </div>
                      <input
                        value={inputValues[fn.name]?.[idx] ?? ""}
                        onChange={(e) => updateInput(fn.name, idx, e.target.value)}
                        placeholder={`Enter ${input.type}`}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-900)", outline: "none" }}
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => handleExecute(fn)}
                    disabled={isExecuting}
                    style={{
                      width: "100%", padding: "9px", borderRadius: 8, border: "none",
                      background: tab === "read" ? "var(--w3-accent)" : "var(--w3-gray-900)",
                      color: "#fff", fontSize: 13, fontWeight: 600, cursor: isExecuting ? "wait" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      opacity: isExecuting ? 0.7 : 1,
                    }}
                  >
                    {isExecuting ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Play size={13} />}
                    {tab === "read" ? "Query" : "Execute"}
                  </button>

                  {result && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", borderRadius: 8, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                      <Check size={12} style={{ color: "#22c55e", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-700)", wordBreak: "break-all" }}>
                        {tab === "read" ? `→ ${result}` : `Tx: ${result}`}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{contract.name} · {contract.standard}</span>
        <span style={{ fontSize: 12, color: "var(--w3-gray-400)" }}>{contract.functions.length} functions</span>
      </div>
    </div>
  );
}
