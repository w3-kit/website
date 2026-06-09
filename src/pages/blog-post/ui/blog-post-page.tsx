import { useParams } from "@tanstack/react-router";
import { SiteHeader } from "../../../widgets/site-header";
import { SiteFooter } from "../../../widgets/site-footer";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { POSTS } from "../../../entities/blog-post/model/posts.gen";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function BlogPostPage() {
  const params = useParams({ strict: false }) as { slug?: string };
  const slug = params.slug ?? "";
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-w3-gray-100 text-w3-gray-900 antialiased">
        <SiteHeader currentSection="landing" />
        <main className="flex-1 px-20 py-16">
          <div className="mx-auto max-w-3xl">
            <a href="/blog" className="font-mono text-[12px] text-w3-gray-500 hover:text-w3-accent">
              ← Back to blog
            </a>
            <h1 className="mt-4 text-2xl font-medium">Post not found</h1>
            <p className="mt-2 text-w3-gray-600">No post with slug {slug}.</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-w3-gray-100 text-w3-gray-900 antialiased">
      <SiteHeader currentSection="landing" />
      <main className="flex-1 px-20 py-16">
        <div className="mx-auto max-w-3xl">
          <a href="/blog" className="font-mono text-[12px] text-w3-gray-500 hover:text-w3-accent">
            ← Back to blog
          </a>

          <header className="mt-6">
            <div className="flex items-center gap-3 font-mono text-[11px] text-w3-gray-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span
                className={`rounded-full px-2 py-[2px] uppercase tracking-[0.06em] ${
                  post.kind === "changelog"
                    ? "bg-w3-accent-wash text-w3-accent"
                    : "bg-w3-surface-alt text-w3-gray-600"
                }`}
              >
                {post.kind}
              </span>
            </div>
            <h1 className="mt-3 text-[40px] font-medium leading-tight tracking-[-0.03em]">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-w3-surface-alt px-2 py-[2px] font-mono text-[10px] text-w3-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <article className="mt-10">
            <MarkdownRenderer content={post.content} />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
