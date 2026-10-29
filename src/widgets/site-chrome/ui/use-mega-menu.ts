import { useEffect, useRef, useState } from "react";

const HOVER_OPEN_MS = 80;
const HOVER_CLOSE_MS = 160;
export const MEGA_PANEL_ID = "mega-panel";

/**
 * Which header menu is open. Opens on hover (after a short delay) or click; closes on
 * Escape, a click outside the header, or leaving it.
 */
export function useMegaMenu() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const schedule = (label: string | null, ms: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenMenu(label), ms);
  };

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      headerRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${openMenu}"]`)?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  /** Props for the button that opens the menu called `label`. */
  const triggerProps = (label: string) => ({
    "data-menu": label,
    "aria-expanded": openMenu === label,
    "aria-controls": openMenu === label ? MEGA_PANEL_ID : undefined,
    onClick: () => setOpenMenu(openMenu === label ? null : label),
    onMouseEnter: () => schedule(label, HOVER_OPEN_MS),
  });

  return {
    openMenu,
    headerRef,
    triggerProps,
    closeOnHover: () => schedule(null, HOVER_OPEN_MS),
    closeOnLeave: () => schedule(null, HOVER_CLOSE_MS),
    keepOpen: () => clearTimeout(timer.current),
  };
}

export type MegaMenu = ReturnType<typeof useMegaMenu>;
