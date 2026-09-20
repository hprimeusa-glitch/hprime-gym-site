/**
 * SITEMAP INDEX
 *
 * Hand-written on purpose: `app/sitemap.ts` always renders a <urlset>, so the three child
 * sitemaps were being declared as ordinary pages instead of as an index.
 * See Docs/Dev/guide-nextjs-sitemap-robots.md.
 */
const BASE_URL = 'https://www.hprime-gym.com';
const PHASES = ['sitemap-phase1.xml', 'sitemap-phase2.xml', 'sitemap-phase3.xml'];

export async function GET() {
  const now = new Date().toISOString();

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
