import React from "react";
import { features } from "@/constants/home-page-features";

export function FeaturesSection() {
  return (
    <section className="px-6 lg:px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
