const DOMAIN = "w3-kit.com";

/**
 * Returns the URL for a section.
 * - Production: subdomain URLs (ui.w3-kit.com)
 * - Local dev: subdomain URLs (ui.localhost:3000) with path fallback
 *
 * Note: some browsers don't resolve *.localhost subdomains.
 * The path-based fallback (/ui, /docs) always works via TanStack Router.
 */
export function getSectionUrl(section: string): string {
  if (typeof window === "undefined") return `/${section}`;
  const host = window.location.host;
  const protocol = window.location.protocol;

  // Production: always use subdomains
  if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
    return `${protocol}//${section}.${DOMAIN}`;
  }

  // Local dev: use subdomains if we're already on one,
  // otherwise use path-based routing (safer fallback)
  const currentSub = host.split(".")[0];
  const isOnSubdomain = ["ui", "docs", "registry", "learn", "design"].includes(currentSub);

  if (isOnSubdomain) {
    const port = window.location.port;
    return `${protocol}//${section}.localhost${port ? `:${port}` : ""}`;
  }

  // Fallback: path-based (always works)
  return `/${section}`;
}

export function getLandingUrl(): string {
  if (typeof window === "undefined") return "/";
  const host = window.location.host;
  const protocol = window.location.protocol;

  if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
    return `${protocol}//www.${DOMAIN}`;
  }

  // If on a subdomain, link back to root localhost
  const currentSub = host.split(".")[0];
  const isOnSubdomain = ["ui", "docs", "registry", "learn", "design"].includes(currentSub);

  if (isOnSubdomain) {
    const port = window.location.port;
    return `${protocol}//localhost${port ? `:${port}` : ""}`;
  }

  return "/";
}
