import { PROGRAMS } from "../../../entities/program/model/programs.gen";

export function ProgramsListPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-[32px] font-medium leading-tight tracking-[-0.03em]">Solana Programs</h1>
      <p className="mt-2 text-w3-gray-600">{PROGRAMS.length} catalogued programs.</p>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PROGRAMS.map((p) => (
          <li key={p.key}>
            <a
              href={`/registry/programs/${p.key}`}
              className="block rounded-lg border border-w3-border-subtle p-4 transition-colors hover:border-w3-accent"
            >
              <div className="text-sm font-medium">{p.name}</div>
              <div className="mt-0.5 font-mono text-[11px] text-w3-gray-500">{p.key}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
