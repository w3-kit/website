import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/")({
  component: DocsHomePage,
});

function DocsHomePage() {
  return (
    <div>
      <h1>Documentation</h1>
      <p>Guides, recipes, and API reference for w3-kit</p>
    </div>
  );
}
