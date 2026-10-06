interface SEOContentProps {
  city?: string;
  appliance?: string;
  brand?: string;
  county?: string;
}

export default function SEOContent({ city, appliance, brand, county }: SEOContentProps) {
  const cityName = city ? formatCityName(city) : null;
  const equipmentName = appliance ? formatEquipmentName(appliance) : null;
  const brandName = brand ? formatBrandName(brand) : null;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {renderContent({ city: cityName, appliance: equipmentName, brand: brandName, county })}
        </div>
      </div>
    </section>
  );
}

function renderContent({ city, appliance, brand, county }: any) {
  if (city && brand && appliance) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Expert {brand} {appliance} Repair in {city}, CO
        </h2>

        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            When your {brand} {appliance.toLowerCase()} breaks down in {city}, you need a repair service you can trust.
            <strong>H-Prime Gym Equipment Repair</strong> provides expert {brand} equipment repairs throughout {city} and surrounding areas
            with professional care. Our experienced technicians specialize in {brand} gym equipment and can diagnose and fix issues quickly.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Our {city} technicians have seen it all when it comes to {brand} {appliance.toLowerCase()} repairs.
            Whether it's a minor issue or a major breakdown, we have the expertise to get your equipment working again.
            Call us today at <strong>(720) 706-6650</strong> for fast, professional {brand} gym equipment repair in {city}.
          </p>
        </div>
      </div>
    );
  } else if (city && appliance) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Professional {appliance} Repair Services in {city}
        </h2>

        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            Is your {appliance.toLowerCase()} acting up in {city}? <strong>H-Prime Gym Equipment Repair</strong> provides expert {appliance.toLowerCase()}
            repair for all major brands throughout {city} and the surrounding Denver Metro area.
            Our experienced technicians can diagnose and repair your {appliance.toLowerCase()} quickly and efficiently.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            We know how disruptive broken gym equipment can be to your routine. That's why we offer <strong>same-day
            service</strong> to {city} residents whenever possible. Our technicians arrive prepared with the most common parts needed for
            {appliance.toLowerCase()} repairs, so we can often complete the job in a single visit.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Our {city} team works on all major gym equipment brands — Life Fitness, Precor, NordicTrack, Peloton, Cybex, and more.
            Call <strong>(720) 706-6650</strong> for immediate assistance!
          </p>
        </div>
      </div>
    );
  } else if (city && brand) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {brand} Gym Equipment Repair in {city}, CO
        </h2>

        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            Looking for reliable {brand} gym equipment repair in {city}? <strong>H-Prime Gym Equipment Repair</strong> specializes in {brand} equipment
            and has been serving {city} residents with expert care. Our experienced technicians are experts in diagnosing
            and repairing all {brand} equipment models.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            {brand} equipment is known for quality and durability, and it deserves quality repair service. Our technicians
            undergo continuous training on {brand} products to ensure they can handle any issue. We use genuine {brand} parts
            for all repairs in {city}, ensuring your equipment works like new.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Contact us today for expert {brand} gym equipment repair in {city}. Call <strong>(720) 706-6650</strong> for same-day service!
          </p>
        </div>
      </div>
    );
  } else if (brand && appliance) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {brand} {appliance} Repair In Denver Metro area
        </h2>

        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            When your {brand} {appliance.toLowerCase()} needs repair, trust the experts at <strong>H-Prime Gym Equipment Repair</strong>.
            We provide professional {brand} {appliance.toLowerCase()} repair in Denver Metro with expert care.
            Our experienced technicians specialize in {brand} gym equipment and can quickly diagnose and fix any issue.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Our experienced technicians have repaired thousands of {brand} {appliance.toLowerCase()}s in Colorado.
            No matter what's wrong with your {appliance.toLowerCase()}, we have the expertise to fix it right the first time.
            We use only authentic {brand} replacement parts and back all repairs with our service guarantee.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Call <strong>(720) 706-6650</strong> today to schedule your {brand} {appliance.toLowerCase()} repair!
          </p>
        </div>
      </div>
    );
  } else if (city) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Trusted Gym Equipment Repair in {city}
        </h2>

        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            <strong>H-Prime Gym Equipment Repair</strong> is {city}'s premier gym equipment repair company, serving residents and businesses throughout
            the area with expert care. We repair all major equipment brands and types — from treadmills and ellipticals to
            stationary bikes and weight machines.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Whether you need treadmill repair, elliptical service, bike maintenance, or rowing machine repair in {city},
            we've got you covered. Our team arrives equipped with the most common replacement parts, allowing us to complete
            most repairs in a single visit. Same-day appointments available for {city} residents.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Don't let broken gym equipment disrupt your routine. Call <strong>(720) 706-6650</strong> now for expert gym equipment
            repair in {city}!
          </p>
        </div>
      </div>
    );
  } else if (brand) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Professional {brand} Gym Equipment Repair in Denver Metro area
        </h2>

        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            <strong>H-Prime Gym Equipment Repair</strong> is Denver Metro area's trusted source for {brand} gym equipment repair.
            With experienced technicians, we specialize in servicing all {brand} equipment models. From routine maintenance to
            complex repairs, we're the {brand} experts you can count on throughout Denver and surrounding Colorado communities.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Our technicians undergo continuous training on {brand} products and use only genuine {brand} replacement parts.
            This ensures your equipment is repaired to manufacturer specifications and continues to perform reliably. We provide
            {brand} gym equipment repair in Denver Metro with same-day service available for most areas.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Trust the {brand} repair specialists. Call <strong>(720) 706-6650</strong> today for expert service!
          </p>
        </div>
      </div>
    );
  } else if (appliance) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Expert {appliance} Repair Throughout Denver Metro
        </h2>

        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            When your {appliance.toLowerCase()} breaks down, you need fast, reliable repair service. <strong>H-Prime Gym Equipment Repair</strong> is
            Denver Metro area's trusted {appliance.toLowerCase()} repair company. Our experienced technicians service all
            major brands and can diagnose and fix {appliance.toLowerCase()} issues quickly and efficiently.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            We provide professional {appliance.toLowerCase()} repair in Denver Metro, covering Denver, Aurora, Lakewood, and surrounding Colorado cities.
            Whether you're in any of our 30+ service cities, we're ready to help with same-day service available in most areas.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Need {appliance.toLowerCase()} repair? Call <strong>(720) 706-6650</strong> for same-day service!
          </p>
        </div>
      </div>
    );
  }

  return null;
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

// Keep backward-compatible alias
const formatApplianceName = formatEquipmentName;
