import { useState, useCallback, useRef, useEffect } from "react";
import { Code, Send, ShieldCheck, Eye, ArrowRight, Loader2, Check, ChevronLeft, Wallet, Search, Settings } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";
import { cryptoLogo } from "../../lib/logos";

type Step = "actions" | "form" | "preview" | "result";

interface Action {
  id: string;
  icon: typeof Send;
  label: string;
  description: string;
  category: "view" | "action" | "admin";
  inputs: { name: string; label: string; type: string; placeholder: string; helper?: string }[];
  previewTemplate: (values: string[]) => string;
  mockResult: string;
}

const CONTRACT = { name: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", standard: "ERC-20" };

const ACTIONS: Action[] = [
  {
    id: "send", icon: Send, label: "Send Tokens", description: "Transfer USDC to another address",
    category: "action",
    inputs: [
      { name: "to", label: "Recipient", type: "address", placeholder: "vitalik.eth or 0x...", helper: "ENS names supported" },
      { name: "amount", label: "Amount", type: "amount", placeholder: "100.00", helper: "USDC" },
    ],
    previewTemplate: (v) => `Send **${v[1] || "0"} USDC** to **${v[0] || "..."}**`,
    mockResult: "100.00 USDC sent successfully",
  },
  {
    id: "approve", icon: ShieldCheck, label: "Approve Spending", description: "Allow a contract to spend your USDC",
    category: "action",
    inputs: [
      { name: "spender", label: "Spender Contract", type: "address", placeholder: "Uniswap Router or 0x...", helper: "The contract that can spend" },
      { name: "amount", label: "Limit", type: "amount", placeholder: "1000.00", helper: "USDC (max allowance)" },
    ],
    previewTemplate: (v) => `Allow **${v[0] || "..."}** to spend up to **${v[1] || "0"} USDC**`,
    mockResult: "Approval set successfully",
  },
  {
    id: "balance", icon: Eye, label: "Check Balance", description: "View USDC balance of any address",
    category: "view",
    inputs: [
      { name: "account", label: "Address", type: "address", placeholder: "Your address or any 0x...", helper: "Leave empty for your wallet" },
    ],
    previewTemplate: (v) => `Check USDC balance of **${v[0] || "your wallet"}**`,
    mockResult: "1,420,000.00 USDC",
  },
  {
    id: "supply", icon: Eye, label: "Total Supply", description: "View total USDC in circulation",
    category: "view",
    inputs: [],
    previewTemplate: () => `Query total USDC supply`,
    mockResult: "26,183,421,907.54 USDC",
  },
];

const CATEGORY_LABELS = { view: "📖 View", action: "✏️ Actions", admin: "🔒 Admin" };

export function ContractInteractionPreview() {
  const [step, setStep] = useState<Step>("actions");
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"simple" | "advanced">("simple");

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safe = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);

  const selectAction = (action: Action) => {
    setSelectedAction(action);
    setInputValues(action.inputs.map(() => ""));
    setResult("");
    setStep(action.inputs.length > 0 ? "form" : "preview");
  };

  const goToPreview = () => setStep("preview");

  const execute = () => {
    setExecuting(true);
    setStep("result");
    safe(() => {
      setResult(selectedAction?.mockResult ?? "Success");
      setExecuting(false);
    }, 1200);
  };

  const reset = () => {
    setStep("actions");
    setSelectedAction(null);
    setInputValues([]);
    setResult("");
  };

  const categories = ["view", "action"] as const;

  return (
    <div style={{ ...previewCard, maxWidth: 420, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {step !== "actions" && (
            <button onClick={reset} style={{ display: "flex", border: "none", background: "transparent", cursor: "pointer", color: "var(--w3-gray-500)", padding: 0 }}>
              <ChevronLeft size={18} />
            </button>
          )}
          <img src={cryptoLogo("USDC")} alt="" width={20} height={20} style={{ borderRadius: "50%" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>{CONTRACT.name}</span>
          <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 6px", borderRadius: 5, background: "var(--w3-surface-elevated)", color: "var(--w3-gray-600)" }}>{CONTRACT.standard}</span>
        </div>
        <span style={{ fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-500)" }}>{truncateAddress(CONTRACT.address)}</span>
      </div>

      {/* STEP: Actions list */}
      {step === "actions" && (
        <div style={{ padding: "12px 16px" }}>
          {categories.map((cat) => {
            const catActions = ACTIONS.filter((a) => a.category === cat);
            if (catActions.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", padding: "4px 14px", marginBottom: 4 }}>
                  {CATEGORY_LABELS[cat]}
                </div>
                {catActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => selectAction(action)}
                      style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 14px", borderRadius: 12, border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--w3-accent-subtle)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--w3-surface-elevated)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} style={{ color: "var(--w3-accent)" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>{action.label}</span>
                        <span style={{ fontSize: 13, color: "var(--w3-gray-600)", display: "block", marginTop: 1 }}>{action.description}</span>
                      </div>
                      <ArrowRight size={14} style={{ color: "var(--w3-gray-400)", flexShrink: 0 }} />
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
        <div style={{ padding: "20px" }}>
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
                <input
                  value={inputValues[idx] ?? ""}
                  onChange={(e) => {
                    const next = [...inputValues];
                    next[idx] = e.target.value;
                    setInputValues(next);
                  }}
                  placeholder={input.placeholder}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: 10,
                    border: "1px solid var(--w3-border-subtle)", background: "transparent",
                    fontSize: 14, fontFamily: input.type === "address" ? monoFont : "inherit",
                    color: "var(--w3-gray-900)", outline: "none",
                  }}
                />
              </div>
            ))}

            <button
              onClick={goToPreview}
              style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "var(--w3-accent)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              Review
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP: Preview */}
      {step === "preview" && selectedAction && (
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", letterSpacing: "0.04em", textTransform: "uppercase" as const, marginBottom: 12 }}>
            Transaction Preview
          </div>

          <div style={{ padding: 16, borderRadius: 12, background: "var(--w3-glass-inner-bg)", border: "1px solid var(--w3-border-subtle)", marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", lineHeight: 1.5 }}>
              {selectedAction.previewTemplate(inputValues).split("**").map((part, i) =>
                i % 2 === 1
                  ? <strong key={i} style={{ color: "var(--w3-accent)", fontFamily: part.includes("0x") || part.includes(".eth") ? monoFont : "inherit" }}>{part}</strong>
                  : <span key={i}>{part}</span>
              )}
            </div>

            {selectedAction.category === "action" && (
              <div style={{ marginTop: 12, padding: "8px 10px", borderRadius: 8, background: "rgba(245,158,11,0.08)", display: "flex", alignItems: "center", gap: 6 }}>
                <Wallet size={12} style={{ color: "#f59e0b" }} />
                <span style={{ fontSize: 12, color: "#b45309" }}>This will require a wallet signature</span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep("form")} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 14, fontWeight: 500, color: "var(--w3-gray-700)", cursor: "pointer" }}>
              Back
            </button>
            <button onClick={execute} style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: selectedAction.category === "view" ? "var(--w3-accent)" : "var(--w3-gray-900)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {selectedAction.category === "view" ? "Query" : "Confirm & Sign"}
            </button>
          </div>
        </div>
      )}

      {/* STEP: Result */}
      {step === "result" && selectedAction && (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          {executing ? (
            <>
              <Loader2 size={32} style={{ color: "var(--w3-accent)", animation: "spin 1s linear infinite" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                  {selectedAction.category === "view" ? "Querying..." : "Waiting for confirmation..."}
                </div>
                <div style={{ fontSize: 13, color: "var(--w3-gray-500)", marginTop: 4 }}>
                  {selectedAction.category === "view" ? "Reading contract state" : "Sign in your wallet"}
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={24} style={{ color: "#22c55e" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--w3-gray-900)" }}>
                  {selectedAction.category === "view" ? "Result" : "Transaction Confirmed"}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: monoFont, color: "var(--w3-accent)", marginTop: 6 }}>
                  {result}
                </div>
              </div>
              <button onClick={reset} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 14, fontWeight: 500, color: "var(--w3-gray-700)", cursor: "pointer" }}>
                Done
              </button>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{ACTIONS.length} actions</span>
        <span style={{ fontSize: 12, color: "var(--w3-gray-400)" }}>
          {step === "actions" ? "Select an action" : step === "form" ? "Fill in details" : step === "preview" ? "Review & confirm" : ""}
        </span>
      </div>
    </div>
  );
}
