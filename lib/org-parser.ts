import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { unified } from 'unified';
import uniorgParse from 'uniorg-parse';
import uniorg2rehype from 'uniorg-rehype';
import rehypeStringify from 'rehype-stringify';
import { codeToHtml } from 'shiki';

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  email: string;
  date: string;
  keywords: string;
  tags: string[];
  language: string;
  description: string;
  content: string;
  htmlContent: string;
}

const POSTS_DIRECTORY = join(process.cwd(), 'app', 'blog', 'posts');

/**
 * Extract metadata from org file content
 */
function extractMetadata(content: string): Partial<BlogPost> {
  const metadata: Partial<BlogPost> = {
    tags: [],
  };

  const lines = content.split('\n');

  for (const line of lines) {
    if (!line.startsWith('#+')) break;

    const match = line.match(/^#\+(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;

      switch (key) {
        case 'TITLE':
          metadata.title = value.trim();
          break;
        case 'AUTHOR':
          metadata.author = value.trim();
          break;
        case 'EMAIL':
          metadata.email = value.trim();
          break;
        case 'DATE':
          metadata.date = value.trim();
          break;
        case 'KEYWORDS':
          metadata.keywords = value.trim();
          break;
        case 'TAGS':
          metadata.tags = value.split(',').map(tag => tag.trim());
          break;
        case 'LANGUAGE':
          metadata.language = value.trim();
          break;
        case 'DESCRIPTION':
          metadata.description = value.trim();
          break;
      }
    }
  }

  return metadata;
}

/**
 * Generate slug from filename
 */
function generateSlug(filename: string): string {
  return filename
    .replace(/\.org$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Parse org file content to HTML with syntax highlighting
 */
async function parseOrgToHtml(content: string): Promise<string> {
  const processor = unified()
    .use(uniorgParse)
    .use(uniorg2rehype)
    .use(rehypeStringify);

  const result = await processor.process(content);
  let html = String(result);

  // Apply syntax highlighting to code blocks
  // This is a simple implementation - you might want to enhance this
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;

  const matches = [...html.matchAll(codeBlockRegex)];
  for (const match of matches) {
    const [fullMatch, lang, code] = match;
    try {
      const highlighted = await codeToHtml(code, {
        lang: lang || 'text',
        theme: 'github-dark',
      });
      html = html.replace(fullMatch, highlighted);
    } catch {
      // If highlighting fails, keep original code block
      console.warn(`Failed to highlight code block with language: ${lang}`);
    }
  }

  return html;
}

/**
 * Parse a single org file
 */
export async function parseOrgFile(filename: string): Promise<BlogPost> {
  const filePath = join(POSTS_DIRECTORY, filename);
  const fileContent = readFileSync(filePath, 'utf-8');

  const metadata = extractMetadata(fileContent);
  const htmlContent = await parseOrgToHtml(fileContent);

  return {
    slug: generateSlug(filename),
    title: metadata.title || 'Untitled',
    author: metadata.author || '',
    email: metadata.email || '',
    date: metadata.date || '',
    keywords: metadata.keywords || '',
    tags: metadata.tags || [],
    language: metadata.language || 'en',
    description: metadata.description || '',
    content: fileContent,
    htmlContent,
  };
}

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = readdirSync(POSTS_DIRECTORY);
    const orgFiles = files.filter(file => file.endsWith('.org'));

    const posts = await Promise.all(
      orgFiles.map(file => parseOrgFile(file))
    );

    // Sort by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch {
    // If directory doesn't exist yet, return empty array
    return [];
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();

  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}
