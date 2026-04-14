const DOMAIN = "w3-kit.com";

export function getSectionUrl(section: string): string {
  if (typeof window === "undefined") return `/${section}`;
  const host = window.location.host;
  const protocol = window.location.protocol;

  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    const port = window.location.port;
    return `${protocol}//${section}.localhost${port ? `:${port}` : ""}`;
  }

  return `${protocol}//${section}.${DOMAIN}`;
}

export function getLandingUrl(): string {
  if (typeof window === "undefined") return "/";
  const host = window.location.host;
  const protocol = window.location.protocol;

  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    const port = window.location.port;
    return `${protocol}//localhost${port ? `:${port}` : ""}`;
  }

  return `${protocol}//www.${DOMAIN}`;
}
