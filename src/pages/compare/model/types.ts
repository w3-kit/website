export type AlternativeId = "scaffold-eth" | "create-web3-dapp" | "thirdweb";

export type Alternative = {
  id: AlternativeId;
  name: string;
  url: string;
  tagline: string;
  useWhen: string[];
  chooseW3Kit: string[];
};

export type FeatureRow = {
  label: string;
  w3kit: string;
  values: Record<AlternativeId, string>;
};
