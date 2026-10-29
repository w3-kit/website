import { ChevronDown } from "lucide-react";
import { cn } from "../../../shared/lib/utils";
import type { MegaMenu } from "./use-mega-menu";

interface MenuTriggerProps {
  label: string;
  menu: MegaMenu;
  className?: string;
}

export function MenuTrigger({ label, menu, className }: MenuTriggerProps) {
  const open = menu.openMenu === label;
  return (
    <button
      type="button"
      {...menu.triggerProps(label)}
      className={cn(
        "inline-flex h-11 items-center gap-1.5 px-3 text-w3-small font-medium transition-colors",
        "hover:text-w3-accent",
        open ? "text-w3-accent" : "text-w3-ink",
        className,
      )}
    >
      {label}
      <ChevronDown
        size={14}
        aria-hidden
        className={cn("transition-transform duration-200", open && "rotate-180")}
      />
    </button>
  );
}
