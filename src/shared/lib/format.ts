/** Truncate an Ethereum/Solana address to 0x1234...5678 format */
export function truncateAddress(addr: string): string {
  if (addr.length <= 13) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
