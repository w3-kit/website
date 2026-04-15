import type { ReactNode } from "react";
import { UiHeader } from "./ui-header";
import { UiFooter } from "./ui-footer";

interface UiShellProps {
  children: ReactNode;
  transparentHeader?: boolean;
}

export function UiShell({ children, transparentHeader }: UiShellProps) {
  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden"
      style={{ background: "var(--w3-gray-100)" }}
    >
      <UiHeader variant={transparentHeader ? "transparent" : "default"} />
      <main className="flex-1">{children}</main>
      <UiFooter />
    </div>
  );
}
