import { useState, useEffect } from "react";
import {
  type Theme,
  getStoredTheme,
  setTheme,
  listenToSystemTheme,
} from "../../shared/lib/theme";

const iconPaths: Record<Theme, string> = {
  system:
    "M9 17H15M12 3V4M18.36 5.64L17.66 6.34M21 12H20M18.36 18.36L17.66 17.66M4 12H3M6.34 6.34L5.64 5.64M6.34 17.66L5.64 18.36",
  light:
    "M12 3V4M12 20V21M4 12H3M21 12H20M18.36 5.64L17.66 6.34M5.64 5.64L6.34 6.34M18.36 18.36L17.66 17.66M5.64 18.36L6.34 17.66M16 12A4 4 0 1 1 8 12A4 4 0 0 1 16 12Z",
  dark: "M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z",
};

export function ThemeToggle() {
  const [current, setCurrent] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    return listenToSystemTheme(() => setCurrent(getStoredTheme()));
  }, []);

  const handleChange = (theme: Theme) => {
    setTheme(theme);
    setCurrent(theme);
  };

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {(["system", "light", "dark"] as const).map((theme) => (
        <button
          key={theme}
          onClick={() => handleChange(theme)}
          aria-label={`${theme} theme`}
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${current === theme ? "var(--w3-accent)" : "var(--w3-gray-300)"}`,
            borderRadius: 4,
            background:
              current === theme ? "var(--w3-accent-subtle)" : "transparent",
            color:
              current === theme ? "var(--w3-accent)" : "var(--w3-gray-700)",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={iconPaths[theme]} />
          </svg>
        </button>
      ))}
    </div>
  );
}
