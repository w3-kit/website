import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Search, X } from "lucide-react";
import { searchDocs } from "../model/search-index";
import { getSectionUrl } from "../../../shared/lib/urls";
import { Dialog, DialogContent, DialogTitle } from "../../../shared/ui/dialog";

const typeLabels: Record<string, string> = {
  doc: "Doc",
  guide: "Guide",
  recipe: "Recipe",
};

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchDocs(query).slice(0, 10), [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        window.location.href = `${getSectionUrl("docs")}${results[selectedIndex].href.replace("/docs", "")}`;
        onClose();
      }
    },
    [results, selectedIndex, onClose],
  );

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="top-[12%] max-w-[600px] translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-w3-ground p-0 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.4)]"
      >
        <DialogTitle className="sr-only">Search documentation</DialogTitle>

        {/* Search input */}
        <div className="flex h-16 items-center gap-3 bg-w3-tone px-5">
          <Search size={18} aria-hidden className="text-w3-ink-soft" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search the docs"
            aria-label="Search the docs"
            className="flex-1 bg-transparent text-w3-body text-w3-ink outline-none placeholder:text-w3-ink-soft"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-2 text-w3-ink-soft hover:text-w3-ink"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[420px] overflow-y-auto py-2">
          {query && results.length === 0 && (
            <div className="px-5 py-6">
              <p className="text-w3-small text-w3-ink-soft">
                Nothing matches &ldquo;{query}&rdquo;.
              </p>
            </div>
          )}

          {results.map((item, index) => (
            <a
              key={item.href}
              href={`${getSectionUrl("docs")}${item.href.replace("/docs", "")}`}
              className={`block px-5 py-3 transition-colors ${index === selectedIndex ? "bg-w3-tone" : ""}`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={onClose}
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-w3-body font-medium text-w3-ink">{item.title}</span>
                <span className="text-w3-small text-w3-ink-soft">{typeLabels[item.type]}</span>
              </span>
              <span className="mt-0.5 block truncate text-w3-small text-w3-ink-soft">
                {item.description}
              </span>
            </a>
          ))}

          {!query && (
            <p className="px-5 py-6 text-w3-small text-w3-ink-soft">
              Type to search docs, guides and recipes. Arrow keys move, Enter opens.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
