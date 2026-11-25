import { useEffect } from "react";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { componentRegistry } from "../../../entities/component";
import {
  AGENT_RULES,
  GUARANTEED_RULES,
  isBelowTarget,
  type ContrastPair,
} from "../../../entities/generated-component";
import { SiteShell } from "../../../widgets/site-chrome";
import { randomSeed } from "../model/seed";
import { SITE_CONTRAST } from "../model/site-tokens";
import { EndlessGrid } from "./component-grid";

const route = getRouteApi("/ui/endless");

export function UiEndlessPage() {
  const { seed } = route.useSearch();
  const navigate = route.useNavigate();

  // A visit without a seed gets one in the address, so the page can be shared as it is.
  useEffect(() => {
    if (seed === undefined) navigate({ search: { seed: randomSeed() }, replace: true });
  }, [seed, navigate]);

  return (
    <SiteShell section="ui" footer={null}>
      <Hero />
      <section aria-labelledby="generated-title" className="px-4 pb-24 md:px-10">
        <h2 id="generated-title" className="sr-only">
          Generated components
        </h2>
        {seed !== undefined && <EndlessGrid seed={seed} />}
      </section>
    </SiteShell>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="endless-title"
      className="grid gap-10 px-4 pb-12 pt-10 md:grid-cols-12 md:gap-x-6 md:px-10 md:pb-16 md:pt-16"
    >
      <h1 id="endless-title" className="w3-rise text-w3-display font-medium md:col-span-8">
        <span className="block">Endless components,</span>
        <span className="block">none drawn by hand.</span>
      </h1>
      <div
        className="w3-rise flex flex-col items-start gap-6 md:col-span-4 md:self-end"
        style={{ animationDelay: "80ms" }}
      >
        <p className="text-w3-body">
          A solver picks the parts of each component and orders them so they fill the card exactly
          and follow the part rules. Select a component to get a prompt a coding agent can build it
          from.
        </p>
        <p className="text-w3-small text-w3-ink-soft">
          A prompt gives different code on each run. The {componentRegistry.length} library
          components are tested and stay the same.
        </p>
        <Link
          to="/ui"
          className="inline-flex h-11 items-center gap-2 text-w3-small font-medium text-w3-ink transition-colors hover:text-w3-accent"
        >
          Browse the library <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
      <DesignRules />
    </section>
  );
}

const AGENT_RULE_COUNT = AGENT_RULES.filter((line) => line.startsWith("-")).length;
const LIGHT_CONTRAST = SITE_CONTRAST.filter((pair) => pair.mode === "light");
const DARK_CONTRAST = SITE_CONTRAST.filter((pair) => pair.mode === "dark");

function DesignRules() {
  return (
    <details className="group min-w-0 text-w3-small md:col-span-8">
      <summary className="inline-flex h-11 cursor-pointer list-none items-center gap-2 font-medium">
        Design rules these components follow
        <ChevronDown
          size={16}
          aria-hidden
          className="motion-safe:transition-transform group-open:rotate-180"
        />
      </summary>
      <ul className="mt-4 flex max-w-[70ch] flex-col gap-2">
        {GUARANTEED_RULES.map(([area, rule]) => (
          <li key={area}>
            <span className="font-medium">{area}.</span> {rule}
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[70ch] text-w3-ink-soft">
        Contrast is measured from the colour tokens of this site, in both modes. Pairs below their
        target are reported here and in each prompt, and the tokens stay as they are.{" "}
        {AGENT_RULE_COUNT} more rules travel in each prompt, for the agent that builds the
        component.
      </p>
      <div
        tabIndex={0}
        role="region"
        aria-label="Measured contrast"
        className="mt-4 max-w-[70ch] overflow-x-auto overscroll-x-contain outline-w3-accent focus-visible:outline-2"
      >
        <table className="w-full border-collapse text-start tabular-nums">
          <thead>
            <tr className="text-w3-ink-soft">
              <th className="py-2 ps-3 pe-4 text-start font-medium">Pair</th>
              <th className="py-2 pe-4 text-start font-medium">Light</th>
              <th className="py-2 pe-4 text-start font-medium">Dark</th>
              <th className="py-2 text-start font-medium">Target</th>
            </tr>
          </thead>
          <tbody>
            {LIGHT_CONTRAST.map((light, i) => (
              <tr key={light.name} className="odd:bg-w3-tone">
                <th scope="row" className="py-2 ps-3 pe-4 text-start font-normal">
                  {light.name}
                </th>
                <Measured pair={light} />
                <Measured pair={DARK_CONTRAST[i]} />
                <td className="py-2">{light.target}:1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function Measured({ pair }: { pair: ContrastPair }) {
  return (
    <td className="py-2 pe-4 whitespace-nowrap">
      {pair.ratio.toFixed(2)}:1
      {isBelowTarget(pair) && <span className="font-medium"> below target</span>}
    </td>
  );
}
