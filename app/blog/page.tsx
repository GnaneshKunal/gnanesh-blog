import Link from "next/link";
import { getAllPosts } from "@/lib/org-parser";
import { formatDateSimple } from "@/lib/blog-utils";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="page-container">
      <div className="page-header">
        <Link href="/">← Back</Link>
        <h1>Logs</h1>
        <p className="timestamp">Gnanesh&apos;s web logs</p>
      </div>

      {posts.length === 0 ? (
        <p className="timestamp">No logs yet.</p>
      ) : (
        <div className="blog-list">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-list-item"
            >
              <time dateTime={post.date} className="timestamp">
                {formatDateSimple(post.date)}
              </time>
              <span>{post.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
