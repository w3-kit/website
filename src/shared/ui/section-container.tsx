import type { ReactNode, ElementType, HTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Full-width background wrapper class (applied to outer div) */
  wrapperClassName?: string;
}

export function SectionContainer({
  as: Tag = "section",
  children,
  className,
  wrapperClassName,
  ...props
}: SectionContainerProps) {
  const content = (
    <Tag
      className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-8 lg:px-16", className)}
      {...props}
    >
      {children}
    </Tag>
  );

  if (wrapperClassName) {
    return <div className={wrapperClassName}>{content}</div>;
  }

  return content;
}
