import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Wrench, Users, CheckCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import WhyChooseUs from "@/components/WhyChooseUs";
import BrandsSection from "@/components/BrandsSection";
import SEOContent from '@/components/SEOContent';
import ServiceDeepPage from '@/components/ServiceDeepPage';
import { appliances } from '@/lib/data/appliances';
import { brands } from '@/lib/data/brands';
import { getBrandsForAppliance } from '@/lib/data/serviceBrands';
import { getEquipmentImage } from '@/lib/data/equipmentImages';
import { serviceContent } from '@/lib/data/serviceContent';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';

interface PageProps {
  params: Promise<{
    appliance: string;
  }>;
}

export async function generateStaticParams() {
  return appliances.map((appliance) => ({
    appliance: `${appliance.slug}-repair`,
  }));
}

// Enable dynamic rendering for on-demand pages
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { appliance: applianceSlug } = await params;
  // Remove -repair suffix to find appliance
  const cleanSlug = applianceSlug.replace('-repair', '');
  const appliance = appliances.find(a => a.slug === cleanSlug);
  if (!appliance) return {};

  // Hand-written pages carry their own title and description; the allowlist rule is
  // applied inside generatePageMetadata, so take that result and override the copy.
  const deep = serviceContent[cleanSlug];
  const base = generatePageMetadata({ appliance: cleanSlug });
  if (!deep) return base;
  return { ...base, title: deep.title, description: deep.description };
}

export default async function ApplianceRepairPage({ params }: PageProps) {
  const { appliance: applianceSlug } = await params;
  // Remove -repair suffix to find appliance
  const cleanSlug = applianceSlug.replace('-repair', '');
  const appliance = appliances.find(a => a.slug === cleanSlug);
  
  if (!appliance) {
    notFound();
  }
  
  // Get brands that manufacture this appliance
  const relevantBrandSlugs = getBrandsForAppliance(cleanSlug);
  const relevantBrands = brands.filter(b => relevantBrandSlugs.includes(b.slug));
  
  const localBusinessSchema = generateLocalBusinessSchema({ appliance: cleanSlug });
  const serviceSchema = generateServiceSchema({ appliance: cleanSlug });
  const breadcrumbSchema = generateBreadcrumbSchema({ appliance: cleanSlug });

  const deep = serviceContent[cleanSlug];

  const schemaTags = (
    <>
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
      {deep && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(deep.faqs)) }}
        />
      )}
    </>
  );

  // Written pages replace the shared template entirely.
  if (deep) {
    return (
      <>
        {schemaTags}
        <ServiceDeepPage content={deep} image={appliance.image} brandSlugs={deep.brandSlugs} />
      </>
    );
  }

  return (
    <>
      {schemaTags}

      <Hero
        title={`Same-Day ${appliance.name} Repair in Denver Metro area`}
        subtitle="Expert repair service for all major brands • Same-day appointments available"
        applianceImage={appliance.image}
      />
      
      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Common {appliance.name} Issues We Fix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {appliance.services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-start gap-3">
                <div className="text-orange-600 text-xl font-bold flex-shrink-0 mt-0.5">✓</div>
                <h3 className="font-semibold text-gray-900 text-lg">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
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
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Expert Technicians</h3>
              <p className="text-gray-600">
                Experienced technicians specializing in gym equipment repair across the Denver Metro area. Certified and experienced.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Same-Day Service</h3>
              <p className="text-gray-600">
                Same-day or next-day appointments available. We know you can't wait — we respond fast.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Trusted by Neighbors</h3>
              <p className="text-gray-600">
                Most new customers come from referrals. We fix it right the first time, every time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Upfront Pricing</h3>
              <p className="text-gray-600">
                Transparent pricing and solid warranty on every repair. Fully insured for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* SEO Content */}
      <SEOContent appliance={cleanSlug} />
      
      {/* Brands Section - Filtered */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {appliance.name} Brands We Service
            </h2>
            <p className="text-xl text-gray-600">
              Our certified technicians are trained to repair all major {appliance.name.toLowerCase()} brands
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {relevantBrands.map((brand) => {
              const eqImage = getEquipmentImage(brand.slug, cleanSlug);
              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}-repair`}
                  prefetch={false}
                  className="group bg-gray-50 border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {eqImage && (
                    <div className="w-full h-36 overflow-hidden bg-white">
                      <img
                        src={eqImage.src}
                        alt={`${brand.name} ${eqImage.equipmentName}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col items-center text-center gap-3">
                    {brand.logo ? (
                      <div className="relative h-16 w-full flex items-center justify-center">
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-full flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900 transition-colors">
                          {brand.name}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-medium group-hover:underline" style={{ color: '#1B2A4A' }}>
                      Learn more →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <WhyChooseUs />
      <BrandsSection />
      <Reviews />
    </>
  );
}
