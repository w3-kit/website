import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "../site-chrome";
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
    <SiteShell section="registry" onSearch={() => setSearchOpen(true)}>
      <div className="px-4 pb-24 pt-10 md:px-10 md:pb-40 md:pt-16">
        <Outlet />
      </div>
      <RegistrySearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </SiteShell>
  );
}
