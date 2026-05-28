import { Logo } from "../logo";
import { getLandingUrl } from "../../lib/urls";
import { cn } from "../../lib/utils";

interface BrandProps {
  /** Logo size in pixels. Default 24. */
  size?: number;
  /** Where the brand link points. Defaults to the landing URL. */
  href?: string;
  /** Optional section badge appended inside the link (e.g., "docs", "ui"). */
  badge?: string;
  className?: string;
}

export function Brand({ size = 24, href, badge, className }: BrandProps) {
  return (
    <a href={href ?? getLandingUrl()} className={cn("flex items-center gap-2", className)}>
      <Logo size={size} className="text-[var(--w3-accent)]" />
      <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
        w3-kit
      </span>
      {badge && (
        <span className="rounded-md bg-w3-accent-subtle px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-w3-accent">
          {badge}
        </span>
      )}
    </a>
  );
}
