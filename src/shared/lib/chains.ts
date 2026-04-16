export const CHAINS: Record<number, { name: string; color: string }> = {
  1: { name: "Ethereum", color: "#627EEA" },
  137: { name: "Polygon", color: "#8247E5" },
  42161: { name: "Arbitrum", color: "#28A0F0" },
  10: { name: "Optimism", color: "#FF0420" },
  8453: { name: "Base", color: "#0052FF" },
};

export const CHAIN_ENTRIES = Object.entries(CHAINS);
