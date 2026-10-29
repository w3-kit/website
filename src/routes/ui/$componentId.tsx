import { createFileRoute, redirect } from "@tanstack/react-router";
import { ComponentDetailPage } from "../../pages/component-detail";
import { getSectionUrl } from "../../shared/lib/urls";

/** Guide pages that used to live on ui.w3-kit.com, and where docs now covers them. */
const MOVED_TO_DOCS: Record<string, string> = {
  introduction: "introduction",
  installation: "installation",
  usage: "components",
  theming: "theming",
  "dark-mode": "theming",
  "cli-init": "cli-commands",
  "cli-add": "cli-commands",
  mcp: "mcp",
  shadcn: "ui-library",
  figma: "ui-library",
};

export const Route = createFileRoute("/ui/$componentId")({
  beforeLoad: ({ params }) => {
    const moved = MOVED_TO_DOCS[params.componentId];
    if (moved) throw redirect({ href: `${getSectionUrl("docs")}/${moved}`, statusCode: 301 });
  },
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
