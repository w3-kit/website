import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { RegistryHeader } from "./registry-header";
import { RegistrySidebar } from "./registry-sidebar";
import { RegistryFooter } from "./registry-footer";

export function RegistryShell() {
  const [, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-w3-gray-100 text-w3-gray-900">
      <RegistryHeader onOpenSearch={() => setSearchOpen(true)} />
      <div className="flex">
        <RegistrySidebar />
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
      <RegistryFooter />
    </div>
  );
}
