import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import type { ComponentMeta } from "../../../entities/component";

interface ComponentPreviewProps {
  component: ComponentMeta;
  children?: React.ReactNode;
}

export function ComponentPreview({ component, children }: ComponentPreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const installCmd = `npx w3-kit add ${component.id}`;
  const importSnippet = `import { ... } from "${component.importPath}"`;
  const [copiedInstall, handleCopyInstall] = useCopyToClipboard(installCmd);
  const [copiedImport, handleCopyImport] = useCopyToClipboard(importSnippet);

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        border: "1px solid var(--w3-border-subtle)",
      }}
    >
      {/* Tab bar */}
      <div
        className="flex gap-0"
        style={{
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2.5 text-sm font-medium capitalize transition-all"
            style={{
              color: tab === t ? "var(--w3-gray-900)" : "var(--w3-gray-500)",
              background: tab === t ? "var(--w3-surface-elevated)" : "transparent",
              borderBottom:
                tab === t ? "2px solid var(--w3-accent)" : "2px solid transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "preview" ? (
        <div
          className="flex min-h-[280px] items-center justify-center p-8"
          style={{ background: "var(--w3-glass-inner-bg)" }}
        >
          {children || (
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-xl"
                style={{ background: "var(--w3-accent-subtle)" }}
              >
                <span className="text-2xl" style={{ color: "var(--w3-accent)" }}>
                  {component.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--w3-gray-500)" }}>
                Interactive preview coming soon
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex flex-col gap-4 p-6"
          style={{ background: "var(--w3-glass-inner-bg)" }}
        >
          {/* Install */}
          <div className="flex flex-col gap-2">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--w3-gray-500)" }}
            >
              Install
            </span>
            <button
              onClick={handleCopyInstall}
              className="inline-flex items-center justify-between gap-2 rounded-lg px-4 py-2.5 text-left text-sm transition-all active:scale-[0.98]"
              style={{
                background: "var(--w3-surface-elevated)",
                border: "1px solid var(--w3-border-subtle)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                color: "var(--w3-gray-800)",
              }}
            >
              {installCmd}
              {copiedInstall ? (
                <Check size={14} style={{ color: "var(--w3-accent)" }} />
              ) : (
                <Copy size={14} style={{ color: "var(--w3-gray-400)" }} />
              )}
            </button>
          </div>

          {/* Import */}
          <div className="flex flex-col gap-2">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--w3-gray-500)" }}
            >
              Import
            </span>
            <button
              onClick={handleCopyImport}
              className="inline-flex items-center justify-between gap-2 rounded-lg px-4 py-2.5 text-left text-sm transition-all active:scale-[0.98]"
              style={{
                background: "var(--w3-surface-elevated)",
                border: "1px solid var(--w3-border-subtle)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                color: "var(--w3-gray-800)",
              }}
            >
              {importSnippet}
              {copiedImport ? (
                <Check size={14} style={{ color: "var(--w3-accent)" }} />
              ) : (
                <Copy size={14} style={{ color: "var(--w3-gray-400)" }} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
