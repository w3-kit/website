import { useEffect, useState } from "react";
import {
  type Theme,
  getStoredTheme,
  setTheme,
  listenToSystemTheme,
} from "../../../shared/lib/theme";
import { cn } from "../../../shared/lib/utils";

const THEMES: { value: Theme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/** The footer is a black field in both themes; a page bar sits on the ground, like the category tabs. */
const SURFACES = {
  footer: {
    current: "bg-[var(--w3-footer-ink)] text-[var(--w3-footer-ground)]",
    other: "text-[var(--w3-footer-soft)] hover:text-[var(--w3-footer-ink)]",
  },
  page: {
    current:
      "bg-w3-ink text-w3-ground outline-w3-accent focus-visible:outline-2 focus-visible:outline-offset-2",
    other:
      "bg-w3-tone text-w3-ink hover:bg-w3-tone-2 outline-w3-accent focus-visible:outline-2 focus-visible:outline-offset-2",
  },
};

interface ThemeToggleProps {
  surface?: keyof typeof SURFACES;
  className?: string;
}

export function ThemeToggle({ surface = "footer", className }: ThemeToggleProps) {
  const [current, setCurrent] = useState<Theme>(() => getStoredTheme());
  const colours = SURFACES[surface];

  useEffect(() => listenToSystemTheme(() => setCurrent(getStoredTheme())), []);

  return (
    <div role="group" aria-label="Colour theme" className={cn("inline-flex", className)}>
      {THEMES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={current === value}
          onClick={() => {
            setTheme(value);
            setCurrent(value);
          }}
          className={cn(
            "h-10 px-4 text-w3-small font-medium transition-colors",
            current === value ? colours.current : colours.other,
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
