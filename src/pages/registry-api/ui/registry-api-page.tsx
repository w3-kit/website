import { Check, Copy } from "lucide-react";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { CodeBlock } from "../../../widgets/code-block";
import { RegistryPageHead } from "../../../widgets/registry-page-head";
import { RegistrySection } from "../../../widgets/registry-rows";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";

const INSTALL = "npm install @w3-kit/registry";
const BASE = CHAINS.find((c) => c.chainId === 8453)!;
const USDC = TOKENS.find((t) => t.symbol === "USDC")!;
const usdcOnBase = USDC.chains.find((d) => d.chainId === BASE.chainId)!.address;
const tokensOnBase = TOKENS.filter((t) => t.chains.some((d) => d.chainId === BASE.chainId));

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
  const [copied, copy] = useCopyToClipboard(INSTALL);

  return (
    <>
      <RegistryPageHead title="Use it in code" subtitle="@w3-kit/registry">
        <p className="text-w3-body">
          The same data as this site, typed, in one package with no runtime dependencies.
        </p>
        <button
          type="button"
          onClick={copy}
          className="w3-press inline-flex h-12 items-center gap-3 bg-w3-accent px-5 text-w3-on-accent hover:bg-w3-accent-hover"
        >
          <code className="text-[15px]">{INSTALL}</code>
          {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          <span className="sr-only">{copied ? "Copied" : "Copy command"}</span>
        </button>
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
