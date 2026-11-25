import type { ComponentProps } from "react";
import { cn } from "../../../shared/lib/utils";
import { PART_ROWS_PER_CELL, type GeneratedComponent } from "../model/generate";
import { PartView } from "./part-views";

/**
 * A still picture of a generated component. It is inert: the controls are drawn, not wired, and
 * the page puts its own button over it. It fills the height its container gives it.
 */
export function GeneratedCard({ component }: { component: GeneratedComponent }) {
  return (
    <CardFrame component={component} inert className="select-none">
      {component.parts.map((part, position) => (
        <PartView key={position} part={part} />
      ))}
    </CardFrame>
  );
}

type CardFrameProps = ComponentProps<"div"> & { component: GeneratedComponent };

/** The card the parts sit in: one grid row per part row, so the parts fill it exactly. */
export function CardFrame({ component, className, style, ...props }: CardFrameProps) {
  const rows = component.h * PART_ROWS_PER_CELL;
  return (
    <div
      {...props}
      data-generated-card
      className={cn(
        "@container grid h-full overflow-hidden rounded-2xl border border-border bg-background text-sm text-foreground",
        className,
      )}
      style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`, ...style }}
    />
  );
}
