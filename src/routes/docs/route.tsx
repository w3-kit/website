import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <div>
      <header>w3-kit Docs</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
