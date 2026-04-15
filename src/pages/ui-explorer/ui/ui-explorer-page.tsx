import "../../../shared/lib/gsap-plugins";

import { UiShell } from "../../../widgets/ui-shell";
import { UiHeroSection } from "./ui-hero-section";

import { UiComponentGrid } from "./ui-component-grid";

export function UiExplorerPage() {
  return (
    <UiShell transparentHeader>
      <div className="relative">
        {/* Background glows */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute right-[-15%] top-[-5%] h-[600px] w-[600px] rounded-full blur-[160px]"
            style={{ background: "var(--w3-glow-accent)", opacity: 0.45 }}
          />
          <div
            className="absolute left-[-10%] top-[5%] h-[400px] w-[400px] rounded-full blur-[140px]"
            style={{ background: "var(--w3-accent-subtle)", opacity: 0.35 }}
          />
          <div
            className="absolute right-[-5%] top-[40%] h-[500px] w-[500px] rounded-full blur-[180px]"
            style={{ background: "var(--w3-glow-accent)", opacity: 0.25 }}
          />
        </div>

        <UiHeroSection />
        <UiComponentGrid />
      </div>
    </UiShell>
  );
}
