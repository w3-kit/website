import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

interface UiShellProps {
  children: ReactNode;
}

export function UiShell({ children }: UiShellProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-w3-ground">
      <SiteHeader currentSection="ui" />
      <main className="flex-1">{children}</main>
      <SiteFooter currentSection="ui" />
    </div>
  );
}
