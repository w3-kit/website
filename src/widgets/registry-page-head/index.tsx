import type { ReactNode } from "react";

interface RegistryPageHeadProps {
  title: string;
  /** A second title line in the soft ink. */
  subtitle?: string;
  children?: ReactNode;
}

/** Title block shared by every registry page: the title left, its text and actions right. */
export function RegistryPageHead({ title, subtitle, children }: RegistryPageHeadProps) {
  return (
    <header className="grid gap-8 pb-14 md:grid-cols-12 md:gap-x-6 md:pb-20">
      <h1 className="w3-rise text-w3-title font-medium md:col-span-7">
        <span className="block">{title}</span>
        {subtitle && <span className="block text-w3-ink-soft">{subtitle}</span>}
      </h1>
      {children && (
        <div
          className="w3-rise flex flex-col items-start gap-6 md:col-span-5 md:self-end"
          style={{ animationDelay: "80ms" }}
        >
          {children}
        </div>
      )}
    </header>
  );
}
