import { useParams } from "@tanstack/react-router";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { CHAINS } from "../../../entities/chain/model/chains.gen";

export function TokenDetailPage() {
  const params = useParams({ strict: false }) as { symbol?: string };
  const symbol = params.symbol ?? "";
  const token = TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase());

  if (!token) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-medium">Token not found</h1>
        <p className="mt-2 text-w3-gray-600">No token with symbol {symbol}.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center gap-3">
        {token.logoUrl && <img src={token.logoUrl} alt="" className="h-10 w-10 rounded-full" />}
        <h1 className="text-[36px] font-medium leading-tight tracking-[-0.03em]">{token.symbol}</h1>
      </div>
      <p className="mt-1 text-w3-gray-600">{token.name}</p>
      <p className="mt-3 max-w-prose text-w3-gray-700">{token.learn}</p>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          Decimals
        </h2>
        <p className="mt-2 font-mono text-sm">{token.decimals}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          Deployments
        </h2>
        <ul className="mt-3 space-y-2">
          {token.chains.map((d) => {
            const chain = CHAINS.find((c) => c.chainId === d.chainId);
            return (
              <li key={d.chainId} className="rounded-lg border border-w3-border-subtle p-3">
                <div className="text-sm font-medium">{chain?.name ?? `Chain ${d.chainId}`}</div>
                <div className="mt-1 break-all font-mono text-[11px] text-w3-gray-700">
                  {d.address}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
