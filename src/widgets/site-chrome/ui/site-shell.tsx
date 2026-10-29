import type { ReactNode } from "react";
import type { Section } from "../../../shared/lib/urls";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

interface SiteShellProps {
  section: Section;
  /** Sites with their own search (docs, registry) pass its opener. */
  onSearch?: () => void;
  children: ReactNode;
}

/** The frame every page of every site sits in: shared header, the page, shared footer. */
export function SiteShell({ section, onSearch, children }: SiteShellProps) {
  return (
    // overflow-x-clip, not hidden: hidden makes this a scroll container and breaks sticky children.
    <div className="flex min-h-screen flex-col overflow-x-clip bg-w3-ground text-w3-ink antialiased">
      <SiteHeader currentSection={section} onSearch={onSearch} />
      <main className="flex-1">{children}</main>
      <SiteFooter currentSection={section} />
    </div>
  );
}
