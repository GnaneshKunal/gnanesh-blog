import Link from "next/link";

interface HeaderProps {
  title?: string;
  showAboutLink?: boolean;
}

export default function Header({ title, showAboutLink = false }: HeaderProps) {
  return (
    <header>
      {title && <h1>{title}</h1>}

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
        {showAboutLink && <Link href="/">About</Link>}
      </nav>
    </header>
  );
}
