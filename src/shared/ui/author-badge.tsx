interface AuthorBadgeProps {
  author: string;
  prefix?: string;
  className?: string;
}

export function AuthorBadge({ author, prefix, className }: AuthorBadgeProps) {
  if (!author) return null;

  return (
    <a
      href={`https://github.com/${author}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-w3-small text-w3-ink-soft transition-colors hover:text-w3-ink ${className ?? ""}`}
    >
      <img
        src={`https://github.com/${author}.png?size=40`}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 rounded-full"
      />
      {prefix && `${prefix} `}
      {author}
    </a>
  );
}
