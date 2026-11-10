/**
 * SITEMAP INDEX
 *
 * Hand-written on purpose: `app/sitemap.ts` always renders a <urlset>, so the three child
 * sitemaps were being declared as ordinary pages instead of as an index.
 * See Docs/Dev/guide-nextjs-sitemap-robots.md.
 */
import { latestLastModified } from '@/lib/data/lastModified';
import { getAllPosts } from '@/lib/keystatic';
import { blogIndexLastModified } from '@/lib/blog';

const BASE_URL = 'https://www.hprime-gym.com';
const PHASES = ['sitemap-phase1.xml', 'sitemap-phase2.xml', 'sitemap-phase3.xml'];

// Built once at deploy time (blog dates are read from content/posts at build time).
export const dynamic = 'force-static';

export async function GET() {
  // Real dates: lib/data/lastModified.ts for pages, frontmatter for blog posts.
  const pages = latestLastModified();
  const blog = blogIndexLastModified(await getAllPosts());
  const now = blog > pages ? blog : pages;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PHASES.map(
  (phase) => `  <sitemap>
    <loc>${BASE_URL}/${phase}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
