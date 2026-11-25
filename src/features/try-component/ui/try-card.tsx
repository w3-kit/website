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
  parseAmount,
  quoteFor,
  shareOf,
  type TryState,
} from "../model/try-rules";

/**
 * The generated component with working controls, so it can be tried before its prompt is copied.
 * Parts without controls draw exactly as in the grid. Nothing is sent anywhere.
 */
export function TryCard({ component }: { component: GeneratedComponent }) {
  const [state, setState] = useState(() => initialState(component.parts));
  const context = useMemo(
    () => ({
      component,
      state,
      trade: tradeOf(component.parts),
      update: (change: Partial<TryState>) => setState((current) => ({ ...current, ...change })),
    }),
    [component, state],
  );
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

// ── State shared by the parts of one component ──────────────────────────────

interface Trade {
  pay: string;
  receive: string;
  /** Received per paid token, from the sample pair. */
  rate: number;
}

interface TryContextValue {
  component: GeneratedComponent;
  state: TryState;
  trade: Trade;
  update: (change: Partial<TryState>) => void;
}

const TryContext = createContext<TryContextValue | null>(null);

function useTry(): TryContextValue {
  const context = use(TryContext);
  if (!context) throw new Error("a try part rendered outside TryCard");
  return context;
}

function find<K extends PartName>(parts: readonly Part[], name: K): PartOf<K> | undefined {
  return parts.find((part): part is PartOf<K> => part.name === name);
}

function initialState(parts: readonly Part[]): TryState {
  return {
    tab: find(parts, "tabs")?.options[0] ?? "",
    query: "",
    amount: find(parts, "amount")?.value ?? "",
    flipped: false,
    slider: find(parts, "slider")?.value ?? 0,
    recipient: find(parts, "recipient")?.address ?? "",
  };
}

function tradeOf(parts: readonly Part[]): Trade {
  const amount = find(parts, "amount");
  const result = find(parts, "result");
  const rate = amount && result ? parseAmount(result.value) / parseAmount(amount.value) : 1;
  return { pay: amount?.symbol ?? "", receive: result?.symbol ?? "", rate };
}

// ── Parts with working controls ─────────────────────────────────────────────

const FIELD_INPUT =
  "min-w-0 flex-1 bg-transparent tabular-nums outline-none placeholder:text-muted-foreground";
/** The ring token measures below 3:1 in light mode, so focus is drawn in the text colour. */
const FOCUS_WITHIN = "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-foreground";
const FOCUS = "outline-foreground focus-visible:outline-2 focus-visible:outline-offset-2";
const PRESS = "transition-transform motion-safe:enabled:active:scale-[0.96]";
const BUSY_MS = 1200;

function TryTabs({ part }: { part: PartOf<"tabs"> }) {
  const { state, update } = useTry();
  return (
    <PartRow name="tabs">
      <Tabs.Root value={state.tab} onValueChange={(tab) => update({ tab: String(tab) })}>
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
  const { state, update } = useTry();
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
          value={state.query}
          onChange={(event) => update({ query: event.target.value })}
          className={cn(FIELD_INPUT, "text-base text-foreground sm:text-sm")}
        />
      </label>
    </PartRow>
  );
}

function TryList({ part }: { part: PartOf<"list2" | "list3" | "list4"> }) {
  const { component, state } = useTry();
  const rows = filterRows(part.rows, state.query);
  return (
    <PartRow
      name={part.name}
      className="grid items-stretch gap-0"
      style={{ gridTemplateRows: `repeat(${part.rows.length}, minmax(0, 1fr))` }}
    >
      {rows.length ? (
        rows.map((row) => <ListItem key={row.title} row={row} />)
      ) : (
        <p role="status" className="row-span-full self-center text-center text-muted-foreground">
          No {FAMILIES[component.family].items} match “{state.query}”. Try a shorter search.
        </p>
      )}
    </PartRow>
  );
}

function TryAmount({ part }: { part: PartOf<"amount"> }) {
  const { state, trade, update } = useTry();
  const id = useId();
  const problem = amountProblem(state.amount, part.balance);
  return (
    <AmountField
      name="amount"
      label={<label htmlFor={id}>Amount</label>}
      hint={<span id={`${id}-hint`}>{problem ?? `Balance ${part.balance}`}</span>}
      symbol={state.flipped ? trade.receive : trade.pay}
      className={FOCUS_WITHIN}
      value={
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={state.amount}
          onChange={(event) => update({ amount: event.target.value })}
          aria-invalid={problem !== undefined}
          aria-describedby={`${id}-hint`}
          className={cn(FIELD_INPUT, "text-xl font-medium")}
        />
      }
    />
  );
}

function TryFlip() {
  const { state, update } = useTry();
  return (
    <PartRow name="flip" className="justify-center">
      <button
        type="button"
        aria-label="Swap the two tokens"
        onClick={() => update({ flipped: !state.flipped })}
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

function TryResult() {
  const { state, trade } = useTry();
  const rate = state.flipped ? 1 / trade.rate : trade.rate;
  return (
    <AmountField
      name="result"
      label="You receive"
      hint="Estimated"
      value={<output>{quoteFor(state.amount, rate)}</output>}
      symbol={state.flipped ? trade.pay : trade.receive}
    />
  );
}

function TryQuickAmounts() {
  const { component, update } = useTry();
  const balance = component.parts.find((part) => part.name === "amount")?.balance;
  return (
    <PartRow name="quickAmounts">
      {QUICK_AMOUNTS.map(({ label, percent }) => (
        <button
          key={label}
          type="button"
          disabled={!balance}
          onClick={() => balance && update({ amount: shareOf(balance, percent) })}
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
  const { state, update } = useTry();
  return (
    <PartRow name="slider" className="flex-col items-stretch justify-center gap-2.5">
      <Slider.Root
        value={state.slider}
        min={0}
        max={part.max}
        step={part.max > 10 ? 1 : 0.1}
        onValueChange={(value) => update({ slider: Number(value) })}
        className="flex flex-col gap-2.5"
      >
        <div className="flex justify-between gap-2">
          <Slider.Label className="truncate text-muted-foreground">{part.label}</Slider.Label>
          <span className="shrink-0 font-medium tabular-nums">
            {state.slider}
            {part.unit}
          </span>
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

function TryRecipient() {
  const { state, update } = useTry();
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
        value={state.recipient}
        onChange={(event) => update({ recipient: event.target.value })}
        className={cn(
          "rounded-xl border border-border bg-transparent px-3 py-2 text-base tabular-nums",
          FOCUS,
        )}
      />
    </PartRow>
  );
}

function TryButton({ part }: { part: PartOf<"button"> }) {
  const { component, state } = useTry();
  const [busy, setBusy] = useState(false);
  const balance = component.parts.find((p) => p.name === "amount")?.balance;
  const blocked = balance !== undefined && amountProblem(state.amount, balance) !== undefined;

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
        onClick={() => !busy && !blocked && setBusy(true)}
        className={cn(
          "inline-flex flex-1 items-center justify-center gap-2 truncate rounded-xl bg-primary px-3 py-2.5 font-medium text-primary-foreground",
          FOCUS,
          PRESS,
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
