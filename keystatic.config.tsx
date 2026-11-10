import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'h-prime/h-prime-site',
  },
  
  collections: {
    // Blog posts for SEO
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title (URL Slug)' } }),
        displayTitle: fields.text({
          label: 'Article Title (Display)',
          validation: { isRequired: true },
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

