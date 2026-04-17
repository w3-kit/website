import Fuse from "fuse.js";
import { docContentMap } from "../../../entities/guide/model/doc-content.gen";
import { guideRegistry } from "../../../entities/guide";
import { recipeRegistry } from "../../../entities/recipe";
import { allDocNavItems } from "../../../entities/guide/model/docs-nav.gen";

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "doc" | "guide" | "recipe";
}

function buildSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];

  // Doc pages
  for (const item of allDocNavItems) {
    const content = docContentMap[item.slug] ?? "";
    const firstParagraph = content
      .split("\n")
      .filter((line) => line && !line.startsWith("#") && !line.startsWith("```"))
      .slice(0, 2)
      .join(" ")
      .slice(0, 150);
    items.push({
      title: item.label,
      description: firstParagraph || `Documentation for ${item.label}`,
      href: `/docs/${item.slug}`,
      type: "doc",
    });
  }

  // Guides
  for (const guide of guideRegistry) {
    items.push({
      title: guide.title,
      description: guide.description,
      href: `/docs/guide/${guide.slug}`,
      type: "guide",
    });
  }

  // Recipes
  for (const recipe of recipeRegistry) {
    items.push({
      title: recipe.name,
      description: recipe.description,
      href: `/docs/recipe/${recipe.slug}`,
      type: "recipe",
    });
  }

  return items;
}

const searchItems = buildSearchItems();

const fuse = new Fuse(searchItems, {
  keys: [
    { name: "title", weight: 2 },
    { name: "description", weight: 1 },
  ],
  threshold: 0.3,
  includeScore: true,
});

export function searchDocs(query: string): SearchItem[] {
  if (!query.trim()) return [];
  return fuse.search(query).map((result) => result.item);
}

export { searchItems };
