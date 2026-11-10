/**
 * Blog SEO rules in one place: canonical URLs, indexability, sitemap dates and the
 * Article JSON-LD. Used by app/blog/*, app/sitemap-phase1.xml and app/sitemap.xml.
 *
 * Publishing a post = commit content/posts/<slug>.mdoc (Keystatic frontmatter:
 * title, displayTitle, description, publishedDate, optional updatedDate and image).
 * Everything else follows from the file:
 *   - URL          /blog/<slug> (the file name), statically generated at build time
 *   - <title>      displayTitle (falls back to title); meta description = description
 *   - <lastmod>    updatedDate if set, otherwise publishedDate (frontmatter is the only
 *                  source for posts; lib/data/lastModified.ts is not used for them)
 *   - index        a post is indexable and listed in the sitemap while it is younger
 *                  than POST_GRACE_DAYS, or once lib/data/indexAllowlist.ts lists it.
 *                  The weekly generator (scripts/seo-content-pipeline/index_allowlist.py)
 *                  reads the same frontmatter, keeps posts in for the same 56 days and
 *                  afterwards only if they earned the impressions threshold.
 */
import { isIndexable } from '@/lib/data/indexAllowlist';
import { lastModifiedFor } from '@/lib/data/lastModified';
import { BUSINESS_NAME } from '@/lib/utils';

export const SITE_URL = 'https://www.hprime-gym.com';
export const SITE_NAME = BUSINESS_NAME;
const LOGO_URL = `${SITE_URL}/logo-og.png`;
const DEFAULT_IMAGE_URL = `${SITE_URL}/logo-og.png`;

export const BLOG_PATH = '/blog';
export const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;

/** Mirror of GRACE_DAYS in scripts/seo-content-pipeline/index_allowlist.py. */
export const POST_GRACE_DAYS = 56;

export interface PostDates {
  publishedDate: string | null;
  updatedDate?: string | null;
}

export function postPath(slug: string): string {
  return `${BLOG_PATH}/${slug}`;
}

export function postUrl(slug: string): string {
  return `${SITE_URL}${postPath(slug)}`;
}

/** Visible and <title> headline: displayTitle, else the Keystatic title field. */
export function postHeadline(entry: { displayTitle?: string | null; title: string }): string {
  return (entry.displayTitle || entry.title).trim();
}

/** Date of the last material change: updatedDate when newer, otherwise publishedDate. */
export function postLastModified(entry: PostDates): string | null {
  const { publishedDate, updatedDate } = entry;
  if (updatedDate && (!publishedDate || updatedDate > publishedDate)) return updatedDate;
  return publishedDate ?? null;
}

/**
 * True while the post is inside its 56-day grace (published < POST_GRACE_DAYS days
 * before the build) or when the generated allowlist keeps it. Evaluated at build
 * time; the allowlist commit that drops a post after day 56 triggers the rebuild.
 */
export function isPostIndexable(slug: string, publishedDate: string | null, now = new Date()): boolean {
  if (isIndexable(postPath(slug))) return true;
  if (!publishedDate) return false;
  const published = Date.parse(`${publishedDate}T00:00:00Z`);
  if (Number.isNaN(published)) return false;
  const ageDays = Math.floor((now.getTime() - published) / 86_400_000);
  return ageDays < POST_GRACE_DAYS;
}

export function isBlogIndexIndexable(): boolean {
  return isIndexable(BLOG_PATH);
}

export function robotsFor(indexable: boolean) {
  return { index: indexable, follow: true };
}

/** Absolute URL for a post image (Keystatic stores /images/blog/...). */
export function postImageUrl(image: string | null | undefined): string {
  if (!image) return DEFAULT_IMAGE_URL;
  if (/^https?:\/\//.test(image)) return image;
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

interface SitemapPost {
  slug: string;
  entry: PostDates;
}

/** Newest post date, or the /blog page's own date when there are no posts. */
export function blogIndexLastModified(posts: SitemapPost[]): string {
  return posts.reduce((latest, p) => {
    const d = postLastModified(p.entry);
    return d && d > latest ? d : latest;
  }, lastModifiedFor(BLOG_PATH));
}

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

/** /blog plus every indexable post, with real dates. */
export function blogSitemapEntries(posts: SitemapPost[], now = new Date()): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  if (isBlogIndexIndexable()) {
    entries.push({ url: BLOG_URL, lastmod: blogIndexLastModified(posts), changefreq: 'weekly', priority: 0.6 });
  }
  for (const post of posts) {
    if (!isPostIndexable(post.slug, post.entry.publishedDate, now)) continue;
    const lastmod = postLastModified(post.entry);
    if (!lastmod) continue;
    entries.push({ url: postUrl(post.slug), lastmod, changefreq: 'monthly', priority: 0.6 });
  }
  return entries;
}

/** schema.org Article for one post; author and publisher are the business itself. */
export function articleSchema(args: {
  slug: string;
  headline: string;
  description: string;
  publishedDate: string | null;
  updatedDate?: string | null;
  image?: string | null;
}) {
  const url = postUrl(args.slug);
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    image: [postImageUrl(args.image)],
    datePublished: args.publishedDate ?? undefined,
    dateModified: postLastModified(args) ?? undefined,
    author: organization,
    publisher: {
      ...organization,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };
}
