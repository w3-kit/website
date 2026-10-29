import type { ReactNode } from "react";
import { SiteShell } from "./site-chrome";
import { SearchProvider, useSearch } from "../features/search";

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <DocsFrame>{children}</DocsFrame>
    </SearchProvider>
  );
}

function DocsFrame({ children }: { children: ReactNode }) {
  const { openSearch } = useSearch();
  return (
    <SiteShell section="docs" onSearch={openSearch}>
      {children}
    </SiteShell>
  );
}
