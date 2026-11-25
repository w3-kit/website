import { PART_ROWS_PER_CELL, type GeneratedComponent } from "../model/generate";
import { PartView } from "./part-views";

/**
 * A still picture of a generated component. It is inert: the controls are drawn, not wired, and
 * the page puts its own button over it. It fills the height its container gives it.
 */
export function GeneratedCard({ component }: { component: GeneratedComponent }) {
  const rows = component.h * PART_ROWS_PER_CELL;
  return (
    <div
      inert
      className="grid h-full overflow-hidden rounded-2xl border border-border bg-background text-sm text-foreground select-none"
      style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
    >
      {component.parts.map((part, position) => (
        <PartView key={position} part={part} />
      ))}
    </div>
  );
}
