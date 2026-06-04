import { Link, useRouterState } from "@tanstack/react-router";

const NAV = [
  { label: "Home", href: "/registry/" },
  { label: "Chains", href: "/registry/chains" },
  { label: "Tokens", href: "/registry/tokens" },
  { label: "Programs", href: "/registry/programs" },
  { label: "API", href: "/registry/api" },
];

export function RegistrySidebar() {
  const { location } = useRouterState();
  return (
    <nav
      aria-label="Registry sections"
      className="sticky top-0 hidden h-screen w-[220px] shrink-0 border-r border-w3-border-subtle bg-w3-gray-100 lg:block"
    >
      <ul className="flex flex-col gap-1 p-4">
        {NAV.map((item) => {
          const active =
            item.href === "/registry/"
              ? location.pathname === "/registry/"
              : location.pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`block rounded px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-w3-surface-alt text-w3-gray-900"
                    : "text-w3-gray-600 hover:bg-w3-surface-alt/60"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
