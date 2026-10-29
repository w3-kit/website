import { REGISTRY_INSTALL_COMMAND } from "../../../shared/lib/commands";
import { CopyCommand } from "../../../features/copy-address";
import { CHAINS, requireChain } from "../../../entities/chain";

const BASE_CHAIN_ID = 8453;
import { addressOn, requireToken, tokensOnChain } from "../../../entities/token";
import { CodeBlock } from "../../../widgets/code-block";
import { RegistryPageHead } from "../../../widgets/registry-page-head";
import { RegistrySection } from "../../../widgets/registry-rows";

const BASE = requireChain(BASE_CHAIN_ID);
const USDC = requireToken("USDC");
const usdcOnBase = addressOn(USDC, BASE.chainId);
const tokensOnBase = tokensOnChain(BASE.chainId);

// Only functions exported by the published package; outputs come from this site's registry data.
const EXAMPLES = [
  {
    title: "Get a chain",
    code: `import { getChain } from "@w3-kit/registry";

const base = getChain(${BASE.chainId});
base?.name;          // "${BASE.name}"
base?.rpcUrls[0];    // "${BASE.rpcUrls[0]}"`,
  },
  {
    title: "Find a token address on a chain",
    code: `import { getToken } from "@w3-kit/registry";

const usdc = getToken("${USDC.symbol}");
usdc?.chains.find((d) => d.chainId === ${BASE.chainId})?.address;
// "${usdcOnBase}"`,
  },
  {
    title: "List the tokens on a chain",
    code: `import { getTokensByChain } from "@w3-kit/registry";

getTokensByChain(${BASE.chainId}).map((t) => t.symbol);
// ${JSON.stringify(tokensOnBase.map((t) => t.symbol))}`,
  },
  {
    title: "Filter chains by ecosystem",
    code: `import { getAllChains, getChainsByEcosystem } from "@w3-kit/registry";

getAllChains().length;              // ${CHAINS.length}
getChainsByEcosystem("solana");     // Solana and Solana Devnet`,
  },
];

export function RegistryApiPage() {
  return (
    <>
      <RegistryPageHead title="Use it in code" subtitle="@w3-kit/registry">
        <p className="text-w3-body">
          The same data as this site, typed, in one package with no runtime dependencies.
        </p>
        <CopyCommand command={REGISTRY_INSTALL_COMMAND} />
      </RegistryPageHead>

      <div className="max-w-[800px]">
        {EXAMPLES.map((ex) => (
          <RegistrySection key={ex.title} title={ex.title}>
            <CodeBlock code={ex.code} language="ts" />
          </RegistrySection>
        ))}
        <p className="mt-16 text-w3-body">
          Every export is listed in the{" "}
          <a
            href="https://github.com/w3-kit/registry"
            className="text-w3-accent underline decoration-w3-accent/30 underline-offset-4 hover:decoration-w3-accent"
          >
            registry repository
          </a>
          .
        </p>
      </div>
    </>
  );
}
