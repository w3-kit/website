import { useMemo } from "react";
import { Check, Copy, X } from "lucide-react";
import {
  NARROW_CARD_WIDTH,
  PART_ROWS_PER_CELL,
  buildPrompt,
  type GeneratedComponent,
} from "../../../entities/generated-component";
import { TryCard } from "../../../features/try-component";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../../shared/ui/dialog";
import { SITE_TOKENS } from "../model/site-tokens";

interface PromptDialogProps {
  /** The component whose prompt is shown. The dialog is closed while this is null. */
  component: GeneratedComponent | null;
  onClose: () => void;
}

export function PromptDialog({ component, onClose }: PromptDialogProps) {
  return (
    <Dialog
      open={component !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {component && <PromptContent component={component} />}
    </Dialog>
  );
}

/** Square and shadowed like the docs search: a floating panel is the one surface with a shadow. */
function PromptContent({ component }: { component: GeneratedComponent }) {
  const prompt = useMemo(() => buildPrompt(component, SITE_TOKENS), [component]);
  const [copied, copy] = useCopyToClipboard(prompt);

  return (
    <DialogContent
      showCloseButton={false}
      className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 rounded-none bg-w3-ground p-0 text-w3-ink shadow-[0_24px_64px_-16px_rgba(0,0,0,0.4)] ring-0 sm:max-w-6xl"
    >
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="flex min-w-0 flex-col gap-2">
          {/* Important: the shared dialog sets its own sizes, and tailwind-merge cannot tell
              that a w3 type step is a size. */}
          <DialogTitle className="text-w3-statement! font-medium">{component.name}</DialogTitle>
          <DialogDescription className="text-w3-small! text-w3-ink-soft">
            Try the component, then give its prompt to a coding agent to build it. The same prompt
            gives different code on each run, so review what you get.
          </DialogDescription>
        </div>
        <DialogClose
          aria-label="Close"
          className="-me-2 -mt-2 inline-flex size-11 shrink-0 items-center justify-center text-w3-ink transition-colors hover:bg-w3-tone outline-w3-accent focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <X size={20} aria-hidden />
        </DialogClose>
      </div>
      {/* One scroll for both on a phone; side by side, each scrolls on its own. */}
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain px-6 md:flex-row md:overflow-hidden">
        <TryPanel component={component} />
        {/* Focusable, so the keyboard can scroll it. */}
        <pre
          tabIndex={0}
          role="region"
          aria-label={`Prompt for ${component.name}`}
          className="bg-w3-tone p-4 text-[13px] leading-relaxed whitespace-pre-wrap -outline-offset-2 outline-w3-accent focus-visible:outline-2 md:min-h-0 md:flex-1 md:overflow-auto md:overscroll-contain"
        >
          {prompt}
        </pre>
      </div>
      <div className="flex items-center justify-end gap-4 p-6">
        <span role="status" className="text-w3-small text-w3-ink-soft">
          {copied ? "Prompt copied" : ""}
        </span>
        <button
          type="button"
          onClick={copy}
          className="w3-press inline-flex h-12 items-center gap-3 bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent hover:bg-w3-accent-hover outline-w3-accent focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          Copy prompt
        </button>
      </div>
    </DialogContent>
  );
}

/** About the height of a part row in the grid, so a component looks the same when tried. */
const TRY_ROW_PX = 52;
const TRY_WIDTH_PX = { narrow: 360, wide: 520 };

function TryPanel({ component }: { component: GeneratedComponent }) {
  const width = component.w > NARROW_CARD_WIDTH ? TRY_WIDTH_PX.wide : TRY_WIDTH_PX.narrow;
  return (
    <section
      aria-labelledby="try-title"
      className="flex shrink-0 flex-col gap-4 bg-w3-tone p-6 md:overflow-y-auto md:overscroll-contain"
    >
      <div>
        <h3 id="try-title" className="text-w3-body font-medium">
          Try it
        </h3>
        <p className="text-w3-small text-w3-ink-soft">The controls work. Nothing is sent.</p>
      </div>
      <div
        className="max-w-full shrink-0"
        style={{ width, height: component.h * PART_ROWS_PER_CELL * TRY_ROW_PX }}
      >
        <TryCard component={component} />
      </div>
    </section>
  );
}
