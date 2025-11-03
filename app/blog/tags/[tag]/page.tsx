import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/org-parser";
import { formatDate, createExcerpt, getTagSlug } from "@/lib/blog-utils";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: getTagSlug(tag),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const allTags = await getAllTags();
  const tag = allTags.find((t) => getTagSlug(t) === tagSlug);

  if (!tag) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `Posts tagged "${tag}" - Gnanesh`,
    description: `All blog posts tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const allTags = await getAllTags();
  const tag = allTags.find((t) => getTagSlug(t) === tagSlug);

  if (!tag) {
    notFound();
  }

  const posts = await getPostsByTag(tag);

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/blog" className="text-sm hover:underline mb-4 inline-block">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl font-medium mb-2">
          Posts tagged <span className="text-foreground/70">#{tag}</span>
        </h1>
        <p className="text-sm text-foreground/60">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-foreground/60">No posts found with this tag.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-foreground/10 pb-8 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-medium mb-2 group-hover:text-foreground/70 transition-colors">
                  {post.title}
                </h2>
              </Link>

              <div className="flex items-center gap-3 text-xs text-foreground/60 mb-3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.tags.length > 1 && (
                  <>
                    <span>•</span>
                    <div className="flex gap-2">
                      {post.tags
                        .filter((t) => t !== tag)
                        .map((t) => (
                          <Link
                            key={t}
                            href={`/blog/tags/${getTagSlug(t)}`}
                            className="hover:underline"
                          >
                            #{t}
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
