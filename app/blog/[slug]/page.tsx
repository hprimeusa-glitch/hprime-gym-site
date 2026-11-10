import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/keystatic';
import {
  SITE_NAME,
  articleSchema,
  isPostIndexable,
  postHeadline,
  postImageUrl,
  postLastModified,
  postUrl,
  robotsFor,
} from '@/lib/blog';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MarkdocRenderer } from '@/components/MarkdocRenderer';

type PageProps = { params: Promise<{ slug: string }> };

// Every post is generated at build time from content/posts/*.mdoc; an unknown slug
// is a 404 instead of a runtime file read (Vercel functions do not ship content/).
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found', robots: { index: false, follow: true } };

  const title = postHeadline(post);
  const description = post.description;
  const url = postUrl(slug);
  const image = postImageUrl(post.image);
  const modified = postLastModified(post);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'en_US',
      siteName: SITE_NAME,
      publishedTime: post.publishedDate ?? undefined,
      modifiedTime: modified ?? undefined,
      authors: [SITE_NAME],
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: robotsFor(isPostIndexable(slug, post.publishedDate)),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { description, publishedDate, updatedDate, author, image, content } = post;
  const articleTitle = postHeadline(post);
  const schema = articleSchema({ slug, headline: articleTitle, description, publishedDate, updatedDate, image });

  // Get Markdoc node from content
  const { node } = await content();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Back Button */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <article className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {image && (
              <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden mb-8">
                <Image
                  src={image}
                  alt={articleTitle}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {articleTitle}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              {publishedDate && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <time dateTime={publishedDate}>
                    {new Date(`${publishedDate}T00:00:00Z`).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                </span>
              )}
              {author && (
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  {author}
                </span>
              )}
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-orange-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-img:rounded-lg prose-img:shadow-md"
            >
              <MarkdocRenderer node={node} />
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Professional Gym Equipment Repair?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Our expert technicians are ready to help. Same-day service available in Colorado.
            </p>
            <a
              href="tel:+17207066650"
              className="inline-block text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition cursor-pointer"
              style={{ backgroundColor: '#1B2A4A' }}
            >
              Call (720) 706-6650
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
