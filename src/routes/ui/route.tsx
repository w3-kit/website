import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ui")({
  component: UiLayout,
});

function UiLayout() {
  return (
    <div>
      <header>w3-kit UI Explorer</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
