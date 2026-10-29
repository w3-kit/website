import { useEffect, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

// Matches Tailwind's lg breakpoint, where the desktop nav takes over.
const DESKTOP_QUERY = "(min-width: 1024px)";

export function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="inline-flex h-11 w-11 items-center justify-center text-w3-ink lg:hidden"
    >
      {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
    </button>
  );
}

/** Full-screen menu under the header; closes itself when the window grows to desktop size. */
export function MobileOverlay({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => desktop.matches && onClose();
    desktop.addEventListener("change", onChange);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      desktop.removeEventListener("change", onChange);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-w3-ground pt-[72px] lg:hidden">
      {children}
    </div>
  );
}
