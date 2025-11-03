import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="max-w-2xl w-full space-y-8">
        {/* Name */}
        <h1 className="text-4xl font-medium">Gnanesh</h1>

        {/* Social Links */}
        <div className="flex gap-4 text-sm">
          <Link
            href="/resume"
            className="hover:underline"
          >
            Resume
          </Link>
          <Link
            href="/blog"
            className="hover:underline"
          >
            Blog
          </Link>
          <a
            href="https://x.com/GnaneshKunal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/gnanesh-kunal/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/gnaneshkunal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="mailto:gnaneshkunal@outlook.com"
            className="hover:underline"
          >
            Email
          </a>
        </div>

        {/* About */}
        <section className="space-y-4 text-sm leading-relaxed">
          <p className="text-foreground/80">
            I&apos;m a Senior Software Engineer at Setu, working on mission-critical payment infrastructure and distributed systems with a focus on low latency and high reliability. I also work part-time at Redis, where I contribute to OSS and build developer tools. Previously at Vital (worked on reverse engineering APIs) and HashedIn Technologies.
          </p>

          <p className="text-foreground/80">
            I&apos;m a language agnostic engineer with experience understanding requirements and taking ownership of designing, building, and maintaining solutions.
          </p>

          <p className="text-foreground/80">
            In my free time, I read novels and contribute to open source. I&apos;m currently interested in distributed systems, databases, Linux, AI, data engineering, fintech, Emacs, and fitness.
          </p>

          <p className="text-foreground/80">
            I live in India.
          </p>

          <p className="text-foreground/80">
            Reach out via{" "}
            <a href="mailto:gnaneshkunal@outlook.com" className="hover:underline">
              email
            </a>
            {" "}or{" "}
            <a
              href="https://x.com/GnaneshKunal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Twitter
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
