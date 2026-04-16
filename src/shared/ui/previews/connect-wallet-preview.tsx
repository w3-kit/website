import { useState, useCallback, useEffect, useRef } from "react";
import { Wallet, Check, Loader2, Copy, LogOut, ChevronDown } from "lucide-react";
import { domainLogo, preloadDomainLogos } from "../../lib/logos";
import { truncateAddress } from "../../lib/format";
import { CHAINS, CHAIN_ENTRIES } from "../../lib/chains";
import { previewCard, previewHeader, monoFont } from "./_shared";

const WALLETS = [
  { id: "metamask" as const, name: "MetaMask", domain: "metamask.io", ecosystem: "evm" as const, popular: true },
  { id: "coinbase" as const, name: "Coinbase Wallet", domain: "coinbase.com", ecosystem: "evm" as const, popular: true },
  { id: "walletconnect" as const, name: "WalletConnect", domain: "walletconnect.com", ecosystem: "evm" as const, popular: false },
  { id: "phantom" as const, name: "Phantom", domain: "phantom.app", ecosystem: "solana" as const, popular: true },
];

type WalletId = (typeof WALLETS)[number]["id"];
type State = "idle" | "connecting" | "connected";

const WALLET_MAP = new Map(WALLETS.map((w) => [w.id, w]));
const MOCK_ADDRESS = "0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF12";

function Logo({ domain, size = 32 }: { domain: string; size?: number }) {
  return (
    <img
      src={domainLogo(domain, size * 2)}
      alt=""
      width={size}
      height={size}
      style={{ borderRadius: 8, display: "block" }}
      loading="lazy"
    />
  );
}

export function ConnectWalletPreview() {
  useEffect(() => { preloadDomainLogos(WALLETS.map((w) => w.domain)); }, []);

  const [state, setState] = useState<State>("idle");
  const [walletId, setWalletId] = useState<WalletId | null>(null);
  const [chainId, setChainId] = useState(1);
  const [copied, setCopied] = useState(false);
  const [chainsOpen, setChainsOpen] = useState(false);
  const [recent, setRecent] = useState<WalletId | null>(null);

  // Clear timers on unmount
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const safeTimeout = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const connect = useCallback((id: WalletId) => {
    setWalletId(id);
    setState("connecting");
    safeTimeout(() => {
      setChainId(1);
      setState("connected");
      setRecent(id);
    }, 1500);
  }, [safeTimeout]);

  const disconnect = useCallback(() => {
    setState("idle");
    setWalletId(null);
    setChainsOpen(false);
  }, []);

  const copy = useCallback(() => {
    setCopied(true);
    safeTimeout(() => setCopied(false), 2000);
  }, [safeTimeout]);

  const chain = CHAINS[chainId] ?? { name: "Unknown", color: "#888" };
  const wallet = walletId ? WALLET_MAP.get(walletId) : null;
  const recentWallet = recent ? WALLET_MAP.get(recent) : null;

  const sectionLabel: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    color: "var(--w3-gray-500)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginBottom: 6,
  };

  if (state === "connected" && wallet) {
    return (
      <div style={previewCard}>
        <div style={{ ...previewHeader }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Connected</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 8, background: chain.color + "12", fontSize: 12, fontWeight: 500, color: chain.color }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: chain.color }} />
            {chain.name}
          </div>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Logo domain={wallet.domain} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--w3-gray-900)", lineHeight: 1.3 }}>{wallet.name}</div>
              <div style={{ fontSize: 13, color: "var(--w3-gray-600)", fontFamily: monoFont, marginTop: 2 }}>
                {truncateAddress(MOCK_ADDRESS)}
              </div>
            </div>
            <button
              onClick={copy}
              style={{ padding: 8, borderRadius: 8, border: "1px solid var(--w3-border-subtle)", background: "transparent", cursor: "pointer", color: copied ? "#22c55e" : "var(--w3-gray-600)", display: "flex" }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          <div style={{ borderTop: "1px solid var(--w3-border-subtle)" }} />

          <div>
            <div style={sectionLabel}>Network</div>
            <button
              onClick={() => setChainsOpen(!chainsOpen)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--w3-border-subtle)", background: "transparent", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "var(--w3-gray-900)" }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: chain.color }} />
                {chain.name}
              </span>
              <ChevronDown size={16} style={{ color: "var(--w3-gray-500)", transition: "transform 0.2s", transform: chainsOpen ? "rotate(180deg)" : "none" }} />
            </button>
            {chainsOpen && (
              <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                {CHAIN_ENTRIES.map(([id, c]) => (
                  <button
                    key={id}
                    onClick={() => { setChainId(Number(id)); setChainsOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: "none", background: chainId === Number(id) ? "var(--w3-accent-subtle)" : "transparent", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "var(--w3-gray-900)", textAlign: "left" }}
                  >
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.color }} />
                    {c.name}
                    {chainId === Number(id) && <Check size={14} style={{ marginLeft: "auto", color: "var(--w3-accent)" }} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={disconnect}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 12, borderRadius: 10, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 14, fontWeight: 500, color: "var(--w3-gray-700)", cursor: "pointer" }}
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={previewCard}>
      <div style={{ ...previewHeader, justifyContent: "flex-start", gap: 10 }}>
        <Wallet size={18} style={{ color: "var(--w3-accent)" }} />
        <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Connect Wallet</span>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {recentWallet && state === "idle" && (
          <>
            <div style={sectionLabel}>Recent</div>
            <button
              onClick={() => connect(recent!)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 12, border: "1.5px solid var(--w3-accent)", background: "var(--w3-accent-subtle)", cursor: "pointer", textAlign: "left", marginBottom: 12 }}
            >
              <Logo domain={recentWallet.domain} size={32} />
              <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>{recentWallet.name}</span>
              <span style={{ fontSize: 14, color: "var(--w3-accent)", fontWeight: 500 }}>→</span>
            </button>
            <div style={sectionLabel}>All Wallets</div>
          </>
        )}

        {WALLETS.map((w) => {
          const active = state === "connecting" && walletId === w.id;
          const disabled = state === "connecting" && walletId !== w.id;
          return (
            <button
              key={w.id}
              onClick={() => state !== "connecting" && connect(w.id)}
              disabled={disabled}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                borderRadius: 12,
                border: "none",
                background: active ? "var(--w3-accent-subtle)" : "transparent",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.3 : 1,
                width: "100%",
                textAlign: "left",
                transition: "opacity 0.15s, background 0.15s",
              }}
            >
              <Logo domain={w.domain} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>{w.name}</span>
                  {w.popular && (
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 5, background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}>
                      Popular
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)", marginTop: 1, display: "block" }}>
                  {w.ecosystem === "evm" ? "Ethereum" : "Solana"}
                </span>
              </div>
              {active ? (
                <Loader2 size={18} style={{ color: "var(--w3-accent)", animation: "spin 1s linear infinite", flexShrink: 0 }} />
              ) : (
                <span style={{ fontSize: 14, color: "var(--w3-gray-500)", flexShrink: 0 }}>→</span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{WALLETS.length} wallets supported</span>
      </div>
    </div>
  );
}
