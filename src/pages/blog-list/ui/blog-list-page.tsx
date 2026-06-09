import { SiteHeader } from "../../../widgets/site-header";
import { SiteFooter } from "../../../widgets/site-footer";
import { POSTS } from "../../../entities/blog-post/model/posts.gen";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function BlogListPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-w3-gray-100 text-w3-gray-900 antialiased">
      <SiteHeader currentSection="landing" />
      <main className="flex-1 px-20 py-16">
        <header className="mx-auto max-w-3xl">
          <div className="font-mono text-[11px] text-w3-gray-500">BLOG</div>
          <h1 className="mt-2 text-[44px] font-medium leading-tight tracking-[-0.03em]">
            Updates from w3-kit.
          </h1>
          <p className="mt-3 max-w-prose text-w3-gray-600">
            Short notes on what we are shipping, in public. Changelogs when we cut a release.
          </p>
        </header>

        <section className="mx-auto mt-12 max-w-3xl">
          <ul className="space-y-4">
            {POSTS.map((post) => (
              <li key={post.slug}>
                <a
                  href={`/blog/${post.slug}`}
                  className="block rounded-xl border border-w3-border-subtle p-5 transition-colors hover:border-w3-accent"
                >
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
                  <h2 className="mt-2 text-xl font-medium tracking-[-0.02em]">{post.title}</h2>
                  <p className="mt-2 text-[14px] text-w3-gray-600">{post.summary}</p>
                  {post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
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
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
