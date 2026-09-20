import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { Metadata } from 'next';
import { Building2, Clock, Wrench, ShieldCheck, PhoneCall, AlertTriangle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';
import { generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Commercial Gym Equipment Repair in Denver | H-Prime',
  description:
    'Professional commercial gym equipment repair in Denver Metro — gyms, fitness centers, health clubs, hotels. Same-day service for treadmills, ellipticals, stationary bikes, rowing machines, weight machines and more. Experienced technicians.',
  alternates: { canonical: 'https://www.hprime-gym.com/commercial' },
};

const commercialServices = [
  {
    slug: 'commercial-treadmill',
    title: 'Commercial Treadmill Repair',
    description:
      'High-traffic commercial treadmills for gyms, fitness centers, and hotels. We restore belt tension, motor performance, and console functionality fast to keep your members moving.',
    image: '/assets/appliances/treadmill.jpg',
    issues: ['Belt slipping or worn', 'Motor failure', 'Console/display errors', 'Speed inconsistency', 'Incline motor repair'],
  },
  {
    slug: 'commercial-elliptical',
    title: 'Commercial Elliptical Repair',
    description:
      'Commercial-grade elliptical trainers and cross-trainers. We handle bearing replacements, resistance issues, and electronic malfunctions to minimize gym downtime.',
    image: '/assets/appliances/elliptical.jpg',
    issues: ['Grinding noise', 'Resistance not working', 'Pedal arm looseness', 'Console failure', 'Flywheel bearing replacement'],
  },
  {
    slug: 'commercial-stationary-bike',
    title: 'Commercial Stationary Bike Repair',
    description:
      'Upright and recumbent commercial bikes for gyms and fitness studios. We fix resistance systems, pedal mechanisms, and electronic displays quickly.',
    image: '/assets/appliances/stationary-bike.jpg',
    issues: ['Resistance not adjusting', 'Pedal issues', 'Seat post problems', 'Console malfunction', 'Drive belt replacement'],
  },
  {
    slug: 'commercial-spin-bike',
    title: 'Commercial Spin Bike Repair',
    description:
      'Commercial spin bikes and indoor cycling bikes for studios and gyms. We service brake pads, flywheels, and resistance mechanisms to keep your classes running.',
    image: '/assets/appliances/spin-bike.jpg',
    issues: ['Brake pad worn', 'Flywheel noise', 'Resistance knob issues', 'Pedal/cleat problems', 'Chain/belt replacement'],
  },
  {
    slug: 'commercial-rowing-machine',
    title: 'Commercial Rowing Machine Repair',
    description:
      'Water, air, and magnetic commercial rowing machines. We restore smooth rowing action, fix resistance issues, and repair monitors to keep your equipment performing.',
    image: '/assets/appliances/rowing-machine.jpg',
    issues: ['Chain/strap worn', 'Resistance inconsistency', 'Monitor failure', 'Seat roller issues', 'Handle grip replacement'],
  },
  {
    slug: 'commercial-stair-machine',
    title: 'Commercial Stair Machine Repair',
    description:
      'Stair climbers and stepmills for commercial gyms and fitness centers. We fix step mechanisms, drive systems, and electronics to keep this popular cardio machine available.',
    image: '/assets/appliances/stair-machine.jpg',
    issues: ['Step mechanism failure', 'Drive chain issues', 'Console errors', 'Speed inconsistency', 'Alternator/generator repair'],
  },
  {
    slug: 'commercial-weight-machine',
    title: 'Commercial Weight Machine Repair',
    description:
      'Selectorized and plate-loaded commercial weight machines. We service cables, pulleys, upholstery, and adjustment mechanisms to keep your strength training floor safe.',
    image: '/assets/appliances/weight-machine.jpg',
    issues: ['Cable fraying or snapping', 'Pulley replacement', 'Weight stack issues', 'Upholstery repair', 'Adjustment mechanism fix'],
  },
  {
    slug: 'preventive-maintenance',
    title: 'Preventive Maintenance Programs',
    description:
      'Scheduled maintenance programs for commercial gyms and fitness centers. Regular servicing extends equipment life, reduces breakdowns, and keeps your members safe.',
    image: '/assets/appliances/treadmill.jpg',
    issues: ['Belt lubrication', 'Bearing inspection', 'Cable & pulley checks', 'Electronics diagnostics', 'Safety system testing'],
  },
];

const whyChooseUs = [
  {
    icon: <Clock className="w-10 h-10" style={{ color: '#1B2A4A' }} />,
    title: 'Priority Response',
    description:
      'Commercial gym clients get priority scheduling. Same-day or next-day service to minimize downtime and keep your members happy.',
  },
  {
    icon: <Wrench className="w-10 h-10" style={{ color: '#1B2A4A' }} />,
    title: 'Commercial-Grade Expertise',
    description:
      'Our technicians specialize in commercial gym equipment — not just residential. We carry the right parts for major fitness brands.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10" style={{ color: '#1B2A4A' }} />,
    title: 'Fully Insured',
    description:
      'We are fully licensed and insured for commercial work. All repairs come with a service warranty — parts and labor.',
  },
  {
    icon: <Building2 className="w-10 h-10" style={{ color: '#1B2A4A' }} />,
    title: 'We Come to You',
    description:
      'On-site service at your gym, fitness center, health club, or hotel fitness room. No need to transport heavy equipment.',
  },
];

const faqs = [
  {
    q: 'Do you repair commercial gym equipment the same day?',
    a: 'Yes — commercial gym clients receive priority scheduling. In most cases we can dispatch a technician the same day or next day across the Denver Metro area.',
  },
  {
    q: 'What types of facilities do you serve?',
    a: 'We service commercial gyms, fitness centers, health clubs, hotel fitness rooms, corporate wellness centers, apartment complex gyms, CrossFit boxes, and any facility with gym equipment.',
  },
  {
    q: 'Do you work on all commercial gym equipment brands?',
    a: 'We repair most major commercial fitness brands including Life Fitness, Precor, Cybex, Technogym, Star Trac, Matrix, Hammer Strength, StairMaster, Concept2, and many others.',
  },
  {
    q: 'What is the diagnostic fee for commercial gym equipment?',
    a: 'Our diagnostic fee for commercial gym equipment is $99 and is credited toward the repair cost if you proceed. We provide a clear estimate before starting any work — no hidden fees.',
  },
  {
    q: 'Do you offer maintenance contracts for commercial gyms?',
    a: 'Yes, we offer preventive maintenance plans for commercial gyms and fitness centers. Regular service extends equipment life and reduces the risk of unexpected breakdowns during peak hours.',
  },
  {
    q: 'How quickly can you get parts for commercial gym equipment?',
    a: 'We stock common gym equipment parts and can source most others within 1–2 business days through our supplier network. We always inform you of lead times upfront.',
  },
];

export default function CommercialPage() {
  const localBusinessSchema = generateLocalBusinessSchema({});
  const faqSchema = generateFAQSchema(faqs);

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

      {/* Hero */}
      <Hero
        title="Commercial Gym Equipment Repair in Denver"
        subtitle="Priority service for gyms, fitness centers, health clubs & more"
      />

      {/* Urgent CTA Banner */}
      <div className="w-full py-4 text-white text-center text-lg font-semibold" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" style={{ color: '#FFC704' }} />
            <span>Equipment down? Call now for priority response</span>
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

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Denver Gyms Choose H-Prime
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We understand that equipment downtime costs money and members. That's why commercial gym clients always come first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commercial Gym Equipment Services
            </h2>
            <p className="text-xl text-gray-600">
              Expert repair for all commercial gym and fitness equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialServices.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group border border-gray-100"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-1 mb-4">
                    {service.issues.map((issue, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FFC704' }} />
                        {issue}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-block text-sm font-semibold hover:underline"
                    style={{ color: '#398ffc' }}
                  >
                    Call for service →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Commercial Gym Equipment Repair — Denver Metro
            </h2>
            <div className="text-gray-700 space-y-4 text-left">
              <p className="text-base md:text-lg leading-relaxed">
                When commercial gym equipment fails, every hour of downtime directly impacts your revenue and member satisfaction.
                <strong> H-Prime Gym Equipment Repair</strong> provides fast, professional commercial gym equipment repair across Denver, Aurora,
                Lakewood, Arvada, and 30+ surrounding cities.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Our technicians specialize in commercial-grade fitness equipment from brands like Life Fitness, Precor, Cybex,
                Technogym, Matrix, and more. We stock common parts to complete most repairs in a single visit — so your gym gets back
                to full operation quickly.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                From a treadmill that stopped mid-workout to a weight machine with a frayed cable, we handle it all.
                Call us now for same-day commercial service or schedule online — no long waits, no runaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commercial Gym Equipment Repair — FAQ
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
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

      {/* Bottom CTA */}
      <section className="py-16 text-white" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Commercial Gym Equipment Repair Today?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Call now for priority scheduling. Same-day service available across Denver Metro.
            Experienced technicians, fully insured, $99 commercial diagnostic fee credited toward repair.
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
