import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { SearchProvider, useSearch } from "../features/search";

interface DocsShellProps {
  children: ReactNode;
}

export function DocsShell({ children }: DocsShellProps) {
  return (
    <SearchProvider>
      <div className="flex min-h-screen flex-col overflow-x-clip bg-w3-ground">
        <DocsHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter currentSection="docs" />
      </div>
    </SearchProvider>
  );
}

function DocsHeader() {
  const { openSearch } = useSearch();
  return <SiteHeader currentSection="docs" onSearch={openSearch} />;
}
