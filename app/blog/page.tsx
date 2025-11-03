import Link from "next/link";
import { getAllPosts } from "@/lib/org-parser";
import { formatDateSimple } from "@/lib/blog-utils";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm hover:underline mb-4 inline-block">
          ← Back
        </Link>
        <h1 className="text-4xl font-medium mb-2">Logs</h1>
        <p className="text-sm text-foreground/60">
          Gnanesh&apos;s web logs
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-foreground/60">No logs yet.</p>
      ) : (
        <div className="divide-y divide-foreground/10">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`flex gap-4 py-3 px-3 -mx-3 hover:bg-foreground/5 transition-colors ${
                index % 2 === 1 ? 'bg-foreground/[0.02]' : ''
              }`}
            >
              <time
                dateTime={post.date}
                className="text-sm text-foreground/60 font-mono flex-shrink-0"
              >
                {formatDateSimple(post.date)}
              </time>
              <span className="text-sm text-foreground/80">
                {post.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
