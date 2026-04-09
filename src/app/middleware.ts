const SUBDOMAINS = ["ui", "docs", "registry", "learn", "design"] as const;

export type Subdomain = (typeof SUBDOMAINS)[number] | "landing";

export function getSubdomain(host: string): Subdomain {
  const parts = host.split(".");

  // Support local subdomain testing: ui.localhost:3000, docs.localhost:3000, etc.
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    const localSub = parts[0];
    if (SUBDOMAINS.includes(localSub as (typeof SUBDOMAINS)[number])) {
      return localSub as Subdomain;
    }
    return "landing";
  }

  if (parts.length >= 3) {
    const sub = parts[0];
    if (SUBDOMAINS.includes(sub as (typeof SUBDOMAINS)[number])) {
      return sub as Subdomain;
    }
  }

  return "landing";
}
