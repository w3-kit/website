import { Menu, X } from "lucide-react";
import { Button } from "../button";

interface MobileMenuTriggerProps {
  open: boolean;
  onToggle: () => void;
  /** Override Button variant. Default "ghost". */
  variant?: "ghost" | "outline";
}

export function MobileMenuTrigger({ open, onToggle, variant = "ghost" }: MobileMenuTriggerProps) {
  return (
    <Button
      variant={variant}
      size="icon-sm"
      className="md:hidden"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      {open ? <X size={18} /> : <Menu size={18} />}
    </Button>
  );
}
