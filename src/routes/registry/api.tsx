import { createFileRoute } from "@tanstack/react-router";
import { RegistryApiPage } from "../../pages/registry-api";

export const Route = createFileRoute("/registry/api")({
  component: RegistryApiPage,
});
