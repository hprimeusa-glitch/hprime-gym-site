export const appliances = [
  {
    slug: 'treadmill',
    name: 'Treadmill',
    title: 'Treadmill Repair',
    description: 'Expert treadmill repair for residential and commercial machines',
    image: '/equipment/life-fitness/treadmill.webp',
    services: [
      'Belt slipping or misaligned',
      'Motor failure or overheating',
      'Speed control issues',
      'Incline/decline problems',
      'Console display errors',
      'Emergency stop malfunction',
      'Noise and vibration',
      'Lubrication and belt replacement'
    ],
    maintenanceChecklist: [
      'Inspect and adjust running belt alignment and tension',
      'Inspect deck surface for wear and lubricate',
      'Vacuum interior motor compartments',
      'Inspect and test drive belt condition',
      'Inspect and lubricate front and rear rollers',
      'Check motor brushes for wear (if applicable)',
      'Lubricate elevation motor spindle',
      'Diagnose and clear error codes',
      'Record belt mileage and usage hours',
      'Test safety key and emergency stop function'
    ]
  },
  {
    slug: 'elliptical',
    name: 'Elliptical',
    title: 'Elliptical Repair',
    description: 'Professional elliptical machine repair and maintenance',
    image: '/equipment/life-fitness/elliptical.webp',
    services: [
      'Resistance not adjusting',
      'Stride length issues',
      'Squeaking or grinding noise',
      'Console malfunction',
      'Pedal and crank problems',
      'Flywheel and brake issues',
      'Handlebar wobble',
      'Power supply problems'
    ],
    maintenanceChecklist: [
      'Clean frame and exterior surfaces',
      'Lubricate elevation motor spindle (if applicable)',
      'Inspect and clean rocker arm clevis shafts',
      'Check flywheel condition and alignment',
      'Inspect and lubricate drive belt',
      'Tighten all pedal and crank hardware',
      'Check handlebar connections and tighten bolts',
      'Diagnose and clear error codes',
      'Record usage hours and cycle count'
    ]
  },
  {
    slug: 'stationary-bike',
    name: 'Stationary Bike',
    title: 'Stationary Bike Repair',
    description: 'Recumbent and upright stationary bike repair services',
    image: '/equipment/peloton/stationary-bike.webp',
    services: [
      'Resistance knob not working',
      'Seat adjustment problems',
      'Pedal and crank issues',
      'Console and display errors',
      'Belt or chain replacement',
      'Flywheel bearing noise',
      'Power adapter issues',
      'Brake pad replacement'
    ],
    maintenanceChecklist: [
      'Inspect drive belt or chain for wear and tension',
      'Inspect alternator brushes (if applicable)',
      'Inspect cranks and pedal bearings',
      'Check all electrical connections',
      'Check battery voltage and power supply',
      'Clean and lubricate flywheel assembly',
      'Lubricate bottom bracket bearings',
      'Inspect brake pad wear and adjust',
      'Diagnose and clear error codes',
      'Record usage hours'
    ]
  },
  {
    slug: 'spin-bike',
    name: 'Spin Bike',
    title: 'Spin & Exercise Bike Repair',
    description: 'Spin, stationary and exercise bike repair: Peloton, Keiser, Schwinn, upright and recumbent bikes',
    image: '/equipment/keiser/stationary-bike.webp',
    services: [
      'Resistance knob not engaging',
      'Flywheel noise or wobble',
      'Drive chain or belt replacement',
      'Pedal and cleat issues',
      'Seat post adjustment problems',
      'Console and screen malfunction',
      'Bottom bracket bearing failure',
      'Brake pad wear and replacement'
    ],
    maintenanceChecklist: [
      'Clean and lubricate flywheel assembly',
      'Clean hub assembly and inspect bearings',
      'Clean, lubricate, inspect and adjust drive chain or belt',
      'Lubricate all moving components and pivot points',
      'Lubricate bottom bracket bearings',
      'Lubricate all pop-in pin assemblies',
      'Inspect brake pad for wear and adjust',
      'Check pedal bearings and tighten cranks',
      'Inspect seat and handlebar adjustment mechanisms',
      'Record usage hours'
    ]
  },
  {
    slug: 'rowing-machine',
    name: 'Rowing Machine',
    title: 'Rowing Machine Repair',
    description: 'Rowing machine repair and maintenance services',
    image: '/equipment/concept2/rowing-machine.webp',
    services: [
      'Chain or strap replacement',
      'Resistance mechanism failure',
      'Seat track and roller issues',
      'Console and monitor malfunction',
      'Handle grip replacement',
      'Water tank leaks (water rowers)',
      'Air damper problems',
      'Frame and rail alignment'
    ],
    maintenanceChecklist: [
      'Inspect chain or strap for wear and stretch',
      'Lubricate chain mechanism',
      'Check seat rollers and clean track rail',
      'Inspect and test resistance mechanism',
      'Clean and inspect flywheel or fan assembly',
      'Check handle grip and attachment point',
      'Inspect water tank for leaks (water rowers)',
      'Diagnose and clear error codes',
      'Record usage hours and stroke count'
    ]
  },
  {
    slug: 'stair-machine',
    name: 'Stair Machine',
    title: 'Stair Machine Repair',
    description: 'Stair climber and stepper repair services',
    image: '/equipment/stairmaster/stair-machine.webp',
    services: [
      'Step chain problems',
      'Motor and drive issues',
      'Resistance adjustment failure',
      'Console and display errors',
      'Bearing replacement',
      'Step alignment issues',
      'Hydraulic cylinder repair',
      'Safety switch malfunction'
    ],
    maintenanceChecklist: [
      'Clean frame and step surfaces',
      'Clean and inspect drive belts',
      'Grease column and mini-column rollers',
      'Check springs for tension and wear',
      'Check cables for fraying and proper tension',
      'Lubricate chains (if applicable)',
      'Check all electrical connections',
      'Check alternator brushes (if applicable)',
      'Diagnose and clear error codes',
      'Record usage hours'
    ]
  },
  {
    slug: 'weight-machine',
    name: 'Weight Machine',
    title: 'Weight Machine Repair',
    description: 'Weight machine and home gym repair services',
    image: '/equipment/body-solid/weight-machine.webp',
    services: [
      'Cable replacement and adjustment',
      'Pulley system repair',
      'Weight stack issues',
      'Pin selector problems',
      'Seat and pad replacement',
      'Frame welding and reinforcement',
      'Guide rod maintenance',
      'Safety catch repair'
    ],
    maintenanceChecklist: [
      'Lubricate all guide rods',
      'Check bushings for wear',
      'Tighten all hardware and bolts',
      'Check upholstery for tears or excessive wear',
      'Check cables for fraying and proper tension',
      'Inspect pulley systems and bearings',
      'Check weight stack alignment and pin selector',
      'Inspect safety catches and locking mechanisms',
      'Lubricate all pivot points and moving parts'
    ]
  }
];

