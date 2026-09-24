import { BlogArticle } from '../types';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'post-01',
    slug: 'sunrise-sharjah-desert-mleiha-guide',
    title: 'Sunrise Over the Sharjah Desert: A Field Guide to Mleiha',
    subtitle: 'Where ancient red sands meet silent prehistoric crags just an hour east of the city.',
    excerpt: 'Waking up before the call to prayer, escaping the highway lights, and finding the quietest dawn in the Emirates among the rust-red ridges of Mleiha.',
    coverImage: '/src/assets/images/dest_sharjah_desert_1790236047311.jpg',
    author: {
      name: 'Zayn Al-Mansoor',
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      role: 'Student Traveler & Field Recordist',
      bio: 'Undergraduate student, analog photographer, and audio producer exploring the Levant and Gulf by bus, foot, and shared taxi.'
    },
    publishedAt: 'September 12, 2026',
    readTime: '6 min read',
    category: 'UAE',
    location: {
      city: 'Sharjah',
      country: 'United Arab Emirates',
      coordinates: {
        lat: 25.1278,
        lng: 55.8524
      }
    },
    tags: ['Desert', 'Sunrise', 'Archaeology', 'Sharjah', 'Slow Travel'],
    featured: true,
    relatedPodcastId: 'ep-01',
    content: {
      leadParagraph: 'There is a ten-minute window just before the sun clears the craggy silhouette of Fossil Rock when the Sharjah desert loses its golden glaze and turns a deep, volcanic crimson. At 5:15 AM, the air is crisp enough to bite your knuckles, and the only sound is the microscopic hiss of sand grains tumbling down the leeward slope of a dune.',
      sections: [
        {
          heading: 'Leaving the Coast Before Dawn',
          body: [
            'Most visitors know Sharjah for its cultural square and contemporary art biennials. But if you take the E102 eastbound toward the mountains, the urban glow recedes within twenty minutes. The highway shrinks, the streetlights space out, and the darkness of Mleiha wraps around the car like heavy wool.',
            'Mleiha is not just an expanse of rolling dunes; it is one of the most significant archaeological landscapes in the Arabian Peninsula. People have inhabited these sheltered basins for over 130,000 years, carving out lives between copper smelters, camel trade corridors, and subterranean water channels.'
          ],
          pullQuote: 'The silence here isn\'t an absence of noise—it is a heavy, resonant presence that recalibrates your hearing after weeks in the city.'
        },
        {
          heading: 'The Geometry of the Morning Crest',
          body: [
            'I set up my portable recorder with a stereo pair of omnidirectional microphones tucked behind a foam windshield. As the sky shifted from slate indigo to pale apricot, a steady desert breeze picked up from the east. It carried the faint, dry scent of acacia wood and sun-warmed limestone.',
            'When photographing the desert, the inclination is to shoot wide landscapes. But the real poetry lies in the macro shadows: the delicate ripple crests that shift millimeter by millimeter, the tracks of a solitary desert beetle heading steadfastly into the wind, and the sharp razor-edge shadow dividing light from shade.'
          ],
          image: {
            url: '/src/assets/images/dest_sharjah_desert_1790236047311.jpg',
            caption: 'The dramatic morning light carving ridge shadows across the Mleiha valley.'
          }
        },
        {
          heading: 'Practical Advice for the Early Riser',
          body: [
            'If you plan to make the journey yourself, avoid the tourist convoy spots. Rent a reliable vehicle, pack plenty of water and a thermos of hot cardamom tea, and arrive at least 45 minutes before astronomical sunrise.',
            'Keep your camera bag sealed until you are ready to shoot—the fine silicate dust here finds every zipper and seam. And above all, take ten minutes to put the lens cap back on, close your eyes, and listen to the landscape wake up.'
          ]
        }
      ],
      travelTips: [
        'Best time to visit: October through April between 5:00 AM and 8:30 AM.',
        'Vehicle requirement: Standard 2WD is fine to reach the paved archaeological center and roadside viewpoints, but 4WD with deflated tires is mandatory for deep dune tracks.',
        'Audio spot: The eastern base of Camel Rock offers natural acoustic shielding from highway wind.'
      ]
    }
  },
  {
    id: 'post-02',
    slug: 'hatta-mountain-weekend-escape-guide',
    title: 'A Student Guide to Hatta: Kayaks, Ridges, and Campfires',
    subtitle: 'How to spend 48 hours in Dubai’s rugged mountain enclave on a $60 budget.',
    excerpt: 'Leave behind the neon towers for turquoise reservoirs, jagged mountain switchbacks, and brisk desert nights under the Hajar peaks.',
    coverImage: '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
    author: {
      name: 'Zayn Al-Mansoor',
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      role: 'Student Traveler & Field Recordist',
      bio: 'Undergraduate student, analog photographer, and audio producer exploring the Levant and Gulf by bus, foot, and shared taxi.'
    },
    publishedAt: 'September 04, 2026',
    readTime: '7 min read',
    category: 'Budget Travel',
    location: {
      city: 'Hatta',
      country: 'United Arab Emirates',
      coordinates: {
        lat: 24.8028,
        lng: 56.1264
      }
    },
    tags: ['Hatta', 'Mountains', 'Budget Travel', 'Hiking', 'Adventure'],
    featured: true,
    relatedPodcastId: 'ep-02',
    content: {
      leadParagraph: 'Tucked away against the Oman border, Hatta feels like a different country altogether. The air drops five degrees, the horizon is hemmed in by serrated ophiolite rock, and the water of Hatta Dam shines with an impossible turquoise intensity that seems entirely unreal under the desert sun.',
      sections: [
        {
          heading: 'Getting There for Less Than 25 Dirhams',
          body: [
            'You do not need a luxury SUV to experience the Hatta mountains. The Dubai RTA Hatta Express bus (H02) runs regularly from Dubai Mall or Sabkha Bus Station for just 25 AED each way. The two-hour ride winds past camel farms and orange dunes before climbing steadily into the rocky passes.',
            'Once you arrive, the public on-demand electric minibuses connect the bus hub with Hatta Dam, the Heritage Village, and Hatta Wadi Hub trails for negligible fares.'
          ],
          pullQuote: 'Paddling out into the center of the reservoir at 7 AM feels like entering a natural cathedral carved from volcanic stone.'
        },
        {
          heading: 'Sunrise on the Turquoise Reservoir',
          body: [
            'Rent a single kayak right when the dam rental hut opens at 7:00 AM before the tour groups arrive. As you paddle away from the floating dock, the high canyon walls close in around you, cutting off the breeze and creating a serene mirror reflection.',
            'If you hike up the hill trail behind the dam viewpoint, you get a panoramic view spanning both the deep water basin and the historic stone watchtowers that have guarded this mountain pass for over three centuries.'
          ],
          image: {
            url: '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
            caption: 'Early morning light on the dramatic emerald gorge of Hatta Dam.'
          }
        },
        {
          heading: 'Where to Camp & Local Food Spots',
          body: [
            'Free wild camping is permitted in designated public mountain sectors as long as you leave no trace. Bring a thermal sleeping mat—the rocky ground pulls body heat rapidly during desert winter nights.',
            'For dinner, skip the tourist resort diners and head to the small cafeteria cluster near Hatta Souq. Order fresh grilled seabream, warm parotta flatbread, and a tall glass of spiced karak tea for less than $8 total.'
          ]
        }
      ],
      travelTips: [
        'Bus schedule: Catch the 6:30 AM H02 bus from Dubai to maximize your daylight hiking hours.',
        'Trail markings: Follow the official Green (easy) and Blue (moderate) trail ribbons; avoid unmarked switchbacks after 4:00 PM due to rapid dusk.',
        'Water intake: Carry at least 3 liters of water per person even during winter months.'
      ]
    }
  },
  {
    id: 'post-03',
    slug: 'old-dubai-creek-street-food-guide',
    title: 'Street Food and Secret Bakeries Along Dubai Creek',
    subtitle: 'A walking feast through Deira, Al Ras, and the 1-Dirham abra crossings.',
    excerpt: 'Forget the Michelin tasting menus. The true culinary heartbeat of Dubai lives in the narrow alleyways of Deira, where 50-year-old clay tandoors bake fresh bread from dawn till midnight.',
    coverImage: '/src/assets/images/hero_travel_journal_1790236025041.jpg',
    author: {
      name: 'Zayn Al-Mansoor',
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      role: 'Student Traveler & Field Recordist',
      bio: 'Undergraduate student, analog photographer, and audio producer exploring the Levant and Gulf by bus, foot, and shared taxi.'
    },
    publishedAt: 'August 26, 2026',
    readTime: '5 min read',
    category: 'Food',
    location: {
      city: 'Dubai',
      country: 'United Arab Emirates',
      coordinates: {
        lat: 25.2697,
        lng: 55.3095
      }
    },
    tags: ['Street Food', 'Dubai Creek', 'Deira', 'Foodie', 'Culture'],
    featured: false,
    relatedPodcastId: 'ep-03',
    content: {
      leadParagraph: 'If you want to understand the true pulse of Dubai, leave the glass skyscrapers of Downtown behind and take the metro to Al Ras station. Here, the air smells of roasted cumin, dried Persian limes, and motor oil from the wooden trading dhows that still load cargo destined for Iran and the Horn of Africa.',
      sections: [
        {
          heading: 'The 1-Dirham Abra Crossing',
          body: [
            'Before eating, start by crossing the Creek. The wooden abras run continuously from Deira Old Souk Station to Bur Dubai. You sit shoulder-to-shoulder with merchants, tailors, and students as the diesel engine chugs and the spray cools your face. It remains the best one-dirham investment on earth.'
          ],
          pullQuote: 'The best dishes here have no Instagram accounts; they have fifty-year-old sourdough starters and a line of regulars stretching down the pavement.'
        },
        {
          heading: 'Four Essential Food Stops',
          body: [
            '1. Traditional Iranian Sangak Bakery (Al Musalla Rd): Watch the bakers stretch whole-wheat sourdough over glowing river pebbles. Served piping hot with salted feta cheese.',
            '2. Garlic Sauce Perfection: A hole-in-the-wall shawarma stand near Naif Souq that still roasts its spit over natural charcoal rather than electric burners.',
            '3. Saffron & Pistachio Kulfi: Handmade dairy ice cream churned in copper cylinders along the Gold Souk perimeter.',
            '4. Fresh Sulaimani Tea: Black tea steeped with crushed fresh mint and dried cardamom pods for exactly 1.50 AED.'
          ]
        }
      ],
      travelTips: [
        'Best time: 4:30 PM to 9:30 PM when the souks come alive and evening air cools.',
        'Payment: Cash (small bills/coins) is preferred at small family-run bakeries and spice stalls.',
        'Metro stop: Al Ras (Green Line) or Al Ghubaiba (Green Line).'
      ]
    }
  },
  {
    id: 'post-04',
    slug: 'quiet-corners-abu-dhabi-mangroves-louvre',
    title: 'The Quiet Side of Abu Dhabi: Mangroves, Light, and Deep Desert',
    subtitle: 'Seeking architectural serenity and pitch-black night skies in the capital.',
    excerpt: 'Beyond the grand boulevards lies a city of unexpected stillness: boardwalks through tidal mangrove forests and dome-filtered sunlight at the Louvre.',
    coverImage: '/src/assets/images/podcast_cover_art_1790236037002.jpg',
    author: {
      name: 'Zayn Al-Mansoor',
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      role: 'Student Traveler & Field Recordist',
      bio: 'Undergraduate student, analog photographer, and audio producer exploring the Levant and Gulf by bus, foot, and shared taxi.'
    },
    publishedAt: 'August 18, 2026',
    readTime: '6 min read',
    category: 'City Guides',
    location: {
      city: 'Abu Dhabi',
      country: 'United Arab Emirates',
      coordinates: {
        lat: 24.4539,
        lng: 54.3773
      }
    },
    tags: ['Abu Dhabi', 'Architecture', 'Nature', 'Louvre', 'Photography'],
    featured: false,
    relatedPodcastId: 'ep-04',
    content: {
      leadParagraph: 'Where Dubai is vertical and kinetic, Abu Dhabi is horizontal and measured. It is a city that rewards those who linger: watching tidal waters lap against grey mangrove roots or resting on a marble bench beneath the geometric filigree of Jean Nouvel’s floating dome.',
      sections: [
        {
          heading: 'The Geometry of Silence: Louvre Abu Dhabi',
          body: [
            'Visiting the Louvre Abu Dhabi on a Tuesday morning is a transformative aesthetic experience. The dome, composed of 7,850 unique star-shaped metal perforations, filters the fierce desert sun into a shifting "rain of light" that moves across white waterfront pavilions.',
            'Sit along the seaward edge of the plaza and listen to the Arabian Gulf water gently sloshing beneath the cantilevered floor.'
          ],
          pullQuote: 'Light in the desert is often relentless, but filtered through good architecture, it becomes meditative.'
        },
        {
          heading: 'Jubail Mangrove Sanctuary',
          body: [
            'Only fifteen minutes from the city center, the Jubail Mangrove Park protects thousands of hectares of coastal vegetation that sequester carbon and host flamingos, herons, and juvenile reef fish. The floating boardwalks let you walk miles over tidal estuaries without disturbing the delicate roots.'
          ]
        }
      ],
      travelTips: [
        'Student discount: University students get free or heavily discounted admission to Louvre Abu Dhabi with valid student ID.',
        'Mangrove timing: Check high tide tables before booking your walk to see the roots submerged under clear seawater.'
      ]
    }
  },
  {
    id: 'post-05',
    slug: 'muscat-oman-coastal-roadtrip-journal',
    title: 'Mountains, Markets, and Muscat: An Omani Journal',
    subtitle: 'Taking the overland route from the UAE to the ancient frankincense ports.',
    excerpt: 'White-washed harbor towns, towering limestone fjords, and the intoxicating scent of silver frankincense in the alleys of Muttrah.',
    coverImage: '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
    author: {
      name: 'Zayn Al-Mansoor',
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      role: 'Student Traveler & Field Recordist',
      bio: 'Undergraduate student, analog photographer, and audio producer exploring the Levant and Gulf by bus, foot, and shared taxi.'
    },
    publishedAt: 'August 05, 2026',
    readTime: '8 min read',
    category: 'Nature',
    location: {
      city: 'Muscat',
      country: 'Oman',
      coordinates: {
        lat: 23.5880,
        lng: 58.3829
      }
    },
    tags: ['Oman', 'Muscat', 'Road Trip', 'Heritage', 'Markets'],
    featured: false,
    relatedPodcastId: 'ep-05',
    content: {
      leadParagraph: 'Crossing the land border into Oman at Hatta-Wajaja marks an immediate shift in geology and architecture. The buildings are strictly low-rise, painted in immaculate shades of cream and chalk-white, crowned with traditional battlements rather than glass spires.',
      sections: [
        {
          heading: 'The Frankincense Trail of Muttrah Souq',
          body: [
            'Muttrah is one of the oldest port settlements in the Arabian Sea. As you enter the timber-roofed souq, the aroma of Royal Hojari frankincense smoldering in clay burners fills every corridor. Merchants offer samples of warm Omani halwa infused with rosewater, saffron, and crushed almonds alongside silver khanjar daggers.'
          ],
          pullQuote: 'Oman is a country that never traded its soul for speed.'
        },
        {
          heading: 'Climbing Jebel Akhdar',
          body: [
            'Two hours inland, the road climbs thousands of meters onto the green mountain plateau of Jebel Akhdar. Here, ancient stone villages cling to sheer cliffs above centuries-old terraced orchards of pomegranates, walnuts, and Damask roses.'
          ]
        }
      ],
      travelTips: [
        'Border crossing: Ensure your passport has at least 6 months validity and check GCC e-visa eligibility prior to road departure.',
        'Driving in Oman: 4WD vehicle is legally required by police checkpoints to climb Jebel Akhdar and Jebel Shams.'
      ]
    }
  },
  {
    id: 'post-06',
    slug: 'the-art-of-slow-travel-photography',
    title: 'The Art of Slow Travel Photography: One Lens, One Notebook',
    subtitle: 'Why limiting your camera gear transforms how you see and connect with people.',
    excerpt: 'After carrying 15 kilograms of zoom lenses across three continents, I switched to a single 35mm prime lens. Here is how it made me a better storyteller.',
    coverImage: '/src/assets/images/creator_portrait_1790236082709.jpg',
    author: {
      name: 'Zayn Al-Mansoor',
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      role: 'Student Traveler & Field Recordist',
      bio: 'Undergraduate student, analog photographer, and audio producer exploring the Levant and Gulf by bus, foot, and shared taxi.'
    },
    publishedAt: 'July 24, 2026',
    readTime: '5 min read',
    category: 'Photography',
    location: {
      city: 'Field Notes',
      country: 'Global',
      coordinates: {
        lat: 25.2048,
        lng: 55.2708
      }
    },
    tags: ['Photography', 'Philosophy', 'Gear', 'Storytelling', 'Travel Tips'],
    featured: false,
    relatedPodcastId: 'ep-06',
    content: {
      leadParagraph: 'When you walk down a busy alleyway with a giant telephoto lens and two camera bodies slung around your neck, you are not a traveler; you are an intruder behind a glass wall. People tense up, candid expressions vanish, and your neck aches before noon.',
      sections: [
        {
          heading: 'The Freedom of the 35mm Focal Length',
          body: [
            'A 35mm lens approximates the natural field of human vision with peripheral context. To take a portrait, you cannot zoom in from across the street. You must walk over, make eye contact, say hello, and ask for permission. That 30-second human exchange invariably yields a portrait with warmth and genuine connection.'
          ],
          pullQuote: 'Your best travel photographs will never be about the resolution of your sensor, but about the trust you built before clicking the shutter.'
        },
        {
          heading: 'Pairing Audio with Still Frames',
          body: [
            'The biggest revelation of my student travels was carrying a pocket audio recorder. When you look at a photograph of a spice market, it is beautiful. But when you listen to the merchant greeting his customer and the tea glasses clinking while looking at that photograph, the memory returns in full three-dimensional fidelity.'
          ]
        }
      ],
      travelTips: [
        'Gear discipline: Pick one lens and commit to it for an entire month.',
        'Backup strategy: Dual SD cards in-camera with automated overnight backup to an encrypted SSD.'
      ]
    }
  },
  {
    id: 'post-07',
    slug: 'cappadocia-dawn-balloons-budget-guide',
    title: 'Cappadocia at Dawn: Fairy Chimneys and Valley Trails',
    subtitle: 'Navigating Göreme, Rose Valley, and ancient cave dwellings on a student budget.',
    excerpt: 'Watching 150 hot air balloons ascend into the pink morning sky over volcanic tuff formations, and exploring ancient subterranean cities on foot.',
    coverImage: '/src/assets/images/dest_cappadocia_balloons_1790236072081.jpg',
    author: {
      name: 'Zayn Al-Mansoor',
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      role: 'Student Traveler & Field Recordist',
      bio: 'Undergraduate student, analog photographer, and audio producer exploring the Levant and Gulf by bus, foot, and shared taxi.'
    },
    publishedAt: 'July 10, 2026',
    readTime: '6 min read',
    category: 'City Guides',
    location: {
      city: 'Göreme',
      country: 'Türkiye',
      coordinates: {
        lat: 38.6431,
        lng: 34.8289
      }
    },
    tags: ['Cappadocia', 'Türkiye', 'Balloons', 'Hiking', 'Photography'],
    featured: false,
    content: {
      leadParagraph: 'Cappadocia feels like a landscape sculpted by dream logic. Millions of years of volcanic ash compacted into soft tuff rock, eroded by wind and river floods into slender cones, towers, and hollowed-out subterranean churches decorated with Byzantine frescoes.',
      sections: [
        {
          heading: 'The 5 AM Valley Vantage',
          body: [
            'You do not need to spend €250 on a balloon flight to be captivated by Cappadocia. The most dramatic photographic perspective is from Love Valley or the ridge overlooking Rose Valley as the burners ignite in unison, illuminating hundreds of silk envelopes against the dawn mist.'
          ],
          pullQuote: 'Standing on the ridge as a hundred silent balloons glide ten meters above your head is pure sensory magic.'
        },
        {
          heading: 'Walking the Pigeon Valley Trail',
          body: [
            'Hike the 4-kilometer trail between Uçhisar Castle and Göreme. Along the path, thousands of dovecotes carved directly into the white cliffs still house wild pigeons, surrounded by wild apricot orchards and quiet rock tea-houses.'
          ]
        }
      ],
      travelTips: [
        'Accommodation: Family-run cave pensions in Göreme or Çavuşin provide authentic experiences for a fraction of luxury cave resort prices.',
        'Footwear: Wear grippy trail shoes; the loose volcanic tuff dust on steep valley descents can be slick.'
      ]
    }
  },
  {
    id: 'post-08',
    slug: 'essential-solo-student-travel-tips',
    title: '10 Practical Travel Habits for Broke Students with a Camera',
    subtitle: 'How to travel continuously between semesters without draining your savings.',
    excerpt: 'From overnight sleeper trains to local SIM cards and community hostels—the pragmatic rules that make long-term indie travel possible.',
    coverImage: '/src/assets/images/hero_travel_journal_1790236025041.jpg',
    author: {
      name: 'Zayn Al-Mansoor',
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      role: 'Student Traveler & Field Recordist',
      bio: 'Undergraduate student, analog photographer, and audio producer exploring the Levant and Gulf by bus, foot, and shared taxi.'
    },
    publishedAt: 'June 28, 2026',
    readTime: '5 min read',
    category: 'Travel Tips',
    location: {
      city: 'Field Notes',
      country: 'Worldwide',
      coordinates: {
        lat: 25.2048,
        lng: 55.2708
      }
    },
    tags: ['Travel Tips', 'Budget', 'Solo Travel', 'Student', 'Packing'],
    featured: false,
    content: {
      leadParagraph: 'Traveling on a student budget isn’t about deprivation—it’s about prioritization. When you stop spending money on sterile airport taxis and overpriced souvenir shops, you automatically buy yourself more days on the road and richer stories to tell.',
      sections: [
        {
          heading: 'The Golden Rules of Budget Mobility',
          body: [
            '1. Travel with carry-on only (30L–38L max). You never wait at baggage carousels, never pay checked luggage fees, and can walk straight onto regional buses.',
            '2. Cook one meal a day with produce from local neighborhood markets.',
            '3. Always ask for student discounts at museums, transport authorities, and cultural heritage sites with an ISIC or university card.',
            '4. Learn ten polite words in the local language: thank you, good morning, please, delicious, and numbers 1–10.'
          ],
          pullQuote: 'The lighter your backpack, the heavier your experience.'
        }
      ],
      travelTips: [
        'Emergency fund: Keep a separate debit card locked inside your backpack lining.',
        'Offline maps: Always pre-download the entire city map on Organic Maps or Google Maps before departure.'
      ]
    }
  }
];
