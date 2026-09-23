import Link from 'next/link';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import type { ServiceContent } from '@/lib/data/serviceContent';
import { brands } from '@/lib/data/brands';
import { PHONE_NUMBER, PHONE_DISPLAY } from '@/lib/utils';

interface Props {
  content: ServiceContent;
  /** equipment photo reused from the generic template */
  image?: string;
  /** brand slugs that make this equipment, for the brand links */
  brandSlugs: string[];
}

// Short labels for the in-page navigation, keyed by section id.
const NAV_LABELS: Record<string, string> = {
  symptoms: 'Symptoms',
  codes: 'Error codes',
  'before-you-call': 'Before you call',
  'repair-or-replace': 'Repair or replace',
  warranty: 'Warranty',
  brands: 'By brand',
  denver: 'Denver specifics',
  commercial: 'Gyms & facilities',
};

/**
 * Deep service page: written against the real Search Console queries for this
 * equipment type. Every other service keeps the generic template in
 * app/services/[appliance]/page.tsx.
 */
export default function ServiceDeepPage({ content, image, brandSlugs }: Props) {
  const linkedBrands = brands.filter((b) => brandSlugs.includes(b.slug));

  return (
    <>
      <Hero title={content.h1} subtitle={content.subtitle} applianceImage={image} />

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-gray-700 space-y-4">
            {content.intro.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed">{p}</p>
            ))}
          </div>

          {/* In-page navigation */}
          <nav aria-label="On this page" className="max-w-3xl mx-auto mt-8 flex flex-wrap gap-2">
            {content.sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition"
              >
                {NAV_LABELS[s.id] ?? s.heading}
              </a>
            ))}
            <a
              href="#faq"
              className="text-sm px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition"
            >
              FAQ
            </a>
          </nav>
        </div>
      </section>

      {/* Sections */}
      {content.sections.map((s, idx) => (
        <section
          key={s.id}
          id={s.id}
          className={`py-12 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} scroll-mt-24`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">{s.heading}</h2>
              <div className="text-gray-700 space-y-4">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="text-base md:text-lg leading-relaxed">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="space-y-3 pl-5 list-disc marker:text-[#1B2A4A]">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="text-base md:text-lg leading-relaxed">{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Brands that make this equipment */}
      {linkedBrands.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              {content.name} brands we repair
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {linkedBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}-repair`}
                  prefetch={false}
                  className="bg-gray-50 p-5 rounded-lg hover:shadow-lg transition text-center border border-gray-200"
                >
                  <span className="font-semibold text-gray-900">{b.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews come straight from the profile: the component owns its own data */}
      <Reviews />

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.name} repair in Denver: common questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {content.faqs.map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900 hover:text-blue-600 transition">
                  {faq.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#1B2A4A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Book {content.name.toLowerCase()} repair in the Denver Metro area
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Tell us the make, the model number and what it is doing. You get a diagnosis and a price
            before any work starts.
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-block bg-white text-[#1B2A4A] font-bold text-lg px-8 py-4 rounded-full hover:opacity-90 transition"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </>
  );
}
