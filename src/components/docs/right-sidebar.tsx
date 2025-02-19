import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

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
      className={`fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-l border-gray-200 dark:border-gray-800 md:sticky md:block`}
    >
      <div className="h-full py-6 px-4">
        {links.map((section) => (
          <div key={section.title} className="mb-6">
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Support Card */}
        <div className="mt-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
              
              <h5 className="font-medium">Support W3-Kit</h5>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Help us build the future of Web3 UI components. Your support makes
              a difference.
            </p>

            <div className="space-y-2">
              <a
                href="https://github.com/w3-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-md bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white dark:text-gray-100 hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
              </a>

              <a
                href="mailto:info.w3kit@gmail.com"
                className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
              >
                Become a Contributor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
