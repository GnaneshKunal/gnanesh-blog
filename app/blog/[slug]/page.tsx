import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/org-parser";
import { formatDate } from "@/lib/blog-utils";

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
          ← Back to Logs
        </Link>

        <h1 className="mb-3">{post.title}</h1>

        <div className="text-sm text-foreground/60 mb-6">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>

      <article
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />

      <div className="mt-12 pt-8 border-t border-foreground/10">
        <Link href="/blog" className="text-sm hover:underline">
          ← Back to Logs
        </Link>
      </div>
    </div>
  );
}
