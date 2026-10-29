import { useState } from "react";
import { Check } from "lucide-react";
import { chainName, requireChain } from "../../../entities/chain";
import { requireToken } from "../../../entities/token";
import { INIT_COMMAND, recipeAddCommand } from "../../../shared/lib/commands";
import { cn } from "../../../shared/lib/utils";

const BASE_CHAIN_ID = 8453;
const BASE = requireChain(BASE_CHAIN_ID);
const NATIVE = BASE.nativeCurrency;
const USDC = requireToken("USDC");
const USDC_ROWS = 4;
const EXAMPLE_RECIPE = "swap-tokens";

/** Each stage is a real CLI run; the registry ones print this site's own data. */
const STAGES = [
  {
    name: "Start",
    clause: ["First, start", "a project."],
    output: [
      `$ ${INIT_COMMAND}`,
      "✓ Project name: my-dapp",
      "✓ Which chain? EVM (Ethereum, Arbitrum, Base, Polygon...)",
      "✓ Pick a template: nextjs-crosschain",
      "✓ Template downloaded",
      "✓ Dependencies installed",
      "",
      "Project ready!",
      "",
      "  cd my-dapp",
      "  npm run dev",
    ],
  },
  {
    name: "Add",
    clause: ["Then add", "a recipe."],
    output: [
      `$ ${recipeAddCommand(EXAMPLE_RECIPE)}`,
      "✓ Which chain? EVM",
      `✓ Recipe added to ./recipes/${EXAMPLE_RECIPE}/`,
      "✓ Dependencies installed",
    ],
  },
  {
    name: "Chains",
    clause: ["Look up", "any chain."],
    output: [
      `$ npx w3-kit registry chain ${BASE.chainId}`,
      `Chain         ${BASE.name}`,
      `Chain ID      ${BASE.chainId}`,
      `Ecosystem     ${BASE.ecosystem}`,
      `Native Token  ${NATIVE.name} (${NATIVE.symbol}, ${NATIVE.decimals} decimals)`,
      `RPC           ${BASE.rpcUrls[0]}`,
      `Explorer      ${BASE.blockExplorers[0]}`,
      `Testnet       ${BASE.testnet ? "Yes" : "No"}`,
    ],
  },
  {
    name: "Tokens",
    clause: ["Find a token", "on every chain."],
    output: [
      `$ npx w3-kit registry token ${USDC.symbol}`,
      ...USDC.chains
        .slice(0, USDC_ROWS)
        .map(
          (d) => `${chainName(d.chainId).padEnd(14)}${d.address.slice(0, 10)}…  ${USDC.decimals}`,
        ),
      `… and ${USDC.chains.length - USDC_ROWS} more chains`,
    ],
  },
];

export function WorkflowSection() {
  const [stage, setStage] = useState(0);
  const current = STAGES[stage];

  return (
    <section id="workflow" aria-labelledby="workflow-title" className="relative">
      <div className="grid md:min-h-[88svh] md:grid-cols-2">
        <div className="order-2 flex flex-col justify-between gap-10 bg-w3-ink px-4 pb-10 pt-12 text-w3-ground md:order-none md:px-10 md:pb-32 md:pt-20">
          <h2 id="workflow-title" key={stage} className="w3-rise text-w3-title font-medium">
            <span className="block">{current.clause[0]}</span>
            <span className="block">{current.clause[1]}</span>
          </h2>
        </div>
        <div className="flex items-center justify-center overflow-hidden bg-w3-tone px-4 py-12 md:px-10">
          <pre
            data-ui
            key={stage}
            className="w3-rise w-full max-w-[560px] overflow-x-auto rounded-xl bg-w3-ground p-6 text-[13px] leading-[1.8] text-w3-ink"
          >
            {current.output.map((line, i) => (
              <span
                key={i}
                className={cn(
                  "block min-h-[1.8em]",
                  line.startsWith("$") ? "text-w3-ink" : "text-w3-ink-soft",
                )}
              >
                {line.startsWith("✓") ? (
                  <>
                    <Check
                      size={13}
                      aria-label="done"
                      className="mr-1 inline align-[-2px] text-w3-accent"
                    />
                    {line.slice(2)}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </pre>
        </div>
      </div>

      <div className="bg-w3-ink px-4 pb-12 md:absolute md:inset-x-0 md:bottom-0 md:bg-transparent md:px-10 md:pb-10">
        <label htmlFor="workflow-stage" className="sr-only">
          Stage
        </label>
        <input
          id="workflow-stage"
          type="range"
          min={0}
          max={STAGES.length - 1}
          step={1}
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
          aria-valuetext={current.name}
          className="w3-range w-full"
        />
        <div
          className="mt-3 grid text-w3-small"
          style={{ gridTemplateColumns: `repeat(${STAGES.length}, 1fr)` }}
        >
          {STAGES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setStage(i)}
              aria-pressed={i === stage}
              className={cn(
                "text-left transition-colors",
                i === stage ? "font-medium text-w3-ground" : "text-w3-ground/60",
                // The right half of the strip sits on the light field.
                i >= STAGES.length / 2 && (i === stage ? "md:text-w3-ink" : "md:text-w3-ink-soft"),
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
