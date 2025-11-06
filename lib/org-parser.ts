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
 * Fix org-mode link syntax in footnotes that uniorg doesn't parse correctly
 */
function processFootnoteLinks(html: string): string {
  // Step 1: Capture leaked texts from main content after footnote references
  // Named footnotes leak pattern: <sup>N</sup>[Link Text]] full content] main content
  // We need to extract: Link Text and the full content between the first ]] and final ]
  const leakedTexts = new Map<string, {linkText: string, fullContent: string}>();

  // Pattern for named footnotes with full content leak
  html = html.replace(/<sup><a[^>]*id="fnr\.(\d+)"[^>]*>\d+<\/a><\/sup>\s*\[([^\]]+)\]\]\s*([^\]]*?)\]\s*/g,
    (match, footnoteNum, linkText, fullContent) => {
      const cleanLinkText = linkText.replace(/\s+/g, ' ').trim();
      const cleanFullContent = fullContent.replace(/\s+/g, ' ').trim();
      leakedTexts.set(footnoteNum, {
        linkText: cleanLinkText,
        fullContent: cleanFullContent
      });
      // Remove the leaked text, keep only the superscript
      return match.substring(0, match.indexOf('['));
    }
  );

  // Pattern for inline footnotes (simpler): <sup>N</sup>[Link Text]]]
  html = html.replace(/<sup><a[^>]*id="fnr\.(\d+)"[^>]*>\d+<\/a><\/sup>\s*\[([\s\S]+?)\]\]\]/g,
    (match, footnoteNum, linkText) => {
      if (!leakedTexts.has(footnoteNum)) {
        const cleanText = linkText.replace(/\s+/g, ' ').trim();
        leakedTexts.set(footnoteNum, {linkText: cleanText, fullContent: ''});
      }
      return match.substring(0, match.indexOf('['));
    }
  );

  // Step 2: Fix footnotes by replacing URL with link text and adding full content
  html = html.replace(/<div class="footnote-definition"><sup><a[^>]*id="fn\.(\d+)"[^>]*>(\d+)<\/a><\/sup><div class="footdef"[^>]*>\s*\[\[<a href="([^"]+)">([^<]+)<\/a>/g,
    (match, footnoteNum, displayNum, url, urlText) => {
      const leaked = leakedTexts.get(footnoteNum);
      if (leaked && leaked.fullContent) {
        // Named footnote with full content
        return `<div class="footnote-definition"><sup><a class="footnum" id="fn.${footnoteNum}" href="#fnr.${footnoteNum}" role="doc-backlink">${displayNum}</a></sup><div class="footdef" role="doc-footnote"><a href="${url}">${leaked.linkText}</a> ${leaked.fullContent}`;
      } else if (leaked && leaked.linkText) {
        // Inline footnote with just link text
        return `<div class="footnote-definition"><sup><a class="footnum" id="fn.${footnoteNum}" href="#fnr.${footnoteNum}" role="doc-backlink">${displayNum}</a></sup><div class="footdef" role="doc-footnote"><a href="${url}">${leaked.linkText}</a>`;
      }
      return match;
    }
  );

  // Step 3: Clean up any remaining orphaned brackets
  html = html.replace(/\[\[/g, '');
  html = html.replace(/\]\]\]/g, '');
  html = html.replace(/\]\]/g, '');

  return html;
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

  // Fix org-mode links in footnotes
  html = processFootnoteLinks(html);

  // Apply syntax highlighting to code blocks
  // uniorg produces: <pre class="src-block" data-language="LANG">CODE</pre>
  const srcBlockPattern = /<pre class="src-block"(?:\s+data-language="(\w+)")?\s*>([\s\S]*?)<\/pre>/g;

  const matches = [...html.matchAll(srcBlockPattern)];

  for (const match of matches) {
    const [fullMatch, lang, code] = match;

    try {
      // Decode HTML entities
      let decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      // Extract language from nested <code class="language-XXX"> tag
      let detectedLang = lang;
      const langMatch = decodedCode.match(/<code class="language-(\w+)">/);
      if (langMatch) {
        detectedLang = langMatch[1];
      }

      // Remove any nested <code> tags that might be in the content
      decodedCode = decodedCode.replace(/<\/?code[^>]*>/g, '').trim();

      const highlighted = await codeToHtml(decodedCode, {
        lang: detectedLang || 'text',
        theme: 'github-light',
      });

      html = html.replace(fullMatch, highlighted);
    } catch (error) {
      // If highlighting fails, keep original code block with background
      console.warn(`Failed to highlight code block with language: ${detectedLang || 'unknown'}`, error);
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
      // Extract just the date part (YYYY-MM-DD) from org-mode format
      const dateAMatch = a.date.match(/(\d{4}-\d{2}-\d{2})/);
      const dateBMatch = b.date.match(/(\d{4}-\d{2}-\d{2})/);

      const dateA = dateAMatch ? new Date(dateAMatch[1]) : new Date(0);
      const dateB = dateBMatch ? new Date(dateBMatch[1]) : new Date(0);

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
