import Link from 'next/link';
import type { ReactNode } from 'react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { Metadata } from 'next';
import { PhoneCall, AlertTriangle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER, SERVICE_CALL_FEE } from '@/lib/utils';
import { generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo/schema';
import { brands } from '@/lib/data/brands';
import {
  commercialIntro,
  commercialSections,
  maintenanceRows,
  commercialBrandSlugs,
  commercialEquipment,
  commercialFaqs,
} from '@/lib/data/commercialContent';

export const metadata: Metadata = {
  title: 'Commercial Gym Equipment Repair in Denver | H-Prime',
  description:
    'Commercial gym equipment repair and preventive maintenance in Denver Metro for gyms, HOA and apartment fitness rooms, hotels, offices and campuses. Life Fitness, Precor, Matrix and more.',
  alternates: { canonical: 'https://www.hprime-gym.com/commercial' },
};

const commercialBrands = commercialBrandSlugs
  .map((slug) => brands.find((b) => b.slug === slug))
  .filter((b): b is NonNullable<typeof b> => Boolean(b));

function Section({ id, heading, paragraphs, bullets, alt, children }: {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  alt: boolean;
  children?: ReactNode;
}) {
  return (
    <section id={id} className={`py-12 ${alt ? 'bg-gray-50' : 'bg-white'} scroll-mt-24`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">{heading}</h2>
          <div className="text-gray-700 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed">{p}</p>
            ))}
            {bullets && (
              <ul className="space-y-3 pl-5 list-disc marker:text-[#1B2A4A]">
                {bullets.map((b, i) => (
                  <li key={i} className="text-base md:text-lg leading-relaxed">{b}</li>
                ))}
              </ul>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function CommercialPage() {
  const localBusinessSchema = generateLocalBusinessSchema({});
  const faqSchema = generateFAQSchema(commercialFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Hero
        title="Commercial Gym Equipment Repair in Denver"
        subtitle="On-site repair and preventive maintenance for gyms, HOA and apartment fitness rooms, hotels and offices"
      />

      {/* Machine-down banner */}
      <div className="w-full py-4 text-white text-center text-lg font-semibold" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" style={{ color: '#FFC704' }} />
            <span>Machine down? Same-day or next-day appointments available</span>
          </div>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-gray-900 transition"
            style={{ backgroundColor: '#FFC704' }}
          >
            <PhoneCall className="w-5 h-5" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Intro + in-page navigation */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-gray-700 space-y-4">
            {commercialIntro.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed">{p}</p>
            ))}
          </div>
          <nav aria-label="On this page" className="max-w-3xl mx-auto mt-8 flex flex-wrap gap-2">
            {commercialSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition"
              >
                {s.nav}
              </a>
            ))}
            <a href="#brands" className="text-sm px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition">
              Brands
            </a>
            <a href="#faq" className="text-sm px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition">
              FAQ
            </a>
          </nav>
        </div>
      </section>

      {/* Written sections; the maintenance table sits inside its own section */}
      {commercialSections.map((s, idx) => (
        <Section key={s.id} id={s.id} heading={s.heading} paragraphs={s.paragraphs} bullets={s.bullets} alt={idx % 2 === 0}>
          {s.id === 'maintenance' && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm md:text-base border border-gray-200 bg-white">
                <thead className="bg-[#1B2A4A] text-white">
                  <tr>
                    <th scope="col" className="p-3 font-semibold">How often</th>
                    <th scope="col" className="p-3 font-semibold">What to check</th>
                    <th scope="col" className="p-3 font-semibold hidden md:table-cell">Per</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceRows.map((r) => (
                    <tr key={r.interval} className="border-t border-gray-200 align-top">
                      <th scope="row" className="p-3 font-semibold text-gray-900 whitespace-nowrap">{r.interval}</th>
                      <td className="p-3 text-gray-700">
                        {r.tasks}
                        <span className="block md:hidden mt-1 text-xs text-gray-500">{r.source}</span>
                      </td>
                      <td className="p-3 text-gray-500 hidden md:table-cell">{r.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">
                Your own model&apos;s manual always wins over a generic list. We can run these checks on a scheduled preventive
                maintenance visit, or work from your machine list and flag what is due.
              </p>
            </div>
          )}
        </Section>
      ))}

      {/* Equipment */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Commercial equipment we repair</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {commercialEquipment.map((e) => (
                <div key={e.title} className="bg-gray-50 rounded-lg border border-gray-200 p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{e.title}</h3>
                  <ul className="space-y-1">
                    {e.issues.map((issue) => (
                      <li key={issue} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FFC704' }} />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-gray-600">
              Written guides: <Link href="/services/treadmill-repair" className="underline hover:text-[#1B2A4A]">treadmill repair</Link>,{' '}
              <Link href="/services/elliptical-repair" className="underline hover:text-[#1B2A4A]">elliptical repair</Link>,{' '}
              <Link href="/services/spin-bike-repair" className="underline hover:text-[#1B2A4A]">spin bike repair</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="py-12 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Commercial brands we service</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-5">
              We repair the major commercial lines below, and the home brand machines that end up in smaller fitness
              rooms. Each name links to that brand&apos;s repair page.
            </p>
            <div className="flex flex-wrap gap-2">
              {commercialBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}-repair`}
                  className="text-sm px-3 py-1.5 rounded-full border border-gray-300 bg-white text-gray-800 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commercial gym equipment repair: common questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {commercialFaqs.map((faq, i) => (
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

      {/* Bottom CTA */}
      <section className="py-16 text-white" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book commercial gym equipment repair in the Denver Metro area
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Tell us the brand, the model and what the console says. The diagnostic is {SERVICE_CALL_FEE}, credited toward
            the repair, and you get the price before any work starts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-xl text-gray-900 transition hover:brightness-90"
              style={{ backgroundColor: '#FFC704' }}
            >
              <PhoneCall className="w-6 h-6" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
