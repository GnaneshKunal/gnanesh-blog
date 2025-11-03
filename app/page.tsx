import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <main className="home-main">
        <h1>Gnanesh</h1>

        <nav className="home-nav">
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
        </nav>

        <section className="home-about">
          <p>
            I&apos;m a Senior Software Engineer at Setu, working on mission-critical payment infrastructure and distributed systems with a focus on low latency and high reliability. I also work part-time at Redis, where I contribute to OSS and build developer tools. Previously at Vital (worked on reverse engineering APIs) and HashedIn Technologies.
          </p>

          <p>
            I&apos;m a language agnostic engineer with experience understanding requirements and taking ownership of designing, building, and maintaining solutions.
          </p>

          <p>
            In my free time, I read novels and contribute to open source. I&apos;m currently interested in distributed systems, databases, Linux, AI, data engineering, fintech, Emacs, and fitness.
          </p>

          <p>
            I live in India.
          </p>

          <p>
            Reach out via{" "}
            <a href="mailto:gnaneshkunal@outlook.com">email</a>
            {" "}or{" "}
            <a
              href="https://x.com/GnaneshKunal"
              target="_blank"
              rel="noopener noreferrer"
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
