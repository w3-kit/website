import { useState, useCallback, useRef, useEffect } from "react";
import { Code, Send, ShieldCheck, Eye, ArrowRight, Loader2, Check, ChevronLeft, Wallet, FileCode, Plus } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";
import { cryptoLogo } from "../../lib/logos";

type Step = "connect" | "actions" | "form" | "preview" | "result";

interface ContractPreset {
  name: string;
  address: string;
  standard: string;
  ticker: string;
  actions: Action[];
}

interface Action {
  id: string;
  icon: typeof Send;
  label: string;
  description: string;
  category: "view" | "action";
  inputs: { label: string; type: string; placeholder: string; helper?: string }[];
  previewTemplate: (values: string[], contract: string) => string;
  mockResult: string;
}

const PRESETS: ContractPreset[] = [
  {
    name: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", standard: "ERC-20", ticker: "USDC",
    actions: [
      { id: "send", icon: Send, label: "Send Tokens", description: "Transfer tokens to another address", category: "action",
        inputs: [{ label: "Recipient", type: "address", placeholder: "vitalik.eth or 0x...", helper: "ENS supported" }, { label: "Amount", type: "amount", placeholder: "100.00", helper: "USDC" }],
        previewTemplate: (v, c) => `Send **${v[1] || "0"} ${c}** to **${v[0] || "..."}**`, mockResult: "100.00 USDC sent" },
      { id: "approve", icon: ShieldCheck, label: "Approve Spending", description: "Allow a contract to spend your tokens", category: "action",
        inputs: [{ label: "Spender", type: "address", placeholder: "Uniswap Router or 0x..." }, { label: "Limit", type: "amount", placeholder: "1000.00", helper: "USDC" }],
        previewTemplate: (v, c) => `Allow **${v[0] || "..."}** to spend up to **${v[1] || "0"} ${c}**`, mockResult: "Approval set" },
      { id: "balance", icon: Eye, label: "Check Balance", description: "View token balance of any wallet", category: "view",
        inputs: [{ label: "Wallet to check", type: "address", placeholder: "vitalik.eth or 0x...", helper: "Whose balance?" }],
        previewTemplate: (v) => `Check USDC balance of **${v[0] || "your wallet"}**`, mockResult: "1,420,000.00 USDC" },
      { id: "supply", icon: Eye, label: "Total Supply", description: "View total USDC in circulation", category: "view",
        inputs: [], previewTemplate: () => `Query total USDC supply`, mockResult: "26,183,421,907.54 USDC" },
    ],
  },
  {
    name: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", standard: "ERC-20", ticker: "WETH",
    actions: [
      { id: "deposit", icon: Send, label: "Wrap ETH", description: "Convert ETH to WETH", category: "action",
        inputs: [{ label: "Amount", type: "amount", placeholder: "1.0", helper: "ETH" }],
        previewTemplate: (v) => `Wrap **${v[0] || "0"} ETH** into WETH`, mockResult: "1.0 WETH received" },
      { id: "withdraw", icon: Send, label: "Unwrap WETH", description: "Convert WETH back to ETH", category: "action",
        inputs: [{ label: "Amount", type: "amount", placeholder: "1.0", helper: "WETH" }],
        previewTemplate: (v) => `Unwrap **${v[0] || "0"} WETH** into ETH`, mockResult: "1.0 ETH received" },
      { id: "balance", icon: Eye, label: "Check Balance", description: "View WETH balance of any wallet", category: "view",
        inputs: [{ label: "Wallet to check", type: "address", placeholder: "vitalik.eth or 0x...", helper: "Whose balance?" }],
        previewTemplate: (v) => `Check WETH balance of **${v[0] || "your wallet"}**`, mockResult: "4.2100 WETH" },
    ],
  },
];

const CATEGORY_LABELS: Record<string, string> = { view: "View", action: "Actions" };

