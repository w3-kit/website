import { useEffect, useState } from "react";

const HEADER_OFFSET = 120;

/** The last heading that has scrolled past the sticky header. */
export function useActiveHeading(headingIds: string[]): string {
  const key = headingIds.join(",");
  const [activeId, setActiveId] = useState(headingIds[0] ?? "");

  useEffect(() => {
    const ids = key ? key.split(",") : [];
    if (!ids.length) return;
    let frame = 0;

    const update = () => {
      const passed = ids.filter(
        (id) =>
          (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= HEADER_OFFSET,
      );
      setActiveId(passed.at(-1) ?? ids[0]);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [key]);

  return activeId;
}
