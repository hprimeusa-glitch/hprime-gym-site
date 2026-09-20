import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Clock, Users, Wrench } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import SEOContent from '@/components/SEOContent';
import BrandsSection from '@/components/BrandsSection';
import { cities, publicCities, getCitiesByCounty } from '@/lib/data/cities';
import { appliances } from '@/lib/data/appliances';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

// dynamicParams removed - we want to pre-generate all pages
// export const dynamicParams = true;

export async function generateStaticParams() {
  return publicCities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find(c => c.slug === citySlug);
  if (!city) return {};

  // Geo-test fixture: still reachable for testing the middleware, never indexed.
  if (city.county === 'test') {
    return { ...generatePageMetadata({ city: citySlug }), robots: { index: false, follow: false } };
  }

  return generatePageMetadata({ city: citySlug });
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = cities.find(c => c.slug === citySlug);

  if (!city) {
    notFound();
  }

  const nearbyCities = getCitiesByCounty(city.county).filter(c => c.slug !== city.slug).slice(0, 8);

  const localBusinessSchema = generateLocalBusinessSchema({ city: citySlug, county: city.county });
  const serviceSchema = generateServiceSchema({ city: citySlug });
  const breadcrumbSchema = generateBreadcrumbSchema({ city: citySlug });

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Hero */}
      <Hero
        title={`Same-Day Gym Equipment Repair in ${city.name} & Surrounding Areas`}
        subtitle="Certified technicians, all major brands, professional service"
        city={city.name}
      />

      {/* 2. Why Choose Us — same as homepage */}
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
                Same-day or next-day appointments available across the Denver Metro area. We know you can&apos;t wait — we respond fast.
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

      {/* 3. SEO Content — Same-Day Gym Equipment Repair in {city} */}
      <SEOContent city={citySlug} county={city.county} />

      {/* 4. Our Services — equipment grid with photos */}
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
                href={`/cities/${citySlug}/services/${appliance.slug}-repair`}
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
                    Learn more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Brands We Service */}
      <BrandsSection />

      {/* 6. Reviews */}
      <Reviews />

      {/* 7. Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section id="service-area" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              We Also Serve Nearby Cities in {city.county} County
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/${nearbyCity.slug}`}
                  className="text-center p-4 bg-white rounded-lg hover:shadow-md transition"
                >
                  <span className="text-gray-900 font-medium">{nearbyCity.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