export function ContractInteractionPreview() {
  const [step, setStep] = useState<Step>("connect");
  const [contract, setContract] = useState<ContractPreset | null>(null);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState("");
  const [customAddress, setCustomAddress] = useState("");

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safe = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);

  const selectContract = (c: ContractPreset) => { setContract(c); setStep("actions"); };
  const selectAction = (a: Action) => { setSelectedAction(a); setInputValues(a.inputs.map(() => "")); setResult(""); setStep(a.inputs.length > 0 ? "form" : "preview"); };
  const goBack = () => { if (step === "form") setStep("actions"); else if (step === "preview") setStep(selectedAction?.inputs.length ? "form" : "actions"); else if (step === "actions") { setStep("connect"); setContract(null); } else { setStep("actions"); setResult(""); } };

  const execute = () => {
    setExecuting(true);
    setStep("result");
    safe(() => { setResult(selectedAction?.mockResult ?? "Success"); setExecuting(false); }, 1200);
  };

  const stepLabel = { connect: "Select a contract", actions: "Choose an action", form: "Fill in details", preview: "Review & confirm", result: "" };

  return (
    <div style={{ ...previewCard, maxWidth: 420, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {step !== "connect" && (
            <button onClick={goBack} style={{ display: "flex", border: "none", background: "transparent", cursor: "pointer", color: "var(--w3-gray-500)", padding: 0 }}>
              <ChevronLeft size={18} />
            </button>
          )}
          {contract ? (
            <img src={cryptoLogo(contract.ticker)} alt="" width={20} height={20} style={{ borderRadius: "50%" }} />
          ) : (
            <Code size={18} style={{ color: "var(--w3-accent)" }} />
          )}
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            {contract ? contract.name : "Contract"}
          </span>
          {contract && (
            <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 6px", borderRadius: 5, background: "var(--w3-surface-elevated)", color: "var(--w3-gray-600)" }}>{contract.standard}</span>
          )}
        </div>
      </div>

      {/* STEP: Connect — pick a contract */}
      {step === "connect" && (
        <div style={{ padding: "16px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, padding: "0 14px", marginBottom: 8 }}>Presets</div>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => selectContract(p)}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 14px", borderRadius: 12, border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--w3-accent-subtle)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <img src={cryptoLogo(p.ticker)} alt="" width={32} height={32} style={{ borderRadius: "50%", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>{p.name}</span>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)", fontFamily: monoFont }}>{truncateAddress(p.address)}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 6px", borderRadius: 5, background: "var(--w3-surface-elevated)", color: "var(--w3-gray-600)" }}>{p.standard}</span>
              <ArrowRight size={14} style={{ color: "var(--w3-gray-400)" }} />
            </button>
          ))}

          <div style={{ margin: "8px 14px 0" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 8 }}>Custom</div>
            <div style={{ padding: "12px", borderRadius: 10, border: "1px dashed var(--w3-border-subtle)", display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder="Paste contract address (0x...)"
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-900)", outline: "none" }}
              />
              <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
                ABI will be auto-fetched from Etherscan, or paste your own
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP: Actions */}
      {step === "actions" && contract && (
        <div style={{ padding: "12px 16px" }}>
          {(["view", "action"] as const).map((cat) => {
            const catActions = contract.actions.filter((a) => a.category === cat);
            if (!catActions.length) return null;
            return (
              <div key={cat} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, padding: "4px 14px", marginBottom: 4 }}>
                  {CATEGORY_LABELS[cat]}
                </div>
                {catActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button key={action.id} onClick={() => selectAction(action)}
                      style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 14px", borderRadius: 12, border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--w3-accent-subtle)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--w3-surface-elevated)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} style={{ color: "var(--w3-accent)" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>{action.label}</span>
                        <span style={{ fontSize: 13, color: "var(--w3-gray-600)" }}>{action.description}</span>
                      </div>
                      <ArrowRight size={14} style={{ color: "var(--w3-gray-400)" }} />
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* STEP: Form */}
      {step === "form" && selectedAction && (
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--w3-accent-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <selectedAction.icon size={18} style={{ color: "var(--w3-accent)" }} />
            </div>
            <div>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--w3-gray-900)", display: "block" }}>{selectedAction.label}</span>
              <span style={{ fontSize: 13, color: "var(--w3-gray-600)" }}>{selectedAction.description}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {selectedAction.inputs.map((input, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>{input.label}</span>
                  {input.helper && <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>{input.helper}</span>}
                </div>
                <input value={inputValues[idx] ?? ""} onChange={(e) => { const n = [...inputValues]; n[idx] = e.target.value; setInputValues(n); }}
                  placeholder={input.placeholder}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 14, fontFamily: input.type === "address" ? monoFont : "inherit", color: "var(--w3-gray-900)", outline: "none" }}
                />
              </div>
            ))}
            <button onClick={() => setStep("preview")}
              style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "var(--w3-accent)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              Review <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP: Preview */}
      {step === "preview" && selectedAction && contract && (
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 12 }}>Transaction Preview</div>
          <div style={{ padding: 16, borderRadius: 12, background: "var(--w3-glass-inner-bg)", border: "1px solid var(--w3-border-subtle)", marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", lineHeight: 1.5 }}>
              {selectedAction.previewTemplate(inputValues, contract.name).split("**").map((part, i) =>
                i % 2 === 1 ? <strong key={i} style={{ color: "var(--w3-accent)" }}>{part}</strong> : <span key={i}>{part}</span>
              )}
            </div>
            {selectedAction.category === "action" && (
              <div style={{ marginTop: 12, padding: "8px 10px", borderRadius: 8, background: "rgba(245,158,11,0.08)", display: "flex", alignItems: "center", gap: 6 }}>
                <Wallet size={12} style={{ color: "#f59e0b" }} />
                <span style={{ fontSize: 12, color: "#b45309" }}>Requires wallet signature</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(selectedAction.inputs.length ? "form" : "actions")}
              style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 14, fontWeight: 500, color: "var(--w3-gray-700)", cursor: "pointer" }}>Back</button>
            <button onClick={execute}
              style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: selectedAction.category === "view" ? "var(--w3-accent)" : "var(--w3-gray-900)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              {selectedAction.category === "view" ? "Query" : "Confirm & Sign"}
            </button>
          </div>
        </div>
      )}

      {/* STEP: Result */}
      {step === "result" && selectedAction && (
        <div style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          {executing ? (
            <>
              <Loader2 size={32} style={{ color: "var(--w3-accent)", animation: "spin 1s linear infinite" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>{selectedAction.category === "view" ? "Querying..." : "Waiting for confirmation..."}</div>
                <div style={{ fontSize: 13, color: "var(--w3-gray-500)", marginTop: 4 }}>{selectedAction.category === "view" ? "Reading contract" : "Sign in your wallet"}</div>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={24} style={{ color: "#22c55e" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--w3-gray-900)" }}>{selectedAction.category === "view" ? "Result" : "Confirmed"}</div>
                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: monoFont, color: "var(--w3-accent)", marginTop: 6 }}>{result}</div>
              </div>
              <button onClick={() => { setStep("actions"); setResult(""); }}
                style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 14, fontWeight: 500, color: "var(--w3-gray-700)", cursor: "pointer" }}>Done</button>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{contract ? `${contract.actions.length} actions` : `${PRESETS.length} contracts`}</span>
        <span style={{ fontSize: 12, color: "var(--w3-gray-400)" }}>{stepLabel[step]}</span>
      </div>
    </div>
  );
}
