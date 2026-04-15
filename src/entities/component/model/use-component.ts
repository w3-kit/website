import { componentRegistry } from "./component-registry";
import type { ComponentMeta } from "./types";

export function useComponent(id: string): ComponentMeta | undefined {
  return componentRegistry.find((c) => c.id === id);
}
