import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import type { Section } from "../shared/lib/theme";

interface PageShellProps {
  section: Section;
  children: ReactNode;
}

export function PageShell({ section, children }: PageShellProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--w3-gray-100)",
      }}
    >
      <SiteHeader currentSection={section} />
      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter />
    </div>
  );
}
