import { Search } from "lucide-react";
import { getLandingUrl } from "../../shared/lib/urls";

export function RegistryHeader({ onOpenSearch }: { onOpenSearch: () => void }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-w3-border-subtle bg-w3-gray-100/90 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <a href={getLandingUrl()} className="font-mono text-sm font-medium text-w3-gray-900">
          w3-kit
        </a>
        <span className="rounded-full bg-w3-accent-wash px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-w3-accent">
          Registry
        </span>
      </div>

      <button
        type="button"
        onClick={onOpenSearch}
        aria-label="Search registry"
        className="inline-flex items-center gap-2 rounded-full border border-w3-border-subtle bg-w3-surface-elevated px-3 py-1.5 text-sm text-w3-gray-600 hover:border-w3-accent"
      >
        <Search size={13} />
        <span>Search</span>
        <kbd className="font-mono text-[11px] text-w3-gray-500">⌘K</kbd>
      </button>
    </header>
  );
}
