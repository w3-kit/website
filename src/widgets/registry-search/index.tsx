import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { CHAINS } from "../../entities/chain/model/chains.gen";
import { TOKENS } from "../../entities/token/model/tokens.gen";
import { PROGRAMS } from "../../entities/program/model/programs.gen";
import { getSectionUrl } from "../../shared/lib/urls";

const registry = getSectionUrl("registry");

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
      hint: `Chain ID ${c.chainId}`,
      href: `${registry}/chains/${c.chainId}`,
    })),
    ...TOKENS.map((t) => ({
      kind: "token" as const,
      id: t.symbol,
      label: t.symbol,
      hint: t.name,
      href: `${registry}/tokens/${t.symbol}`,
    })),
    ...PROGRAMS.map((p) => ({
      kind: "program" as const,
      id: p.key,
      label: p.name,
      hint: p.key,
      href: `${registry}/programs/${p.key}`,
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
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-4 pt-[12vh]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w3-drop w-full max-w-xl overflow-hidden bg-w3-ground shadow-[0_24px_64px_-16px_rgba(0,0,0,0.4)]"
      >
        <input
          autoFocus
          placeholder="Search chains, tokens, programs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the registry"
          className="h-16 w-full bg-w3-tone px-5 text-w3-body text-w3-ink outline-none placeholder:text-w3-ink-soft"
        />
        <ul role="listbox" className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 && query && (
            <li className="px-5 py-4 text-w3-small text-w3-ink-soft">Nothing matches that.</li>
          )}
          {results.map((r) => (
            <li
              key={`${r.kind}-${r.id}`}
              role="option"
              aria-selected="false"
              aria-label={r.label}
              className="cursor-pointer px-5 py-3 hover:bg-w3-tone"
              onClick={() => {
                onClose();
                window.location.assign(r.href);
              }}
            >
              <div className="text-w3-body font-medium text-w3-ink">{r.label}</div>
              <div className="text-w3-small capitalize text-w3-ink-soft">
                {r.kind} · {r.hint}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
