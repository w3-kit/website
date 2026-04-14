import {
  Check,
  ChevronRight,
  FileCode,
  FolderOpen,
  Wallet,
  ArrowLeftRight,
  Coins,
} from "lucide-react";

/** Faux terminal showing CLI output */
export function CliVisual() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg text-left">
      {/* Terminal header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: "var(--w3-gray-200)",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--w3-gray-400)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--w3-gray-400)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--w3-gray-400)" }} />
        </div>
        <span
          className="ml-2 text-xs"
          style={{
            color: "var(--w3-gray-500)",
            fontFamily: '"Geist Mono", ui-monospace, monospace',
          }}
        >
          terminal
        </span>
      </div>
      {/* Terminal body */}
      <div
        className="flex flex-1 flex-col gap-2 p-4"
        style={{
          background: "var(--w3-gray-200)",
          fontFamily: '"Geist Mono", ui-monospace, monospace',
        }}
      >
        <Line prompt>npx w3-kit init</Line>
        <Line muted>✓ Detected Next.js project</Line>
        <Line muted>✓ Installing dependencies...</Line>
        <Line muted>✓ Added chain configs (ethereum, polygon, base)</Line>
        <Line muted>✓ Created w3-kit.config.ts</Line>
        <Line accent>
          <Check size={12} className="inline" /> Ready! Run `npm run dev` to start.
        </Line>
      </div>
    </div>
  );
}

/** Template cards grid */
export function TemplatesVisual() {
  const templates = [
    { name: "next-starter", framework: "Next.js", icon: <FileCode size={16} /> },
    { name: "vite-starter", framework: "Vite", icon: <FileCode size={16} /> },
    { name: "dapp-template", framework: "Next.js", icon: <FolderOpen size={16} /> },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-3 p-2">
      {templates.map((t) => (
        <div
          key={t.name}
          className="flex items-center gap-3 rounded-lg px-4 py-3"
          style={{ background: "var(--w3-gray-200)", border: "1px solid var(--w3-border-subtle)" }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}
          >
            {t.icon}
          </div>
          <div className="flex flex-col">
            <span
              className="text-sm font-medium"
              style={{
                color: "var(--w3-gray-900)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
              }}
            >
              {t.name}
            </span>
            <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
              {t.framework}
            </span>
          </div>
          <ChevronRight size={14} className="ml-auto" style={{ color: "var(--w3-gray-400)" }} />
        </div>
      ))}
    </div>
  );
}

/** Recipe checklist */
export function RecipesVisual() {
  const recipes = [
    { title: "Connect a Wallet", done: true },
    { title: "Display Token Balances", done: true },
    { title: "Switch Between Chains", done: true },
    { title: "Send a Transaction", done: false },
    { title: "Read Contract State", done: false },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <div
        className="mb-1 px-2 text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--w3-accent)" }}
      >
        Recipes
      </div>
      {recipes.map((r) => (
        <div
          key={r.title}
          className="flex items-center gap-3 rounded-lg px-4 py-2.5"
          style={{ background: r.done ? "var(--w3-accent-subtle)" : "var(--w3-gray-200)" }}
        >
          <div
            className="flex h-5 w-5 items-center justify-center rounded"
            style={{
              background: r.done ? "var(--w3-accent)" : "transparent",
              border: r.done ? "none" : "1px solid var(--w3-gray-400)",
            }}
          >
            {r.done && <Check size={12} className="text-white" />}
          </div>
          <span
            className="text-sm"
            style={{ color: r.done ? "var(--w3-gray-900)" : "var(--w3-gray-600)" }}
          >
            {r.title}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Component preview cards */
export function ComponentsVisual() {
  const components = [
    { name: "ConnectWallet", icon: <Wallet size={16} />, tag: "Button" },
    { name: "ChainSwitcher", icon: <ArrowLeftRight size={16} />, tag: "Dropdown" },
    { name: "TokenBalance", icon: <Coins size={16} />, tag: "Display" },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-3 p-2">
      {components.map((c) => (
        <div
          key={c.name}
          className="flex items-center gap-3 rounded-lg px-4 py-3"
          style={{ background: "var(--w3-gray-200)", border: "1px solid var(--w3-border-subtle)" }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}
          >
            {c.icon}
          </div>
          <div className="flex flex-col">
            <span
              className="text-sm font-medium"
              style={{
                color: "var(--w3-gray-900)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
              }}
            >
              {"<"}
              {c.name}
              {" />"}
            </span>
          </div>
          <span
            className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{ background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}
          >
            {c.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Shared terminal line component */
function Line({
  children,
  prompt,
  muted,
  accent,
}: {
  children: React.ReactNode;
  prompt?: boolean;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-xs leading-relaxed">
      {prompt && <span style={{ color: "var(--w3-accent)" }}>$</span>}
      <span
        style={{
          color: accent ? "var(--w3-accent)" : muted ? "var(--w3-gray-500)" : "var(--w3-gray-900)",
        }}
      >
        {children}
      </span>
    </div>
  );
}
