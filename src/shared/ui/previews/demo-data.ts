// Demo / mock data used by both the landing-page ecosystem map section and
// the individual UI component detail pages.
//
// Extracted from ecosystem-map-section.tsx – the original file is untouched.

import type { Network } from "../../../pages/landing/ui/network-switcher/types";
import type { Token as WBToken } from "../../../pages/landing/ui/wallet-balance/types";
import type { NFT } from "../../../pages/landing/ui/nft-card/types";

export const DEMO_NETWORKS: Network[] = [
  {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    currency: "ETH",
    rpcUrl: "https://eth.llamarpc.com",
    blockExplorer: "https://etherscan.io",
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    chainId: 137,
    name: "Polygon",
    symbol: "MATIC",
    currency: "POL",
    rpcUrl: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
    logoURI: "https://assets.coingecko.com/coins/images/4713/small/polygon.png",
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    symbol: "ETH",
    currency: "ETH",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    blockExplorer: "https://arbiscan.io",
    logoURI:
      "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
  },
];

export const DEMO_BALANCE_TOKENS: WBToken[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "1.4201",
    price: 2700,
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    priceChange24h: 2.34,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "2500.00",
    price: 1,
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/6319/small/usdc.png",
    priceChange24h: 0.01,
  },
];

export const DEMO_NFT: NFT = {
  id: "1",
  tokenId: "3100",
  name: "CryptoPunk #3100",
  description: "One of the rarest CryptoPunks",
  image:
    "https://i.seadn.io/gae/aITlFbKioYKVfn0JC1bCp3dFpNx5ckDQSqsY_gQPJoY0TYHjr_aqOmVlVXEetaqS2LA0hFI48gn6kkHPznk3iDKWv6LpdHpQNWmS?auto=format&w=256",
  collection: "CryptoPunks",
  owner: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  contractAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  chainId: 1,
  attributes: [{ trait_type: "Type", value: "Alien" }],
};
