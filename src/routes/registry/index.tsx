import { createFileRoute } from "@tanstack/react-router";
import { RegistryHomePage } from "../../pages/registry-home";

export const Route = createFileRoute("/registry/")({
  component: RegistryHomePage,
});
