import Link from "next/link";
import { getAllPosts } from "@/lib/org-parser";
import { formatDateSimple } from "@/lib/blog-utils";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div>
        <Link href="/">← Back</Link>
        <h1>Logs</h1>
        <p>Gnanesh&apos;s web logs</p>
      </div>

      {posts.length === 0 ? (
        <p>No logs yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
            >
              <time dateTime={post.date}>
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
