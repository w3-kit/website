import { cn } from "../../shared/lib/utils";
import type { ReactNode } from "react";

interface AppFooterProps {
  className?: string;
  children: ReactNode;
}

export function AppFooter({ className, children }: AppFooterProps) {
  return (
    <footer
      className={cn("mt-auto", className)}
      style={{ borderTop: "1px solid var(--w3-border-subtle)" }}
    >
      {children}
    </footer>
  );
}
