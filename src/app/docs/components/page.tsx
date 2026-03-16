import React from "react";
import Link from "next/link";
import { getComponentList } from "@/config/docs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components | W3-Kit",
  description: "Explore W3-Kit's comprehensive collection of accessible Web3 UI components. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Components | W3-Kit",
    description: "Explore W3-Kit's comprehensive collection of accessible Web3 UI components.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function ComponentsPage() {
  const components = getComponentList();

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Components
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            A comprehensive collection of Web3 UI components built with React and Tailwind CSS.
            Each component is designed to be accessible, customizable, and easy to integrate.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((component) => (
            <Link
              key={component.href}
              href={component.href}
              className="group relative rounded-lg border border-border bg-card p-4 hover:border-accent-foreground/20 transition-colors duration-200"
            >
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary">
                  {component.title}
                </h3>
                {component.description && (
                  <p className="text-sm text-muted-foreground">
                    {component.description}
                  </p>
                )}
              </div>
              <div className="absolute top-4 right-4 text-muted-foreground/50 group-hover:text-primary">
                &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
