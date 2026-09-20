import { Metadata } from 'next';
import { isIndexable } from '@/lib/data/indexAllowlist';

interface SEOParams {
  city?: string;
  appliance?: string;
  brand?: string;
  county?: string;
}

const SITE_NAME = 'H-Prime Gym Equipment Repair';
const SITE_URL = 'https://www.hprime-gym.com';
const PHONE = '(720) 706-6650';

export function generatePageMetadata(params: SEOParams): Metadata {
  const { city, appliance, brand, county } = params;

  let title = '';
  let description = '';

  if (city && brand && appliance) {
    const cityName = formatCityName(city);
    const brandName = formatBrandName(brand);
    const equipmentName = formatEquipmentName(appliance);
    title = `Expert ${brandName} ${equipmentName} Repair in ${cityName}, CO | Same-Day Service`;
    description = `Professional ${brandName} ${equipmentName} repair in ${cityName}, CO. Certified technicians, same-day service, upfront pricing. Call ${PHONE} for ${brandName} gym equipment repairs!`;
  } else if (city && brand) {
    const cityName = formatCityName(city);
    const brandName = formatBrandName(brand);
    title = `${brandName} Gym Equipment Repair in ${cityName}, CO | Expert ${brandName} Service`;
    description = `Trusted ${brandName} gym equipment repair in ${cityName}, CO. Certified technicians for all ${brandName} equipment. Same-day service available. Call ${PHONE} now!`;
  } else if (city && appliance) {
    const cityName = formatCityName(city);
    const equipmentName = formatEquipmentName(appliance);
    title = `${cityName} ${equipmentName} Repair | Same-Day Service | ${SITE_NAME}`;
    description = `Expert ${equipmentName} repair in ${cityName}, CO. Same-day service, certified technicians, upfront pricing. Call ${PHONE} for professional ${equipmentName} repair!`;
  } else if (brand && appliance) {
    const brandName = formatBrandName(brand);
    const equipmentName = formatEquipmentName(appliance);
    title = `${brandName} ${equipmentName} Repair Denver Metro | Expert ${brandName} Service`;
    description = `Professional ${brandName} ${equipmentName} repair in the Denver Metro area. Certified technicians, same-day service. Call ${PHONE}!`;
  } else if (city) {
    const cityName = formatCityName(city);
    title = `Gym Equipment Repair ${cityName}, CO | Same-Day Service | ${SITE_NAME}`;
    description = `Professional gym equipment repair in ${cityName}, CO. Expert service for treadmills, ellipticals, bikes, rowing machines & more. Same-day service available. Call ${PHONE}!`;
  } else if (brand) {
    const brandName = formatBrandName(brand);
    title = `${brandName} Gym Equipment Repair Denver Metro | ${SITE_NAME}`;
    description = `Expert ${brandName} gym equipment repair across the Denver Metro area. Certified technicians, all major ${brandName} equipment. Same-day service. Call ${PHONE}!`;
  } else if (appliance) {
    const equipmentName = formatEquipmentName(appliance);
    title = `${equipmentName} Repair Denver Metro | Same-Day Service | ${SITE_NAME}`;
    description = `Expert ${equipmentName} repair in the Denver Metro area. Certified technicians, same-day service, all major brands. Call ${PHONE} for professional ${equipmentName} repair!`;
  } else {
    title = `${SITE_NAME} | Expert Gym Equipment Repair in Denver, CO`;
    description = `Professional gym equipment repair in the Denver Metro area. Same-day service, certified technicians. Treadmills, ellipticals, bikes, rowing machines & more. Call ${PHONE}!`;
  }

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const canonicalUrl = buildCanonicalUrl(params);
  const ogImageUrl = `${SITE_URL}/logo-og.png`;

  // Pages outside the index allowlist stay reachable and keep passing link equity,
  // but do not enter the index. Regenerate the list with
  // Clients/H-Prime/SEO/build-index-allowlist.py, never edit it by hand.
  const canonicalPath = canonicalUrl.replace(SITE_URL, '') || '/';
  const indexable = isIndexable(canonicalPath);

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
  };
}

function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatBrandName(slug: string): string {
  const brandMap: { [key: string]: string } = {
    'life-fitness': 'Life Fitness',
    'precor': 'Precor',
    'technogym': 'Technogym',
    'cybex': 'Cybex',
    'nautilus': 'Nautilus',
    'bowflex': 'Bowflex',
    'nordictrack': 'NordicTrack',
    'peloton': 'Peloton',
    'sole': 'Sole',
    'matrix': 'Matrix',
    'hammer-strength': 'Hammer Strength',
    'true-fitness': 'TRUE Fitness',
    'star-trac': 'Star Trac',
    'stairmaster': 'StairMaster',
    'concept2': 'Concept2',
    'rogue': 'Rogue',
    'schwinn': 'Schwinn',
    'proform': 'ProForm',
  };

  if (brandMap[slug]) return brandMap[slug];

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatEquipmentName(slug: string): string {
  const equipmentMap: { [key: string]: string } = {
    'treadmill': 'Treadmill',
    'elliptical': 'Elliptical',
    'stationary-bike': 'Stationary Bike',
    'spin-bike': 'Spin Bike',
    'rowing-machine': 'Rowing Machine',
    'stair-machine': 'Stair Machine',
    'weight-machine': 'Weight Machine',
  };

  return equipmentMap[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildCanonicalUrl(params: SEOParams): string {
  const { city, appliance, brand } = params;

  let path = '';

  if (city && brand && appliance) {
    path = `/cities/${city}/brands/${brand}/services/${appliance}-repair`;
  } else if (city && brand) {
    path = `/cities/${city}/brands/${brand}-repair`;
  } else if (city && appliance) {
    path = `/cities/${city}/services/${appliance}-repair`;
  } else if (brand && appliance) {
    path = `/brands/${brand}-repair/services/${appliance}-repair`;
  } else if (city) {
    path = `/cities/${city}`;
  } else if (brand) {
    path = `/brands/${brand}-repair`;
  } else if (appliance) {
    path = `/services/${appliance}-repair`;
  } else {
    path = '/';
  }

  return `${SITE_URL}${path}`;
}
