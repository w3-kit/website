import { Logo } from "../../../shared/ui/logo";
import { GitHubIcon } from "../../../shared/ui/github-icon";
import { getSectionUrl } from "../../../shared/lib/urls";
import { getStoredTheme, setTheme } from "../../../shared/lib/theme";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const NAV_LINKS = ["UI", "Registry", "Docs", "Learn"] as const;
const SECTION_MAP: Record<string, string> = {
  UI: "ui",
  Registry: "registry",
  Docs: "docs",
  Learn: "learn",
};

const VERSION = "v0.8.2";
const RELEASES_URL = "https://github.com/w3-kit/website/commits/main";

export function LandingNav() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored === "dark") setMode("dark");
    else if (stored === "system") {
      setMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  function toggleTheme() {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    setTheme(next);
  }

  return (
    <nav
      className={[
        "sticky top-0 z-30 border-b transition-[background-color,backdrop-filter,box-shadow,border-color] duration-200",
        scrolled
          ? "border-w3-border-subtle bg-w3-gray-100/75 shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-w3-gray-100/65"
          : "border-transparent bg-w3-gray-100",
      ].join(" ")}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-20 md:py-5">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <Logo size={22} className="text-w3-accent" />
          <span className="text-[15px] font-semibold tracking-[-0.3px]">w3-kit</span>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center rounded-full border border-w3-border-subtle bg-w3-surface px-2 py-[3px] font-mono text-[10px] tracking-[0.04em] text-w3-gray-600 transition-colors hover:border-w3-accent hover:bg-w3-accent-wash hover:text-w3-accent"
            title="View changelog"
          >
            {VERSION}
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
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
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-w3-border-subtle bg-w3-surface text-w3-gray-700 transition-all hover:border-w3-border-standard hover:text-w3-gray-900 active:scale-95"
          >
            <Sun
              size={14}
              className={`absolute transition-all duration-300 ${
                mode === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
            <Moon
              size={14}
              className={`absolute transition-all duration-300 ${
                mode === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
              }`}
            />
          </button>
          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-underline relative inline-flex items-center gap-1.5 pb-[3px] text-[13px] transition-colors hover:text-w3-gray-900"
          >
            <GitHubIcon size={14} /> GitHub
          </a>
        </div>

        {/* Mobile cluster */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-w3-border-subtle bg-w3-surface text-w3-gray-700 transition-all hover:border-w3-border-standard hover:text-w3-gray-900 active:scale-95"
          >
            <Sun
              size={15}
              className={`absolute transition-all duration-300 ${
                mode === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
            <Moon
              size={15}
              className={`absolute transition-all duration-300 ${
                mode === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
              }`}
            />
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-w3-border-subtle bg-w3-surface text-w3-gray-800 transition-all hover:border-w3-border-standard active:scale-95"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-w3-border-subtle bg-w3-gray-100 transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((x) => (
            <a
              key={x}
              href={getSectionUrl(SECTION_MAP[x])}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[15px] text-w3-gray-800 transition-colors hover:bg-w3-surface-alt hover:text-w3-gray-900"
            >
              {x}
            </a>
          ))}
          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-[15px] text-w3-gray-800 transition-colors hover:bg-w3-surface-alt hover:text-w3-gray-900"
          >
            <GitHubIcon size={15} /> GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
