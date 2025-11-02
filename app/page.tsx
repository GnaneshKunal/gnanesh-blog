export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="max-w-2xl w-full space-y-8">
        {/* Name */}
        <h1 className="text-4xl font-medium">Gnanesh</h1>

        {/* Social Links */}
        <div className="flex gap-4 text-sm">
          <a
            href="/resume"
            className="hover:underline"
          >
            Resume
          </a>
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
            Language agnostic engineer skilled at software development with experience of
            understanding the requirements and tackling ownership of designing, building
            and maintaining the solutions.
          </p>

          <p className="text-foreground/80">
            In my free time, I read novels and contribute to OSS. I'm currently interested
            in Distributed systems, databases, BSDs.
          </p>

          <p className="text-foreground/80">
            I live in India and work as a Software Engineer.
          </p>

          <div>
            <h2 className="font-medium mb-2">Contact</h2>
            <p className="text-foreground/80 mb-2">
              You can contact me via any of the following means:
            </p>
            <ul className="space-y-1 text-foreground/80">
              <li>
                <a href="mailto:gnaneshkunal@outlook.com" className="hover:underline">
                  E-mail
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/GnaneshKunal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-foreground/80 mb-2">
              My PGP key is published at{" "}
              <a
                href="https://key.pub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                key.pub
              </a>
              .
            </p>
            <p className="text-foreground/80 font-mono text-xs">
              The key fingerprint is 3A9D 3599 1D7F 5F65 B0AE 596F 80CA 7AE9 4058 3689
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
