import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/org-parser";
import { formatDate, getTagSlug } from "@/lib/blog-utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Gnanesh`,
    description: post.description || `Blog post: ${post.title}`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/blog" className="text-sm hover:underline mb-4 inline-block">
          ← Back to Blog
        </Link>

        <h1 className="text-4xl font-medium mb-3">{post.title}</h1>

        <div className="flex flex-col gap-2 text-sm text-foreground/60 mb-6">
          <div className="flex items-center gap-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.author && (
              <>
                <span>•</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${getTagSlug(tag)}`}
                  className="text-xs px-3 py-1 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <article
        className="prose prose-sm max-w-none
          prose-headings:font-medium
          prose-h1:text-3xl prose-h1:mb-4
          prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8
          prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-a:text-foreground prose-a:underline prose-a:hover:text-foreground/70
          prose-code:text-sm prose-code:bg-foreground/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-foreground/10
          prose-ul:list-disc prose-ul:pl-6
          prose-ol:list-decimal prose-ol:pl-6
          prose-li:text-foreground/80
          prose-strong:font-medium prose-strong:text-foreground
          prose-blockquote:border-l-4 prose-blockquote:border-foreground/20 prose-blockquote:pl-4 prose-blockquote:italic"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />

      <div className="mt-12 pt-8 border-t border-foreground/10">
        <Link href="/blog" className="text-sm hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}
