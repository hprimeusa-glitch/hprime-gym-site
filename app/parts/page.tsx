import Link from 'next/link';
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';

export const metadata = {
  title: 'Replacement Parts & Supplies | H-Prime Gym Equipment Repair',
  description:
    'Genuine OEM and high-quality replacement parts for treadmills, ellipticals, bikes, rowers and strength equipment. Installed by H-Prime technicians in the Denver Metro area.',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://www.hprime-gym.com/parts',
  },
};

export default function PartsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Replacement Parts &amp; Supplies
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Every repair {BUSINESS_NAME} performs uses genuine OEM or high-quality
              equivalent replacement parts, so your equipment runs the way it did when it
              left the factory. Our technicians carry the most common service parts on every
              call and source the rest directly from manufacturer-authorized distributors.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Parts We Replace Most Often
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Treadmill running belts, decks, drive belts, rollers and motors</li>
                <li>Motor control boards, consoles and display electronics</li>
                <li>Elliptical and bike drive belts, pedals, cranks and resistance units</li>
                <li>Rowing machine chains, cords, seat rollers and dampers</li>
                <li>Strength &amp; cable machine cables, pulleys, bearings and weight stacks</li>
                <li>Bushings, hardware, sensors and wiring harnesses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Sourcing Your Own Parts
              </h2>
              <p>
                Prefer to handle a minor fix yourself? Many gym equipment parts are available
                from trusted online suppliers such as{' '}
                <a
                  href="http://www.fitnessrepairparts.com"
                  target="_blank"
                  rel="noopener"
                  className="text-orange-600 hover:underline"
                >
                  FitnessRepairParts.com
                </a>
                . If you order the part and would like us to install it, we&apos;re happy to
                help &mdash; just have the part on hand when our technician arrives.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Not Sure Which Part You Need?
              </h2>
              <p>
                Identifying the right part is half the job. Call us with your equipment&apos;s
                brand and model, describe the symptom, and we&apos;ll tell you exactly what&apos;s
                needed &mdash; or send a technician to diagnose it on site.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
