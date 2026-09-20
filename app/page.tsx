import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import BrandsSection from '@/components/BrandsSection';
import { appliances } from '@/lib/data/appliances';
import { cities } from '@/lib/data/cities';
import { reviews } from '@/lib/data/reviews';
import { CheckCircle, Clock, Users, Wrench } from 'lucide-react';
import Link from 'next/link';
import {
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
} from '@/lib/seo/schema';

export const metadata = {
  alternates: {
    canonical: 'https://www.hprime-gym.com',
  },
};

const homepageFaqs = [
  { q: 'Why is my treadmill belt slipping?', a: 'Common causes include a worn or loose belt, insufficient lubrication, or a failing drive motor. Regular belt lubrication and tension adjustment can prevent this issue.' },
  { q: 'Why is my elliptical making a grinding noise?', a: 'This is usually caused by worn bearings, a dry or damaged flywheel, or loose hardware. Our technicians can diagnose and replace the affected components quickly.' },
  { q: 'How often should gym equipment be serviced?', a: 'Commercial gym equipment should be serviced every 3–6 months depending on usage. Home gym equipment benefits from annual preventive maintenance to extend its lifespan.' },
  { q: 'Can you repair commercial gym equipment?', a: 'Yes, we service both residential and commercial gym equipment including treadmills, ellipticals, stationary bikes, rowing machines, weight machines, and more.' },
  { q: 'How long does a treadmill typically last?', a: 'A quality treadmill lasts 7–12 years with proper maintenance. Regular belt lubrication, cleaning, and timely repairs can significantly extend its lifespan.' },
  { q: 'Do you service all gym equipment brands?', a: 'Yes, we repair all major brands including Life Fitness, Precor, Peloton, NordicTrack, Bowflex, Cybex, Technogym, and many more.' },
  { q: 'Are your technicians certified?', a: 'Yes. Our technicians work on all major gym equipment brands and keep up with new models as they come out.' },
];

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema({});
  const faqSchema = generateFAQSchema(homepageFaqs);
  const serviceSchema = generateServiceSchema({});
  const breadcrumbSchema = generateBreadcrumbSchema({});
  const reviewSchema = generateReviewSchema(reviews);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Hero Section */}
      <Hero
        title="Denver Gym Equipment Repair Services – Fast & Reliable!"
        subtitle="Gym Equipment Down? We Will Fix It — Fast and Easy!"
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose H-Prime Gym Equipment Repair?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                  <CheckCircle className="w-10 h-10" style={{ color: '#1B2A4A' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Factory-Trained Technicians</h3>
              <p className="text-gray-600">
                Experienced gym equipment technicians. Professional service you can trust for all major fitness brands.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                  <Clock className="w-10 h-10" style={{ color: '#1B2A4A' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Same-Day Service</h3>
              <p className="text-gray-600">
                Same-day or next-day appointments available across the Denver Metro area. We know you can't wait — we respond fast.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                  <Users className="w-10 h-10" style={{ color: '#1B2A4A' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">$99 Diagnostic Fee</h3>
              <p className="text-gray-600">
                Only $99 for a complete diagnostic — credited toward your repair if you proceed. No hidden fees, no surprises.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                  <Wrench className="w-10 h-10" style={{ color: '#1B2A4A' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">All Major Brands</h3>
              <p className="text-gray-600">
                We service all major gym equipment brands including Life Fitness, Precor, Peloton, NordicTrack, Bowflex, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Same-Day Gym Equipment Repair in Denver, CO
            </h2>

            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                Treadmill belt slipping? Elliptical making noise? We've got you covered. <strong>H-Prime Gym Equipment Repair</strong> provides
                fast, reliable repairs on all major brands — Life Fitness, Precor, Peloton, NordicTrack, Bowflex, Cybex, Technogym, and more.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                Our gym equipment technicians provide <strong>same-day service</strong> across the Denver Metro area —
                Denver, Aurora, Lakewood, Arvada, and 30+ surrounding cities. Only $99 diagnostic fee, credited toward your repair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section id="our-services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              We repair all major gym equipment brands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliances.map((appliance) => (
              <Link
                key={appliance.slug}
                href={`/services/${appliance.slug}-repair`}
                prefetch={false}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                {appliance.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={appliance.image}
                      alt={appliance.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {appliance.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{appliance.description}</p>
                  <span className="font-semibold hover:underline" style={{ color: '#398ffc' }}>
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <BrandsSection />

      {/* Service Areas */}
      <section id="service-area" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Areas in Denver Metro
            </h2>
            <p className="text-xl text-gray-600">
              We serve Denver and 30+ surrounding cities across 6 counties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Denver County', slug: 'denver', description: 'Denver, Cherry Creek, Stapleton, Lowry' },
              { name: 'Arapahoe County', slug: 'arapahoe', description: 'Aurora, Centennial, Englewood, Littleton' },
              { name: 'Jefferson County', slug: 'jefferson', description: 'Lakewood, Arvada, Golden, Wheat Ridge' },
              { name: 'Adams County', slug: 'adams', description: 'Westminster, Thornton, Commerce City' },
              { name: 'Douglas County', slug: 'douglas', description: 'Castle Rock, Highlands Ranch, Parker' },
              { name: 'Boulder County', slug: 'boulder', description: 'Broomfield' }
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas#${area.slug}`}
                prefetch={false}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition border border-gray-200 cursor-pointer"
                style={{ ['--tw-shadow-color' as any]: '#FFC704' }}
              >
                <h3 className="font-bold text-xl text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-600">{area.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/service-areas"
              prefetch={false}
              className="inline-block font-semibold text-lg hover:underline"
              style={{ color: '#398ffc' }}
            >
              View all {cities.length} cities we serve →
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Denver Gym Equipment Repair: Common Questions & Answers
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {homepageFaqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-lg shadow-sm border border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900 hover:text-blue-600 transition">
                  {faq.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
