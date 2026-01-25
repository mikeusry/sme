/**
 * Blog Data Utilities
 *
 * Functions for working with Soul Miner's Eden blog posts
 */

import blogData from '../../../content/blog/crawled-posts.json';

export interface BlogPost {
  url: string;
  slug: string;
  title: string;
  description: string | null;
  content: string;
}

// Type-safe blog data
const posts = blogData as BlogPost[];

/**
 * Get all blog posts
 */
export function getAllPosts(): BlogPost[] {
  return posts;
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

/**
 * Get excerpt from content (first ~200 characters)
 */
export function getExcerpt(content: string, maxLength: number = 200): string {
  // Remove the title (first line) and get body content
  const lines = content.split('\n').filter(line => line.trim());
  const body = lines.slice(1).join(' ').trim();

  if (body.length <= maxLength) return body;
  return body.substring(0, maxLength).trim() + '...';
}

/**
 * Get reading time estimate
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Parse content into paragraphs
 */
export function parseContent(content: string): string[] {
  // Split by double newlines or single newlines for paragraphs
  return content
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
}
