export function getSubdomain(host: string): string {
  const parts = host.split(".");
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return "landing";
  }
  if (parts.length >= 3) {
    const sub = parts[0];
    if (["ui", "docs", "registry"].includes(sub)) {
      return sub;
    }
  }
  return "landing";
}
