import { config, fields, collection } from '@keystatic/core';

// Separate config for READER ONLY - reads from Git files
export default config({
  storage: {
    kind: 'local',  // Always read from Git files on production
  },
  
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title (URL Slug)' } }),
        displayTitle: fields.text({
          label: 'Article Title (Display)',
          validation: { isRequired: false }, // Optional for backward compatibility
        }),
        description: fields.text({
          label: 'Meta Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        // Required: the sitemap <lastmod>, the Article JSON-LD and the 56-day index
        // grace (lib/blog.ts, scripts/seo-content-pipeline/index_allowlist.py) read it.
        publishedDate: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        // Optional: set when the body is materially rewritten. Feeds dateModified and
        // the sitemap <lastmod>; publishedDate stays the original publication day.
        updatedDate: fields.date({
          label: 'Updated Date (optional)',
        }),
        author: fields.text({ 
          label: 'Author', 
          defaultValue: 'H-Prime Gym Equipment Repair',
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});
