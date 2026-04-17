import { useState, useEffect, useCallback } from "react";

/**
 * Tracks which heading is currently visible in a scrollable container.
 * Works with overflow-y-auto containers (not just the viewport).
 */
export function useActiveHeading(headingIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(headingIds[0] ?? "");

  const handleScroll = useCallback(() => {
    if (!headingIds.length) return;

    // Find the scrollable content container
    const scrollContainer = document.querySelector("[data-docs-content]");
    if (!scrollContainer) return;

    const scrollTop = scrollContainer.scrollTop;
    const offset = 120; // header + some padding

    let current = headingIds[0] ?? "";

    for (const id of headingIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      // Get element position relative to the scroll container
      const elTop = el.offsetTop - scrollContainer.getBoundingClientRect().top - scrollContainer.scrollTop + scrollContainer.scrollTop;

      // Actually simpler: just use el.offsetTop relative to container
      const rect = el.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;

      if (relativeTop <= offset) {
        current = id;
      }
    }

    setActiveId(current);
  }, [headingIds]);

  useEffect(() => {
    if (!headingIds.length) return;

    const scrollContainer = document.querySelector("[data-docs-content]");
    if (!scrollContainer) return;

    // Initial check
    handleScroll();

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [headingIds, handleScroll]);

  return activeId;
}
