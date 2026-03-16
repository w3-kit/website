import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationItem {
  title: string;
  href: string;
}

interface DocNavigationProps {
  prev?: NavigationItem;
  next?: NavigationItem;
}

export function DocNavigation({ prev, next }: DocNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-16 border-t border-border pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground/50 group-hover:text-muted-foreground" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Previous</span>
            <span className="text-base font-semibold">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div></div>
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-3 text-right text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">Next</span>
            <span className="text-base font-semibold">{next.title}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-muted-foreground" />
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