/**
 * Hubs consolidated into another hub by a 301 in next.config.ts. Their city and
 * brand subpages stay live; only /services/{slug}-repair itself redirects, so it
 * is left out of the hub links and the sitemap.
 * stationary-bike -> spin-bike (2026-09-28): one intent, and Google had never
 * crawled the stationary hub while spin-bike was indexed.
 */
export const hubRedirects: Record<string, string> = {
  'stationary-bike': 'spin-bike',
};

export const hubAppliances = appliances.filter((a) => !(a.slug in hubRedirects));

export const commercialAppliances = [
  {
    slug: 'commercial-treadmill',
    name: 'Commercial Treadmill',
    title: 'Commercial Treadmill Repair',
    description: 'Heavy-duty commercial treadmill repair for gyms and fitness centers',
    featured: true
  },
  {
    slug: 'commercial-elliptical',
    name: 'Commercial Elliptical',
    title: 'Commercial Elliptical Repair',
    description: 'Commercial-grade elliptical machine repair and maintenance',
    featured: true
  },
  {
    slug: 'commercial-bike',
    name: 'Commercial Exercise Bike',
    title: 'Commercial Exercise Bike Repair',
    description: 'Spin bike and recumbent bike repair for fitness facilities',
    featured: true
  },
  {
    slug: 'commercial-cable-machine',
    name: 'Commercial Cable Machine',
    title: 'Commercial Cable Machine Repair',
    description: 'Cable crossover and functional trainer repair services',
    featured: true
  },
  {
    slug: 'commercial-smith-machine',
    name: 'Commercial Smith Machine',
    title: 'Commercial Smith Machine Repair',
    description: 'Smith machine repair and safety inspection'
  },
  {
    slug: 'commercial-leg-press',
    name: 'Commercial Leg Press',
    title: 'Commercial Leg Press Repair',
    description: 'Leg press and sled repair services'
  },
  {
    slug: 'commercial-rowing-machine',
    name: 'Commercial Rowing Machine',
    title: 'Commercial Rowing Machine Repair',
    description: 'Commercial rower repair and maintenance'
  },
  {
    slug: 'commercial-stair-climber',
    name: 'Commercial Stair Climber',
    title: 'Commercial Stair Climber Repair',
    description: 'Commercial stair climber and stepper repair'
  },
  {
    slug: 'commercial-multi-station',
    name: 'Multi-Station Gym',
    title: 'Multi-Station Gym Repair',
    description: 'Multi-station home gym and commercial gym repair'
  },
  {
    slug: 'commercial-lat-pulldown',
    name: 'Lat Pulldown Machine',
    title: 'Lat Pulldown Machine Repair',
    description: 'Lat pulldown and cable row machine repair'
  },
  {
    slug: 'commercial-chest-press',
    name: 'Chest Press Machine',
    title: 'Chest Press Machine Repair',
    description: 'Chest press and shoulder press machine repair'
  },
  {
    slug: 'commercial-power-rack',
    name: 'Power Rack',
    title: 'Power Rack Repair',
    description: 'Power rack and squat rack repair and assembly'
  }
];

// Featured commercial appliances for homepage (4 items)
export const featuredCommercialAppliances = commercialAppliances.filter(a => a.featured);
