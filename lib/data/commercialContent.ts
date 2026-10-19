/**
 * Content for /commercial (commercial gym equipment repair, Denver Metro).
 *
 * Written 2026-10-19 against the page's Search Console queries (90 days to 2026-10-17:
 * "commercial gym equipment repair", "treadmill repair denver", "commercial gym
 * equipment service", "commercial fitness equipment repair"). Every manufacturer or
 * standard statement traces to a manual or official page listed in
 * Clients/H-Prime/SEO/sources-2026-10-19/commercial-sources.md (parent workspace).
 * No invented track record, client names, machine counts, contracts or response times.
 */

import { SERVICE_CALL_FEE } from '@/lib/utils';

export interface CommercialSection {
  id: string;
  nav: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface MaintenanceRow {
  interval: string;
  tasks: string;
  source: string;
}

export const commercialIntro: string[] = [
  'Commercial gym equipment lives a different life from a treadmill in a basement. The same machine runs for hours a day, members you never meet use it, and when it stops, the problem is no longer one person missing a workout: it is a dark console on the floor, a complaint at the front desk and a liability question if someone gets on it anyway.',
  'H-Prime repairs commercial treadmills, ellipticals, bikes, rowers, stair climbers and strength machines on site across the Denver Metro area. This page is written for the people who run those rooms: what tends to break on commercial machines, what the manufacturers themselves ask you to check and how often, and what to do in the first ten minutes after a machine goes down.',
];

export const commercialSections: CommercialSection[] = [
  {
    id: 'who',
    nav: 'Who we work with',
    heading: 'Who we work with',
    paragraphs: [
      'Commercial does not only mean a big box gym. Any room where several people share the same machines, and where someone other than the user is responsible for keeping them safe, runs on commercial rules. Life Fitness puts it plainly in its Hammer Strength manual: it recommends that all commercial fitness equipment be used in a supervised area.',
    ],
    bullets: [
      'Gyms, studios and boutique fitness: cardio floors, cycling rooms, strength areas.',
      'HOA clubhouses and apartment fitness rooms: a handful of machines, no staff on site, often found broken by a resident first.',
      'Hotel fitness rooms: guests use them at odd hours, so a fault can sit unnoticed until the next shift.',
      'Office and corporate fitness centers.',
      'Schools, colleges and campus recreation centers.',
      'Police, fire and first responder station gyms, where the equipment is part of keeping crews fit for duty.',
    ],
  },
  {
    id: 'failures',
    nav: 'Typical failures',
    heading: 'What breaks on commercial machines',
    paragraphs: [
      'Most commercial failures are wear on a schedule rather than bad luck, and the manuals say so in their own error messages.',
    ],
    bullets: [
      'Treadmill speed faults that trace back to the belt and deck. Life Fitness ties its "Unable to attain target speed" error to belt and deck condition, and the 95T Elevation treadmill even sets an automatic belt check reminder at 30,000 miles. Precor drive error 27 means motor current is too high, and Precor\'s own service manual says higher than typical motor current indicates a worn belt and deck. The same manual names worn belt and deck friction as the most common cause of a tripped treadmill breaker, mostly with heavier users at high speed.',
      'Breakers tripping and electronics faults on a shared circuit. Precor requires each treadmill on its own 20 amp individual branch circuit, with nothing else on it except one optional personal viewing display, and Life Fitness specifies one branch circuit per treadmill. Precor goes further: if the circuit is not dedicated, it has to be corrected before any reliable troubleshooting is possible, and a shared circuit may be a safety hazard to the user.',
      'Deck damage from the wrong lubricant. Precor warns not to apply any lubricant or wax to the deck and belt, no silicone sprays, because they quickly degrade the low friction surface of the deck. A well meaning spray from a staff member can shorten the life of the most expensive wear part on the machine.',
      'Frayed cables and worn belts on strength machines. Hammer Strength calls a frayed cable an extreme liability and says to replace any cable at the first sign of wear, not at the next convenient moment.',
      'Power cords, stop systems and safety clips. A cord pinched under the frame and an emergency stop that no longer works are both on the manufacturers\' own inspection lists below.',
    ],
  },
  {
    id: 'down',
    nav: 'Machine down?',
    heading: 'When a machine goes down: the first ten minutes',
    paragraphs: [
      'Matrix, Life Fitness and Precor say the same thing in different words. Matrix: improperly working equipment must be kept out of use until it is repaired. Life Fitness: keep the equipment out of use until defective parts are repaired or replaced. Precor: place an OUT OF SERVICE sign on the equipment and make it clear to all patrons and other users that they must not use it.',
    ],
    bullets: [
      'Stop the machine and take it out of use. On a treadmill, pull the safety key or clip so it cannot be started.',
      'Unplug it. If it is hardwired or you cannot reach the plug, switch it off at the machine.',
      'Put an "Out of order" sign on the console where it cannot be missed, and tell the front desk, the building manager or the next shift.',
      'Leave the repair to a qualified person. Matrix asks that anyone making adjustments or doing maintenance or repair of any kind be qualified to do so, and on a staffed floor OSHA\'s lockout/tagout standard (29 CFR 1910.147) covers servicing where an unexpected start could injure an employee.',
      'Write down the brand, the model and serial number from the frame label, the exact error message or code, and when it started. A photo of the console and of the serial label is enough. That is what lets a technician arrive with the right questions answered.',
    ],
  },
  {
    id: 'maintenance',
    nav: 'Preventive maintenance',
    heading: 'Preventive maintenance: what the manuals ask for',
    paragraphs: [
      'Preventive maintenance on commercial equipment is not a sales add on; it is written into the manuals, and for some brands into the warranty. Precor states that it is the owner\'s responsibility to maintain equipment to its recommended preventive maintenance schedule, and that following the schedule is required to maintain warranty coverage. The schedule below is taken from the manufacturers\' own documents, so you can see which tasks your staff can handle and which need a technician with the covers off.',
    ],
  },
  {
    id: 'home-vs-commercial',
    nav: 'Home vs. commercial machines',
    heading: 'Home machines in a commercial room, and what it does to the warranty',
    paragraphs: [
      'Commercial machines are built and tested to different standards. ASTM F2115 sets design and manufacturing parameters for motorized and user driven treadmills, and ASTM F2216 does the same for selectorized strength equipment. Life Fitness marks its Integrity treadmill Class SB (Studio), for professional and commercial use, under the ISO 20957 classes.',
      'It matters most in small rooms. An apartment or HOA fitness room furnished with home machines may have no manufacturer coverage at all: the Bowflex warranty, for example, does not cover any commercial use, including gyms, corporations, clubs and fitness centers. It works the other way too. Life Fitness says a commercial product placed in a private home becomes covered by the consumer warranty, and Precor gives commercial cardio and strength products bought for commercial use a three year labor warranty (from March 30, 2026), while a commercial unit sold into a home keeps one year of labor.',
      'If your machine is still inside its labor warranty, contact the manufacturer or the dealer who sold it first. If it is outside warranty, came with the building, or the original seller is gone, that is where an independent technician makes sense.',
    ],
  },
];

export const maintenanceRows: MaintenanceRow[] = [
  {
    interval: 'After every use',
    tasks: 'Wipe the treadmill console and side rails.',
    source: 'Matrix commercial treadmill owner\'s guide',
  },
  {
    interval: 'Daily',
    tasks: 'Strength machines: wipe down the upholstery and look over the belts along their whole length; replace at the first sign of wear.',
    source: 'Hammer Strength owner\'s manual',
  },
  {
    interval: 'Weekly',
    tasks: 'Test the treadmill emergency stop. On strength machines, check hardware for loosening, tampering or wear, belt end bolts and hand grips.',
    source: 'Life Fitness Integrity treadmill manual; Hammer Strength manual',
  },
  {
    interval: 'Monthly',
    tasks: 'Check the stop clip, inspect the running deck and belt, check the power cord is not damaged or pinched under the unit, run a functional test. Unplug, remove the motor cover and clean out debris.',
    source: 'Precor preventive maintenance guide; Matrix owner\'s guide',
  },
  {
    interval: 'Quarterly',
    tasks: 'Belt tension and tracking, drive belt condition, vacuum the motor bay under the hood.',
    source: 'Precor preventive maintenance guide',
  },
  {
    interval: 'Annually',
    tasks: 'Drive motor brushes where fitted, speed sensor, wiring, and lubrication of the incline lift screw.',
    source: 'Precor preventive maintenance guide',
  },
  {
    interval: 'Throughout',
    tasks: 'Vacuum around the striding belt so debris does not build up, and inspect the belt, deck and line cord for wear.',
    source: 'Life Fitness Integrity treadmill manual',
  },
];

export const commercialBrandSlugs: string[] = [
  'life-fitness', 'precor', 'matrix', 'technogym', 'star-trac', 'cybex',
  'hammer-strength', 'stairmaster', 'concept2', 'true-fitness', 'landice',
  'freemotion', 'keiser', 'octane', 'hoist', 'assault-fitness',
];

export const commercialEquipment: { title: string; issues: string[] }[] = [
  { title: 'Commercial treadmills', issues: ['Belt slipping or worn', 'Speed and motor faults', 'Console and display errors', 'Incline motor'] },
  { title: 'Ellipticals and cross trainers', issues: ['Grinding or clicking', 'Resistance not working', 'Pedal arm looseness', 'Console failure'] },
  { title: 'Upright, recumbent and spin bikes', issues: ['Resistance not adjusting', 'Brake pads and flywheel noise', 'Pedals and cranks', 'Drive belt'] },
  { title: 'Rowing machines', issues: ['Chain or strap wear', 'Resistance inconsistency', 'Monitor failure', 'Seat rollers'] },
  { title: 'Stair climbers and stepmills', issues: ['Step mechanism', 'Drive chain', 'Console errors', 'Speed inconsistency'] },
  { title: 'Selectorized and plate loaded strength', issues: ['Frayed or snapped cables', 'Pulleys', 'Weight stack guide rods', 'Upholstery and adjustments'] },
];

export const commercialFaqs: { q: string; a: string }[] = [
  {
    q: 'How much does commercial gym equipment repair cost?',
    a: `It depends on the machine and the part. The diagnostic visit is ${SERVICE_CALL_FEE} and is credited toward the repair if you go ahead, and you get the price before any work starts.`,
  },
  {
    q: 'Do you offer commercial gym equipment service, not just one-off repairs?',
    a: 'Yes. Besides repairs we do scheduled preventive maintenance visits built around the manufacturers\' own checklists: deck and belt inspection, belt tension and tracking, drive belts, cleaning the motor bay, cables, pulleys and safety stops. Send us your machine list and we can plan the visit around it.',
  },
  {
    q: 'Do you repair treadmills in Denver for apartment buildings, HOAs and hotels?',
    a: 'Yes. We work on site in gyms, apartment and HOA fitness rooms, hotel fitness rooms, offices, campuses and station gyms across the Denver Metro area, on commercial and home brand machines.',
  },
  {
    q: 'Which commercial fitness equipment brands do you repair?',
    a: 'Life Fitness, Precor, Matrix, Technogym, Star Trac, Cybex, Hammer Strength, StairMaster, Concept2, TRUE, Landice, Freemotion, Keiser, Octane, Hoist and Assault, as well as the home brands that end up in smaller fitness rooms.',
  },
  {
    q: 'Should we lubricate our commercial treadmill belt?',
    a: 'Only if your model\'s manual tells you to. Precor, for example, says not to apply any lubricant or wax to the deck and belt, including silicone sprays, because it degrades the deck surface. If you are not sure, leave it and have the deck and belt inspected.',
  },
  {
    q: 'Why does our treadmill keep tripping the breaker or throwing speed errors?',
    a: 'Two common reasons are a shared circuit and a worn belt and deck. Precor and Life Fitness both require each treadmill on its own dedicated 20 amp branch circuit, and Life Fitness links its "Unable to attain target speed" error to belt and deck condition. Both are worth checking before replacing electronics.',
  },
  {
    q: 'What should staff do when a machine breaks during the day?',
    a: 'Take it out of use, unplug it, put an "Out of order" sign on it and let whoever manages the room know. Matrix, Life Fitness and Precor all say improperly working equipment must stay out of use until it is repaired. Then call us with the brand, model, serial number and the error on the screen.',
  },
];
