import { createFileRoute } from "@tanstack/react-router";
import { ProgramDetailPage } from "../../../pages/program-detail";
import { PROGRAMS } from "../../../entities/program/model/programs.gen";
import { buildMeta } from "../../../shared/lib/seo";

export const Route = createFileRoute("/registry/programs/$key")({
  head: ({ params }) => {
    const program = PROGRAMS.find((p) => p.key === params.key);
    const seo = buildMeta({
      title: program ? `${program.name}` : "Program Not Found",
      description: program
        ? program.learn.split("\n")[0].slice(0, 160)
        : `No program registered with key ${params.key}.`,
      path: `/registry/programs/${params.key}`,
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: ProgramDetailPage,
});
