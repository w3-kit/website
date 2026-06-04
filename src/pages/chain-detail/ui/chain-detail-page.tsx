import { useParams } from "@tanstack/react-router";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { TOKENS } from "../../../entities/token/model/tokens.gen";

export function ChainDetailPage() {
  const params = useParams({ strict: false }) as { chainId?: string };
  const chainIdParam = params.chainId ?? "";
  const chainId = Number(chainIdParam);
  const chain = CHAINS.find((c) => c.chainId === chainId);

  if (!chain) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-medium">Chain not found</h1>
        <p className="mt-2 text-w3-gray-600">No chain with chainId {chainIdParam}.</p>
      </div>
    );
  }

  const tokensOnChain = TOKENS.filter((t) => t.chains.some((d) => d.chainId === chainId));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="font-mono text-[11px] text-w3-gray-500">
        {chain.ecosystem.toUpperCase()} · chainId {chain.chainId}
      </div>
      <h1 className="mt-1 text-[36px] font-medium leading-tight tracking-[-0.03em]">
        {chain.name}
      </h1>
      <p className="mt-3 max-w-prose text-w3-gray-700">{chain.learn}</p>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          Native currency
        </h2>
        <p className="mt-2 text-sm">
          {chain.nativeCurrency.name} ({chain.nativeCurrency.symbol},{" "}
          {chain.nativeCurrency.decimals} decimals)
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          RPC URLs
        </h2>
        <ul className="mt-2 space-y-1 font-mono text-[12px]">
          {chain.rpcUrls.map((url) => (
            <li key={url} className="rounded bg-w3-surface-alt px-2 py-1">
              {url}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          Block explorers
        </h2>
        <ul className="mt-2 space-y-1 text-sm">
          {chain.blockExplorers.map((url) => (
            <li key={url}>
              <a href={url} className="text-w3-accent underline-offset-2 hover:underline">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {tokensOnChain.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
            Tokens on this chain
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {tokensOnChain.map((t) => (
              <li key={t.symbol}>
                <a
                  href={`/registry/tokens/${t.symbol}`}
                  className="rounded-full bg-w3-surface-alt px-3 py-1 font-mono text-[11px]"
                >
                  {t.symbol}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
