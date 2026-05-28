import { useEffect, type ReactNode } from "react";

interface MobileMenuOverlayProps {
  open: boolean;
  /** Called when the viewport crosses md (auto-close). */
  onAutoClose?: () => void;
  /** Distance from the top of the viewport (e.g., header height). Default "pt-16". */
  topClass?: string;
  /** Lock body scroll while open. */
  lockScroll?: boolean;
  children: ReactNode;
}

export function MobileMenuOverlay({
  open,
  onAutoClose,
  topClass = "pt-16",
  lockScroll = false,
  children,
}: MobileMenuOverlayProps) {
  // Auto-close at the md breakpoint.
  useEffect(() => {
    if (!onAutoClose) return;
    const onResize = () => {
      if (window.innerWidth >= 768) onAutoClose();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onAutoClose]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!lockScroll || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lockScroll, open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col overflow-y-auto ${topClass} backdrop-blur-xl md:hidden`}
      style={{
        background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
      }}
    >
      {children}
    </div>
  );
}
