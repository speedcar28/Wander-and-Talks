/**
 * ============================================================================
 * WANDER & TALK — PODCAST EPISODES DATA
 * ============================================================================
 * 
 * ⚠️ DEVELOPER NOTE FOR REAL AUDIO ASSETS:
 * Each episode has an `audioUrl` property below currently pointing to placeholder paths
 * such as "/audio/episode-01.mp3".
 * 
 * To connect your own actual recorded audio:
 * 1. Place your MP3 files into the `/public/audio/` directory (e.g., `/public/audio/episode-01.mp3`), OR
 * 2. Replace the `audioUrl` value with your direct hosted podcast streaming link
 *    (e.g., "https://cdn.wanderandtalk.com/episodes/ep-01-sharjah-sunrise.mp3" or Transistor / Buzzsprout / Libsyn MP3 URLs).
 * 
 * The built-in audio engine includes a resilient Web Audio synthesizer fallback
 * that automatically generates a soothing ambient acoustic background track if the
 * local MP3 is not yet present on disk, ensuring smooth seeker scrub, playtime counters,
 * and seamless UI testing.
 * ============================================================================
 */

import { PodcastEpisode } from '../types';

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-01',
    episodeNumber: 1,
    title: 'Episode 01: Sunrise Over the Sharjah Desert',
    subtitle: 'Waking up at 4:30 AM to catch the red ripples of Mleiha before the heat rolls in.',
    description: 'We pack the microphones and head 60 kilometers inland into Sharjah\'s Mleiha fossil valley. Join us as we record field audio of desert winds, discuss the deep archaeology of pre-Islamic Arabia, and reflect on the humbling sensation of standing alone on a shifting crest.',
    showNotes: [
      '00:00 — Pre-dawn departure from Sharjah University City',
      '04:20 — Recording the ambient silence of Mleiha archaeological rock',
      '11:15 — How ancient trade caravans navigated the sands without GPS',
      '18:40 — Field audio test: Wind screens and dynamic mic techniques',
      '24:10 — Thoughts on slow travel and student exploration on a shoestring'
    ],
    // REPLACE THIS PLACEHOLDER: Provide your real MP3 file path or streaming CDN URL here
    audioUrl: '/audio/episode-01.mp3',
    duration: '28:45',
    durationSeconds: 1725,
    publishedAt: 'Sep 12, 2026',
    coverImage: '/src/assets/images/dest_sharjah_desert_1790236047311.jpg',
    tags: ['Desert', 'Field Recording', 'Sharjah', 'Slow Travel'],
    locationName: 'Mleiha, Sharjah, UAE',
    featured: true,
    relatedBlogSlug: 'sunrise-sharjah-desert-mleiha-guide',
    fileSizeMb: 39.4
  },
  {
    id: 'ep-02',
    episodeNumber: 2,
    title: 'Episode 02: A Weekend in Hatta',
    subtitle: 'Kayaking turquoise dam waters, trail-running mountain ridges, and cold night campfires.',
    description: 'Escaping the glass high-rises for the jagged peaks of the Hajar mountain range. We dive into budget camping tips in Hatta, exploring hidden wadis, and why getting lost off the gravel tracks leads to the best encounters.',
    showNotes: [
      '00:00 — The winding mountain route past the Oman border enclave',
      '05:30 — Early morning kayak acoustic reflections inside the dam gorge',
      '13:00 — Essential camping gear: Down jackets in the desert winter',
      '19:45 — The history of Hatta heritage village and date palm falaj systems',
      '26:10 — Local honey tasting and conversation with an artisanal beekeeper'
    ],
    // REPLACE THIS PLACEHOLDER: Provide your real MP3 file path or streaming CDN URL here
    audioUrl: '/audio/episode-02.mp3',
    duration: '31:10',
    durationSeconds: 1870,
    publishedAt: 'Sep 04, 2026',
    coverImage: '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
    tags: ['Mountains', 'Adventure', 'Kayaking', 'Weekend Trips'],
    locationName: 'Hatta, Dubai, UAE',
    featured: false,
    relatedBlogSlug: 'hatta-mountain-weekend-escape-guide',
    fileSizeMb: 42.8
  },
  {
    id: 'ep-03',
    episodeNumber: 3,
    title: 'Episode 03: Street Food and Stories from Dubai',
    subtitle: 'Beyond the supercars: authentic shawarma, Iranian bakeries in Deira, and Creek abras.',
    description: 'We spend 14 hours walking the historic labyrinth of Deira and Al Fahidi. Hear the crackle of freshly baked sangak bread, the bustling wooden dhow wharves, and the culinary tapestry woven by generations of merchants and migrants.',
    showNotes: [
      '00:00 — Crossing Dubai Creek on a 1-Dirham traditional wooden abra',
      '06:10 — The legendary garlic sauce showdown: Lebanese vs Syrian street vendors',
      '14:25 — Spice Souk aromas: Cardamom, dried limes, and saffron grading',
      '22:00 — Iranian bakery on Al Musalla Road: 4-foot long sesame flatbreads',
      '29:30 — Why the soul of Dubai thrives in its oldest neighborhoods'
    ],
    // REPLACE THIS PLACEHOLDER: Provide your real MP3 file path or streaming CDN URL here
    audioUrl: '/audio/episode-03.mp3',
    duration: '35:20',
    durationSeconds: 2120,
    publishedAt: 'Aug 26, 2026',
    coverImage: '/src/assets/images/hero_travel_journal_1790236025041.jpg',
    tags: ['Street Food', 'Culture', 'Old Dubai', 'Walking Tour'],
    locationName: 'Deira & Al Fahidi, Dubai, UAE',
    featured: false,
    relatedBlogSlug: 'old-dubai-creek-street-food-guide',
    fileSizeMb: 48.5
  },
  {
    id: 'ep-04',
    episodeNumber: 4,
    title: 'Episode 04: The Quiet Side of Abu Dhabi',
    subtitle: 'Mangrove sanctuaries, desert astronomy at Al Quaa, and Saadiyat\'s architectural silence.',
    description: 'Abu Dhabi has a distinct cadence—slower, wider, contemplative. We paddle through the Jubail Mangrove forests at high tide, visit the serene light dome of the Louvre, and finish under the pitch-black Milky Way at the Al Quaa Milky Way spot.',
    showNotes: [
      '00:00 — Sound of mangrove roots filtering the Arabian Gulf tide',
      '08:45 — The acoustic marvel of the Louvre Abu Dhabi floating dome',
      '16:20 — Al Quaa "Milky Way Spot": Driving 2 hours into deep zero-light desert',
      '23:15 — Astrophotography gear guide: Fast wide lenses and star tracking',
      '30:00 — The balance between hyper-modern architecture and natural conservation'
    ],
    // REPLACE THIS PLACEHOLDER: Provide your real MP3 file path or streaming CDN URL here
    audioUrl: '/audio/episode-04.mp3',
    duration: '33:15',
    durationSeconds: 1995,
    publishedAt: 'Aug 18, 2026',
    coverImage: '/src/assets/images/podcast_cover_art_1790236037002.jpg',
    tags: ['Nature', 'Astrophotography', 'Architecture', 'Abu Dhabi'],
    locationName: 'Abu Dhabi, UAE',
    featured: false,
    relatedBlogSlug: 'quiet-corners-abu-dhabi-mangroves-louvre',
    fileSizeMb: 45.6
  },
  {
    id: 'ep-05',
    episodeNumber: 5,
    title: 'Episode 05: Mountains, Markets, and Muscat',
    subtitle: 'A road trip across the northern Omani border to the frankincense coast of Muttrah.',
    description: 'Crossing into the Sultanate of Oman by bus. We recount the scent of silver frankincense burners at Muttrah Souq, the hospitality of mountain villagers in Jebel Akhdar, and recording the evening prayer call echoing across the coastal cliffs.',
    showNotes: [
      '00:00 — Cross-border overland journey from Sharjah to Muscat',
      '07:15 — Muttrah Corniche at sunset: Sea breeze and ancient watchtowers',
      '15:40 — Frankincense culture: Hojari resin grades and Omani halwa with cardamom',
      '24:00 — The terrifyingly steep switchbacks up Jebel Akhdar',
      '34:10 — Recording environmental field sounds in mountain terraced pomegranate orchards'
    ],
    // REPLACE THIS PLACEHOLDER: Provide your real MP3 file path or streaming CDN URL here
    audioUrl: '/audio/episode-05.mp3',
    duration: '38:50',
    durationSeconds: 2330,
    publishedAt: 'Aug 05, 2026',
    coverImage: '/src/assets/images/dest_hatta_mountains_1790236058763.jpg',
    tags: ['Oman', 'Road Trip', 'Markets', 'Heritage'],
    locationName: 'Muscat & Jebel Akhdar, Oman',
    featured: false,
    relatedBlogSlug: 'muscat-oman-coastal-roadtrip-journal',
    fileSizeMb: 53.2
  },
  {
    id: 'ep-06',
    episodeNumber: 6,
    title: 'Episode 06: How Travel Photography Changes a Journey',
    subtitle: 'Why carrying a prime lens forces you to talk to people and slows down your eyes.',
    description: 'A deep, reflective conversation on visual storytelling. We break down the difference between documenting a trip for social media versus truly observing human moments, handling camera fatigue, and choosing the right lightweight travel kit.',
    showNotes: [
      '00:00 — The trap of viewing the world only through an LCD screen',
      '06:40 — The power of a 35mm fixed focal length: Moving your feet, engaging with locals',
      '14:15 — How to ask politely for portraits without being intrusive',
      '21:30 — Managing backup workflows, SD cards, and solar chargers on the go',
      '28:00 — How photography and podcast audio complement each other as sensory records'
    ],
    // REPLACE THIS PLACEHOLDER: Provide your real MP3 file path or streaming CDN URL here
    audioUrl: '/audio/episode-06.mp3',
    duration: '29:40',
    durationSeconds: 1780,
    publishedAt: 'Jul 24, 2026',
    coverImage: '/src/assets/images/creator_portrait_1790236082709.jpg',
    tags: ['Photography', 'Philosophy', 'Gear', 'Storytelling'],
    locationName: 'Studio & Field',
    featured: false,
    relatedBlogSlug: 'the-art-of-slow-travel-photography',
    fileSizeMb: 40.7
  }
];
