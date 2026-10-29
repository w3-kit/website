import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { UiShell } from "../../../widgets/ui-shell";
import {
  COMPONENT_CATEGORIES,
  componentInstallCommand,
  componentRegistry,
  useComponent,
  type ComponentMeta,
} from "../../../entities/component";
import { DEMOS } from "../../../shared/ui/w3-kit-demos";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import { cn } from "../../../shared/lib/utils";
import { PropsTable } from "./props-table";

export function ComponentDetailPage() {
  const { componentId = "" } = useParams({ strict: false });

  return (
    <UiShell>
      <ComponentPage id={componentId} />
    </UiShell>
  );
}

function ComponentPage({ id }: { id: string }) {
  const component = useComponent(id);
  if (!component) return <NotFound id={id} />;

  const Demo = DEMOS[component.id];
  const index = componentRegistry.findIndex((c) => c.id === component.id);
  const previous = componentRegistry[index - 1];
  const next = componentRegistry[index + 1];

  return (
    <div className="grid gap-x-6 px-4 pb-24 pt-10 md:px-10 md:pb-40 md:pt-16 lg:grid-cols-12">
      <ComponentNav currentId={component.id} />

      <article className="min-w-0 lg:col-span-9 lg:col-start-4">
        <header className="grid gap-6 md:grid-cols-9 md:gap-x-6">
          <h1 className="w3-rise text-w3-title font-medium md:col-span-6">{component.name}</h1>
          <p className="text-w3-body md:col-span-6">{component.description}</p>
        </header>

        <InstallRow component={component} />

        <div
          data-ui
          className="w3-rise mt-10 flex min-h-[420px] items-center justify-center bg-w3-tone p-6 md:p-14"
          style={{ animationDelay: "120ms" }}
        >
          <div className="w-full max-w-[520px]">{Demo && <Demo />}</div>
        </div>

        <PropsTable props={component.props} />

        <nav aria-label="More components" className="mt-24 grid gap-2 sm:grid-cols-2">
          {previous && <Neighbour component={previous} direction="previous" />}
          {next && <Neighbour component={next} direction="next" />}
        </nav>
      </article>
    </div>
  );
}

function InstallRow({ component }: { component: ComponentMeta }) {
  const command = componentInstallCommand(component.id);
  const [copied, copy] = useCopyToClipboard(command);

  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
      <button
        type="button"
        onClick={copy}
        className="w3-press inline-flex h-12 max-w-full items-center gap-3 bg-w3-accent px-5 text-w3-on-accent hover:bg-w3-accent-hover"
      >
        <code className="truncate text-[15px]">{command}</code>
        {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        <span className="sr-only">{copied ? "Copied" : "Copy install command"}</span>
      </button>
      <a
        href={component.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="text-w3-small font-medium text-w3-ink underline decoration-w3-tone-2 underline-offset-4 hover:decoration-w3-accent"
      >
        Source on GitHub
      </a>
    </div>
  );
}

function ComponentNav({ currentId }: { currentId: string }) {
  return (
    <nav aria-label="Components" className="hidden lg:col-span-3 lg:block">
      <div className="sticky top-[104px] flex max-h-[calc(100svh-136px)] flex-col gap-8 overflow-y-auto pb-8">
        {COMPONENT_CATEGORIES.map(({ value, label }) => (
          <div key={value}>
            <h2 className="mb-2 text-w3-small text-w3-ink-soft">{label}</h2>
            <ul className="flex flex-col">
              {componentRegistry
                .filter((c) => c.category === value)
                .map((c) => (
                  <li key={c.id}>
                    <Link
                      to="/ui/$componentId"
                      params={{ componentId: c.id }}
                      aria-current={c.id === currentId ? "page" : undefined}
                      className={cn(
                        "block py-1 text-w3-small transition-colors hover:text-w3-accent",
                        c.id === currentId ? "font-medium text-w3-accent" : "text-w3-ink",
                      )}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

function Neighbour({
  component,
  direction,
}: {
  component: ComponentMeta;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      to="/ui/$componentId"
      params={{ componentId: component.id }}
      className={cn(
        "group flex flex-col gap-6 bg-w3-tone p-6 transition-colors hover:bg-w3-tone-2",
        isNext && "sm:col-start-2 sm:items-end sm:text-right",
      )}
    >
      <span className="text-w3-small text-w3-ink-soft">{isNext ? "Next" : "Previous"}</span>
      <span className="flex items-center gap-3 text-w3-statement font-medium text-w3-ink group-hover:text-w3-accent">
        {!isNext && <ArrowLeft size={22} aria-hidden />}
        {component.name}
        {isNext && <ArrowRight size={22} aria-hidden />}
      </span>
    </Link>
  );
}

function NotFound({ id }: { id: string }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-start justify-center gap-6 px-4 md:px-10">
      <h1 className="text-w3-title font-medium">
        <span className="block">No component</span>
        <span className="block text-w3-ink-soft">called {id}.</span>
      </h1>
      <Link
        to="/ui"
        className="w3-press inline-flex h-12 items-center gap-2 bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent"
      >
        All components <ArrowRight size={16} aria-hidden />
      </Link>
    </section>
  );
}
