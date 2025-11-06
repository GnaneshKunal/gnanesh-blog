import Link from "next/link";
import { getAllPosts } from "@/lib/org-parser";
import { formatDateSimple } from "@/lib/blog-utils";
import "./styles.css";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="blog-container">
      <div className="blog-header">
        <Link href="/" className="back-link">← Back</Link>
        <h1>Gnanesh&apos;s web logs</h1>
      </div>

      {posts.length === 0 ? (
        <p>No logs yet.</p>
      ) : (
        <div className="blog-list">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`blog-item ${index % 2 === 0 ? 'even' : 'odd'}`}
            >
              <time dateTime={post.date}>
                {formatDateSimple(post.date)}
              </time>
              <span className="blog-title">{post.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
