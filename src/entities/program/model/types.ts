export type ProgramDeployment = {
  chainId: number;
  programId: string;
};

export type SolanaProgram = {
  key: string;
  name: string;
  ecosystem: "solana";
  deployments: ProgramDeployment[];
  learn: string;
};
