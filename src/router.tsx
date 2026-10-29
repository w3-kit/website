import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getSubdomain, toInternalPath, toPublicPath } from "./app/middleware";

/**
 * Each section lives under its own folder in the route tree (/ui, /docs, /registry)
 * but is served from its own host (ui.w3-kit.com). The rewrite maps between the
 * two on the server and in the browser, so the address bar keeps the public path.
 */
export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => {
        const subdomain = getSubdomain(url.host);
        if (subdomain === "landing") return undefined;
        url.pathname = toInternalPath(subdomain, url.pathname);
        return url;
      },
      output: ({ url }) => {
        const subdomain = getSubdomain(url.host);
        if (subdomain === "landing") return undefined;
        url.pathname = toPublicPath(subdomain, url.pathname);
        return url;
      },
    },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
