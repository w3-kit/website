import { useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";

/* ── Shared mark component ────────────────────────────────────────── */

const CHAIN_COLOR: Record<string, string> = {
  ETH: "#627eea", BASE: "#0052ff", ARB: "#28a0f0", OP: "#ff0420",
  POLY: "#8247e5", SOL: "#9945ff", ZK: "#0f0f0f", AVAX: "#e84142",
  BNB: "#f0b90b", LINEA: "#61dfff",
};
const TOKEN_COLOR: Record<string, string> = {
  USDC: "#2775ca", USDT: "#26a17b", DAI: "#f5ac37", WETH: "#627eea",
  WBTC: "#f7931a", LINK: "#2a5ada", UNI: "#ff007a", AAVE: "#b6509e",
  ARB: "#28a0f0", OP: "#ff0420",
};

function Mark({ label, color, size = 22 }: { label: string; color: string; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-sans transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)]"
      style={{
        width: size, height: size, background: color,
        color: "#fff", fontSize: size * 0.42, fontWeight: 600, letterSpacing: -0.3,
      }}
    >
      {label.slice(0, 1).toUpperCase()}
    </span>
  );
}

export function ChainMark({ k, size }: { k: string; size?: number }) {
  return <Mark label={k} color={CHAIN_COLOR[k] || "#333"} size={size} />;
}
export function TokenMark({ k, size }: { k: string; size?: number }) {
  return <Mark label={k} color={TOKEN_COLOR[k] || "#333"} size={size} />;
}

/* ── Mini component cards ─────────────────────────────────────────── */

export function ConnectWalletMini() {
  const [state, setState] = useState<"idle" | "connecting" | "connected">("idle");
  useEffect(() => {
    if (state === "connecting") {
      const t = setTimeout(() => setState("connected"), 900);
      return () => clearTimeout(t);
    }
  }, [state]);

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;ConnectWallet /&gt;</div>
      {state === "idle" && (
        <button
          onClick={() => setState("connecting")}
          className="w-full rounded-[10px] bg-w3-accent px-3.5 py-[11px] text-[13px] font-medium text-white"
        >
          Connect Wallet
        </button>
      )}
      {state === "connecting" && (
        <div className="flex items-center gap-2 rounded-[10px] border border-w3-border-standard px-3.5 py-[11px] text-[13px]">
          <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-w3-accent border-t-transparent" />
          Approve in MetaMask…
        </div>
      )}
      {state === "connected" && (
        <div
          onClick={() => setState("idle")}
          className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-w3-border-standard px-3.5 py-[11px] text-[13px]"
        >
          <div className="h-[18px] w-[18px] rounded-full bg-gradient-to-br from-[#5554d9] via-[#a855f7] to-[#f59e0b]" />
          0x7f…3E2a
          <span className="ml-auto font-mono text-[10px] text-w3-accent">● live</span>
        </div>
      )}
    </div>
  );
}

export function TokenSwapMini() {
  const [amt, setAmt] = useState("1.0");
  const out = (parseFloat(amt || "0") * 2715.32).toFixed(2);

  return (
    <div className="flex h-full flex-col gap-1.5 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;TokenSwap /&gt;</div>
      <div className="flex items-center gap-2.5 rounded-[10px] bg-w3-surface-alt p-2.5">
        <ChainMark k="ETH" size={22} />
        <input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          className="w-0 flex-1 border-none bg-transparent text-xl font-medium text-w3-gray-900 outline-none"
        />
        <span className="text-xs text-w3-gray-600">ETH</span>
      </div>
      <div className="text-center text-[11px] text-w3-gray-500">↓ 1 ETH ≈ $2,715.32</div>
      <div className="flex items-center gap-2.5 rounded-[10px] bg-w3-surface-alt p-2.5">
        <TokenMark k="USDC" size={22} />
        <span className="flex-1 text-xl font-medium text-w3-gray-600">{out}</span>
        <span className="text-xs text-w3-gray-600">USDC</span>
      </div>
    </div>
  );
}

