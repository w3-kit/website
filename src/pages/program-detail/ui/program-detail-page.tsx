import { useParams } from "@tanstack/react-router";
import { PROGRAMS } from "../../../entities/program";
import { chainName } from "../../../entities/chain";
import { CopyButton } from "../../../features/copy-address";
import { RegistryPageHead } from "../../../widgets/registry-page-head";
import { NotFound } from "../../../shared/ui/not-found";
import { getSectionUrl } from "../../../shared/lib/urls";
import { CopyRows, RegistrySection } from "../../../widgets/registry-rows";

const REGISTRY_HOME = { href: getSectionUrl("registry"), label: "Back to the registry" };
export function ProgramDetailPage() {
  const { key = "" } = useParams({ strict: false }) as { key?: string };
  const program = PROGRAMS.find((p) => p.key === key);
  if (!program) return <NotFound kind="program" id={key} back={REGISTRY_HOME} />;

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
