import Link from "next/link";
import { getAllPosts } from "@/lib/org-parser";
import { formatDateSimple } from "@/lib/blog-utils";
import "./styles.css";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="blog-container">
      <header>
        <h1>Gnanesh&apos;s web logs</h1>

        <nav>
          <Link href="/resume">Resume</Link>
          <Link href="/blog">Logs</Link>
          <a
            href="https://x.com/GnaneshKunal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/gnanesh-kunal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/gnaneshkunal"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:gnaneshkunal@outlook.com">Email</a>
          <Link href="/">About</Link>
        </nav>
      </header>

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
