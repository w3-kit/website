import { useEffect, useState } from "react";
import { type Theme, getStoredTheme, setTheme, listenToSystemTheme } from "../../shared/lib/theme";
import { cn } from "../../shared/lib/utils";

const THEMES: { value: Theme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeToggle({ className }: { className?: string }) {
  const [current, setCurrent] = useState<Theme>(() => getStoredTheme());

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
            current === value
              ? "bg-[var(--w3-footer-ink)] text-[var(--w3-footer-ground)]"
              : "text-[var(--w3-footer-soft)] hover:text-[var(--w3-footer-ink)]",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
