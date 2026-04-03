import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui/")({
  component: UiExplorerPage,
});

function UiExplorerPage() {
  return (
    <div>
      <h1>UI Explorer</h1>
      <p>Browse and preview w3-kit components</p>
    </div>
  );
}
