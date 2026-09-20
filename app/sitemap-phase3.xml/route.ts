import { MetadataRoute } from 'next';
import { isIndexable } from '@/lib/data/indexAllowlist';
import { appliances } from '@/lib/data/appliances';
import { brands } from '@/lib/data/brands';
import { checkBrandApplianceMatch } from '@/lib/data/serviceBrands';

/**
 * PHASE 3 SITEMAP
 * Brand+Service combos, only pairs the brand actually manufactures
 * (filtered via serviceBrands mapping — no thin Peloton-weight-machine-style pages)
 */
export async function GET() {
  const baseUrl = 'https://www.hprime-gym.com';
  const now = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = brands.flatMap((brand) =>
    appliances
      .filter((appliance) => checkBrandApplianceMatch(brand.slug, appliance.slug))
      .map((appliance) => ({
        url: `${baseUrl}/brands/${brand.slug}-repair/services/${appliance.slug}-repair`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  );

  // Only allowlisted pages are declared. Everything else renders `noindex, follow`;
  // regenerate with Clients/H-Prime/SEO/build-index-allowlist.py.
  const indexable = routes.filter((route) =>
    isIndexable(new URL(route.url as string).pathname)
  );

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
