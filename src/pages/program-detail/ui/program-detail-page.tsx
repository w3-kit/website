import { useParams } from "@tanstack/react-router";
import { PROGRAMS } from "../../../entities/program/model/programs.gen";
import { CHAINS } from "../../../entities/chain/model/chains.gen";

export function ProgramDetailPage() {
  const params = useParams({ strict: false }) as { key?: string };
  const key = params.key ?? "";
  const program = PROGRAMS.find((p) => p.key === key);

  if (!program) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-medium">Program not found</h1>
        <p className="mt-2 text-w3-gray-600">No program with key {key}.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="font-mono text-[11px] text-w3-gray-500">solana · {program.key}</div>
      <h1 className="mt-1 text-[36px] font-medium leading-tight tracking-[-0.03em]">
        {program.name}
      </h1>
      <p className="mt-3 max-w-prose text-w3-gray-700">{program.learn}</p>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          Deployments
        </h2>
        <ul className="mt-3 space-y-2">
          {program.deployments.map((d) => {
            const chain = CHAINS.find((c) => c.chainId === d.chainId);
            return (
              <li key={d.chainId} className="rounded-lg border border-w3-border-subtle p-3">
                <div className="text-sm font-medium">{chain?.name ?? `Chain ${d.chainId}`}</div>
                <div className="mt-1 break-all font-mono text-[11px] text-w3-gray-700">
                  {d.programId}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
