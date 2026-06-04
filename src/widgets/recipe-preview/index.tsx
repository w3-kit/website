import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../../shared/lib/use-copy-to-clipboard";
import { RECIPE_SNIPPETS, type RecipeSnippet } from "./snippets";
import { CodePanel } from "./code-panel";

export function RecipePreview() {
  const [activeId, setActiveId] = useState<string>(RECIPE_SNIPPETS[0].id);
  const active = RECIPE_SNIPPETS.find((s) => s.id === activeId) as RecipeSnippet;
  const [copied, copy] = useCopyToClipboard(active.code.trim());

  return (
    <div className="grid grid-cols-1 gap-0 border border-w3-border-subtle lg:grid-cols-[220px_1fr]">
      <div
        role="tablist"
        aria-label="Recipe previews"
        className="flex flex-row overflow-x-auto border-b border-w3-border-subtle lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
      >
        {RECIPE_SNIPPETS.map((s) => {
          const selected = s.id === activeId;
          return (
            <button
              key={s.id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`preview-panel-${s.id}`}
              id={`preview-tab-${s.id}`}
              onClick={() => setActiveId(s.id)}
              className={`whitespace-nowrap px-5 py-4 text-left text-sm transition-colors ${
                selected
                  ? "bg-w3-surface-alt text-w3-gray-900"
                  : "text-w3-gray-600 hover:bg-w3-surface-alt/60"
              }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`preview-panel-${active.id}`}
        aria-labelledby={`preview-tab-${active.id}`}
        className="flex min-h-[280px] flex-col"
      >
        <p className="border-b border-w3-border-subtle px-5 py-3 text-[13px] text-w3-gray-600">
          {active.description}
        </p>
        <CodePanel snippet={active} />
        <div className="flex items-center justify-between border-t border-w3-border-subtle px-5 py-3">
          <button
            type="button"
            aria-label="Copy code"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-w3-border-subtle px-3 py-1.5 font-mono text-[12px] text-w3-gray-700 transition-colors hover:border-w3-accent hover:bg-w3-accent-wash"
          >
            {copied ? <Check size={13} className="text-w3-accent" /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy code"}
          </button>
          <a
            href={active.docsHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-w3-gray-900 hover:text-w3-accent"
          >
            Try it in docs <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
