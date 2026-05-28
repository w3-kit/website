import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { GitHubIcon } from "../github-icon";
import { cn } from "../../lib/utils";

interface GitHubLinkProps {
  /** Repo URL. Defaults to the org. */
  href?: string;
  /** If provided, fetches and renders the star count for this repo (e.g., "w3-kit/ui"). */
  starsRepo?: string;
  /** Show "GitHub" text next to the icon. */
  showLabel?: boolean;
  /** Icon size. Default 16. */
  size?: number;
  className?: string;
}

export function GitHubLink({
  href = "https://github.com/w3-kit",
  starsRepo,
  showLabel = false,
  size = 16,
  className,
}: GitHubLinkProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (!starsRepo) return;
    const ctrl = new AbortController();
    fetch(`https://api.github.com/repos/${starsRepo}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count === "number") setStars(d.stargazers_count);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [starsRepo]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className={cn(
        "inline-flex items-center gap-1.5 text-sm transition-colors text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <GitHubIcon size={size} />
      {showLabel && <span>GitHub</span>}
      {stars !== null && (
        <span className="inline-flex items-center gap-0.5">
          <Star size={size - 4} className="fill-current" />
          <span className="text-xs tabular-nums">{stars}</span>
        </span>
      )}
    </a>
  );
}
