import { createFileRoute } from "@tanstack/react-router";
import { DesignSystemPage } from "../../pages/design-system";

export const Route = createFileRoute("/design/")({
  component: DesignSystemPage,
});
