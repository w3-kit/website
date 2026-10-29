import { PROGRAMS } from "../../../entities/program";
import { ProgramRows } from "../../../widgets/registry-rows";
import { RegistryPageHead } from "../../../widgets/registry-page-head";

export function ProgramsListPage() {
  return (
    <>
      <RegistryPageHead title="Solana programs" subtitle={`${PROGRAMS.length} programs`}>
        <p className="text-w3-body">Program IDs for the Solana programs most apps call.</p>
      </RegistryPageHead>
      <ProgramRows programs={PROGRAMS} />
    </>
  );
}
