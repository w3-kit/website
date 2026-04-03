import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/registry/")({
  component: RegistryPage,
});

function RegistryPage() {
  return (
    <div>
      <h1>Registry</h1>
      <p>Browse chains, tokens, and component registry</p>
    </div>
  );
}
