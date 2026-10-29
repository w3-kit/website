import { useParams } from "@tanstack/react-router";
import { PROGRAMS } from "../../../entities/program/model/programs.gen";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { CopyButton } from "../../../features/copy-address";
import { RegistryNotFound, RegistryPageHead } from "../../../widgets/registry-page-head";
import { CopyRows, RegistrySection } from "../../../widgets/registry-rows";

const chainName = (id: number) => CHAINS.find((c) => c.chainId === id)?.name ?? `Chain ${id}`;

export function ProgramDetailPage() {
  const { key = "" } = useParams({ strict: false }) as { key?: string };
  const program = PROGRAMS.find((p) => p.key === key);
  if (!program) return <RegistryNotFound kind="program" id={key} />;

  return (
    <>
      <RegistryPageHead title={program.name} subtitle="Solana program">
        <p className="text-w3-body">{program.learn}</p>
      </RegistryPageHead>

      <RegistrySection title="Program IDs">
        <CopyRows
          rows={program.deployments.map((d) => ({
            key: String(d.chainId),
            label: chainName(d.chainId),
            value: d.programId,
            action: (
              <CopyButton
                value={d.programId}
                label={`${program.name} on ${chainName(d.chainId)}`}
              />
            ),
          }))}
        />
      </RegistrySection>
    </>
  );
}
