import { createContext, use, useEffect, useId, useMemo, useState, type ComponentType } from "react";
import { Slider } from "@base-ui/react/slider";
import { Tabs } from "@base-ui/react/tabs";
import { ArrowDown, LoaderCircle, Search } from "lucide-react";
import {
  AmountField,
  CardFrame,
  FAMILIES,
  ListItem,
  PartRow,
  PartView,
  QUICK_AMOUNTS,
  type GeneratedComponent,
  type Part,
  type PartName,
  type PartOf,
} from "../../../entities/generated-component";
import { cn } from "../../../shared/lib/utils";
import {
  amountProblem,
  filterRows,
  findPart,
  flipped,
  quoteFor,
  shareOf,
  tradeOf,
  type Trade,
} from "../model/try-rules";

/**
 * The generated component with working controls, so it can be tried before its prompt is copied.
 * Parts without controls draw exactly as in the grid. Nothing is sent anywhere.
 */
export function TryCard({ component }: { component: GeneratedComponent }) {
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState(() => findPart(component.parts, "amount")?.value ?? "");
  const [isFlipped, setFlipped] = useState(false);
  const sample = useMemo(() => tradeOf(component.parts), [component]);
  const trade = sample && isFlipped ? flipped(sample) : sample;
  const amountId = useId();
  const context: TryContextValue = {
    component,
    amountId,
    query,
    setQuery,
    amount,
    setAmount,
    trade,
    problem: trade && amountProblem(amount, trade.pay.balance),
    flip: () => setFlipped(!isFlipped),
  };
  return (
    <TryContext value={context}>
      <CardFrame component={component}>
        {component.parts.map((part, position) => (
          <TryPart key={position} part={part} />
        ))}
      </CardFrame>
    </TryContext>
  );
}

function TryPart({ part }: { part: Part }) {
  const View = TRY_VIEWS[part.name] as ComponentType<{ part: Part }> | undefined;
  return View ? <View part={part} /> : <PartView part={part} />;
}

// ── State that more than one part reads ─────────────────────────────────────

interface TryContextValue {
  component: GeneratedComponent;
  /** The amount input, so the button can send focus to it when the amount needs fixing. */
  amountId: string;
  /** The search field filters the list below it. */
  query: string;
  setQuery: (query: string) => void;
  /** Quick amounts fill it, the quote follows it, the button checks it. */
  amount: string;
  setAmount: (amount: string) => void;
  /** As the user sees it now: the flip button swaps its sides. */
  trade: Trade | undefined;
  /** Why the amount cannot be sent, as how to fix it. */
  problem: string | undefined;
  flip: () => void;
}

const TryContext = createContext<TryContextValue | null>(null);

function useTry(): TryContextValue {
  const context = use(TryContext);
  if (!context) throw new Error("a try part rendered outside TryCard");
  return context;
}

// ── Parts with working controls ─────────────────────────────────────────────

const FIELD_INPUT =
  "min-w-0 flex-1 bg-transparent tabular-nums outline-none placeholder:text-muted-foreground";
/** The ring token measures below 3:1 in light mode, so focus is drawn in the text colour. */
const FOCUS_WITHIN = "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-foreground";
const FOCUS = "outline-foreground focus-visible:outline-2 focus-visible:outline-offset-2";
const PRESS = "transition-transform motion-safe:active:scale-[0.96]";
const BUSY_MS = 1200;

