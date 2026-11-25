import type { CSSProperties, ComponentType, ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeftRight,
  ChartLine,
  Gem,
  Search,
  Sprout,
  TriangleAlert,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../../shared/lib/utils";
import type { FamilyId, ListRow } from "../model/families";
import { PARTS, type Part, type PartName, type PartOf } from "../model/parts";

/**
 * How each part is drawn, in the look of the w3-kit component library. Colours come from semantic
 * token classes only, so the site theme restyles every part through CSS. No part may carry a mode
 * of its own. tests/unit/generated-components.test.ts fails if a colour outside the tokens appears.
 */
export function PartView({ part }: { part: Part }) {
  const View = VIEWS[part.name] as ComponentType<{ part: Part }>;
  return <View part={part} />;
}

/** Tailwind reads class names from the source, so each span is written out. */
const ROW_SPAN: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
};
const FAMILY_ICONS: Record<FamilyId, LucideIcon> = {
  trade: ArrowLeftRight,
  earn: Sprout,
  wallet: Wallet,
  nft: Gem,
  data: ChartLine,
};
const NUMBER = "tabular-nums";
const PILL = "shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs";
const QUICK_AMOUNTS = ["25%", "50%", "75%", "Max"];
const CHART = { width: 100, height: 40, top: 4, bottom: 38 };

interface PartRowProps {
  name: PartName;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** A part takes as many rows of the card as the part table gives it, with the card's side padding. */
function PartRow({ name, className, style, children }: PartRowProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 min-w-0 items-center gap-2 px-5",
        ROW_SPAN[PARTS[name].rows],
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function Avatar({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium",
        className,
      )}
    >
      {text}
    </span>
  );
}

function TokenChip({ symbol }: { symbol: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-background py-1 ps-1 pe-2.5 text-xs font-semibold">
      <Avatar text={symbol[0]} className="size-5 bg-foreground text-background" />
      {symbol}
    </span>
  );
}

