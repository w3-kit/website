export type Ecosystem = "evm" | "solana" | "sui" | "aptos";

export type Chain = {
  chainId: number;
  name: string;
  shortName: string;
  ecosystem: Ecosystem;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers: string[];
  faucets: string[];
  testnet: boolean;
  learn: string;
  cluster?: string;
};
