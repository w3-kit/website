/* AUTO-GENERATED — mirrored from ui/registry/w3-kit/. Edit the source there. */
export function truncateAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
