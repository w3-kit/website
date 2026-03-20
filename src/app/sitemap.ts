import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://w3-kit.com";

  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/installation`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/components`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const componentsDir = path.join(
    process.cwd(),
    "src/app/docs/components"
  );
  const componentDirs = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const componentPages: MetadataRoute.Sitemap = componentDirs.map(
    (slug) => ({
      url: `${baseUrl}/docs/components/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticPages, ...componentPages];
}
