/**
 * Real "last significant change" dates for the sitemaps.
 *
 * Until 2026-10-06 every <lastmod> carried the request time, and Google ignores a
 * lastmod that is always "now". The dates below are the day a page's content actually
 * changed. TEMPLATE_LAST_MODIFIED is the last change that touched every page
 * (2026-09-20: real reviews, live rating, unverified claims removed). Bump it only for a site-wide content change, not for footer or
 * metadata tweaks; add a page here when its body is rewritten.
 */
export const TEMPLATE_LAST_MODIFIED = '2026-09-20';

const PAGE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-09-28',
  '/services/treadmill-repair': '2026-09-23',
  '/services/elliptical-repair': '2026-09-23',
  '/services/spin-bike-repair': '2026-09-28',
};

/** Date for one pathname: the page's own rewrite date if it is newer than the template. */
export function lastModifiedFor(pathname: string): string {
  const key = pathname.replace(/\/+$/, '') || '/';
  const page = PAGE_LAST_MODIFIED[key];
  return page && page > TEMPLATE_LAST_MODIFIED ? page : TEMPLATE_LAST_MODIFIED;
}

/** Newest date across the site, used by the sitemap index. */
export function latestLastModified(): string {
  return Object.values(PAGE_LAST_MODIFIED).reduce(
    (latest, d) => (d > latest ? d : latest),
    TEMPLATE_LAST_MODIFIED
  );
}