/** Tabs stand in for views the agent builds; here they only show the keyboard behaviour. */
function TryTabs({ part }: { part: PartOf<"tabs"> }) {
  return (
    <PartRow name="tabs">
      <Tabs.Root defaultValue={part.options[0]}>
        <Tabs.List aria-label="View" className="flex gap-1">
          {part.options.map((option) => (
            <Tabs.Tab
              key={option}
              value={option}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors",
                "data-[active]:bg-primary data-[active]:text-primary-foreground",
                FOCUS,
              )}
            >
              {option}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </PartRow>
  );
}

function TrySearch({ part }: { part: PartOf<"search"> }) {
  const { query, setQuery } = useTry();
  return (
    <PartRow name="search">
      <label
        className={cn(
          "flex w-full items-center gap-2 rounded-xl border border-border px-3 py-2 text-muted-foreground",
          FOCUS_WITHIN,
        )}
      >
        <Search size={16} aria-hidden className="shrink-0" />
        <input
          type="search"
          aria-label="Search"
          placeholder={part.placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={cn(FIELD_INPUT, "text-base text-foreground sm:text-sm")}
        />
      </label>
    </PartRow>
  );
}

function TryList({ part }: { part: PartOf<"list2" | "list3" | "list4"> }) {
  const { component, query } = useTry();
  const rows = filterRows(part.rows, query);
  const empty = `No ${FAMILIES[component.family].items} match “${query}”. Try a shorter search.`;
  return (
    <PartRow
      name={part.name}
      className="grid items-stretch gap-0"
      style={{ gridTemplateRows: `repeat(${part.rows.length}, minmax(0, 1fr))` }}
    >
      {rows.map((row) => (
        <ListItem key={row.title} row={row} />
      ))}
      {/* Always on the page, so screen readers announce it when its text changes. */}
      <p
        role="status"
        className={
          rows.length ? "sr-only" : "row-span-full self-center text-center text-muted-foreground"
        }
      >
        {rows.length ? "" : empty}
      </p>
    </PartRow>
  );
}

function TryAmount({ part }: { part: PartOf<"amount"> }) {
  const { amountId: id, amount, setAmount, trade, problem } = useTry();
  const balance = trade?.pay.balance ?? part.balance;
  return (
    <AmountField
      name="amount"
      label={<label htmlFor={id}>Amount</label>}
      hint={<span id={`${id}-hint`}>{problem ?? `Balance ${balance}`}</span>}
      symbol={trade?.pay.symbol ?? part.symbol}
      className={FOCUS_WITHIN}
      value={
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          aria-invalid={problem !== undefined}
          aria-describedby={`${id}-hint`}
          className={cn(FIELD_INPUT, "text-xl font-medium")}
        />
      }
    />
  );
}

function TryFlip() {
  const { flip } = useTry();
  return (
    <PartRow name="flip" className="justify-center">
      <button
        type="button"
        aria-label="Swap the two tokens"
        onClick={flip}
        className={cn(
          "grid size-8 place-items-center rounded-full border border-border",
          FOCUS,
          PRESS,
        )}
      >
        <ArrowDown size={14} aria-hidden />
      </button>
    </PartRow>
  );
}

function TryResult({ part }: { part: PartOf<"result"> }) {
  const { amount, trade } = useTry();
  return (
    <AmountField
      name="result"
      label="You receive"
      hint="Estimated"
      value={<output>{trade ? quoteFor(amount, trade.rate) : part.value}</output>}
      symbol={trade?.receive.symbol ?? part.symbol}
    />
  );
}

function TryQuickAmounts() {
  const { trade, setAmount } = useTry();
  return (
    <PartRow name="quickAmounts">
      {QUICK_AMOUNTS.map(({ label, percent }) => (
        <button
          key={label}
          type="button"
          onClick={() => trade && setAmount(shareOf(trade.pay.balance, percent))}
          className={cn(
            "flex-1 rounded-lg border border-border py-1.5 text-center text-xs font-medium tabular-nums",
            FOCUS,
            PRESS,
          )}
        >
          {label}
        </button>
      ))}
    </PartRow>
  );
}

function TrySlider({ part }: { part: PartOf<"slider"> }) {
  return (
    <PartRow name="slider" className="flex-col items-stretch justify-center">
      <Slider.Root
        defaultValue={part.value}
        min={0}
        max={part.max}
        step={part.step}
        className="flex flex-col gap-2.5"
      >
        <div className="flex justify-between gap-2">
          <Slider.Label className="truncate text-muted-foreground">{part.label}</Slider.Label>
          <Slider.Value className="shrink-0 font-medium tabular-nums">
            {(_formatted, [value]) => `${value}${part.unit}`}
          </Slider.Value>
        </div>
        <Slider.Control className="flex h-4 items-center">
          <Slider.Track className="relative h-1.5 w-full rounded-full bg-muted">
            <Slider.Indicator className="rounded-full bg-primary" />
            <Slider.Thumb
              getAriaValueText={(_formatted, value) => `${value}${part.unit}`}
              className={cn("size-4 rounded-full border-2 border-primary bg-background", FOCUS)}
            />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </PartRow>
  );
}

function TryRecipient({ part }: { part: PartOf<"recipient"> }) {
  const id = useId();
  return (
    <PartRow name="recipient" className="flex-col items-stretch justify-center gap-1.5">
      <label htmlFor={id} className="text-xs font-medium">
        Recipient
      </label>
      <input
        id={id}
        autoComplete="off"
        spellCheck={false}
        placeholder="vitalik.eth or 0x…"
        defaultValue={part.address}
        className={cn(
          "rounded-xl border border-border bg-transparent px-3 py-2 text-base tabular-nums",
          FOCUS,
        )}
      />
    </PartRow>
  );
}

function TryButton({ part }: { part: PartOf<"button"> }) {
  const { amountId, problem } = useTry();
  const [busy, setBusy] = useState(false);
  const ready = !busy && problem === undefined;

  function submit() {
    // Stay enabled while the amount is wrong, and take the user to the field that says why.
    if (problem !== undefined) document.getElementById(amountId)?.focus();
    else if (!busy) setBusy(true);
  }

  useEffect(() => {
    if (!busy) return;
    const timer = setTimeout(() => setBusy(false), BUSY_MS);
    return () => clearTimeout(timer);
  }, [busy]);

  return (
    <PartRow name="button">
      <button
        type="button"
        aria-disabled={busy}
        onClick={submit}
        className={cn(
          "inline-flex flex-1 items-center justify-center gap-2 truncate rounded-xl bg-primary px-3 py-2.5 font-medium text-primary-foreground",
          FOCUS,
          // Only a press that starts something animates.
          ready && PRESS,
        )}
      >
        {busy && <LoaderCircle size={16} aria-hidden className="motion-safe:animate-spin" />}
        {part.label}
      </button>
    </PartRow>
  );
}

/** Parts that get working controls. Every other part draws as in the grid. */
const TRY_VIEWS: { [K in PartName]?: ComponentType<{ part: PartOf<K> }> } = {
  tabs: TryTabs,
  search: TrySearch,
  list2: TryList,
  list3: TryList,
  list4: TryList,
  amount: TryAmount,
  flip: TryFlip,
  result: TryResult,
  quickAmounts: TryQuickAmounts,
  slider: TrySlider,
  recipient: TryRecipient,
  button: TryButton,
};