/** Placeholder artwork, drawn from two tokens so it follows the theme like everything else. */
function Stripes({ angle, className }: { angle: number; className?: string }) {
  return (
    <div
      className={cn("bg-muted", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(${angle}deg, var(--muted-foreground) 0 12px, var(--muted) 12px 24px)`,
      }}
    />
  );
}

interface AmountFieldProps {
  name: PartName;
  label: string;
  hint: string;
  value: string;
  symbol: string;
}

/** Labels stay text-foreground: muted-foreground on muted is below 4.5:1 in light mode. */
function AmountField({ name, label, hint, value, symbol }: AmountFieldProps) {
  return (
    <PartRow name={name} className="py-1">
      <div className="flex h-full w-full min-w-0 flex-col justify-center gap-1 rounded-xl bg-muted px-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="truncate">{label}</span>
          <span className={cn("truncate", NUMBER)}>{hint}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className={cn("truncate text-xl font-medium", NUMBER)}>{value}</span>
          <TokenChip symbol={symbol} />
        </div>
      </div>
    </PartRow>
  );
}

function ListView({ part }: { part: PartOf<"list2" | "list3" | "list4"> }) {
  return (
    <PartRow name={part.name} className="flex-col items-stretch gap-0">
      {part.rows.map((row) => (
        <ListItem key={row.title} row={row} />
      ))}
    </PartRow>
  );
}

function ListItem({ row }: { row: ListRow }) {
  return (
    <div className="flex min-h-0 flex-1 items-center gap-3">
      <Avatar text={row.avatar} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">{row.title}</span>
        <span className="truncate text-xs text-muted-foreground">{row.subtitle}</span>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className={cn("font-medium", NUMBER)}>{row.value}</span>
        {row.status ? (
          <span className={PILL}>{row.note}</span>
        ) : (
          <span className={cn("text-xs text-muted-foreground", NUMBER)}>{row.note}</span>
        )}
      </div>
    </div>
  );
}

function DetailsView({ part }: { part: PartOf<"details1" | "details2" | "details3"> }) {
  return (
    <PartRow name={part.name} className="flex-col items-stretch gap-0">
      {part.rows.map(({ label, value }) => (
        <div key={label} className="flex min-h-0 flex-1 items-center justify-between gap-3">
          <span className="shrink-0 text-muted-foreground">{label}</span>
          <span className={cn("truncate font-medium", NUMBER)}>{value}</span>
        </div>
      ))}
    </PartRow>
  );
}

/** Scales the prices to the chart box. */
function chartPoints(prices: number[]): string {
  const low = Math.min(...prices);
  const range = Math.max(...prices) - low || 1;
  return prices
    .map((price, i) => {
      const x = (i / (prices.length - 1)) * CHART.width;
      const y = CHART.bottom - ((price - low) / range) * (CHART.bottom - CHART.top);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const VIEWS: { [K in PartName]: ComponentType<{ part: PartOf<K> }> } = {
  header: ({ part }) => {
    const Icon = FAMILY_ICONS[part.family];
    return (
      <PartRow name="header" className="border-b border-border">
        <Icon size={18} aria-hidden className="shrink-0 text-muted-foreground" />
        <span className="truncate text-base font-semibold">{part.title}</span>
        <span className={cn(PILL, "ms-auto")}>{part.network}</span>
      </PartRow>
    );
  },
  tabs: ({ part }) => (
    <PartRow name="tabs" className="gap-1">
      {part.options.map((option, i) => (
        <span
          key={option}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground",
          )}
        >
          {option}
        </span>
      ))}
    </PartRow>
  ),
  search: ({ part }) => (
    <PartRow name="search">
      <div className="flex w-full items-center gap-2 rounded-xl border border-border px-3 py-2 text-muted-foreground">
        <Search size={16} aria-hidden className="shrink-0" />
        <span className="truncate">{part.placeholder}</span>
      </div>
    </PartRow>
  ),
  chart: ({ part }) => {
    const points = chartPoints(part.prices);
    return (
      <PartRow name="chart" className="flex-col items-stretch gap-2 py-2">
        <div className="flex items-baseline gap-2">
          <span className={cn("text-xl font-semibold", NUMBER)}>{part.price}</span>
          <span className={cn("text-xs text-muted-foreground", NUMBER)}>{part.change}</span>
        </div>
        <svg
          viewBox={`0 0 ${CHART.width} ${CHART.height}`}
          preserveAspectRatio="none"
          className="min-h-0 w-full flex-1 text-primary"
        >
          <polygon
            points={`0,${CHART.height} ${points} ${CHART.width},${CHART.height}`}
            fill="currentColor"
            opacity={0.12}
          />
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </PartRow>
    );
  },
  artwork: ({ part }) => (
    <PartRow name="artwork" className="py-2">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Stripes angle={part.angle} className="absolute inset-0" />
        <span className="absolute start-2 bottom-2 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium">
          {part.collection} <span className={NUMBER}>{part.tokenId}</span>
        </span>
      </div>
    </PartRow>
  ),
  gallery: ({ part }) => (
    <PartRow name="gallery" className="grid grid-cols-2 items-stretch gap-3 py-2">
      {part.items.map((item) => (
        <div
          key={item.name}
          className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-border"
        >
          <Stripes angle={item.angle} className="min-h-0 flex-1" />
          <div className="flex flex-col px-3 py-1.5">
            <span className="truncate font-medium">{item.name}</span>
            <span className={cn("truncate text-xs text-muted-foreground", NUMBER)}>
              {item.price}
            </span>
          </div>
        </div>
      ))}
    </PartRow>
  ),
  list2: ListView,
  list3: ListView,
  list4: ListView,
  recipient: ({ part }) => (
    <PartRow name="recipient" className="flex-col items-stretch justify-center gap-1.5">
      <span className="text-xs font-medium">Recipient</span>
      <span className={cn("truncate rounded-xl border border-border px-3 py-2 text-base", NUMBER)}>
        {part.address}
      </span>
    </PartRow>
  ),
  amount: ({ part }) => (
    <AmountField
      name="amount"
      label="Amount"
      hint={`Balance ${part.balance}`}
      value={part.value}
      symbol={part.symbol}
    />
  ),
  flip: () => (
    <PartRow name="flip" className="justify-center">
      <span className="grid size-8 place-items-center rounded-full border border-border">
        <ArrowDown size={14} aria-hidden />
      </span>
    </PartRow>
  ),
  result: ({ part }) => (
    <AmountField
      name="result"
      label="You receive"
      hint="Estimated"
      value={part.value}
      symbol={part.symbol}
    />
  ),
  quickAmounts: () => (
    <PartRow name="quickAmounts">
      {QUICK_AMOUNTS.map((amount) => (
        <span
          key={amount}
          className={cn(
            "flex-1 rounded-lg border border-border py-1.5 text-center text-xs font-medium",
            NUMBER,
          )}
        >
          {amount}
        </span>
      ))}
    </PartRow>
  ),
  slider: ({ part }) => (
    <PartRow name="slider" className="flex-col items-stretch justify-center gap-2.5">
      <div className="flex justify-between gap-2">
        <span className="truncate text-muted-foreground">{part.label}</span>
        <span className={cn("shrink-0 font-medium", NUMBER)}>
          {part.value}
          {part.unit}
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-muted">
        <div
          className="absolute inset-y-0 start-0 rounded-full bg-primary"
          style={{ width: `${part.percent}%` }}
        />
        <div
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background"
          style={{ insetInlineStart: `${part.percent}%` }}
        />
      </div>
    </PartRow>
  ),
  statGrid: ({ part }) => (
    <PartRow name="statGrid" className="grid grid-cols-3 items-stretch gap-2 py-1.5">
      {part.stats.map(({ label, value }) => (
        <div
          key={label}
          className="flex min-w-0 flex-col justify-center gap-0.5 rounded-xl bg-muted px-3"
        >
          <span className="truncate text-xs uppercase">{label}</span>
          <span className={cn("truncate font-semibold", NUMBER)}>{value}</span>
        </div>
      ))}
    </PartRow>
  ),
  progress: ({ part }) => (
    <PartRow name="progress" className="flex-col items-stretch justify-center gap-1.5">
      <div className="flex justify-between gap-2 text-xs">
        <span className="truncate text-muted-foreground">{part.label}</span>
        <span className={cn("font-medium", NUMBER)}>{part.percent}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${part.percent}%` }} />
      </div>
    </PartRow>
  ),
  details1: DetailsView,
  details2: DetailsView,
  details3: DetailsView,
  signers: ({ part }) => (
    <PartRow name="signers">
      <span className="text-xs tracking-wide text-muted-foreground uppercase">Signers</span>
      <span className="ms-auto flex">
        {part.signers.map(({ address, signed }) => (
          <Avatar
            key={address}
            text={address.slice(2, 3).toUpperCase()}
            className={cn(
              "-ms-1.5 size-7 ring-2 ring-background",
              signed && "bg-foreground text-background",
            )}
          />
        ))}
      </span>
      <span className={cn("text-xs text-muted-foreground", NUMBER)}>
        {part.signers.filter((signer) => signer.signed).length} of {part.signers.length}
      </span>
    </PartRow>
  ),
  notice: ({ part }) => (
    <PartRow name="notice">
      <div className="flex w-full min-w-0 items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs">
        <TriangleAlert size={14} aria-hidden className="shrink-0" />
        <span className="truncate">{part.text}</span>
      </div>
    </PartRow>
  ),
  button: ({ part }) => (
    <PartRow name="button">
      <span className="flex-1 truncate rounded-xl bg-primary px-3 py-2.5 text-center font-medium text-primary-foreground">
        {part.label}
      </span>
    </PartRow>
  ),
  footer: ({ part }) => (
    <PartRow name="footer" className="justify-center border-t border-border">
      <span className={cn("truncate text-xs text-muted-foreground", NUMBER)}>{part.text}</span>
    </PartRow>
  ),
};
