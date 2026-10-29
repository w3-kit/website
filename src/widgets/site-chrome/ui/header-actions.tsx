import { Search } from "lucide-react";
import { GitHubIcon } from "../../../shared/ui/github-icon";
import { MobileMenuButton } from "./mobile-overlay";
import { GET_STARTED_HREF } from "../model/site-nav";

interface HeaderActionsProps {
  onSearch?: () => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export function HeaderActions({ onSearch, mobileOpen, onToggleMobile }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {onSearch && (
        <button
          type="button"
          onClick={onSearch}
          className="hidden h-11 items-center gap-3 bg-w3-tone px-4 text-w3-small text-w3-ink-soft transition-colors hover:text-w3-ink md:inline-flex"
        >
          <Search size={16} aria-hidden />
          Search
          <kbd className="font-sans text-[13px]">⌘K</kbd>
        </button>
      )}
      <a
        href="https://github.com/w3-kit"
        aria-label="w3-kit on GitHub"
        className="hidden h-11 w-11 items-center justify-center text-w3-ink transition-colors hover:text-w3-accent md:inline-flex"
      >
        <GitHubIcon size={20} />
      </a>
      <a
        href={GET_STARTED_HREF}
        className="w3-press hidden h-11 items-center bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent hover:bg-w3-accent-hover sm:inline-flex"
      >
        Get started
      </a>
      <MobileMenuButton open={mobileOpen} onToggle={onToggleMobile} />
    </div>
  );
}
