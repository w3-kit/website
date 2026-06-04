import { createFileRoute } from "@tanstack/react-router";
import { RegistryShell } from "../../widgets/registry-shell";

export const Route = createFileRoute("/registry")({
  component: RegistryShell,
});
