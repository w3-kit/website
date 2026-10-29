import { useParams } from "@tanstack/react-router";
import { TOKENS, chainCountLabel } from "../../../entities/token";
import { chainName } from "../../../entities/chain";
import { CopyButton } from "../../../features/copy-address";
import { RegistryPageHead } from "../../../widgets/registry-page-head";
import { NotFound } from "../../../shared/ui/not-found";
import { getSectionUrl } from "../../../shared/lib/urls";
import { CopyRows, FactList, RegistrySection } from "../../../widgets/registry-rows";

const REGISTRY_HOME = { href: getSectionUrl("registry"), label: "Back to the registry" };
export function TokenDetailPage() {
  const { symbol = "" } = useParams({ strict: false }) as { symbol?: string };
  const token = TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase());
  if (!token) return <NotFound kind="token" id={symbol} back={REGISTRY_HOME} />;

  return (
    <>
      <RegistryPageHead title={token.symbol} subtitle={token.name}>
        <p className="text-w3-body">{token.learn}</p>
      </RegistryPageHead>

      <FactList
        facts={[
          ["Decimals", token.decimals],
          ["Deployed on", chainCountLabel(token)],
        ]}
      />

      <RegistrySection title="Addresses">
        <CopyRows
          rows={token.chains.map((d) => ({
            key: String(d.chainId),
            label: chainName(d.chainId),
            value: d.address,
            action: (
              <CopyButton value={d.address} label={`${token.symbol} on ${chainName(d.chainId)}`} />
            ),
          }))}
        />
      </RegistrySection>
    </>
  );
}
