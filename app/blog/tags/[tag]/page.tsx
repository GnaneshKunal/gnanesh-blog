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
    <div className="page-container">
      <div className="page-header">
        <Link href="/blog">← Back to Blog</Link>
        <h1>
          Posts tagged <span className="tag-highlight">#{tag}</span>
        </h1>
        <p className="timestamp">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="timestamp">No posts found with this tag.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <article key={post.slug} className="post-item">
              <Link href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
              </Link>

              <div className="post-meta">
                <time dateTime={post.date} className="timestamp">{formatDate(post.date)}</time>
                {post.tags.length > 1 && (
                  <>
                    <span>•</span>
                    <div className="post-tags">
                      {post.tags
                        .filter((t) => t !== tag)
                        .map((t) => (
                          <Link
                            key={t}
                            href={`/blog/tags/${getTagSlug(t)}`}
                          >
                            #{t}
                          </Link>
                        ))}
                    </div>
                  </>
                )}
              </div>

              {post.description && (
                <p className="post-excerpt">
                  {post.description}
                </p>
              )}

              {!post.description && (
                <p className="post-excerpt">
                  {createExcerpt(post.htmlContent)}
                </p>
              )}

              <Link href={`/blog/${post.slug}`} className="read-more">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
