import Link from "next/link";
import { getAllPosts } from "@/lib/org-parser";
import { formatDateSimple } from "@/lib/blog-utils";
import Header from "../components/Header";
import "./styles.css";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="blog-container">
      <Header title="Gnanesh's web logs" showAboutLink />

      {posts.length === 0 ? (
        <p>No logs yet.</p>
      ) : (
        <ul className="blog-list">
          {posts.map((post, index) => (
            <li key={post.slug} className={index % 2 === 0 ? 'even' : 'odd'}>
              <time dateTime={post.date}>
                {formatDateSimple(post.date)}
              </time>
              <Link href={`/blog/${post.slug}`}>
                <span className="blog-title">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
