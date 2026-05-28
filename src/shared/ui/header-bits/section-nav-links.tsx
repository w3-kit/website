import { getSectionUrl } from "../../lib/urls";
import { cn } from "../../lib/utils";
import type { Section } from "../../lib/theme";

const LINKS = [
  { label: "UI", section: "ui" },
  { label: "Docs", section: "docs" },
  { label: "Registry", section: "registry" },
  { label: "Learn", section: "learn" },
] as const satisfies readonly { label: string; section: Section }[];

interface SectionNavLinksProps {
  /** Highlights the link matching this section. */
  currentSection?: Section;
  /** Visual variant. "compact" matches header/nav use; "block" matches mobile overlay. */
  variant?: "compact" | "block";
  /** Optional click handler (e.g., to close a mobile menu). */
  onLinkClick?: () => void;
}

export function SectionNavLinks({
  currentSection,
  variant = "compact",
  onLinkClick,
}: SectionNavLinksProps) {
  return (
    <>
      {LINKS.map((link) => {
        const isActive = currentSection === link.section;
        return (
          <a
            key={link.section}
            href={getSectionUrl(link.section)}
            onClick={onLinkClick}
            className={cn(
              "rounded-md text-sm font-medium transition-colors",
              variant === "compact" ? "px-3 py-1.5" : "px-4 py-3 text-base",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
            style={
              isActive && variant === "block"
                ? { background: "var(--w3-surface-elevated)" }
                : undefined
            }
          >
            {link.label}
          </a>
        );
      })}
    </>
  );
}
