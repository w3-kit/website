export type RecipeSnippet = {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  docsSlug: string;
};

export const RECIPE_SNIPPETS: RecipeSnippet[] = [
  {
    id: "connect-wallet",
    title: "Connect a wallet",
    description: "Drop-in wallet button, all popular wallets supported.",
    language: "tsx",
    docsSlug: "connect-wallet",
    code: `import { ConnectWallet } from "@w3-kit/ui";

export function Header() {
  return (
    <header className="flex justify-end p-4">
      <ConnectWallet
        chains={["ethereum", "base", "polygon"]}
        onConnect={(addr) => console.log("connected", addr)}
      />
    </header>
  );
}`,
  },
  {
    id: "wallet-balance",
    title: "Show token balances",
    description: "Typed multi-chain balances with USD conversion.",
    language: "tsx",
    docsSlug: "wallet-balance",
    code: `import { useTokenBalances } from "@w3-kit/hooks";

export function Balances({ address }: { address: \`0x\${string}\` }) {
  const { data, isLoading } = useTokenBalances({
    address,
    chains: ["ethereum", "base"],
    quote: "usd",
  });

  if (isLoading) return <p>Loading…</p>;
  return (
    <ul>
      {data.map((t) => (
        <li key={t.id}>{t.symbol}: \${t.usd.toFixed(2)}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: "token-swap",
    title: "Swap tokens via 1inch",
    description: "Production-ready aggregator UI in three lines.",
    language: "tsx",
    docsSlug: "token-swap",
    code: `import { TokenSwap } from "@w3-kit/ui";

export function SwapPage() {
  return (
    <TokenSwap
      from="USDC"
      to="ETH"
      chain="base"
      aggregator="1inch"
    />
  );
}`,
  },
  {
    id: "nft-mint",
    title: "Mint an NFT",
    description: "Preview, pay, confirm. Three components, no glue code.",
    language: "tsx",
    docsSlug: "nft-mint",
    code: `import { MintPreview, MintPay, MintConfirm } from "@w3-kit/ui";

export function MintFlow({ contract }: { contract: \`0x\${string}\` }) {
  return (
    <>
      <MintPreview contract={contract} />
      <MintPay contract={contract} />
      <MintConfirm contract={contract} />
    </>
  );
}`,
  },
];
