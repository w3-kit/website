import type { ReactNode } from "react";
import { DocsHeader } from "./docs-header";
import { DocsFooter } from "./docs-footer";
import { SearchProvider } from "../features/search";

interface DocsShellProps {
  children: ReactNode;
}

export function DocsShell({ children }: DocsShellProps) {
  return (
    <SearchProvider>
      <div
        className="flex min-h-screen flex-col overflow-x-hidden"
        style={{ background: "var(--w3-gray-100)" }}
      >
        <DocsHeader />
        <main className="flex-1">{children}</main>
        <DocsFooter />
      </div>
    </SearchProvider>
  );
}
