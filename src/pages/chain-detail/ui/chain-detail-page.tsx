import { useParams } from "@tanstack/react-router";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { CopyButton } from "../../../features/copy-address";
import { RegistryNotFound, RegistryPageHead } from "../../../widgets/registry-page-head";
import {
  CopyRows,
  FactList,
  RegistrySection,
  TokenRows,
  ecosystemLabel,
} from "../../../widgets/registry-rows";

export function ChainDetailPage() {
  const { chainId = "" } = useParams({ strict: false }) as { chainId?: string };
  const chain = CHAINS.find((c) => c.chainId === Number(chainId));
  if (!chain) return <RegistryNotFound kind="chain" id={chainId} />;

  const tokens = TOKENS.filter((t) => t.chains.some((d) => d.chainId === chain.chainId));

  return (
    <>
      <RegistryPageHead title={chain.name} subtitle={`Chain ID ${chain.chainId}`}>
        <p className="text-w3-body">{chain.learn}</p>
      </RegistryPageHead>

      <FactList
        facts={[
          ["Ecosystem", ecosystemLabel(chain.ecosystem)],
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
