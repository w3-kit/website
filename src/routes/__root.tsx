import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { ReactNode } from "react";
import "../shared/styles/tokens.css";

// Mirrors constants from shared/lib/theme.ts — must stay in sync.
// Inline script prevents flash of wrong theme (FOUWT) before React hydrates.
import { THEME_KEY, THEME_ATTR, SYSTEM_DARK_CLASS, DARK_CLASS } from "../shared/lib/theme";

const themeScript = [
  "(function(){",
  `var t=localStorage.getItem('${THEME_KEY}')||'system';`,
  "var d=document.documentElement;",
  `d.setAttribute('${THEME_ATTR}',t);`,
  "var isDark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches);",
  `if(t==='system'&&isDark)d.classList.add('${SYSTEM_DARK_CLASS}');`,
  `if(isDark)d.classList.add('${DARK_CLASS}');`,
  "})();",
].join("");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "w3-kit — Open Source Web3 Developer Toolkit" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/logo.png", type: "image/png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="system">
      <head>
        <HeadContent />
        {/* Static theme script — no user input, safe to inline */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}
