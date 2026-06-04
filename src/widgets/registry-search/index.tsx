import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { CHAINS } from "../../entities/chain/model/chains.gen";
import { TOKENS } from "../../entities/token/model/tokens.gen";
import { PROGRAMS } from "../../entities/program/model/programs.gen";

type Hit = {
  kind: "chain" | "token" | "program";
  id: string;
  label: string;
  hint: string;
  href: string;
};

function buildCorpus(): Hit[] {
  return [
    ...CHAINS.map((c) => ({
      kind: "chain" as const,
      id: String(c.chainId),
      label: c.name,
      hint: `chainId ${c.chainId}`,
      href: `/registry/chains/${c.chainId}`,
    })),
    ...TOKENS.map((t) => ({
      kind: "token" as const,
      id: t.symbol,
      label: t.symbol,
      hint: t.name,
      href: `/registry/tokens/${t.symbol}`,
    })),
    ...PROGRAMS.map((p) => ({
      kind: "program" as const,
      id: p.key,
      label: p.name,
      hint: p.key,
      href: `/registry/programs/${p.key}`,
    })),
  ];
}

export function RegistrySearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  const corpus = useMemo(() => buildCorpus(), []);
  const fuse = useMemo(
    () => new Fuse(corpus, { keys: ["label", "hint", "id"], threshold: 0.3 }),
    [corpus],
  );
  const results = query
    ? fuse
        .search(query)
        .map((r) => r.item)
        .slice(0, 8)
    : [];

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search registry"
      className="fixed inset-0 z-50 flex items-start justify-center bg-w3-gray-900/40 p-4 pt-[10vh]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-w3-border-subtle bg-w3-gray-100 shadow-2xl"
      >
        <input
          autoFocus
          placeholder="Search chains, tokens, programs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border-b border-w3-border-subtle bg-transparent px-4 py-3 text-sm outline-none"
        />
        <ul role="listbox" className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 && query && (
            <li className="px-4 py-3 text-sm text-w3-gray-500">No matches.</li>
          )}
          {results.map((r) => (
            <li
              key={`${r.kind}-${r.id}`}
              role="option"
              aria-selected="false"
              aria-label={r.label}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-w3-surface-alt"
              onClick={() => {
                onClose();
                window.location.assign(r.href);
              }}
            >
              <div className="font-medium">{r.label}</div>
              <div className="font-mono text-[11px] text-w3-gray-500">
                {r.kind} · {r.hint}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
