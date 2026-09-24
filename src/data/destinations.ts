import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-01',
    slug: 'dubai-uae',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Arabian Gulf',
    tagline: 'A hyper-modern metropolis anchored by historic creek wharves and desert traditions.',
    description: 'Beyond the gleaming glass towers and architectural superlatives lies the historic quarter of Deira and Bur Dubai, where wooden dhows have unloaded spices, carpets, and silks along the creek for well over a century.',
    coverImage: '/src/assets/images/hero_travel_journal_1790236025041.jpg',
    galleryImages: [
      '/src/assets/images/hero_travel_journal_1790236025041.jpg',
      '/src/assets/images/dest_sharjah_desert_1790236047311.jpg',
      '/src/assets/images/creator_portrait_1790236082709.jpg'
    ],
    coordinates: {
      lat: 25.2048,
      lng: 55.2708
    },
    articleCount: 3,
    episodeCount: 2,
    bestTimeToVisit: 'November to March (20°C–28°C with pleasant sea breezes)',
    highlights: [
      'Deira Spice Souk & Historic Al Fahidi Bastakiya Quarter',
      'Traditional 1-Dirham Abra Crossing across Dubai Creek',
      'Al Qudra Desert Lakes & Wildlife Cycling Track',
      'Alserkal Avenue Contemporary Art District in Al Quoz'
    ],
    travelNotes: [
      'Public transport is exceptionally clean and efficient: get a Silver Nol Card for the Metro and Tram.',
      'For authentic street food, bypass Downtown and explore the Pakistani & Iranian eateries in Al Karama and Deira.',
      'Friday and Saturday evenings are when the Creek promenade is most vibrant with locals and sailors.'
    ],
    relatedBlogSlugs: [
      'old-dubai-creek-street-food-guide',
      'essential-solo-student-travel-tips'
    ],
    relatedEpisodeIds: [
      'ep-03'
    ],
    mapMarkers: [
      {
        id: 'poi-dxb-1',
        name: 'Old Dubai Creek & Dhow Wharves',
        description: 'Vibrant spice souks and traditional wooden abra boats crossing the saltwater inlet.',
        category: 'Audio Spot',
        lat: 25.2669,
        lng: 55.2974,
        blogSlug: 'old-dubai-creek-street-food-guide',
        episodeId: 'ep-03'
      },
      {
        id: 'poi-dxb-2',
        name: 'Al Fahidi Historical Quarter',
        description: '19th-century gypsum and coral wind-tower houses housing tea houses and galleries.',
        category: 'History',
        lat: 25.2638,
        lng: 55.2995,
        blogSlug: 'old-dubai-creek-street-food-guide'
      },
      {
        id: 'poi-dxb-3',
        name: 'Al Qudra Desert Lakes',
        description: 'Quiet sand dunes and migratory bird sanctuaries at sunset.',
        category: 'Nature',
        lat: 24.8360,
        lng: 55.3670,
        blogSlug: 'essential-solo-student-travel-tips'
      },
      {
        id: 'poi-dxb-4',
        name: 'Al Karama Street Food Corridor',
        description: 'Hidden gem tea stalls and clay-oven tandoori cafeterias.',
        category: 'Food',
        lat: 25.2415,
        lng: 55.3056,
        blogSlug: 'old-dubai-creek-street-food-guide'
      }
    ]
  },
  {
    id: 'dest-02',
    slug: 'sharjah-uae',
    name: 'Sharjah',
    country: 'United Arab Emirates',
    region: 'Arabian Gulf',
    tagline: 'The cultural and heritage soul of the UAE, rich in contemporary art and desert history.',
    description: 'Crowned UNESCO\'s Cultural Capital of the Arab World, Sharjah blends world-class art foundations, restored heritage coral houses, and the sweeping archaeological dunes of Mleiha.',
    coverImage: '/src/assets/images/dest_sharjah_desert_1790236047311.jpg',
    galleryImages: [
      '/src/assets/images/dest_sharjah_desert_1790236047311.jpg',
      '/src/assets/images/hero_travel_journal_1790236025041.jpg',
      '/src/assets/images/podcast_cover_art_1790236037002.jpg'
    ],
    coordinates: {
      lat: 25.3573,
      lng: 55.4033
    },
    articleCount: 2,
    episodeCount: 1,
    bestTimeToVisit: 'October to April',
    highlights: [
      'Sharjah Art Foundation & Heart of Sharjah Heritage District',
      'Mleiha Archaeological Centre & Fossil Rock Dunes',
      'Souq Al Shanasiyah (Restored 1950s coral stone market)',
      'Sharjah Museum of Islamic Civilization'
    ],
    travelNotes: [
      'Sharjah observes modest dress codes and is alcohol-free, maintaining a family and scholarly atmosphere.',
      'Take public bus E303 or E307 from Dubai Union / Deira station for just 12 AED.',
      'The desert dunes around Mleiha are among the redder sands in the UAE, ideal for sunrise photography.'
    ],
    relatedBlogSlugs: [
      'sunrise-sharjah-desert-mleiha-guide'
    ],
    relatedEpisodeIds: [
      'ep-01'
    ],
    mapMarkers: [
      {
        id: 'poi-shj-1',
        name: 'Mleiha Desert Dunes & Fossil Rock',
        description: 'Sweeping ochre desert dunes with Bronze Age tombs and eerie acoustic silence.',
        category: 'Audio Spot',
        lat: 25.1488,
        lng: 55.8569,
        blogSlug: 'sunrise-sharjah-desert-mleiha-guide',
        episodeId: 'ep-01'
      },
      {
        id: 'poi-shj-2',
        name: 'Heart of Sharjah Heritage Quarter',
        description: 'Restored coral-stone windtower alleyways and artist residencies.',
        category: 'History',
        lat: 25.3582,
        lng: 55.3857,
        blogSlug: 'sunrise-sharjah-desert-mleiha-guide'
      },
      {
        id: 'poi-shj-3',
        name: 'Souq Al Jubail Waterfront Fish & Fruit Market',
        description: 'Grand domed architecture with lively fish auctions and freshly ground spice stalls.',
        category: 'Food',
        lat: 25.3524,
        lng: 55.3831
      }
    ]
  },
  {
    id: 'dest-03',
    slug: 'abu-dhabi-uae',
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    region: 'Arabian Gulf',
    tagline: 'Stately waterfront boulevards, mangrove archipelagos, and world-class museum architecture.',
    description: 'The capital of the Emirates offers a contemplative, unhurried rhythm. From the celestial dome of the Louvre Abu Dhabi to the silent turquoise lagoons of Jubail Mangrove Park and the starry desert of Al Quaa.',
    coverImage: '/src/assets/images/podcast_cover_art_1790236037002.jpg',
    galleryImages: [
      '/src/assets/images/podcast_cover_art_1790236037002.jpg',
      '/src/assets/images/dest_sharjah_desert_1790236047311.jpg',
      '/src/assets/images/hero_travel_journal_1790236025041.jpg'
    ],
    coordinates: {
      lat: 24.4539,
      lng: 54.3773
    },
    articleCount: 2,
    episodeCount: 1,
    bestTimeToVisit: 'November to April',
    highlights: [
      'Louvre Abu Dhabi & Saadiyat Cultural District',
      'Sheikh Zayed Grand Mosque (Remarkable floral marble inlays)',
      'Jubail Mangrove Park Boardwalks',
      'Al Quaa "Milky Way Spot" Dark Sky Desert Sanctuary'
    ],
    travelNotes: [
      'Sheikh Zayed Grand Mosque offers free guided cultural tours—book online ahead of sunset.',
      'Free public Wi-Fi and air-conditioned bus shelters exist across the central Corniche.',
      'Kayaking in the Eastern Mangroves during sunrise provides stunning birdwatching opportunities.'
    ],
    relatedBlogSlugs: [
      'quiet-corners-abu-dhabi-mangroves-louvre'
    ],
    relatedEpisodeIds: [
      'ep-04'
    ],
    mapMarkers: [
      {
        id: 'poi-auh-1',
        name: 'Jubail Mangrove Park Boardwalk',
        description: 'Tidal saltwater estuaries with herons, flamingos, and tranquil floating walkways.',
        category: 'Nature',
        lat: 24.5458,
        lng: 54.4842,
        blogSlug: 'quiet-corners-abu-dhabi-mangroves-louvre',
        episodeId: 'ep-04'
      },
      {
        id: 'poi-auh-2',
        name: 'Louvre Abu Dhabi "Rain of Light"',
        description: 'Jean Nouvel dome floating over seawater galleries with quiet contemplative courts.',
        category: 'Sight',
        lat: 24.5337,
        lng: 54.3982,
        blogSlug: 'quiet-corners-abu-dhabi-mangroves-louvre'
      },
      {
        id: 'poi-auh-3',
        name: 'Al Quaa Dark Sky Sanctuary',
        description: 'Remote desert bowl offering Bortle Class 2 stargazing under the Milky Way core.',
        category: 'Audio Spot',
        lat: 23.5932,
        lng: 54.7643,
        episodeId: 'ep-04'
      }
    ]
  },
  {
    id: 'dest-04',
    slug: 'hatta-uae',
    name: 'Hatta',
    country: 'United Arab Emirates',
    region: 'Hajar Mountains',
    tagline: 'Dramatic mountain gorges, emerald waters, and rugged trail-running escapes.',
    description: 'An inland mountain enclave surrounded by the jagged Hajar peaks. Famous for its deep turquoise reservoir, ancient stone watchtowers, honeybee sanctuaries, and cool mountain breezes.',
    coverImage: '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
    galleryImages: [
      '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
      '/src/assets/images/hero_travel_journal_1790236025041.jpg',
      '/src/assets/images/dest_sharjah_desert_1790236047311.jpg'
    ],
    coordinates: {
      lat: 24.8028,
      lng: 56.1264
    },
    articleCount: 2,
    episodeCount: 1,
    bestTimeToVisit: 'November to March (Crisp mountain nights down to 12°C)',
    highlights: [
      'Kayaking and paddleboarding on the Hatta Dam reservoir',
      'Hatta Mountain Bike Trail Centre (50+ km of graded singletrack)',
      'Hatta Heritage Village & 300-year-old defense towers',
      'Wild camping spots along the quiet mountain wadi trails'
    ],
    travelNotes: [
      'Direct Dubai RTA bus H02 departs daily from Dubai Mall for 25 AED.',
      'Early mornings (before 9 AM) are essential to beat both day-tripper crowds and midday sun.',
      'Bring warm layers for winter camping as temperatures drop steeply in the valleys.'
    ],
    relatedBlogSlugs: [
      'hatta-mountain-weekend-escape-guide'
    ],
    relatedEpisodeIds: [
      'ep-02'
    ],
    mapMarkers: [
      {
        id: 'poi-hat-1',
        name: 'Hatta Dam Emerald Reservoir',
        description: 'Turquoise reservoir enclosed between jagged Hajar rock walls.',
        category: 'Audio Spot',
        lat: 24.7845,
        lng: 56.1186,
        blogSlug: 'hatta-mountain-weekend-escape-guide',
        episodeId: 'ep-02'
      },
      {
        id: 'poi-hat-2',
        name: 'Hatta Heritage Village & Watchtowers',
        description: 'Restored mountain defensive fort and palm-frond barasti homes.',
        category: 'History',
        lat: 24.8197,
        lng: 56.1289,
        blogSlug: 'hatta-mountain-weekend-escape-guide'
      },
      {
        id: 'poi-hat-3',
        name: 'Hatta Honeybee Discovery Garden',
        description: 'Native Samar tree apiaries producing wild mountain acacia honey.',
        category: 'Nature',
        lat: 24.8073,
        lng: 56.1384
      }
    ]
  },
  {
    id: 'dest-05',
    slug: 'muscat-oman',
    name: 'Muscat',
    country: 'Oman',
    region: 'Gulf of Oman',
    tagline: 'Ancient frankincense ports, sea-facing fortresses, and low-rise whitewashed coastal charm.',
    description: 'The ancient maritime capital of Oman maintains strict architectural harmony with its natural setting—hemmed in by jagged black ophiolite cliffs and the warm, dolphin-rich waters of the Arabian Sea.',
    coverImage: '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
    galleryImages: [
      '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
      '/src/assets/images/dest_sharjah_desert_1790236047311.jpg',
      '/src/assets/images/hero_travel_journal_1790236025041.jpg'
    ],
    coordinates: {
      lat: 23.5880,
      lng: 58.3829
    },
    articleCount: 1,
    episodeCount: 1,
    bestTimeToVisit: 'October to April',
    highlights: [
      'Muttrah Corniche & Historic Frankincense Souq',
      'Sultan Qaboos Grand Mosque & Handcrafted Persian Carpet',
      'Daymaniyat Islands Coral Reefs & Sea Turtle Snorkeling',
      'Bimmah Sinkhole & Wadi Shab Freshwater Gorges'
    ],
    travelNotes: [
      'Oman uses the Omani Rial (OMR). Most merchants in the souq accept cards, but cash is great for frankincense.',
      'Renting a car is the most practical way to explore coastal watchtowers and mountain wadis.',
      'Omani hospitality is legendary—accepting kahwa (cardamom coffee) and fresh dates is customary etiquette.'
    ],
    relatedBlogSlugs: [
      'muscat-oman-coastal-roadtrip-journal'
    ],
    relatedEpisodeIds: [
      'ep-05'
    ],
    mapMarkers: [
      {
        id: 'poi-mct-1',
        name: 'Muttrah Corniche & Frankincense Souq',
        description: 'Labyrinthine timber-roof alleys scented with silver hojari frankincense and myrrh.',
        category: 'Audio Spot',
        lat: 23.6265,
        lng: 58.5638,
        blogSlug: 'muscat-oman-coastal-roadtrip-journal',
        episodeId: 'ep-05'
      },
      {
        id: 'poi-mct-2',
        name: 'Wadi Shab Gorge Hike & Cave Waterfall',
        description: 'Aquamarine freshwater pools leading to a hidden swim-in cavern.',
        category: 'Nature',
        lat: 22.8385,
        lng: 59.2452,
        blogSlug: 'muscat-oman-coastal-roadtrip-journal'
      }
    ]
  },
  {
    id: 'dest-06',
    slug: 'cappadocia-turkiye',
    name: 'Cappadocia',
    country: 'Türkiye',
    region: 'Central Anatolia',
    tagline: 'Fairy chimney valleys, subterranean ancient cities, and sunrise hot air balloon horizons.',
    description: 'A surreal wonderland of soft volcanic tuff formations hollowed out over millennia into subterranean monastic complexes, cave homes, and terraced pigeon valleys.',
    coverImage: '/src/assets/images/dest_cappadocia_balloons_1790236072081.jpg',
    galleryImages: [
      '/src/assets/images/dest_cappadocia_balloons_1790236072081.jpg',
      '/src/assets/images/hero_travel_journal_1790236025041.jpg',
      '/src/assets/images/creator_portrait_1790236082709.jpg'
    ],
    coordinates: {
      lat: 38.6431,
      lng: 34.8289
    },
    articleCount: 1,
    episodeCount: 0,
    bestTimeToVisit: 'April to June & September to November',
    highlights: [
      'Rose Valley & Love Valley Sunrise Viewpoints',
      'Göreme Open Air Museum Byzantine Frescoes',
      'Derinkuyu Multi-Level Underground City',
      'Uçhisar Rock Castle Panoramic Summit'
    ],
    travelNotes: [
      'You do not have to book a balloon flight to enjoy the spectacles; viewing from valley ridges at dawn is free and extraordinary.',
      'Pack sturdy walking boots—the soft tuff rock can be dusty and gravelly on descents.',
      'Try the authentic Testi Kebab (slow-cooked clay pot stew broken open at your table).'
    ],
    relatedBlogSlugs: [
      'cappadocia-dawn-balloons-budget-guide'
    ],
    relatedEpisodeIds: [],
    mapMarkers: [
      {
        id: 'poi-cap-1',
        name: 'Love Valley Sunrise Ridge',
        description: 'Spectacular dawn viewpoint where hot air balloons float over fairy chimneys.',
        category: 'Sight',
        lat: 38.6620,
        lng: 34.8290,
        blogSlug: 'cappadocia-dawn-balloons-budget-guide'
      },
      {
        id: 'poi-cap-2',
        name: 'Göreme Open Air Museum',
        description: 'Rock-hewn churches with preserved 10th-century Byzantine religious frescoes.',
        category: 'History',
        lat: 38.6402,
        lng: 34.8453,
        blogSlug: 'cappadocia-dawn-balloons-budget-guide'
      },
      {
        id: 'poi-cap-3',
        name: 'Derinkuyu Underground City',
        description: '8-story subterranean refuge with ventilation shafts and stone rolling doors.',
        category: 'History',
        lat: 38.3736,
        lng: 34.7347
      }
    ]
  }
];
