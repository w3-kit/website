import { useParams } from "@tanstack/react-router";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { CopyButton } from "../../../features/copy-address";
import { RegistryNotFound, RegistryPageHead } from "../../../widgets/registry-page-head";
import { CopyRows, FactList, RegistrySection } from "../../../widgets/registry-rows";

const chainName = (id: number) => CHAINS.find((c) => c.chainId === id)?.name ?? `Chain ${id}`;

export function TokenDetailPage() {
  const { symbol = "" } = useParams({ strict: false }) as { symbol?: string };
  const token = TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase());
  if (!token) return <RegistryNotFound kind="token" id={symbol} />;

  return (
    <>
      <RegistryPageHead title={token.symbol} subtitle={token.name}>
        <p className="text-w3-body">{token.learn}</p>
      </RegistryPageHead>

      <FactList
        facts={[
          ["Decimals", token.decimals],
          [
            "Deployed on",
            `${token.chains.length} ${token.chains.length === 1 ? "chain" : "chains"}`,
          ],
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
