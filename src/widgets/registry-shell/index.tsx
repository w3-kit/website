import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "../site-header";
import { SiteFooter } from "../site-footer";
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
    <div className="flex min-h-screen flex-col overflow-x-clip bg-w3-ground text-w3-ink">
      <SiteHeader currentSection="registry" onSearch={() => setSearchOpen(true)} />
      <main className="flex-1 px-4 pb-24 pt-10 md:px-10 md:pb-40 md:pt-16">
        <Outlet />
      </main>
      <SiteFooter currentSection="registry" />
      <RegistrySearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
