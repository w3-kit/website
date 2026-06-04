import { createFileRoute } from "@tanstack/react-router";
import { ProgramDetailPage } from "../../../pages/program-detail";

export const Route = createFileRoute("/registry/programs/$key")({
  component: ProgramDetailPage,
});
