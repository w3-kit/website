import { CodeBlock } from "../../../widgets/code-block";

const EXAMPLES: { title: string; code: string }[] = [
  {
    title: "Get a chain",
    code: `import { getChain } from "@w3-kit/registry";

const ethereum = getChain(1);
console.log(ethereum.name); // "Ethereum"`,
  },
  {
    title: "Get a token address on a chain",
    code: `import { getTokenAddress } from "@w3-kit/registry";

const usdcOnBase = getTokenAddress("USDC", 8453);
// "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"`,
  },
  {
    title: "Pick an RPC URL",
    code: `import { getRpc } from "@w3-kit/registry";

const rpc = getRpc(8453);
// "https://mainnet.base.org"`,
  },
];

export function RegistryApiPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-[32px] font-medium leading-tight tracking-[-0.03em]">API reference</h1>
      <p className="mt-2 text-w3-gray-600">
        Common usage of <code className="font-mono text-[13px]">@w3-kit/registry</code>. Install
        with <code className="font-mono text-[13px]">npm install @w3-kit/registry</code>.
      </p>

      <div className="mt-8 space-y-8">
        {EXAMPLES.map((ex) => (
          <section key={ex.title}>
            <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
              {ex.title}
            </h2>
            <div className="mt-3">
              <CodeBlock code={ex.code} language="ts" />
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-w3-gray-600">
        Full reference on{" "}
        <a
          href="https://github.com/w3-kit/registry"
          className="text-w3-accent underline-offset-2 hover:underline"
        >
          github.com/w3-kit/registry
        </a>
        .
      </p>
    </div>
  );
}
