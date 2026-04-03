import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/registry")({
  component: RegistryLayout,
});

function RegistryLayout() {
  return (
    <div>
      <header>w3-kit Registry</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
