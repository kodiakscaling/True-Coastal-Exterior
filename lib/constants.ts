export const BUSINESS = {
  name: "True Coastal Exterior",
  tagline: "Exterior Home Services",
  phone: "(562) 247-4470",
  phoneHref: "tel:+15622474470",
  email: "contact@truecoastalexterior.com",
  emailHref: "mailto:contact@truecoastalexterior.com",
  domain: "truecoastalexterior.com",
  serviceArea: "LA County & Orange County, California",
  hours: "Call anytime",
  socials: {
    instagram: "https://instagram.com/truecoastalexterior",
    facebook: "https://facebook.com/truecoastalexterior",
    google: "https://g.page/truecoastalexterior",
  },
} as const;

export const SERVICES = [
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    tagline: "Concrete, driveways & hardscapes",
    blurb:
      "Deep-clean grime, oil, and years of buildup from driveways, patios, walkways, and pool decks. We restore surfaces without tearing them up.",
    bullets: [
      "Driveways & sidewalks",
      "Patios & pool decks",
      "Fences & garage floors",
      "Oil & rust stain removal",
    ],
    icon: "spray",
    image: "/services/pressure-washing.jpg",
  },
  {
    slug: "house-washing",
    title: "House Washing",
    tagline: "Stucco, siding & delicate surfaces",
    blurb:
      "Low-pressure soft washing for stucco, siding, and brick that lifts algae and mildew at the root — gentle on your paint, trim, and finishes.",
    bullets: [
      "Stucco, siding & brick",
      "Algae & mildew treatment",
      "Eaves, soffits & trim",
      "Gentle on paint & siding",
    ],
    icon: "wave",
    image: "/services/house-washing.jpg",
  },
  {
    slug: "roof-washing",
    title: "Roof Washing",
    tagline: "Low-pressure, no-damage clean",
    blurb:
      "Soft washing that lifts black streaks, algae, and moss off your roof without high pressure — protecting shingles and tile while adding years to their life.",
    bullets: [
      "Asphalt shingle roofs",
      "Tile & concrete roofs",
      "Black streak & algae removal",
      "No pressure, no damage",
    ],
    icon: "roof",
    image: "/services/roof-washing.jpg",
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    tagline: "Streak-free inside & out",
    blurb:
      "Crystal-clear windows, tracks, and screens. Perfect for coastal homes battling salt haze, dust, and sea-spray film.",
    bullets: [
      "Interior + exterior glass",
      "Screen & track cleaning",
      "Skylights & storefronts",
      "Salt-spray removal",
    ],
    icon: "sparkle",
    image: "/services/window-cleaning.jpg",
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    tagline: "Clear flow, no overflow",
    blurb:
      "We clear leaves, debris, and buildup from your gutters and downspouts so water flows where it should — protecting your roof, siding, and foundation from costly damage.",
    bullets: [
      "Gutter & downspout clear-out",
      "Debris removal & flush test",
      "Downspout unclogging",
      "Exterior gutter brightening",
    ],
    icon: "gutter",
    image: "/services/gutter-cleaning.jpg",
  },
  {
    slug: "solar-panel-cleaning",
    title: "Solar Panel Cleaning",
    tagline: "Dust off, power up",
    blurb:
      "Gentle, purified-water cleaning that clears dust, salt haze, and bird droppings off your panels — restoring output and efficiency without scratching the glass.",
    bullets: [
      "Residential solar arrays",
      "Purified, spot-free rinse",
      "Dust, salt & droppings removal",
      "Restores panel efficiency",
    ],
    icon: "solar",
    image: "/services/solar-panel-cleaning.jpg",
  },
] as const;

export const SERVICE_CITIES = [
  "Long Beach",
  "Huntington Beach",
  "Newport Beach",
  "Laguna Beach",
  "Manhattan Beach",
  "Redondo Beach",
  "Hermosa Beach",
  "Santa Monica",
  "Palos Verdes",
  "San Pedro",
  "Seal Beach",
  "Dana Point",
  "San Clemente",
  "Costa Mesa",
  "Irvine",
  "Corona del Mar",
] as const;

export const TESTIMONIALS = [
  {
    name: "Maria G.",
    city: "Huntington Beach",
    rating: 5,
    quote:
      "Our stucco was covered in salt haze and algae. True Coastal made it look brand new — and they were on time, polite, and left the place spotless.",
  },
  {
    name: "David R.",
    city: "Long Beach",
    rating: 5,
    quote:
      "Best pressure washing I've had. Driveway looks like fresh concrete. Booked them again for the roof already.",
  },
  {
    name: "Ashley K.",
    city: "Newport Beach",
    rating: 5,
    quote:
      "Windows came out streak-free even with the sea spray. Great communication, fair pricing, will use again.",
  },
  {
    name: "Michael T.",
    city: "Laguna Beach",
    rating: 5,
    quote:
      "The soft wash on our house saved us from a much bigger paint job. These guys actually know what they're doing.",
  },
] as const;

export const FAQS = [
  {
    q: "How much does exterior cleaning cost?",
    a: "Every home is different, but most single-family house washes fall between $300 and $650. Driveways typically run $150–$350. Send us your address and we'll find a time to come out and take a look in person — usually within 48 hours — for a firm quote, no obligation.",
  },
  {
    q: "What's the difference between pressure washing and soft washing?",
    a: "Pressure washing uses high PSI water and is great for concrete, brick, and hardscapes. Soft washing uses low pressure and cleaning solutions — safer for stucco, siding, roofs, and painted surfaces. We use the right method for each surface, not the same tool on everything.",
  },
  {
    q: "Do you service my area?",
    a: "We serve LA County and Orange County — from Palos Verdes down through Long Beach, Huntington Beach, Newport, Laguna, and San Clemente. If you're close but unsure, just ask.",
  },
  {
    q: "How long does a typical job take?",
    a: "Most house washes take 1.5–3 hours. Driveway-only jobs are usually under 90 minutes. Roofs and full-property packages can take a full day. We give you an accurate window when we schedule.",
  },
  {
    q: "What if it rains?",
    a: "We watch the forecast closely and reschedule at no cost if the weather turns. Soft washing actually works better before rain — the rinse helps the treatment activate.",
  },
] as const;
