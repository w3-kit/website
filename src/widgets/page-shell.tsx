import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import type { Section } from "../shared/lib/theme";

interface PageShellProps {
  section: Section;
  children: ReactNode;
  /** Use transparent header that floats over content */
  transparentHeader?: boolean;
}

export function PageShell({ section, children, transparentHeader }: PageShellProps) {
  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden"
      style={{ background: "var(--w3-gray-100)" }}
    >
      <SiteHeader
        currentSection={section}
        variant={transparentHeader ? "transparent" : "default"}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
