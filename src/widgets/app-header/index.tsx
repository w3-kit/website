import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../../shared/lib/utils";

interface AppHeaderProps {
  /** "default" sticks at the top with an opaque background; "transparent" floats over content and gains its background on scroll. */
  variant?: "default" | "transparent";
  /** Scroll distance (px) at which a transparent header gains its background. Default 80. */
  scrollThreshold?: number;
  /** Override the inner header element classes (e.g., different padding). */
  className?: string;
  /** Header contents (Brand, nav, mobile trigger, etc.). */
  children: ReactNode;
  /** Content rendered after the header (e.g., a mobile menu overlay). */
  mobileContent?: ReactNode;
}

export function AppHeader({
  variant = "default",
  scrollThreshold = 80,
  className,
  children,
  mobileContent,
}: AppHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const isTransparent = variant === "transparent";

  useEffect(() => {
    if (!isTransparent) return;
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparent, scrollThreshold]);

  const showBackground = !isTransparent || scrolled;

  return (
    <>
      <header
        className={cn(
          "z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
          isTransparent ? "fixed inset-x-0 top-0" : "sticky top-0",
          showBackground && "border-b backdrop-blur-xl",
          className,
        )}
        style={{
          borderColor: showBackground ? "var(--w3-border-subtle)" : "transparent",
          background: showBackground
            ? "color-mix(in srgb, var(--w3-gray-100) 80%, transparent)"
            : "transparent",
        }}
      >
        {children}
      </header>
      {mobileContent}
    </>
  );
}
