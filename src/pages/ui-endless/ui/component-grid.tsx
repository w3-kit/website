import { useEffect, useRef, useState, type RefObject } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { ArrowRight, Shuffle } from "lucide-react";
import {
  FAMILIES,
  GeneratedCard,
  MAX_COLUMNS,
  MIN_COLUMNS,
  generateChunk,
  type GeneratedComponent,
  type PageKey,
} from "../../../entities/generated-component";
import { ThemeToggle } from "../../../widgets/site-chrome";
import { randomSeed } from "../model/seed";
import { PromptDialog } from "./prompt-dialog";

const route = getRouteApi("/ui/endless");

const GAP_PX = 8;
const CELL_HEIGHT_PX = 208;
const MIN_COLUMN_WIDTH_PX = 170;
/** New components are generated while fewer than two screens of them wait below the fold. */
const LOAD_AHEAD = "200% 0px";

/**
 * Measures its own width, then fills it with components. The same seed and width give the same
 * page, so a link opened at another width shows another page from the same seed.
 */
export function EndlessGrid({ seed }: { seed: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const columns = useColumnCount(frame);
  const navigate = route.useNavigate();
  // Lives above the keyed grid, so a resize that rebuilds the grid keeps the dialog open.
  const [selected, setSelected] = useState<GeneratedComponent | null>(null);

  function shuffle() {
    navigate({ search: { seed: randomSeed() }, resetScroll: false });
    if (frame.current!.getBoundingClientRect().top < 0) frame.current!.scrollIntoView();
  }

  return (
    // Tall before the first measure, so the page does not jump when the components arrive.
    <div ref={frame} className="min-h-dvh scroll-mt-[72px]">
      {columns > 0 && (
        <ComponentGrid
          key={`${seed}:${columns}`}
          page={{ seed, columns }}
          onSelect={setSelected}
          onShuffle={shuffle}
        />
      )}
      <PromptDialog component={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

/** 0 until the element is measured: the server cannot know the width. */
function useColumnCount(element: RefObject<HTMLElement | null>): number {
  const [columns, setColumns] = useState(0);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const fitting = Math.floor(
        (entry.contentRect.width + GAP_PX) / (MIN_COLUMN_WIDTH_PX + GAP_PX),
      );
      setColumns(Math.max(MIN_COLUMNS, Math.min(MAX_COLUMNS, fitting)));
    });
    observer.observe(element.current!);
    return () => observer.disconnect();
  }, [element]);
  return columns;
}

interface ComponentGridProps {
  page: PageKey;
  onSelect: (component: GeneratedComponent) => void;
  onShuffle: () => void;
}

function ComponentGrid({ page, onSelect, onShuffle }: ComponentGridProps) {
  const { seed, columns } = page;
  const [chunks, setChunks] = useState(() => [generateChunk({ seed, columns })]);
  const end = useRef<HTMLDivElement>(null);
  const components = chunks.flatMap((chunk) => chunk.components);

  // Observing again after each chunk reports whether the end is still near, so loading goes on
  // until enough components wait below the fold.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setChunks((loaded) => [...loaded, generateChunk({ seed, columns }, loaded.at(-1))]);
      },
      { rootMargin: LOAD_AHEAD },
    );
    observer.observe(end.current!);
    return () => observer.disconnect();
  }, [seed, columns, chunks.length]);

  return (
    <>
      <Toolbar seed={seed} count={components.length} onShuffle={onShuffle} />
      <ul
        aria-label="Generated components"
        className="mt-8 grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridAutoRows: CELL_HEIGHT_PX,
          gap: GAP_PX,
        }}
      >
        {components.map((component) => (
          <ComponentTile key={component.id} component={component} onSelect={onSelect} />
        ))}
      </ul>
      <div ref={end} aria-hidden />
    </>
  );
}

interface ComponentTileProps {
  component: GeneratedComponent;
  onSelect: (component: GeneratedComponent) => void;
}

/** Laid out like a tile of the component catalog: the component, then its name and family. */
function ComponentTile({ component, onSelect }: ComponentTileProps) {
  const family = FAMILIES[component.family].label;
  return (
    // ponytail: tiles are never unmounted. content-visibility skips the work for those off screen;
    // window the list if pages of many thousand components get slow.
    <li
      className="group relative flex flex-col bg-w3-tone transition-colors [content-visibility:auto] hover:bg-w3-tone-2"
      style={{
        gridColumn: `${component.col + 1} / span ${component.w}`,
        gridRow: `${component.row + 1} / span ${component.h}`,
      }}
    >
      <div className="min-h-0 flex-1 p-6">
        <GeneratedCard component={component} />
      </div>
      <div className="flex items-center justify-between gap-4 px-6 pb-5">
        <span className="min-w-0">
          <span className="block truncate text-w3-body font-medium text-w3-ink transition-colors group-hover:text-w3-accent">
            {component.name}
          </span>
          <span className="block text-w3-small text-w3-ink-soft tabular-nums">
            {family} · {component.parts.length} parts
          </span>
        </span>
        <ArrowRight
          size={18}
          aria-hidden
          className="shrink-0 text-w3-ink transition-transform group-hover:text-w3-accent motion-safe:group-hover:translate-x-1"
        />
      </div>
      {/* The outline sits inside the tile: content-visibility clips what is drawn outside it. */}
      <button
        type="button"
        onClick={() => onSelect(component)}
        aria-label={`${component.name}, ${family}, ${component.parts.length} parts: get the prompt`}
        className="absolute inset-0 cursor-pointer -outline-offset-2 outline-w3-accent focus-visible:outline-2"
      />
    </li>
  );
}

interface ToolbarProps {
  seed: number;
  count: number;
  onShuffle: () => void;
}

/** Sticks under the header like the catalog's category bar, and holds the theme switch. */
function Toolbar({ seed, count, onShuffle }: ToolbarProps) {
  return (
    <div className="sticky top-[72px] z-20 -mx-4 flex items-center gap-1 bg-w3-ground px-4 py-3 md:-mx-10 md:px-10">
      <button
        type="button"
        onClick={onShuffle}
        className="w3-press inline-flex h-10 shrink-0 items-center gap-2 bg-w3-tone px-3 text-w3-small font-medium text-w3-ink hover:bg-w3-tone-2 sm:px-4"
      >
        <Shuffle size={16} aria-hidden />
        <span className="sr-only sm:not-sr-only">Shuffle</span>
      </button>
      <p className="hidden min-w-0 flex-1 truncate px-4 text-w3-small text-w3-ink-soft tabular-nums md:block">
        {count.toLocaleString("en")} components so far. Seed {seed}.
      </p>
      <ThemeToggle surface="page" className="ms-auto gap-1" />
    </div>
  );
}
