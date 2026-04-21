import { Logo } from "../../../shared/ui/logo";
import { getSectionUrl } from "../../../shared/lib/urls";

const FOOTER_COLS = [
  {
    h: "Toolkit",
    links: [
      { label: "Components", href: "/ui" },
      { label: "Registry", href: "/registry" },
      { label: "CLI", href: "/docs" },
      { label: "Themes", href: "/ui" },
      { label: "Changelog", href: "/docs" },
    ],
  },
  {
    h: "Learn",
    links: [
      { label: "Quickstart", href: "/docs" },
      { label: "Recipes", href: "/docs" },
      { label: "Guides", href: "/docs" },
      { label: "API reference", href: "/docs" },
      { label: "Examples", href: "/docs" },
    ],
  },
  {
    h: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/pswk1/w3-kit" },
      { label: "Discord", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Contribute", href: "https://github.com/pswk1/w3-kit" },
      { label: "Roadmap", href: "#" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-w3-border-subtle bg-w3-surface-alt">
      <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-16 px-10 pb-12 pt-[72px]">
        {/* Brand column */}
        <div>
          <div className="mb-3.5 flex items-center gap-2.5">
            <Logo size={24} className="text-w3-accent" />
            <span className="text-lg font-semibold tracking-[-0.3px]">w3-kit</span>
          </div>
          <p className="m-0 mb-[18px] max-w-[320px] text-sm leading-relaxed text-w3-gray-600">
            An open, friendly toolkit for web3 builders. Free forever,
            MIT-licensed, built in the open — with and for the community.
          </p>
          <div className="flex items-center gap-2.5 text-xs text-w3-gray-600">
            {["MIT", "OPEN SOURCE", "v0.8.2"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-w3-border-subtle bg-w3-gray-100 px-2 py-1 font-mono text-[10px] tracking-[0.06em]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.h}>
            <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.1em] text-w3-gray-500">
              {col.h}
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-w3-gray-800 transition-all hover:translate-x-0.5 hover:text-w3-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-w3-border-subtle px-10 py-5">
        <span className="font-mono text-[11px] text-w3-gray-500">
          w3-kit © 2026 · Made with ♥ by builders, for builders · No accounts, no
          telemetry, no catches
        </span>
        <div className="flex gap-[18px]">
          {[
            { label: "GitHub", href: "https://github.com/pswk1/w3-kit" },
            { label: "Discord", href: "#" },
            { label: "X", href: "#" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs text-w3-gray-600 transition-all hover:translate-x-0.5 hover:text-w3-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
