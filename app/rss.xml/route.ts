import { Feed } from "feed";
import { getAllPosts } from "@/lib/org-parser";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();

  const feed = new Feed({
    title: "Gnanesh's Blog",
    description: "Thoughts on software, systems, and engineering",
    id: "https://gnane.sh/",
    link: "https://gnane.sh/",
    language: "en",
    favicon: "https://gnane.sh/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Gnanesh Kunal`,
    author: {
      name: "Gnanesh Kunal",
      email: "gnaneshkunal@outlook.com",
      link: "https://gnane.sh",
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://gnane.sh/blog/${post.slug}`,
      link: `https://gnane.sh/blog/${post.slug}`,
      description: post.description,
      content: post.htmlContent,
      author: [
        {
          name: post.author || "Gnanesh Kunal",
          email: post.email || "gnaneshkunal@outlook.com",
        },
      ],
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
