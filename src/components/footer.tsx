import React from "react";
import Link from "next/link";   
import { Github, Twitter } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  docs: [
    { title: "Getting Started", href: "/docs" },
    { title: "Components", href: "/docs/components" },
    { title: "Examples", href: "/docs/examples" },
  ],
  community: [
    { title: "GitHub", href: "https://github.com/w3-kit/w3-kit" },

    { title: "Twitter", href: "https://twitter.com/w3kit" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
    { title: "License", href: "/license" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">

            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-xl text-gray-900 dark:text-white"
            >
                <Image src="/w3-kit-logo.svg" alt="w3-kit" width={30} height={30} />
              w3-kit
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Modern UI components for Web3 applications
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Documentation
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.docs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Community
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} w3-kit. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/w3-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com/w3kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
          
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
