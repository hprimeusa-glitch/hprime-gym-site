/**
 * Hand-written brand pages. A brand listed here renders the deep layout in
 * app/brands/[brand]/page.tsx (components/BrandDeepPage.tsx); every other brand keeps
 * the generic template. Same shape as the appliance site's lib/data/brandContent.ts.
 *
 * Every page is written against the actual Search Console queries for that brand
 * (90 days to 2026-10-10) and only states what can be verified: brand ownership,
 * what the manufacturer's own support pages say to try, published warranty terms and
 * our own advertised prices. No invented prices, no track-record claims, no
 * manufacturer authorisation we do not hold. The "deliberately NOT claimed" list at
 * the top of lib/data/serviceContent.ts applies here too.
 */

import { SERVICE_CALL_FEE } from '@/lib/utils';

export interface BrandSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BrandFaq {
  q: string;
  a: string;
}

export interface BrandContent {
  slug: string;
  name: string;
  /** <title>, up to ~60 characters */
  title: string;
  /** meta description, up to ~160 characters */
  description: string;
  h1: string;
  subtitle: string;
  intro: string[];
  sections: BrandSection[];
  faqs: BrandFaq[];
}

export const brandContent: Record<string, BrandContent> = {
  nordictrack: {
    slug: 'nordictrack',
    name: 'NordicTrack',
    title: 'NordicTrack Repair Denver | Treadmill, Bike, Elliptical',
    description:
      `Independent NordicTrack repair across the Denver Metro area: treadmills, incline trainers, bikes, ellipticals. ${SERVICE_CALL_FEE} diagnostic, credited toward the repair.`,
    h1: 'NordicTrack Repair in Denver',
    subtitle: `Treadmills and incline trainers, studio bikes, ellipticals • In-home service • ${SERVICE_CALL_FEE} diagnostic, credited toward the repair`,
    intro: [
      'NordicTrack belongs to iFIT, the Logan, Utah company that also owns ProForm and the commercial brand Freemotion. Older NordicTrack manuals name ICON Health & Fitness as the trademark owner and newer ones name iFIT Inc.; iFIT runs both the hardware support and the training platform on the console. H-Prime repairs NordicTrack treadmills, incline trainers, bikes and ellipticals in homes across the Denver Metro area.',
      `We are an independent repair company, not NordicTrack or iFIT authorized service. If your machine is still inside its labor warranty, the repair belongs to iFIT. Once it is out of warranty, the diagnostic is ${SERVICE_CALL_FEE} and is credited toward the repair if you go ahead, and you get the price before any work starts.`,
    ],
    sections: [
      {
        id: 'treadmill',
        heading: 'NordicTrack treadmill repair: belt, power and incline',
        paragraphs: [
          'Most NordicTrack calls are treadmills and incline trainers, and the owner\'s manuals are written as symptom tables rather than code lists. iFIT publishes no numeric error codes, so the numbers you see quoted on forums have no manufacturer source. Here is what the manuals say to try first.',
        ],
        bullets: [
          'Belt slips under your foot: with the key removed and the power cord unplugged, turn both idler roller screws clockwise a quarter turn, equally on both sides, then walk on it for a few minutes and repeat if needed. iFIT warns against overtightening.',
          'Belt drifts off center: unplug first, then make small turns of the left idler roller screw (clockwise if the belt has moved left, counterclockwise if it has moved right) and walk on it between adjustments.',
          'Power will not come on, or cuts out mid-workout: check that the key is fully in the console, then the power switch on the frame near the cord. If it sticks out, it has tripped; wait five minutes and press it back in. NordicTrack specifies a surge suppressor on a grounded outlet, and on an outlet with an AFCI breaker that trips repeatedly, iFIT sells an arc filter.',
          'Incline does not change correctly: run the incline calibration from the console menu (Settings, Maintenance, Calibrate Incline). The frame rises and lowers as it calibrates, and the manual says to do this the first time you use the machine.',
        ],
      },
      {
        id: 'lubrication',
        heading: 'Should you lubricate a NordicTrack treadmill?',
        paragraphs: [
          'Carefully. The manual states that the walking belt comes coated with a high-performance lubricant and that you should never apply silicone spray or anything else to the belt or deck unless an authorized service representative tells you to, because it can deteriorate the belt. iFIT\'s own maintenance article recommends annual lubrication and a monthly look for frayed edges, a separating seam and black residue under the motor hood. If your belt shows any of those, or you think it is dry, that is a call rather than a can of spray.',
        ],
      },
      {
        id: 'console',
        heading: 'Frozen touchscreen, iFIT app and Wi-Fi problems',
        paragraphs: [
          'A NordicTrack console that will not boot, freezes or loses Wi-Fi is often a software problem rather than a hardware one, and iFIT documents two fixes. The first is a factory reset: two people, a bent paper clip held in the small pinhole on the side or back of the console while the power is switched back on. It erases your custom settings and can take up to 30 minutes; iFIT notes it applies to consoles on firmware 7.1 or later, not older consoles with USB or HDMI ports. The second is a firmware update from the console settings or, on Bluetooth machines, from the iFIT app, which takes 15 to 20 minutes.',
          'Account and workout questions go to iFIT. If the console still has no power after a reset, or the screen stays dark with the machine plugged in and switched on, that is when a technician is worth the trip.',
        ],
      },
      {
        id: 'bike-elliptical',
        heading: 'NordicTrack bike and elliptical repair',
        paragraphs: [
          'The manuals for studio bikes such as the S22i and ellipticals such as the AirGlide share much of the same troubleshooting. A console that will not turn on: check that the power adapter or cord is fully seated, that the power switch is in the reset position, and on ellipticals that any exterior console wires are connected firmly and the right way round. Incline that does not reach the right level: calibrate it from the console settings, as on the treadmills.',
          'Two symptoms point at parts the manual expects to be adjusted. Pedals that slip even at the highest resistance mean the drive belt needs tightening behind the side shield. A console that shows wrong speed or cadence feedback means the reed switch needs adjusting against the magnet on the pulley. One thing is not a fault: on the S22i, NordicTrack notes the range of resistance levels can shrink when the bike is fully declined or steeply inclined. Our spin bike repair and elliptical repair pages go deeper on resistance and noise.',
        ],
      },
      {
        id: 'warranty',
        heading: 'NordicTrack warranty and how iFIT service works',
        paragraphs: [
          'Terms vary by model and are on the back cover of your manual. The Commercial X32i incline trainer and the Commercial 1750 treadmill carry ten years on the frame, two years on parts and one year on labor. The X32i warranty covers the original purchaser only and does not transfer to a second owner. iFIT repairs warranty claims through its own authorized service providers, every claim has to be preauthorized by iFIT, and in-home warranty service can carry a small trip charge. Register within 30 days of purchase to avoid extra fees on warranty service.',
          'Inside the labor window, contact iFIT Member Care at my.iFIT.com or 1-833-680-4348 before booking anyone. Outside it, or on a machine bought used, that is the work we do.',
        ],
      },
      {
        id: 'home-use',
        heading: 'Home machines, even when the name says Commercial',
        paragraphs: [
          'NordicTrack names some lines Commercial, but the manual for the Commercial X32i incline trainer, for example, says it is intended for home use only, not for commercial, rental or institutional settings, and its warranty is void if the machine is used for commercial or rental purposes. NordicTrack manuals also say not to keep the machine in a garage or on a covered patio, and to let a machine that has been in the cold warm to room temperature before turning on the console. If you manage an apartment gym or studio, iFIT\'s commercial line is Freemotion, and we service that equipment as well.',
        ],
      },
      {
        id: 'before-you-call',
        heading: 'Before you call: model and serial number',
        paragraphs: [
          'NordicTrack parts are matched to the model and serial number. On a treadmill the serial decal is usually on a white or silver decal below the power cord or at the right-hand corner of the base. On a bike, look on the base frame at the rear or on the tube that holds the seat post. On an elliptical, check the main bracket at the rear of the machine. Send us a photo of it with the symptom.',
        ],
      },
      {
        id: 'service-area',
        heading: 'NordicTrack repair across the Denver Metro area',
        paragraphs: [
          'Our experienced technicians repair NordicTrack equipment in Denver, Aurora, Centennial, Littleton, Englewood, Greenwood Village, Lone Tree, Highlands Ranch, Parker, Castle Rock, Lakewood, Golden, Arvada, Westminster and Broomfield. Call with the model number and the symptom for the earliest realistic appointment.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Are you NordicTrack authorized service?',
        a: 'No. H-Prime is an independent repair company. Warranty repairs are preauthorized by iFIT and handled through its own authorized service providers, so if your machine is inside its labor warranty, contact iFIT Member Care at my.iFIT.com or 1-833-680-4348 first. We repair NordicTrack equipment that is out of warranty or was bought second-hand.',
      },
      {
        q: 'How much does NordicTrack repair cost in Denver?',
        a: `The diagnostic is ${SERVICE_CALL_FEE}, and it is credited toward the repair if you go ahead. Parts and labor depend on the model and what failed, so you get the price before any work starts.`,
      },
      {
        q: 'What does the error code on my NordicTrack mean?',
        a: 'NordicTrack and iFIT do not publish numeric error codes; the manuals are symptom tables. Tell us what the machine is doing, for example the belt slips, the incline stops, the console freezes, and we can usually place the fault from that.',
      },
      {
        q: 'My NordicTrack treadmill will not turn on. What should I check?',
        a: 'The key in the console, then the power switch on the frame near the cord. If the switch sticks out it has tripped: wait five minutes and press it back in. Make sure the cord goes into a surge suppressor on a grounded outlet. If it still will not power up, book a visit.',
      },
      {
        q: 'Do you repair NordicTrack bikes and ellipticals too?',
        a: 'Yes: studio bikes, ellipticals and rowers as well as treadmills and incline trainers.',
      },
      {
        q: 'Can you get NordicTrack parts?',
        a: 'After the diagnosis we quote the part for your exact model and serial number. NordicTrack itself orders replacement parts through iFIT Member Care, using the model number, serial number and the part key number from the manual\'s part list.',
      },
    ],
  },
};

export function getBrandContent(slug: string): BrandContent | undefined {
  return brandContent[slug];
}
