import { createFileRoute } from "@tanstack/react-router";
import { ComponentDetailPage } from "../../pages/component-detail";

export const Route = createFileRoute("/ui/$componentId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.componentId} — w3-kit UI` },
      {
        name: "description",
        content: `Documentation and API reference for the ${params.componentId} component.`,
      },
    ],
  }),
  component: ComponentDetailPage,
});
