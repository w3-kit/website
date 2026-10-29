import { useState, useEffect } from "react";
import type { createHighlighter } from "shiki";

type Highlighter = Awaited<ReturnType<typeof createHighlighter>>;

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then((shiki) =>
      shiki.createHighlighter({
        themes: ["github-light-high-contrast", "github-dark-high-contrast"],
        langs: ["tsx", "typescript", "solidity", "bash", "json", "markdown"],
      }),
    );
  }
  return highlighterPromise;
}

export function useHighlight(code: string, lang: string = "tsx") {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((highlighter) => {
      if (cancelled) return;
      const result = highlighter.codeToHtml(code, {
        lang,
        themes: { light: "github-light-high-contrast", dark: "github-dark-high-contrast" },
      });
      setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return html;
}
