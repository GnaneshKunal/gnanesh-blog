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
    <div className="page-container">
      <div className="page-header">
        <Link href="/blog">← Back to Logs</Link>
        <h1>{post.title}</h1>
        <div className="timestamp">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>

      <article
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />

      <div className="page-footer">
        <Link href="/blog">← Back to Logs</Link>
      </div>
    </div>
  );
}
