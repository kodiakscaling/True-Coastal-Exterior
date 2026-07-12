export type County = "Los Angeles County" | "Orange County";

export interface City {
  slug: string;
  name: string;
  county: County;
  coastal: boolean;
  /** Short vibe line shown on cards */
  tagline: string;
  /** Unique 2–3 sentence intro for the city page */
  intro: string;
  /** City-specific cleaning challenge paragraph */
  challenge: string;
  /** Neighborhoods / communities we serve */
  neighborhoods: string[];
  /** Recognizable local landmarks (used in copy + schema) */
  landmarks: string[];
  /** ZIP codes for local SEO / schema areaServed */
  zips: string[];
  /** Slugs of nearby cities for internal linking */
  nearby: string[];
}

export const CITIES: City[] = [
  // ─────────────── Los Angeles County — Coast & Westside ───────────────
  {
    slug: "malibu",
    name: "Malibu",
    county: "Los Angeles County",
    coastal: true,
    tagline: "27 miles of scenic beauty",
    intro:
      "From the bluffs of Point Dume to the sand at Carbon Beach, Malibu homes take a daily beating from salt spray, marine fog, and blowing sand. True Coastal Exterior keeps beachfront estates, hillside moderns, and canyon properties looking as sharp as the coastline they sit on.",
    challenge:
      "Oceanfront Malibu glass hazes over with salt film within days, and stucco on the windward side grows algae fast in the marine layer. We soft wash siding at low pressure and use purified-water window cleaning so the salt doesn't just get pushed around — it gets removed.",
    neighborhoods: [
      "Point Dume",
      "Carbon Beach",
      "Malibu Colony",
      "Big Rock",
      "Malibu Park",
      "Serra Retreat",
    ],
    landmarks: ["Zuma Beach", "Point Dume", "Malibu Pier", "Pepperdine University"],
    zips: ["90263", "90264", "90265"],
    nearby: ["pacific-palisades", "santa-monica"],
  },
  {
    slug: "santa-monica",
    name: "Santa Monica",
    county: "Los Angeles County",
    coastal: true,
    tagline: "Where the city meets the sea",
    intro:
      "Santa Monica's mix of Craftsman bungalows, Spanish revivals, and glassy modern builds all share one enemy: the coastal marine layer. True Coastal Exterior serves North of Montana, Sunset Park, and the beachside blocks with pressure washing, soft washing, and streak-free window cleaning.",
    challenge:
      "Blocks from the Pier, sea mist settles on everything overnight and dries into a gray film. Historic Santa Monica homes often have delicate paint and older stucco, so we dial pressure down and let the cleaning solution do the work — never blasting decades-old finishes.",
    neighborhoods: [
      "North of Montana",
      "Sunset Park",
      "Ocean Park",
      "Wilshire-Montana",
      "Mid-City",
    ],
    landmarks: ["Santa Monica Pier", "Third Street Promenade", "Palisades Park"],
    zips: ["90401", "90402", "90403", "90404", "90405"],
    nearby: ["pacific-palisades", "marina-del-rey", "malibu"],
  },
  {
    slug: "pacific-palisades",
    name: "Pacific Palisades",
    county: "Los Angeles County",
    coastal: true,
    tagline: "Coastal luxury in the hills",
    intro:
      "Tucked between the Santa Monica Mountains and the Pacific, the Palisades is home to some of LA's most valuable properties. True Coastal Exterior keeps these estates — from the Riviera to the Alphabet Streets — free of the algae, salt haze, and canyon dust that come with the territory.",
    challenge:
      "Palisades homes catch both ocean moisture and dry canyon dust, a combination that cakes onto stucco and stone. We tailor every job to the surface: soft wash for painted siding and stone, higher pressure for driveways and hardscape.",
    neighborhoods: [
      "The Riviera",
      "Alphabet Streets",
      "Huntington Palisades",
      "Marquez Knolls",
      "Castellammare",
    ],
    landmarks: ["Getty Villa", "Will Rogers State Beach", "Palisades Village"],
    zips: ["90272"],
    nearby: ["malibu", "santa-monica", "brentwood"],
  },
  {
    slug: "brentwood",
    name: "Brentwood",
    county: "Los Angeles County",
    coastal: false,
    tagline: "Westside elegance",
    intro:
      "Brentwood's gated estates and tree-lined streets deserve exteriors that match the address. True Coastal Exterior handles house washing, driveway and hardscape cleaning, and interior-and-out window washing for homes throughout the Westside.",
    challenge:
      "Mature landscaping and irrigation keep Brentwood green — but they also throw hard-water mineral spots on windows and leave organic staining on north-facing walls. Our purified-water system leaves glass spotless, and our soft wash lifts the green off shaded stucco.",
    neighborhoods: [
      "Brentwood Park",
      "Crestwood Hills",
      "Mandeville Canyon",
      "Brentwood Glen",
    ],
    landmarks: ["Getty Center", "Brentwood Country Mart", "San Vicente Blvd"],
    zips: ["90049"],
    nearby: ["pacific-palisades", "santa-monica"],
  },
  {
    slug: "marina-del-rey",
    name: "Marina del Rey",
    county: "Los Angeles County",
    coastal: true,
    tagline: "Waterfront living",
    intro:
      "With the largest man-made small-craft harbor in the country, Marina del Rey is all about the water — and the salt air that comes with it. True Coastal Exterior cleans waterfront condos, townhomes, and single-family properties along the peninsula and the Marina.",
    challenge:
      "Harbor humidity and salt corrode and cloud everything near the water. We soft wash gently on modern siding and railings, and finish with purified-water window cleaning for spot-free, salt-free glass.",
    neighborhoods: ["The Peninsula", "Silver Strand", "Marina Harbor", "Villa Marina"],
    landmarks: ["Fisherman's Village", "Burton Chace Park", "Mother's Beach"],
    zips: ["90292"],
    nearby: ["santa-monica", "el-segundo"],
  },
  {
    slug: "el-segundo",
    name: "El Segundo",
    county: "Los Angeles County",
    coastal: true,
    tagline: "Small-town beach charm",
    intro:
      "El Segundo pairs a tight-knit beach-town feel with proximity to the water. True Coastal Exterior serves its classic bungalows and newer builds with pressure washing, soft washing, and window cleaning that stands up to the salt air.",
    challenge:
      "Sitting right on the coast, El Segundo homes fight the same marine film as the beach cities to the north. We remove salt haze from windows with purified water and treat algae at the root so it doesn't grow right back.",
    neighborhoods: ["Smoky Hollow", "The Hill Section", "Downtown El Segundo"],
    landmarks: ["El Segundo Beach", "Main Street", "Chevron Refinery"],
    zips: ["90245"],
    nearby: ["manhattan-beach", "marina-del-rey"],
  },
  {
    slug: "manhattan-beach",
    name: "Manhattan Beach",
    county: "Los Angeles County",
    coastal: true,
    tagline: "The heart of the South Bay",
    intro:
      "Manhattan Beach's Strand-front homes and walk-street cottages are among the most sought-after on the West Coast. True Coastal Exterior keeps them photo-ready — washing siding, brightening decks, and clearing the salt haze off ocean-view glass.",
    challenge:
      "Homes on and near The Strand take direct ocean exposure, so windows fog with salt almost daily and horizontal surfaces collect sand. Our window cleaning uses purified water for a spot-free finish, and we rinse decks and walk-streets without damaging composite surfaces.",
    neighborhoods: [
      "The Strand",
      "The Sand Section",
      "Hill Section",
      "Tree Section",
      "East Manhattan",
    ],
    landmarks: ["Manhattan Beach Pier", "The Strand", "Downtown Manhattan Beach"],
    zips: ["90266"],
    nearby: ["hermosa-beach", "el-segundo", "redondo-beach"],
  },
  {
    slug: "hermosa-beach",
    name: "Hermosa Beach",
    county: "Los Angeles County",
    coastal: true,
    tagline: "Pure beach lifestyle",
    intro:
      "Hermosa Beach lives on its sand and its Strand. True Coastal Exterior serves the walk-streets, beach cottages, and modern rebuilds with a full exterior clean — pressure washing hardscape, soft washing siding, and leaving windows crystal clear.",
    challenge:
      "The tight walk-streets and beachfront lots mean salt, sand, and foot traffic hit these homes constantly. We work clean in tight spaces and use low-pressure methods that protect the painted and stucco finishes common in Hermosa.",
    neighborhoods: ["The Strand", "The Sand Section", "Hermosa Hills", "East Hermosa"],
    landmarks: ["Hermosa Beach Pier", "The Strand", "Pier Plaza"],
    zips: ["90254"],
    nearby: ["manhattan-beach", "redondo-beach"],
  },
  {
    slug: "redondo-beach",
    name: "Redondo Beach",
    county: "Los Angeles County",
    coastal: true,
    tagline: "Harbor and beach living",
    intro:
      "From the Esplanade to the Avenues and North Redondo, this South Bay staple mixes beach condos, single-family homes, and harbor-front properties. True Coastal Exterior handles them all with pressure washing, soft washing, and window cleaning.",
    challenge:
      "Redondo's harbor and open beachfront both push salt and moisture onto homes year-round. We match the method to the surface — gentle on the many condo and townhome finishes, thorough on driveways and pool decks.",
    neighborhoods: ["The Esplanade", "The Avenues", "North Redondo", "Golden Hills"],
    landmarks: ["Redondo Beach Pier", "King Harbor", "Riviera Village"],
    zips: ["90277", "90278"],
    nearby: ["hermosa-beach", "manhattan-beach", "palos-verdes"],
  },
  {
    slug: "palos-verdes",
    name: "Palos Verdes",
    county: "Los Angeles County",
    coastal: true,
    tagline: "Clifftop estates & ocean views",
    intro:
      "The Palos Verdes Peninsula — from Palos Verdes Estates to Rancho Palos Verdes and Rolling Hills — is defined by clifftop estates and sweeping ocean views. True Coastal Exterior keeps those views clear and those estates spotless, inside glass and out.",
    challenge:
      "Peninsula homes sit high in the wind and fog, so salt and marine grime coat windows and hillside-facing walls quickly. We specialize in the estate-grade detail these properties expect — spot-free ocean-view windows and careful soft washing of stone and stucco.",
    neighborhoods: [
      "Palos Verdes Estates",
      "Rancho Palos Verdes",
      "Rolling Hills",
      "Rolling Hills Estates",
      "Lunada Bay",
    ],
    landmarks: ["Terranea Resort", "Point Vicente Lighthouse", "Trump National Golf Club"],
    zips: ["90274", "90275"],
    nearby: ["redondo-beach", "san-pedro", "torrance"],
  },
  {
    slug: "san-pedro",
    name: "San Pedro",
    county: "Los Angeles County",
    coastal: true,
    tagline: "LA's historic harbor town",
    intro:
      "San Pedro's hillside homes and harbor views come with real coastal exposure. True Coastal Exterior serves this historic port community with pressure washing, soft washing, and window cleaning built for salt air and sea breeze.",
    challenge:
      "Between the port, the wind, and the marine layer, San Pedro homes collect salt film and grime fast. We remove it properly — purified-water windows and root-level algae treatment — instead of just rinsing it off.",
    neighborhoods: ["Vista del Oro", "Point Fermin", "The Gardens", "Downtown San Pedro"],
    landmarks: ["Point Fermin Lighthouse", "Cabrillo Beach", "Korean Bell of Friendship"],
    zips: ["90731", "90732"],
    nearby: ["palos-verdes", "long-beach"],
  },
  {
    slug: "torrance",
    name: "Torrance",
    county: "Los Angeles County",
    coastal: true,
    tagline: "South Bay's family hub",
    intro:
      "With a slice of coastline and a large, well-kept residential core, Torrance is one of the South Bay's biggest cities. True Coastal Exterior serves everything from Old Torrance to the Hollywood Riviera with a full exterior cleaning lineup.",
    challenge:
      "West Torrance and the Riviera catch coastal moisture, while inland neighborhoods deal with dust and hard water. We adjust to each — soft washing shaded, algae-prone walls and delivering spot-free windows across the city.",
    neighborhoods: ["Old Torrance", "Hollywood Riviera", "West Torrance", "Southwood"],
    landmarks: ["Torrance Beach", "Del Amo Fashion Center", "Wilson Park"],
    zips: ["90501", "90503", "90505", "90277"],
    nearby: ["redondo-beach", "palos-verdes"],
  },
  {
    slug: "long-beach",
    name: "Long Beach",
    county: "Los Angeles County",
    coastal: true,
    tagline: "Waterfront city living",
    intro:
      "From the historic homes of Belmont Shore and Naples to the bluffs above the water, Long Beach blends city energy with a coastal setting. True Coastal Exterior serves its diverse neighborhoods with pressure washing, soft washing, and window cleaning.",
    challenge:
      "Waterfront Long Beach — Naples, Belmont Shore, the Peninsula — deals with constant salt and canal humidity, while historic districts have older finishes that need a gentle touch. We bring both: careful soft washing and thorough, spot-free window work.",
    neighborhoods: [
      "Belmont Shore",
      "Naples Island",
      "Bluff Park",
      "Belmont Heights",
      "Alamitos Heights",
      "The Peninsula",
    ],
    landmarks: ["The Queen Mary", "Naples Canals", "Belmont Pier", "Shoreline Village"],
    zips: ["90803", "90802", "90814", "90815"],
    nearby: ["seal-beach", "san-pedro"],
  },

  // ─────────────── Orange County — Coast & Affluent ───────────────
  {
    slug: "seal-beach",
    name: "Seal Beach",
    county: "Orange County",
    coastal: true,
    tagline: "OC's quiet beach town",
    intro:
      "Seal Beach keeps an old-school, small-town beach feel right where LA and Orange County meet. True Coastal Exterior serves Old Town, the Hill, and the waterfront with pressure washing, soft washing, and streak-free window cleaning.",
    challenge:
      "Old Town's beachfront cottages take direct salt exposure, and the marine layer keeps shaded walls damp enough for algae. We clean the salt off glass with purified water and treat organic growth so it stays gone longer.",
    neighborhoods: ["Old Town", "The Hill", "College Park", "Bridgeport"],
    landmarks: ["Seal Beach Pier", "Main Street", "Old Town"],
    zips: ["90740"],
    nearby: ["long-beach", "huntington-beach"],
  },
  {
    slug: "huntington-beach",
    name: "Huntington Beach",
    county: "Orange County",
    coastal: true,
    tagline: "Surf City USA",
    intro:
      "Surf City's mix of beach-close tract homes, downtown properties, and Huntington Harbour waterfronts all face the ocean's wear and tear. True Coastal Exterior keeps them clean with pressure washing, soft washing, and window cleaning built for the coast.",
    challenge:
      "Huntington Harbour homes sit right on the water with constant salt and humidity, while inland tracts battle wind-blown dust. We soft wash siding and fences, brighten driveways and pool decks, and leave harbor-view windows spot-free.",
    neighborhoods: [
      "Huntington Harbour",
      "Downtown HB",
      "Seacliff",
      "Huntington Beach Mainland",
      "Edwards Hill",
    ],
    landmarks: ["Huntington Beach Pier", "Huntington Harbour", "Main Street", "Central Park"],
    zips: ["92646", "92647", "92648", "92649"],
    nearby: ["seal-beach", "newport-beach", "costa-mesa"],
  },
  {
    slug: "costa-mesa",
    name: "Costa Mesa",
    county: "Orange County",
    coastal: false,
    tagline: "The City of the Arts",
    intro:
      "Just inland from the coast, Costa Mesa spans everything from Eastside bungalows to Mesa Verde and the neighborhoods around South Coast Plaza. True Coastal Exterior serves it all with pressure washing, soft washing, and window cleaning.",
    challenge:
      "Close enough to the ocean for morning marine layer but inland enough for dust and hard water, Costa Mesa homes get a mix of both. We tailor each visit — de-spotting windows, soft washing algae, and pressure washing hardscape.",
    neighborhoods: ["Eastside Costa Mesa", "Mesa Verde", "Mesa del Mar", "South Coast Metro"],
    landmarks: ["South Coast Plaza", "OC Fair & Event Center", "The LAB Anti-Mall"],
    zips: ["92626", "92627"],
    nearby: ["newport-beach", "huntington-beach", "irvine"],
  },
  {
    slug: "newport-beach",
    name: "Newport Beach",
    county: "Orange County",
    coastal: true,
    tagline: "Harbor luxury & coastal estates",
    intro:
      "Newport Beach — from the Balboa Peninsula to the harbor islands, Newport Coast, and the bluffs — is one of California's premier coastal addresses. True Coastal Exterior delivers estate-grade exterior cleaning to match, on glass, stone, stucco, and hardscape.",
    challenge:
      "Waterfront Newport homes battle constant salt spray and harbor humidity that cloud windows and grow algae on shaded walls fast. We bring purified-water window cleaning for spot-free harbor views and gentle soft washing that protects high-end finishes.",
    neighborhoods: [
      "Balboa Peninsula",
      "Balboa Island",
      "Newport Coast",
      "Corona Highlands",
      "Dover Shores",
      "Lido Isle",
    ],
    landmarks: ["Newport Harbor", "Balboa Island", "Fashion Island", "The Wedge"],
    zips: ["92660", "92661", "92662", "92663", "92657"],
    nearby: ["corona-del-mar", "costa-mesa", "laguna-beach"],
  },
  {
    slug: "corona-del-mar",
    name: "Corona del Mar",
    county: "Orange County",
    coastal: true,
    tagline: "The Village by the sea",
    intro:
      "Corona del Mar's oceanfront estates and charming Village blocks sit on some of the most valuable land in Orange County. True Coastal Exterior keeps CdM exteriors immaculate — spot-free windows, brightened stone, and carefully soft-washed siding.",
    challenge:
      "Perched right above the water, CdM homes get relentless salt haze on ocean-view glass and marine moisture on north walls. Our purified-water system clears the salt for good, and our soft wash lifts algae without harming premium finishes.",
    neighborhoods: ["The Village", "Corona Highlands", "Shore Cliffs", "Cameo Shores"],
    landmarks: ["Corona del Mar State Beach", "Lookout Point", "Crystal Cove"],
    zips: ["92625"],
    nearby: ["newport-beach", "laguna-beach"],
  },
  {
    slug: "irvine",
    name: "Irvine",
    county: "Orange County",
    coastal: false,
    tagline: "Master-planned & meticulous",
    intro:
      "Irvine's master-planned villages set a high bar for curb appeal, and HOAs expect it kept. True Coastal Exterior serves Turtle Rock, Woodbridge, Northwood, and the newer villages with pressure washing, soft washing, and window cleaning that meets the standard.",
    challenge:
      "Irvine's inland setting means dust, sprinkler hard-water spotting, and organic staining on shaded stucco rather than salt. We de-spot windows with purified water, soft wash algae off walls, and keep driveways and entryways HOA-ready.",
    neighborhoods: ["Turtle Rock", "Woodbridge", "Northwood", "University Park", "Great Park"],
    landmarks: ["Irvine Spectrum", "UC Irvine", "Great Park", "William R. Mason Park"],
    zips: ["92602", "92603", "92604", "92606", "92612", "92618", "92620"],
    nearby: ["costa-mesa", "newport-beach", "laguna-niguel"],
  },
  {
    slug: "laguna-beach",
    name: "Laguna Beach",
    county: "Orange County",
    coastal: true,
    tagline: "Artist colony on the cliffs",
    intro:
      "Laguna Beach's hillside homes and cove-front properties cascade down to the water, each with its own exposure to the elements. True Coastal Exterior serves the coves, the Village, and the canyons with careful, coastal-tough exterior cleaning.",
    challenge:
      "Laguna's steep, cliff-hugging lots take wind-driven salt spray from every angle, and shaded canyon homes stay damp enough for heavy algae. We handle the access challenges and use soft washing and purified-water windows suited to these one-of-a-kind homes.",
    neighborhoods: ["The Village", "North Laguna", "Woods Cove", "Emerald Bay", "Three Arch Bay"],
    landmarks: ["Main Beach", "Heisler Park", "Crystal Cove", "Laguna Art Museum"],
    zips: ["92651"],
    nearby: ["corona-del-mar", "dana-point", "laguna-niguel"],
  },
  {
    slug: "laguna-niguel",
    name: "Laguna Niguel",
    county: "Orange County",
    coastal: false,
    tagline: "Hilltop South County living",
    intro:
      "Just inland of the coast, Laguna Niguel's hillside communities enjoy ocean breezes and big views. True Coastal Exterior keeps its many planned neighborhoods sharp with pressure washing, soft washing, and window cleaning.",
    challenge:
      "Ridge-top homes catch marine moisture and wind-blown dust, leaving film on windows and algae on shaded walls. We tailor the wash to each home and keep HOA-governed exteriors looking their best.",
    neighborhoods: ["Marina Hills", "Bear Brand", "Niguel Summit", "Kite Hill", "Rancho Niguel"],
    landmarks: ["Laguna Niguel Regional Park", "Bear Brand Plaza", "Aliso & Wood Canyons"],
    zips: ["92677"],
    nearby: ["laguna-beach", "dana-point", "mission-viejo"],
  },
  {
    slug: "mission-viejo",
    name: "Mission Viejo",
    county: "Orange County",
    coastal: false,
    tagline: "South County's flagship community",
    intro:
      "One of the largest master-planned communities in the country, Mission Viejo takes pride in its tidy streets and lake living. True Coastal Exterior serves it with house washing, driveway and hardscape cleaning, and spot-free window cleaning.",
    challenge:
      "Inland heat, dust, and sprinkler over-spray leave hard-water spots and organic staining across Mission Viejo. Our purified-water window cleaning and targeted soft washing keep homes bright and HOA-compliant.",
    neighborhoods: ["Lake Mission Viejo", "Deane Homes", "Madrid", "Aegean Hills", "Casta del Sol"],
    landmarks: ["Lake Mission Viejo", "The Shops at Mission Viejo", "Oso Creek Trail"],
    zips: ["92691", "92692"],
    nearby: ["laguna-niguel", "san-clemente"],
  },
  {
    slug: "dana-point",
    name: "Dana Point",
    county: "Orange County",
    coastal: true,
    tagline: "Harbor & headlands",
    intro:
      "Dana Point wraps its harbor in bluff-top estates and beach neighborhoods, from the Lantern District to Monarch Beach. True Coastal Exterior keeps these coastal homes clean with pressure washing, soft washing, and window cleaning tuned for salt air.",
    challenge:
      "Bluff and harbor homes here get heavy salt spray and marine humidity that fog windows and feed algae on shaded walls. We remove salt film with purified water and soft wash siding and stone so the coast doesn't win.",
    neighborhoods: ["Lantern District", "Monarch Beach", "Capistrano Beach", "The Headlands"],
    landmarks: ["Dana Point Harbor", "Salt Creek Beach", "Monarch Beach Resort"],
    zips: ["92629"],
    nearby: ["laguna-beach", "san-clemente", "laguna-niguel"],
  },
  {
    slug: "san-clemente",
    name: "San Clemente",
    county: "Orange County",
    coastal: true,
    tagline: "Spanish Village by the Sea",
    intro:
      "San Clemente's signature Spanish-style homes and ocean-view hills mark the southern edge of Orange County's coast. True Coastal Exterior serves the Pier Bowl, Riviera District, and Talega with coastal-tough pressure washing, soft washing, and window cleaning.",
    challenge:
      "The city's iconic white stucco and red-tile look shows every bit of salt haze and algae, especially near the pier and on ocean-facing slopes. We soft wash stucco safely and use purified water so those bright walls and clear windows stay that way.",
    neighborhoods: ["Pier Bowl", "Riviera District", "Talega", "Southwest San Clemente", "Forster Ranch"],
    landmarks: ["San Clemente Pier", "T-Street Beach", "Casa Romantica", "Trestles"],
    zips: ["92672", "92673"],
    nearby: ["dana-point", "mission-viejo"],
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function citiesByCounty(county: County): City[] {
  return CITIES.filter((c) => c.county === county);
}

export const COASTAL_CITIES = CITIES.filter((c) => c.coastal);
