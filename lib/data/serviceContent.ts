/**
 * Hand-written service pages. A service listed here renders the deep layout in
 * app/services/[appliance]/page.tsx; every other service keeps the generic template.
 *
 * Written against the actual Search Console queries for hprime-gym.com (28 days to
 * 2026-09-20) and against the symptoms customers actually send in through the site's
 * own request form. Every technical statement traces to a manufacturer manual or
 * support page; nothing is inferred. No invented prices, no track-record claims, no
 * manufacturer authorisation we do not hold.
 *
 * Deliberately NOT claimed, because the sources say otherwise:
 *  - "Denver's altitude damages treadmill motors" — no fitness manufacturer publishes
 *    an altitude limit that Denver breaches. Spirit's MT200 rates 10,000 ft; Denver is
 *    5,276 ft. The altitude angle is borrowed from combustion-engine marketing.
 *  - "Dry air dries out your belts" — belt makers specify dry storage and warn about
 *    humidity ABOVE 70%. The documented cracking mechanisms are ozone, heat and UV.
 *  - "NordicTrack error code XYZ" — iFIT publishes no numeric codes at all. The codes
 *    circulating on forums are unsourced.
 */

export interface ServiceSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceContent {
  slug: string;
  /** equipment name as it reads in a sentence */
  name: string;
  /** <title>, up to ~60 characters */
  title: string;
  /** meta description, up to ~160 characters */
  description: string;
  h1: string;
  subtitle: string;
  intro: string[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  reviewsTitle: string;
  /** brand slugs to link at the foot of the page */
  brandSlugs: string[];
}

export const serviceContent: Record<string, ServiceContent> = {
  treadmill: {
    slug: 'treadmill',
    name: 'Treadmill',
    title: 'Treadmill Repair Denver | Belt, Motor, Incline, Console',
    description:
      'Treadmill repair across the Denver Metro area: slipping and off-centre belts, motor and controller faults, incline failures, dead consoles. In-home service, $99 service call.',
    h1: 'Treadmill Repair in Denver',
    subtitle: 'Belt tracking and tension, motors and controllers, incline, consoles • In-home service • $99 service call',
    intro: [
      'A treadmill fails in a small number of ways, and most of them announce themselves before the machine stops. The belt starts to hesitate under your foot, the deck gets loud, the console drops out mid-run, the incline stops responding, or a code appears and the machine refuses to start. H-Prime repairs residential and light-commercial treadmills across the Denver Metro area, from Cherry Creek and Lowry to Littleton, Arvada, Parker and Castle Rock.',
      'What follows is the diagnosis we would give you on the phone. Some of it you can act on yourself in ten minutes; some of it needs a technician and the right part for your exact model number. Either way the service call is $99, and you get the diagnosis and the price before any work starts.',
    ],
    sections: [
      {
        id: 'symptoms',
        heading: 'What the symptom usually means',
        paragraphs: [
          'The manufacturers are unusually consistent about this, and their own troubleshooting tables are more useful than anything written for search engines. Here is what they say, in the order these calls actually come in.',
        ],
        bullets: [
          'Belt slips or hesitates under each footfall. Tension first. Sole notes that if the belt still slips once it is correctly tensioned, the drive belt under the motor cover is the suspect, not the running belt. TRUE lists three causes for the same symptom: tracking, tension and lubrication.',
          'The treadmill trips its own circuit breaker, or the belt stops dead when you pull the safety key. Sole attributes both to the same thing: high belt and deck friction. That is a lubrication and deck-wear problem, and it is the failure that ends up replacing a deck if it is left alone.',
          'The console dies when you touch it, usually on a cold day. Sole and Spirit print the identical line: the machine may not be grounded, and static electricity is crashing the computer. In a dry house on carpet this is common, and it is a grounding fix rather than a console replacement.',
          'A groaning or moaning noise. Landice puts it plainly: an over-tightened running belt is the most common cause of that particular sound. Tightening further makes it worse.',
          'A thump once per belt revolution on a new machine. Sole calls this normal on higher-end belts, caused by the belt holding the shape of the roller, and says it goes away after a few workouts. This is not a repair.',
          'Black dust under the motor cover. iFIT identifies this as a misaligned belt rubbing the deck rail. Left alone it wears both the belt and the deck.',
          'Displayed speed runs higher than reality above roughly 7 mph. Sole points at low supply voltage and extension cords. A treadmill wants its own 120 V outlet, not a shared circuit and not a light-gauge cord.',
          'The belt will not stay centred. Sole attributes this to an uneven gait or weight shifted to one leg as often as to the machine; TRUE points at an unlevel floor and the rear feet.',
        ],
      },
      {
        id: 'codes',
        heading: 'Error codes, and which brands do not have any',
        paragraphs: [
          'Before you search for your code, check whether your brand publishes codes at all. This is where most treadmill troubleshooting goes wrong.',
          'NordicTrack, ProForm and FreeMotion publish no numeric error codes. Their manuals are written as symptom tables, and the word "error" does not appear in them. The numeric codes circulating on forums for these machines have no manufacturer source, so no one can tell you what they mean. Peloton Tread is the same: there is no code list, only a blinking red light and the instruction to reseat the safety key. Nautilus, Bowflex and Schwinn treadmills show words rather than numbers, such as "+ SAFETY KEY" for a safety-key fault, and "LUBRICATE BELT", which is a reminder rather than a failure.',
          'The brands that do publish codes are worth quoting exactly, because the code tells you whether this is a ten-minute job or a board replacement.',
        ],
        bullets: [
          'Sole: E01 is over-current protection, which means the machine is overloaded or something is binding. Sole specifically says that a burning smell while the motor runs points at the motor itself. E02 and E04 are motor wiring, E05 and E06 are supply voltage, E31 is over-temperature and clears once it cools, E3 is the incline cable, and E22 or E23 are console communication faults that Sole says to attack by cutting power for two full minutes before anything else.',
          'Life Fitness: E31 means the machine cannot reach the set speed, and the causes Life Fitness lists are a worn deck, debris under the machine, several machines on one circuit, and a voltage brownout. E33 is a thermal shutdown of the motor controller, and their first instruction is to clear the area and check that every vent is free of debris. E49 is low voltage, with the specific threshold of 90 VAC. E65 is a motor thermal trip that resolves itself once the motor cools.',
          'Precor: code 27 is motor current too high, and the most common cause is a badly worn deck or belt. Code 28 is electronics over-temperature, and step one in their own manual is a fan clogged with dust. Codes 15, 16 and 89 are all supply-voltage problems, and 89 specifically catches a 120 V machine plugged into 240 V. Precor machines also keep an error log you can read from the console, which is the single most useful thing a technician can have before arriving.',
          'Landice: OS or O5 is over-speed, and Landice names the cause openly, a heavier user walking slowly at a steep incline, or a user pushing back on the belt. Their fix is to lower the incline below 10% or raise the speed. LS is a lost speed-sensor signal, PO is the elevation potentiometer, and the ERR numbers add together, so ERR 12 means ERR 8 plus ERR 4. Landice also states that its error codes cannot be cleared by the owner by design.',
          'Horizon publishes E1 and E2 along with an MCB blink-code guide on its own support site. We check those against the live article for your model rather than quoting them from memory.',
        ],
      },
      {
        id: 'before-you-call',
        heading: 'Before you call: what is genuinely yours to do',
        paragraphs: [
          'Three things solve a real share of treadmill complaints, and all three are owner tasks in the manufacturers\' own documentation.',
          'Lubrication is where the advice splits hardest, and the generic internet answer is wrong for at least half the machines in Denver homes. Sole asks for 100% food-grade silicone every 90 days or 90 hours and warns that skipping it can void the warranty. Spirit says every three months with their own compound. iFIT takes the opposite line for NordicTrack and ProForm: never apply silicone or anything else unless the manual tells you to, and expect to lubricate no more than once a year. Their test is a good one: lift the edge of the belt, run your fingers underneath the middle, and if your hand comes out without a slight shine it needs lubricant. Horizon builds both silicone and waxed decks, and a waxed deck must never be treated with anything. Precor, Life Fitness and Peloton do not include a deck-lubrication step in their owner maintenance schedules at all. So the honest answer to "how often should I lubricate my treadmill" is: find out which deck you own first.',
          'Belt tracking is the other one, and every manufacturer converges on the same method, quarter-turns with the machine running at walking speed, giving the belt time to settle between adjustments. Sole uses a 6 mm hex on the left bolt only and calls proper tracking an owner responsibility on any treadmill. Precor adjusts from the right rear end cap and warns explicitly against over-tightening. Peloton asks for a monthly check with the red centre line sitting between the two red dots, power off between adjustments. Landice adjusts with the belt running and allows at least thirty seconds between changes. iFIT sets a hard limit of one quarter turn at a time.',
          'The third is the simplest and the most missed: the treadmill has its own circuit breaker on the frame, near the power switch or on the front grill. A completely dead console is a tripped breaker as often as it is anything else. Push it in until it locks before you call anyone.',
        ],
      },
      {
        id: 'denver',
        heading: 'What Denver actually changes',
        paragraphs: [
          'One thing, and it is well documented. Denver air is dry, and dry air carries static. Sole and Spirit both print the same diagnosis for a console that shuts off when you touch it on a cold day: the machine is not properly grounded and static is crashing the computer. SportsArt goes further and tells users in dry areas to discharge themselves on something else before touching metal on the machine. Precor includes a static bleed resistor ground wire in its treadmill service instructions and warns about the shock hazard when it is not securely connected to the frame.',
          'The numbers behind it are ordinary physics rather than marketing. Walking across carpet generates on the order of 35,000 volts at 10 to 25% relative humidity, against roughly 1,500 volts in humid conditions. Denver averages 43% relative humidity in the afternoon across the year and drops to about 35% in midsummer, and it is drier than that in a heated house in January. If your treadmill sits on carpet in a basement and the console drops out in winter, grounding is the first thing to look at, not the console.',
          'What we will not tell you is that altitude is wearing out your motor. No fitness manufacturer publishes an altitude limit that Denver breaches; the one that publishes a limit at all rates its machine to 10,000 feet, and Denver sits at 5,276. The altitude argument you will see on local repair pages is carried over from car engines.',
        ],
      },
      {
        id: 'warranty',
        heading: 'Warranty: check it before you pay us',
        paragraphs: [
          'Treadmill warranties are long on the frame and the motor and short on labour, which is exactly the part a service call bills for. Sole and Horizon cover frame and motor for the life of the machine with one year of labour. NordicTrack Commercial models run ten years on the frame with one year of labour. Peloton Tread is twelve months of labour. Precor commercial treadmills carry three years of labour, Life Fitness commercial three years, Landice one year on labour with lifetime parts on the home L7 and L8.',
          'If your machine is inside its labour window, call the manufacturer first. Paying an independent for work the manufacturer would have covered makes no sense, and several brands are explicit that outside service voids what is left. Sole voids its warranty for service performed by anyone other than an authorised Sole service company, and separately voids it if the machine is not kept in a climate-controlled space, which quietly excludes a garage. Landice excludes self-repair and requires an authorised technician within a sixty-mile radius. Life Fitness voids a consumer machine placed in a commercial setting, and Bowflex and Schwinn say the same. Peloton and Echelon warranties do not transfer to a second-hand buyer, which matters in a metro with as much used equipment changing hands as this one.',
          'Once you are out of warranty, an independent technician who knows the platform is usually faster to get and gives you the price before the work. That is the part we do.',
        ],
      },
      {
        id: 'commercial',
        heading: 'Apartment gyms, studios and facilities',
        paragraphs: [
          'Multi-unit buildings, hotels and studios across the metro run the same machines on far higher hours, and the failure profile shifts accordingly: decks and belts wear out on a schedule rather than at random, and electrical faults cluster where several machines share a circuit. Life Fitness names exactly that as a cause of its E31 speed fault.',
          'If you manage a facility, the useful thing is a routine rather than a call. Decks, belts, drive belts and running surfaces have measurable wear; consoles and controllers mostly fail from heat and dust. We service commercial treadmills across the Denver Metro area and can work from your machine list.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does treadmill repair cost in Denver?',
        a: 'The service call is $99 and covers the visit and the diagnosis. Parts and labour depend entirely on what has failed and on your exact model, so we give you the price before any work starts rather than quoting a range that will not match your machine.',
      },
      {
        q: 'How often should I lubricate my treadmill?',
        a: 'It depends on which deck you own, and the brands disagree sharply. Sole asks for 100% food-grade silicone every 90 days or 90 hours. NordicTrack and ProForm say no more than once a year and never to apply anything unless the manual says so. Horizon builds waxed decks that must never be treated. Precor, Life Fitness and Peloton do not include deck lubrication in owner maintenance at all. Check your manual before you buy a bottle of anything.',
      },
      {
        q: 'My treadmill belt keeps drifting to one side. Can I fix that myself?',
        a: 'Yes, and most manufacturers consider it your job rather than a repair. The method is the same across brands: quarter-turns on the rear adjustment bolt with the belt running at walking speed, waiting for it to settle between adjustments, and never over-tightening. If the belt still drifts after correct tracking, or you see black dust under the motor cover, the deck rail is being worn and it is worth a visit.',
      },
      {
        q: 'What does the error code on my NordicTrack mean?',
        a: 'NordicTrack does not publish numeric error codes. iFIT writes its manuals as symptom tables, and the codes you will find on forums have no manufacturer source. Tell us what the machine is doing rather than what the screen shows and we can usually place the fault from the symptom.',
      },
      {
        q: 'The console goes dark when I touch it. Is the console dead?',
        a: 'Usually not. Sole and Spirit both attribute that exact symptom, especially on a cold day, to static electricity crashing the computer because the machine is not properly grounded. In a dry Denver winter on carpet it is common. It is a grounding fix rather than a console replacement.',
      },
      {
        q: 'Do you repair NordicTrack, Peloton and Bowflex, or only commercial brands?',
        a: 'Both. Residential NordicTrack, Peloton, Bowflex, Sole, Horizon, Schwinn and Spirit machines are the bulk of the work, and we also service Precor, Life Fitness, Landice, TRUE and Technogym equipment in apartment gyms and studios.',
      },
      {
        q: 'Which areas do you cover?',
        a: 'The Denver Metro area, including Denver, Aurora, Centennial, Littleton, Englewood, Greenwood Village, Lakewood, Arvada, Westminster, Thornton, Broomfield, Parker, Highlands Ranch and Castle Rock.',
      },
    ],
    reviewsTitle: 'Treadmill repairs our customers wrote about',
    brandSlugs: [
      'nordictrack', 'peloton', 'sole', 'horizon', 'bowflex', 'schwinn', 'precor',
      'life-fitness', 'landice', 'true-fitness', 'spirit', 'proform', 'freemotion', 'technogym',
    ],
  },

  elliptical: {
    slug: 'elliptical',
    name: 'Elliptical',
    title: 'Elliptical Repair Denver | Noise, Resistance, Incline',
    description:
      'Elliptical and cross-trainer repair across the Denver Metro area: squeaks and clicks, resistance that will not change, dead incline ramps, console faults. In-home service, $99 service call.',
    h1: 'Elliptical Repair in Denver',
    subtitle: 'Squeaks and clicks, resistance faults, incline ramps, consoles • In-home service • $99 service call',
    intro: [
      'Ellipticals generate two kinds of call, and they are very different jobs. One is noise: a squeak, a click, a grinding or a rough feel through the stride. The other is the resistance or the incline ramp refusing to do anything. H-Prime repairs residential and light-commercial ellipticals and cross-trainers across the Denver Metro area.',
      'The noise calls are worth reading about before you book anything, because the manufacturer numbers on this are striking and the fix is often yours. The service call is $99, and you get the diagnosis and the price before any work starts.',
    ],
    sections: [
      {
        id: 'symptoms',
        heading: 'Noise: nine times out of ten it is two things',
        paragraphs: [
          'Sole puts a number on it in its own owner manual, and it is the most useful sentence written about ellipticals: 90% of calls to their service department for noise issues trace to loose hardware or dirty rear rails. Not bearings, not the drive system.',
          'Loose hardware comes first. Assembly bolts settle after the first weeks of use, and Sole asks for every bolt installed during assembly to be tightened as much as possible. iFIT gives the same instruction with a caution not to over-tighten. This costs ten minutes and a hex key.',
          'Dirty rear rails come second. The polyurethane rollers run on those rails, and dust and sweat residue turn a smooth stride into a rough, clicking one. Sole specifies a lint-free cloth with alcohol, then a thin film of lubricant, emphasis on thin. Precor gives the equivalent instruction for its roller tracks using mineral oil, wiping the excess off with a dry cloth.',
          'If the noise survives both of those, Sole moves to the floor: the machine is not level. iFIT adds that a scraping sound is usually the side shields or covers touching the frame, and that a rocking feel while pedalling is an uneven surface rather than a mechanical fault.',
        ],
      },
      {
        id: 'codes',
        heading: 'Resistance and incline: what the codes say',
        paragraphs: [
          'Resistance that will not change is a small set of causes. iFIT asks you to check the connections between the resistance mechanism, its motor and the flywheel, to make sure the flywheel and any visible magnets are clean, and to tighten the magnet bracket hardware. Landice reports the same fault as a PO code and states directly that it means the resistance system has a problem, with a brake-controller diagnostic path behind it.',
          'Incline ramps that have gone dead have one cause that is worth knowing about, because it looks like an expensive failure and is not. Precor code 46 is low battery voltage on a self-powered machine, and their manual is blunt about it: below 10 Vdc the ramp stops moving, this is strictly a battery problem and not an incline system or incline motor problem, and the underlying cause is a machine that has not been used often enough. Code 40, no lift motion detected, is most often a blown lift fuse or a seized motor, and on EFX and AMT machines a fully dead battery produces it too.',
          'Beyond that, Precor publishes a full code list for EFX and AMT machines: 42 and 44 are lift position and uncommanded lift movement, 50 and 56 are brake magnet current, 62 is the vertical sensor on an AMT12, and the 70s are flat-belt wear counters, where code 78 fires at 90 million of a 100 million cycle life. Life Fitness covers its cross-trainers with the same E20 to E65 set it uses on treadmills, where E20 and E21 are communication faults and E25 is incline feedback. Bowflex Max Trainer shows 0A and 0D, which are not mechanical faults at all but JRNY firmware update errors caused by a dropped internet connection.',
          'NordicTrack, Sole, Horizon and Schwinn ellipticals publish no error codes. Their manuals are symptom tables, so describe the behaviour rather than hunting for a code that does not exist.',
        ],
      },
      {
        id: 'before-you-call',
        heading: 'Before you call',
        paragraphs: [
          'In order, and all of these are documented owner tasks: wipe down the sweat path after each workout, go around every assembly bolt with a hex key, clean the rear rails with a lint-free cloth and alcohol and re-apply a thin film, level the machine on the floor, and clean debris off the flywheel and magnets.',
          'One habit matters more than any of them on a self-powered Precor: use the machine. Their own error code for a dead incline ramp exists because infrequent use flattens the battery, and that is a fault created by the machine sitting idle rather than by anything wearing out.',
        ],
      },
      {
        id: 'warranty',
        heading: 'Warranty',
        paragraphs: [
          'Elliptical labour coverage is short and varies more than treadmills do, so it is worth checking before you book anything. Sole covers the E25 frame for life with two years of parts and one year of labour. NordicTrack X Series and AirGlide run ten years on the frame, two on parts and one on labour. Horizon EX-59 is lifetime frame, one year parts and labour. Precor home machines carry one year of labour against ten or five years of parts; Precor commercial carries three years of labour. Life Fitness home ellipticals give one year of labour. Landice covers the E7 with lifetime parts and one year of labour.',
          'Two are much shorter than people expect: Schwinn 411 and Bowflex Max Trainer M6 both give ninety days of labour, and the Max Trainer frame is two years rather than lifetime. Sole also states in capitals that its ellipticals are for residential use only and that any other application voids the warranty in its entirety, which is worth knowing before an apartment building puts a home machine in its fitness room.',
        ],
      },
    ],
    faqs: [
      {
        q: 'My elliptical squeaks and clicks. Does it need new bearings?',
        a: 'Probably not. Sole states in its own manual that 90% of noise calls to its service department come down to loose assembly hardware or dirty rear rails. Tighten every bolt from the assembly, then clean the rails with a lint-free cloth and alcohol and apply a thin film of lubricant. If the noise survives both, check that the machine is level before assuming anything mechanical.',
      },
      {
        q: 'The incline ramp on my Precor stopped moving. Is the motor dead?',
        a: 'Often it is the battery, not the motor. Precor code 46 is low battery voltage on a self-powered machine, and their manual says explicitly that this is strictly a battery problem rather than an incline system or motor problem. The usual cause is a machine that has not been used often enough to keep itself charged.',
      },
      {
        q: 'The resistance will not change. What is wrong?',
        a: 'Check the connections between the resistance mechanism, its motor and the flywheel, make sure the flywheel and visible magnets are clean, and tighten the magnet bracket hardware. On a Landice this reports as a PO code, which points at the brake controller and needs a technician.',
      },
      {
        q: 'How much does elliptical repair cost in Denver?',
        a: 'The service call is $99 and covers the visit and the diagnosis. Parts and labour depend on what has failed and on your model, so you get the price before any work starts.',
      },
      {
        q: 'Which brands do you repair?',
        a: 'Residential NordicTrack, Sole, Horizon, Schwinn, Bowflex and ProForm, and commercial Precor, Life Fitness, Landice, Octane, Cybex and Technogym cross-trainers in apartment gyms and studios.',
      },
    ],
    reviewsTitle: 'Elliptical repairs our customers wrote about',
    brandSlugs: [
      'nordictrack', 'sole', 'horizon', 'schwinn', 'bowflex', 'precor', 'life-fitness',
      'landice', 'octane', 'cybex', 'technogym', 'proform',
    ],
  },

  'spin-bike': {
    slug: 'spin-bike',
    name: 'Spin bike',
    title: 'Spin Bike & Exercise Bike Repair Denver | Resistance, Console',
    description:
      'Spin bike and stationary bike repair across the Denver Metro area: resistance faults, control board and console errors, noise from the flywheel, pedals and cleats. In-home service, $99 service call.',
    h1: 'Spin Bike and Exercise Bike Repair in Denver',
    subtitle: 'Resistance faults, control boards and consoles, flywheel noise, pedals • In-home service • $99 service call',
    intro: [
      'Indoor cycles break in a narrower set of ways than treadmills, and the split is clean: either the resistance has stopped behaving, or the console and its wiring have. H-Prime repairs Peloton, Schwinn, Bowflex, Echelon, NordicTrack, Keiser, Life Fitness and Precor bikes across the Denver Metro area, residential and in apartment and studio fitness rooms.',
      'The used-bike market here is large, and a good share of these calls are on machines bought second-hand, where the warranty did not transfer with the bike. The service call is $99 and you get the diagnosis and the price before any work starts.',
    ],
    sections: [
      {
        id: 'codes',
        heading: 'Error codes on bikes: which ones are real',
        paragraphs: [
          'Peloton does publish codes for the Bike and Bike+, which surprises people, and there are exactly two of them.',
          'B0202 is a brake firmware fault affecting the resistance knob. On the original Bike the documented path is to cut power and reseat every cable connector at both ends, checking that nothing is under tension or sharply bent. On the Bike+ it is to send diagnostics from the settings menu, confirm nothing is obstructing the brake assembly near the flywheel, and inspect the touchscreen and USB-C cables above the flywheel before a power reset.',
          'X01TPZ001 is a sensor board cable fault. The documented test is genuinely useful because it isolates the part: disconnect and reconnect the cable between the sensor board and the housing a few times, then bypass the USB-C-to-sensor cable by plugging the handlebar cable straight into the sensor board. If the error clears, the USB-C-to-sensor cable is the failed part.',
          'Other brands are thinner. Schwinn IC4 and Bowflex C6 share a platform and show E01 as a console error, where the documented order of replacement is the lower wiring harness, then the resistance sensor, then the console; the first thing to check is the main cable between frame and console, joined along its two aligned arrows. Schwinn 170 and 270 print E2, for which Schwinn itself does not publish a meaning, and "Please Pedal", which with a zero RPM reading points at the data cable, the magnet position on the pulley or the speed sensor alignment. Precor self-powered bikes carry their own list, including 11 for low-voltage watchdog, 57 and 58 for generator voltage, and 46 for low battery. Life Fitness bikes use the same E20 to E65 set as the rest of its cardio line.',
          'Two traps worth knowing. Echelon publishes no error codes at all, and the LO and HI that appear on an EX-30-RCX console are calibration prompts rather than faults: hold ENTER for ten seconds, turn the knob fully anticlockwise on LO then four turns clockwise, and fully clockwise on HI. And in the Schwinn IC3 and IC7 service manual, "E1" is a part label for the tension bolt, not a code. Bowflex VeloCore and NordicTrack S22i publish no codes either.',
        ],
      },
      {
        id: 'symptoms',
        heading: 'Resistance, noise and the things that are not faults',
        paragraphs: [
          'Peloton names three situations that call for calibration rather than repair: the resistance reads stuck at 0 or 100, it does not change after several pedal revolutions, or the brake has taken physical damage. They also state that the original Bike is calibrated at the factory with a manual magnetic brake and that you generally should not need to recalibrate it, which is worth hearing before someone talks you into a service visit. The Bike+ calibrates itself, and the documented remedy for resistance trouble there is a power reset that restarts the homing process.',
          'A rubbing or scraping noise from the flywheel is usually the brake assembly sitting off centre, and Peloton publishes the owner procedure: raise the handlebars fully, take the resistance to maximum, remove the two sweat-guard screws, turn the pedals to find where the flywheel is making contact, then lower the resistance to raise the brakes and push the assembly back to centre.',
          'A dead touchscreen has a documented ladder that saves an unnecessary visit: check the green LED on the power adapter, try a different outlet, hold a thirty-second reset at the base, check the LED on the sensor board, reseat both monitor cable connectors behind the screen, and finally power the screen directly from the adapter to separate the screen from the frame.',
          'Pedals are the maintenance item everyone forgets. Peloton recommends tightening them after the first few rides and replacing them annually. Cleat tension is adjusted with a 3 mm hex a quarter turn at a time toward the minus sign, with the flywheel locked by turning resistance fully up first.',
          'Finally, the non-faults. Peloton lists saddle and handlebar position, cleat type, room temperature and simply your own strength as reasons output feels different, before anything mechanical. On Echelon, a tension number that spikes before it changes during calibration is documented as normal, and the message about a product no longer being active for an account means the wrong equipment was selected, not that anything is broken.',
        ],
      },
      {
        id: 'warranty',
        heading: 'Warranty, and why second-hand bikes usually have none',
        paragraphs: [
          'Peloton home bikes carry twelve months on frame, parts and touchscreen. Their commercial line runs seven years on the frame with three years of labour. Schwinn IC4 gives ten years on the frame, three on parts and one on labour; IC3 five years, two and one. Bowflex VeloCore is two years on the frame with one year of labour. Echelon covers the frame and fixed metal parts for ten years and everything else including the touchscreen for one, with labour included in the first twelve months and shipping charged after that. Horizon 7.0 IC is lifetime frame with one year of parts and labour. Sole R92 is lifetime frame, two years of parts, one of labour. Precor and Life Fitness commercial bikes carry three years and one year of labour respectively.',
          'The part that catches people out in this metro: Peloton states that the twelve-month warranty does not transfer to a second-hand buyer, and Echelon says the same in its own words. A large share of the Pelotons and Echelons in Denver homes were bought used, which means they arrived with no manufacturer coverage at all. That is not a reason to avoid buying one; it is a reason to know who you are going to call.',
        ],
      },
      {
        id: 'before-you-call',
        heading: 'Before you call',
        paragraphs: [
          'A hard power reset resolves more bike faults than any other single step, and both Peloton and Echelon document it precisely. On a Peloton, hold the button behind the screen, choose Shut Down, unplug, wait a full thirty seconds and plug back in. On an Echelon EX3, hold the silver button for thirty seconds with the cable out, then reconnect and wait for the beep and the flashing blue light.',
          'Beyond that: check the main cable between frame and console is fully seated along its aligned arrows, tighten the pedals, clean the flywheel and magnets, and on a connected bike confirm the subscription is active and the pairing is current before assuming hardware. A bike that will not talk to its app is very often a Bluetooth or subscription problem rather than a repair.',
        ],
      },
    ],
    faqs: [
      {
        q: 'My Peloton resistance knob does nothing and the screen shows B0202. What is that?',
        a: 'B0202 is a documented Peloton code for a brake firmware fault affecting the resistance knob. On the original Bike the first step is to cut power and reseat every cable connector at both ends, checking none is under tension or sharply bent. On the Bike+ send diagnostics from settings, check nothing is obstructing the brake assembly near the flywheel, and inspect the touchscreen and USB-C cables before a power reset.',
      },
      {
        q: 'Do you repair a Peloton I bought second-hand?',
        a: 'Yes, and that is a large part of this work in Denver. Worth knowing: Peloton states its twelve-month warranty does not transfer to a second-hand buyer, and Echelon says the same, so a used bike normally arrives with no manufacturer coverage.',
      },
      {
        q: 'There is a rubbing noise from the flywheel. Is the bike damaged?',
        a: 'Usually the brake assembly has drifted off centre, and Peloton publishes the owner procedure for recentring it. If the noise continues after that, or the brake has taken a knock, it is worth a visit.',
      },
      {
        q: 'My Echelon shows LO and HI on the console. Is that an error?',
        a: 'No. Echelon publishes no error codes, and LO and HI are calibration prompts. Hold ENTER for ten seconds, turn the resistance knob fully anticlockwise on LO then four turns clockwise, and fully clockwise on HI, and the console restarts.',
      },
      {
        q: 'How much does exercise bike repair cost in Denver?',
        a: 'The service call is $99 and covers the visit and the diagnosis. Parts and labour depend on the fault and the model, so you get the price before any work starts.',
      },
      {
        q: 'Do you work on control boards, or only replace whole consoles?',
        a: 'Diagnosis first. On a Schwinn IC4 or Bowflex C6 the documented order is the lower wiring harness, then the resistance sensor, then the console, and a good share of these faults never reach the console at all. On a Peloton the X01TPZ001 test isolates the USB-C-to-sensor cable from the sensor board, which is the difference between a cable and a board.',
      },
    ],
    reviewsTitle: 'Bike repairs our customers wrote about',
    brandSlugs: [
      'peloton', 'schwinn', 'bowflex', 'echelon', 'nordictrack', 'keiser', 'life-fitness',
      'precor', 'sole', 'horizon', 'nautilus', 'diamondback',
    ],
  },
};

/**
 * Deliberately NOT aliased onto /services/stationary-bike-repair. That hub serves the
 * same intent as spin-bike ("stationary bike repair", "exercise bike repair") and
 * copying this content onto it would create the exact near-duplicate pair this file
 * exists to remove. The two hubs need consolidating behind one canonical URL, which is
 * a redirect decision, not a content one.
 */
