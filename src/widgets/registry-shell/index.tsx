import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RegistryHeader } from "./registry-header";
import { RegistrySidebar } from "./registry-sidebar";
import { RegistryFooter } from "./registry-footer";
import { RegistrySearch } from "../registry-search";

export function RegistryShell() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      <RegistrySearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
