import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/org-parser";
import { formatDate, createExcerpt, getTagSlug } from "@/lib/blog-utils";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm hover:underline mb-4 inline-block">
          ← Back
        </Link>
        <h1 className="text-4xl font-medium mb-2">Blog</h1>
        <p className="text-sm text-foreground/60">
          Thoughts on software, systems, and engineering
        </p>
      </div>

      {tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-medium mb-3 text-foreground/60">
            Filter by tag:
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${getTagSlug(tag)}`}
                className="text-xs px-3 py-1 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-sm text-foreground/60">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-foreground/10 pb-8 last:border-0">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-medium mb-2 group-hover:text-foreground/70 transition-colors">
                  {post.title}
                </h2>
              </Link>

              <div className="flex items-center gap-3 text-xs text-foreground/60 mb-3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tags/${getTagSlug(tag)}`}
                          className="hover:underline"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {post.description && (
                <p className="text-sm text-foreground/80 mb-3">
                  {post.description}
                </p>
              )}

              {!post.description && (
                <p className="text-sm text-foreground/80 mb-3">
                  {createExcerpt(post.htmlContent)}
                </p>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="text-sm hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
