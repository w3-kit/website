import { ThemeToggle } from "./theme-toggle";

export function SiteFooter() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "12px 24px",
        borderTop: "1px solid var(--w3-gray-300)",
      }}
    >
      <ThemeToggle />
    </footer>
  );
}
