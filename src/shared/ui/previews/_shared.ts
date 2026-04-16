import type { CSSProperties } from "react";

/** Shared card style for all preview components */
export const previewCard: CSSProperties = {
  borderRadius: 12,
  border: "1px solid var(--w3-border-subtle)",
  background: "var(--w3-surface-elevated)",
  overflow: "hidden",
  fontFamily: '"Geist Sans", system-ui, -apple-system, sans-serif',
};

/** Shared header style for preview cards */
export const previewHeader: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 16px",
  borderBottom: "1px solid var(--w3-border-subtle)",
};

/** Monospace font stack */
export const monoFont = '"Geist Mono", ui-monospace, monospace';
