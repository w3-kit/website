import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/registry")({
  component: () => <Outlet />,
});