export function NetworkSwitcherMini() {
  const [active, setActive] = useState("ETH");
  const nets: [string, string][] = [
    ["ETH", "Ethereum"], ["BASE", "Base"], ["ARB", "Arbitrum"], ["POLY", "Polygon"],
  ];

  return (
    <div className="flex h-full flex-col gap-2 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;NetworkSwitcher /&gt;</div>
      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        {nets.map(([k, n]) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px]"
            style={{
              background: active === k ? "var(--w3-accent-wash)" : "transparent",
              border: active === k ? "1px solid var(--w3-accent)" : "1px solid transparent",
            }}
          >
            <ChainMark k={k} size={18} />
            {n}
            {active === k && (
              <span className="ml-auto"><Check size={13} className="text-w3-accent" /></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function WalletBalanceMini() {
  return (
    <div className="flex h-full flex-col gap-2.5 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;WalletBalance /&gt;</div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-w3-gray-500">Total</div>
        <div className="text-[26px] font-medium tracking-[-0.02em]">$12,481.53</div>
        <div className="text-[11px] text-[#16a34a]">+$241.08 (1.96%)</div>
      </div>
      <div className="flex flex-col gap-[3px]">
        {([["ETH", 1.42, 3853.76], ["USDC", 2500, 2500.0], ["LINK", 142, 2127.77]] as [string, number, number][]).map(
          ([k, b]) => (
            <div key={k} className="flex items-center gap-2 text-xs">
              <TokenMark k={k} size={16} />
              <span className="flex-1">{k}</span>
              <span className="font-mono text-w3-gray-600">{b.toLocaleString()}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function NFTCardMini() {
  return (
    <div className="flex h-full flex-col gap-2 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;NFTCard /&gt;</div>
      <div className="relative flex-1 overflow-hidden rounded-lg bg-gradient-to-br from-[#f59e0b] via-[#d946ef] to-[#5554d9]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_50%)]" />
        <div className="absolute bottom-1.5 left-2 font-mono text-[10px] text-white/85">#3100</div>
      </div>
      <div className="flex justify-between text-xs">
        <span className="font-medium">CryptoPunk</span>
        <span className="font-mono text-w3-gray-600">4,200 Ξ</span>
      </div>
    </div>
  );
}

export function GasTrackerMini() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setT((x) => x + 1), 1500);
    return () => clearInterval(i);
  }, []);
  const base = 18 + Math.sin(t) * 4;

  return (
    <div className="flex h-full flex-col gap-2.5 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;GasTracker /&gt;</div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-[30px] font-medium tracking-[-0.02em]">{base.toFixed(1)}</span>
        <span className="text-xs text-w3-gray-600">gwei</span>
      </div>
      <div className="flex h-8 items-end gap-1">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-[1px]"
            style={{
              height: `${30 + Math.sin(i + t / 2) * 20 + 30}%`,
              background: i > 12 ? "var(--w3-accent)" : "var(--w3-border-standard)",
            }}
          />
        ))}
      </div>
      <div className="font-mono text-[10px] text-w3-gray-500">Ethereum · block 19,824,101</div>
    </div>
  );
}

export function ContractCallMini() {
  return (
    <div className="flex h-full flex-col gap-2 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;ContractCall /&gt;</div>
      <div className="flex flex-1 flex-col gap-[3px] font-mono text-[11px] leading-relaxed">
        <div><span className="text-w3-gray-500">fn</span> <span className="text-w3-accent">balanceOf</span>(</div>
        <div className="pl-3"><span className="text-w3-gray-500">addr:</span> 0x7f…3E2a</div>
        <div>) → <span className="text-[#16a34a]">uint256</span></div>
        <div className="mt-1 text-base tracking-[-0.02em] text-w3-gray-900">1,420,100</div>
      </div>
      <button className="w-full rounded-md border border-w3-border-standard px-2.5 py-[7px] font-mono text-[11px]">
        call()
      </button>
    </div>
  );
}

export function ENSResolverMini() {
  return (
    <div className="flex h-full flex-col gap-2 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;ENSResolver /&gt;</div>
      <div className="rounded-lg bg-w3-surface-alt px-2.5 py-2 text-xs">
        <span className="text-w3-gray-600">resolve</span>
        <span className="ml-1 font-mono text-w3-accent">vitalik.eth</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5554d9] to-[#f43f5e]" />
        <div className="font-mono text-[11px] text-w3-gray-800">
          <div>0xd8dA6BF2…96045</div>
          <div className="text-[10px] text-w3-gray-500">Verified · 2017</div>
        </div>
      </div>
    </div>
  );
}

export function TxHistoryMini() {
  const txs = [
    { a: "swap", t: "2s", amt: "0.5 ETH → 1,358 USDC" },
    { a: "send", t: "14s", amt: "+420 USDC" },
    { a: "mint", t: "1m", amt: "Base Name #0812" },
    { a: "approve", t: "3m", amt: "USDT on Arbitrum" },
  ];

  return (
    <div className="flex h-full flex-col gap-2 p-3.5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[11px] text-w3-gray-500">&lt;TxHistory /&gt;</div>
        <span className="font-mono text-[9px] text-w3-accent">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-w3-accent" /> live
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {txs.map((tx, i) => (
          <div
            key={i}
            className="flex items-baseline gap-2 py-1 text-[11px]"
            style={{ borderBottom: i < txs.length - 1 ? "1px dashed var(--w3-border-subtle)" : "none" }}
          >
            <span className="min-w-[42px] font-mono text-[9px] uppercase text-w3-accent">{tx.a}</span>
            <span className="flex-1 text-w3-gray-800">{tx.amt}</span>
            <span className="font-mono text-[10px] text-w3-gray-500">{tx.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StakingMini() {
  return (
    <div className="flex h-full flex-col gap-2 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;Staking /&gt;</div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-w3-gray-500">APR</div>
        <div className="font-mono text-[28px] font-medium text-w3-accent">4.82%</div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-[3px] bg-w3-surface-alt">
        <div className="h-full w-[68%] bg-w3-accent" />
      </div>
      <div className="flex justify-between text-[11px] text-w3-gray-600">
        <span>Staked <b className="text-w3-gray-900">32 ETH</b></span>
        <span>68% to next tier</span>
      </div>
      <button className="w-full rounded-lg bg-w3-gray-900 px-2.5 py-2 text-xs font-medium text-w3-gray-100">
        Stake more
      </button>
    </div>
  );
}

export function MultisigMini() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;Multisig /&gt;</div>
      <div className="text-xs font-medium">Send 2.5 ETH → treasury</div>
      <div className="mt-0.5 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[22px] w-[22px] rounded-full border-2 border-w3-surface"
            style={{
              background: `linear-gradient(${i * 60}deg, #5554d9, #a855f7)`,
              marginLeft: i ? -6 : 0,
            }}
          />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-1.5 text-[11px] text-w3-gray-600">
        <span className="text-[#16a34a]">✓</span> 3 of 5 approved
      </div>
      <div className="h-1 rounded-[3px] bg-w3-surface-alt">
        <div className="h-full w-[60%] rounded-[3px] bg-[#16a34a]" />
      </div>
    </div>
  );
}

export function PriceTickerMini() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-3.5">
      <div className="font-mono text-[11px] text-w3-gray-500">&lt;PriceTicker /&gt;</div>
      {(
        [
          ["ETH", "$2,715", "+1.96%", true],
          ["BTC", "$67,412", "+0.84%", true],
          ["SOL", "$148.20", "-2.41%", false],
        ] as [string, string, string, boolean][]
      ).map(([k, p, c, up]) => (
        <div
          key={k}
          className="flex items-center gap-2 border-b border-dashed border-w3-border-subtle pb-1 text-xs"
        >
          <TokenMark k={k === "BTC" ? "WBTC" : k} size={18} />
          <span className="flex-1 font-medium">{k}</span>
          <span className="font-mono text-w3-gray-800">{p}</span>
          <span
            className="min-w-[44px] text-right font-mono text-[10px]"
            style={{ color: up ? "#16a34a" : "#dc2626" }}
          >
            {c}
          </span>
        </div>
      ))}
    </div>
  );
}
