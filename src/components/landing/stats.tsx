"use client";

import React from "react";
import { useGitHubStars } from "@/hooks/useGitHubStars";

export function StatsSection() {
  const { stars } = useGitHubStars("https://github.com/w3-kit/ui");

  const stats = [
    { value: "30+", label: "Components" },
    { value: stars !== null ? `${stars}` : "—", label: "GitHub Stars" },
    { value: "100%", label: "TypeScript" },
  ];

  return (
    <section className="px-6 lg:px-8 py-20 border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <strong className="block text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white" aria-label={`${stat.value} ${stat.label}`}>
                {stat.value}
              </strong>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
