import Header from "./components/Header";

export default function Home() {
  return (
    <div className="home-container">
      <main>
        <Header title="Gnanesh" />

        <section>
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
