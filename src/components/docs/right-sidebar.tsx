import React from "react";
import Link from "next/link";
import { Github, Code } from "lucide-react";

interface RightSidebarProps {
  className?: string;
}

const links = [
  {
    title: "On This Page",
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Installation", href: "#installation" },
      { title: "Usage", href: "#usage" },
    ],
  },
];

export function RightSidebar({ className }: RightSidebarProps) {
  return (
    <div
      className={`fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-l border-border md:sticky md:block`}
    >
      <div className="h-full py-6 px-4">
        {links.map((section) => (
          <div key={section.title} className="mb-6">
            <h4 className="mb-2 text-sm font-semibold text-foreground">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Support Card */}
        <div className="mt-8 rounded-lg border border-border bg-muted p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-foreground">
              <h5 className="font-medium">Open Source Project</h5>
            </div>

            <p className="text-sm text-muted-foreground">
              W3-Kit is an open-source project. Join us in building the future of Web3 UI components.
            </p>

            <div className="space-y-2">
              <a
                href="https://github.com/w3-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-md bg-foreground px-3 py-2 text-sm text-background hover:bg-foreground/90 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
              </a>

              <a
                href="https://github.com/w3-kit/ui/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary-hover transition-colors"
              >
                <Code className="h-4 w-4" />
                <span>Contribute to Project</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
