import { createReader } from '@keystatic/core/reader';
import readerConfig from '../keystatic.reader.config';

// Keystatic reader in LOCAL mode: reads content/posts/*.mdoc from the repo checkout.
// (The admin UI uses Cloud mode from keystatic.config.tsx.)
//
// Every blog route reads posts at BUILD time only: /blog and /blog/[slug] are
// statically generated (generateStaticParams) and the sitemap routes are
// force-static. Nothing reads content/posts at request time, so the files never
// need to be traced into a serverless function on Vercel.
export const reader = createReader(process.cwd(), readerConfig);

/**
 * All blog posts, newest first. Errors are not swallowed on purpose: a malformed
 * post (e.g. no publishedDate) fails `next build` instead of silently vanishing
 * from the blog, the sitemap and the index.
 */
export async function getAllPosts() {
  const posts = await reader.collections.posts.all();
  return posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA || a.slug.localeCompare(b.slug);
  });
}

/** One post by slug, or null when no such file exists. */
export async function getPostBySlug(slug: string) {
  return reader.collections.posts.read(slug);
}
