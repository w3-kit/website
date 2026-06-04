import { CHAINS } from "../../../entities/chain/model/chains.gen";

export function ChainsListPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-[32px] font-medium leading-tight tracking-[-0.03em]">Chains</h1>
      <p className="mt-2 text-w3-gray-600">{CHAINS.length} supported chains.</p>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CHAINS.map((c) => (
          <li key={c.chainId}>
            <a
              href={`/registry/chains/${c.chainId}`}
              className="flex items-center justify-between rounded-lg border border-w3-border-subtle p-4 transition-colors hover:border-w3-accent"
            >
              <div>
                <div className="text-sm font-medium">{c.name}</div>
                <div className="mt-0.5 font-mono text-[11px] text-w3-gray-500">
                  {c.ecosystem} · chainId {c.chainId}
                </div>
              </div>
              <span className="font-mono text-[11px] text-w3-gray-500">{c.shortName}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
