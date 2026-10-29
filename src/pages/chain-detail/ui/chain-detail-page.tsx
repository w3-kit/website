import { useParams } from "@tanstack/react-router";
import { ECOSYSTEM_LABELS, findChain } from "../../../entities/chain";
import { tokensOnChain } from "../../../entities/token";
import { CopyButton } from "../../../features/copy-address";
import { RegistryPageHead } from "../../../widgets/registry-page-head";
import { NotFound } from "../../../shared/ui/not-found";
import { getSectionUrl } from "../../../shared/lib/urls";
import { CopyRows, FactList, RegistrySection, TokenRows } from "../../../widgets/registry-rows";

const REGISTRY_HOME = { href: getSectionUrl("registry"), label: "Back to the registry" };
export function ChainDetailPage() {
  const { chainId = "" } = useParams({ strict: false }) as { chainId?: string };
  const chain = findChain(Number(chainId));
  if (!chain) return <NotFound kind="chain" id={chainId} back={REGISTRY_HOME} />;

  const tokens = tokensOnChain(chain.chainId);

  return (
    <>
      <RegistryPageHead title={chain.name} subtitle={`Chain ID ${chain.chainId}`}>
        <p className="text-w3-body">{chain.learn}</p>
      </RegistryPageHead>

      <FactList
        facts={[
          ["Ecosystem", ECOSYSTEM_LABELS[chain.ecosystem]],
          [
            "Native token",
            `${chain.nativeCurrency.symbol} · ${chain.nativeCurrency.decimals} decimals`,
          ],
          ["Network", chain.testnet ? "Testnet" : "Mainnet"],
          ["Short name", chain.shortName],
        ]}
      />

      <RegistrySection title="RPC endpoints">
        <CopyRows
          rows={chain.rpcUrls.map((url, i) => ({
            key: url,
            label: i === 0 ? "Default" : `Fallback ${i}`,
            value: url,
            action: <CopyButton value={url} label={url} />,
          }))}
        />
      </RegistrySection>

      {chain.blockExplorers.length > 0 && (
        <RegistrySection title="Explorers">
          <CopyRows
            rows={chain.blockExplorers.map((url) => ({
              key: url,
              label: new URL(url).hostname,
              value: url,
              action: (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 px-3 text-w3-small font-medium leading-10 text-w3-accent"
                >
                  Open
                </a>
              ),
            }))}
          />
        </RegistrySection>
      )}

      {tokens.length > 0 && (
        <RegistrySection title={`Tokens on ${chain.name}`}>
          <TokenRows tokens={tokens} />
        </RegistrySection>
      )}
    </>
  );
}
