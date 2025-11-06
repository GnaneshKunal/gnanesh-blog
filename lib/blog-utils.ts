/**
 * Format a date string to org-mode format: <2021-06-24 Thu>
 */
export function formatDate(dateString: string): string {
  try {
    // Handle org-mode date format: "2018-05-13 Mon"
    const dateMatch = dateString.match(/(\d{4}-\d{2}-\d{2})\s*(\w+)?/);
    if (!dateMatch) return dateString;

    const datePart = dateMatch[1];
    const dayOfWeek = dateMatch[2];

    if (dayOfWeek) {
      return `<${datePart} ${dayOfWeek}>`;
    }

    // If no day of week provided, calculate it
    const date = new Date(datePart);
    const dow = date.toLocaleDateString('en-US', { weekday: 'short' });
    return `<${datePart} ${dow}>`;
  } catch {
    return dateString;
  }
}

/**
 * Format date as yyyy-mm-dd
 */
export function formatDateSimple(dateString: string): string {
  try {
    // Handle org-mode date format: "2018-05-13 Mon"
    const dateMatch = dateString.match(/(\d{4}-\d{2}-\d{2})/);
    if (!dateMatch) return dateString;
    return dateMatch[1];
  } catch {
    return dateString;
  }
}

/**
 * Create an excerpt from HTML content
 */
export function createExcerpt(html: string, maxLength: number = 200): string {
  // Strip HTML tags
  const text = html.replace(/<[^>]*>/g, '');

  // Get first N characters
  if (text.length <= maxLength) return text;

  // Find the last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generate tag slug for URLs
 */
export function getTagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
