export type Ecosystem = "evm" | "solana" | "sui" | "aptos";

export type RpcEndpoint = {
  url: string;
  provider: string;
  public: boolean;
};

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
  rpcEndpoints: RpcEndpoint[];
  blockExplorers: string[];
  faucets: string[];
  testnet: boolean;
  learn: string;
  cluster?: string;
};
