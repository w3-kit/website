import { createFileRoute } from "@tanstack/react-router";
import { ProgramsListPage } from "../../../pages/programs-list";

export const Route = createFileRoute("/registry/programs/")({
  component: ProgramsListPage,
});
