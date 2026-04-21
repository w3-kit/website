import { Logo } from "../../../shared/ui/logo";
import { GitHubIcon } from "../../../shared/ui/github-icon";
import { getSectionUrl } from "../../../shared/lib/urls";
import { getStoredTheme, setTheme } from "../../../shared/lib/theme";
import { useState, useEffect } from "react";

const NAV_LINKS = ["UI", "Registry", "Docs", "Learn"] as const;
const SECTION_MAP: Record<string, string> = {
  UI: "ui",
  Registry: "registry",
  Docs: "docs",
  Learn: "learn",
};

export function LandingNav() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored === "dark") setMode("dark");
    else if (stored === "system") {
      setMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }, []);

  function toggleTheme() {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    setTheme(next);
  }

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-w3-border-subtle bg-w3-gray-100 px-10 py-5">
      <div className="flex items-center gap-2.5">
        <Logo size={22} className="text-w3-accent" />
        <span className="text-[15px] font-semibold tracking-[-0.3px]">w3-kit</span>
        <span className="ml-1 font-mono text-[11px] text-w3-gray-500">v0.8.2</span>
      </div>
      <div className="flex items-center gap-7">
        {NAV_LINKS.map((x) => (
          <a
            key={x}
            href={getSectionUrl(SECTION_MAP[x])}
            className="nav-link-underline relative inline-block pb-[3px] text-[13px] text-w3-gray-800 transition-colors hover:text-w3-gray-900"
          >
            {x}
          </a>
        ))}
        <div className="h-3.5 w-px bg-w3-border-standard" />
        <button
          onClick={toggleTheme}
          className="nav-link-underline relative inline-block pb-[3px] font-mono text-[11px] tracking-[0.04em] text-w3-gray-600 transition-colors hover:text-w3-gray-900"
        >
          {mode === "light" ? "◐ light" : "◑ dark"}
        </button>
        <a
          href="https://github.com/pswk1/w3-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link-underline relative inline-flex items-center gap-1.5 pb-[3px] text-[13px] transition-colors hover:text-w3-gray-900"
        >
          <GitHubIcon size={14} /> GitHub
        </a>
      </div>
    </nav>
  );
}
