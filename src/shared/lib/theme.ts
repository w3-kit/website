export type Theme = "system" | "light" | "dark";
export type Section = "landing" | "ui" | "docs" | "registry" | "design";

export const THEME_KEY = "w3-theme";
export const THEME_ATTR = "data-theme";
export const SYSTEM_DARK_CLASS = "system-dark";
export const DARK_CLASS = "dark"; // shadcn uses .dark for dark mode
const DARK_MQ = "(prefers-color-scheme: dark)";

function applyDarkClass(root: HTMLElement, isDark: boolean) {
  root.classList.toggle(DARK_CLASS, isDark);
}

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(THEME_KEY) as Theme) || "system";
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
  const root = document.documentElement;
  root.setAttribute(THEME_ATTR, theme);

  if (theme === "system") {
    const prefersDark = window.matchMedia(DARK_MQ).matches;
    root.classList.toggle(SYSTEM_DARK_CLASS, prefersDark);
    applyDarkClass(root, prefersDark);
  } else {
    root.classList.remove(SYSTEM_DARK_CLASS);
    applyDarkClass(root, theme === "dark");
  }
}

export function listenToSystemTheme(callback: () => void): () => void {
  const mq = window.matchMedia(DARK_MQ);
  const handler = () => {
    if (getStoredTheme() === "system") {
      const root = document.documentElement;
      root.classList.toggle(SYSTEM_DARK_CLASS, mq.matches);
      applyDarkClass(root, mq.matches);
      callback();
    }
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
