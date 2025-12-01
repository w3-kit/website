import { useState, useEffect } from "react";

interface GitHubRepoInfo {
  stargazers_count: number;
}

interface CachedStars {
  count: number;
  timestamp: number;
}

const CACHE_KEY = "github_stars_w3-kit_ui";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useGitHubStars(repo: string) {
  const [stars, setStars] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const cachedData: CachedStars = JSON.parse(cached);
          const now = Date.now();
          if (now - cachedData.timestamp < CACHE_DURATION) {
            setStars(cachedData.count);
            setIsLoading(false);
            return;
          }
        }

        // Extract owner and repo name from the full repo path
        const repoPath = repo.replace("https://github.com/", "");
        const response = await fetch(
          `https://api.github.com/repos/${repoPath}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (response.ok) {
          const data: GitHubRepoInfo = await response.json();
          const starCount = data.stargazers_count;
          setStars(starCount);
          
          // Cache the result
          const cacheData: CachedStars = {
            count: starCount,
            timestamp: Date.now(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
        // Try to use cached value even if expired
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const cachedData: CachedStars = JSON.parse(cached);
          setStars(cachedData.count);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStars();
  }, [repo]);

  return { stars, isLoading };
}

