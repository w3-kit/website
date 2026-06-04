export type TokenDeployment = {
  chainId: number;
  address: string;
};

export type Token = {
  symbol: string;
  name: string;
  decimals: number;
  chains: TokenDeployment[];
  logoUrl: string;
  learn: string;
};
