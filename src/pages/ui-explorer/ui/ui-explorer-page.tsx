import { CopyCommand } from "../../../features/copy-address";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "../../../widgets/site-chrome";
import {
  COMPONENT_CATEGORIES,
  componentInstallCommand,
  componentRegistry,
  isComponentCategory,
  type ComponentMeta,
} from "../../../entities/component";
import { DEMOS } from "../../../shared/ui/w3-kit-demos";
import { cn } from "../../../shared/lib/utils";

const route = getRouteApi("/ui/");
const EXAMPLE_ID = "token-swap";
const categoryLabel = (c: ComponentMeta["category"]) =>
  COMPONENT_CATEGORIES.find((x) => x.value === c)!.label;

export function UiExplorerPage() {
  // The router keeps unknown query values; anything that is not a category means "all".
  const search = route.useSearch();
  const category = isComponentCategory(search.category) ? search.category : undefined;
  const shown = category
    ? componentRegistry.filter((c) => c.category === category)
    : componentRegistry;

  return (
    <SiteShell section="ui">
      <Hero />
      <section aria-labelledby="catalog-title" className="px-4 pb-24 md:px-10 md:pb-40">
        <h2 id="catalog-title" className="sr-only">
          All components
        </h2>
        <nav
          aria-label="Categories"
          className="sticky top-[72px] z-20 -mx-4 flex gap-1 overflow-x-auto bg-w3-ground px-4 py-3 md:-mx-10 md:px-10"
        >
          <CategoryTab label="All" count={componentRegistry.length} active={!category} />
          {COMPONENT_CATEGORIES.map((c) => (
            <CategoryTab
              key={c.value}
              label={c.label}
              value={c.value}
              count={componentRegistry.filter((x) => x.category === c.value).length}
              active={category === c.value}
            />
          ))}
        </nav>

        <ul aria-label="Components" className="mt-8 columns-1 gap-2 sm:columns-2 xl:columns-3">
          {shown.map((component) => (
            <li key={component.id} className="mb-2 break-inside-avoid">
              <ComponentTile component={component} />
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}

function Hero() {
  const command = componentInstallCommand(EXAMPLE_ID);

  return (
    <section
      aria-labelledby="ui-title"
      className="grid gap-10 px-4 pb-16 pt-10 md:grid-cols-12 md:gap-x-6 md:px-10 md:pb-24 md:pt-16"
    >
      <h1 id="ui-title" className="w3-rise text-w3-display font-medium md:col-span-8">
        <span className="block">{componentRegistry.length} components,</span>
        <span className="block">all of them live.</span>
      </h1>
      <div
        className="w3-rise flex flex-col items-start gap-6 md:col-span-4 md:self-end"
        style={{ animationDelay: "80ms" }}
      >
        <p className="text-w3-body">
          Every tile below is the real React component running with sample data. Add one and the
          file is yours to change.
        </p>
        <CopyCommand command={command} />
      </div>
    </section>
  );
}

function CategoryTab({
  label,
  value,
  count,
  active,
}: {
  label: string;
  value?: ComponentMeta["category"];
  count: number;
  active: boolean;
}) {
  return (
    <Link
      to="/ui"
      search={{ category: value }}
      resetScroll={false}
      // Match on the category too, and let `active` (which also covers unknown categories) decide.
      activeOptions={{ exact: true, includeSearch: true }}
      activeProps={{ "aria-current": active ? "page" : undefined }}
      inactiveProps={{ "aria-current": active ? "page" : undefined }}
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-2 px-4 text-w3-small font-medium transition-colors",
        active ? "bg-w3-ink text-w3-ground" : "bg-w3-tone text-w3-ink hover:bg-w3-tone-2",
      )}
    >
      {label}
      <span className={cn("tabular-nums", active ? "opacity-60" : "text-w3-ink-soft")}>
        {count}
      </span>
    </Link>
  );
}

function ComponentTile({ component }: { component: ComponentMeta }) {
  const Demo = DEMOS[component.id];

  return (
    <Link
      to="/ui/$componentId"
      params={{ componentId: component.id }}
      className="group block bg-w3-tone transition-colors hover:bg-w3-tone-2"
    >
      <div data-ui className="pointer-events-none select-none p-6" inert>
        {Demo && <Demo />}
      </div>
      <div className="flex items-center justify-between gap-4 px-6 pb-5">
        <span>
          <span className="block text-w3-body font-medium text-w3-ink transition-colors group-hover:text-w3-accent">
            {component.name}
          </span>
          <span className="block text-w3-small text-w3-ink-soft">
            {categoryLabel(component.category)}
          </span>
        </span>
        <ArrowRight
          size={18}
          aria-hidden
          className="text-w3-ink transition-transform group-hover:translate-x-1 group-hover:text-w3-accent"
        />
      </div>
    </Link>
  );
}
