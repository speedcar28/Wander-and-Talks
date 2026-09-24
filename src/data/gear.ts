import { GearItem } from '../types';

export const GEAR_ITEMS: GearItem[] = [
  {
    id: 'gear-01',
    category: 'Photography',
    name: 'Fujifilm X-T5 Mirrorless Body',
    model: '40MP X-Trans Sensor / Dual SD Slots',
    description: 'Compact, weather-sealed retro body with tactile dials. Produces film-like color rendition that requires minimal editing on the road.',
    whyILoveIt: 'The analog dials let me adjust exposure without digging through electronic menus, keeping me focused on the scene.',
    iconName: 'Camera'
  },
  {
    id: 'gear-02',
    category: 'Photography',
    name: 'Fujinon 23mm f/1.4 R LM WR (35mm Eq.)',
    model: 'Fast Wide Prime Lens',
    description: 'The single lens that stays mounted 90% of the journey. Sharp wide-open, stunning bokeh, and wide enough for street scenes yet intimate for portraits.',
    whyILoveIt: 'Forces me to move physically closer to subjects and engage in real conversation.',
    iconName: 'Eye'
  },
  {
    id: 'gear-03',
    category: 'Photography',
    name: 'Urth Circular Polarizer & 2-in-1 Variable ND Filter',
    model: 'Magnesium Alloy 67mm',
    description: 'Essential for controlling the fierce desert glare, cutting reflections on water at Hatta Dam, and shooting wide aperture in bright sunlight.',
    whyILoveIt: 'Plant-based packaging and plants 5 trees per purchase.',
    iconName: 'Sun'
  },
  {
    id: 'gear-04',
    category: 'Podcast & Audio',
    name: 'Zoom H5 Handy Recorder with XYH-5 Capsule',
    model: '4-Track Portable Field Recorder',
    description: 'The heart of our field audio. Handles sudden desert winds, whispering mountain streams, and multi-mic interviews with studio-grade preamps.',
    whyILoveIt: 'Shock-mounted internal mics minimize handling noise while trekking.',
    iconName: 'Mic'
  },
  {
    id: 'gear-05',
    category: 'Podcast & Audio',
    name: 'Shure MV7X Dynamic Broadcast Mic',
    model: 'Cardioid Dynamic Microphone with Windscreen',
    description: 'Used for voiceover narrations and studio commentary. Provides deep broadcast warmth while rejecting room echo and hostel background noise.',
    whyILoveIt: 'Indestructible metal chassis that survives being packed in a backpack.',
    iconName: 'Headphones'
  },
  {
    id: 'gear-06',
    category: 'Podcast & Audio',
    name: 'RØDE DeadCat High-Density Furry Windshield',
    model: 'Acoustic Fur Wind Muffler',
    description: 'Stops 40 km/h desert gusts from clipping the audio capsules during pre-dawn recordings at Mleiha.',
    whyILoveIt: 'Without this, field recording on open dunes is virtually impossible.',
    iconName: 'Wind'
  },
  {
    id: 'gear-07',
    category: 'Travel Essentials',
    name: 'Peak Design Travel Backpack 30L',
    model: 'Weatherproof 400D Recycled Nylon',
    description: 'The perfect carry-on companion. Expandable, dual side access to camera gear, and ultra-comfortable harness system for long walking days.',
    whyILoveIt: 'Fits under regional bus seats and airline overhead bins without stress.',
    iconName: 'Compass'
  },
  {
    id: 'gear-08',
    category: 'Travel Essentials',
    name: 'Anker 737 PowerCore 24K Power Bank',
    model: '140W Fast Charging / 24,000mAh',
    description: 'Keeps the laptop, field recorder, camera batteries, and phone running for 3 days of off-grid desert camping.',
    whyILoveIt: 'Smart digital display shows exact remaining battery wattage and time.',
    iconName: 'BatteryCharging'
  },
  {
    id: 'gear-09',
    category: 'Travel Essentials',
    name: 'Midori Traveler’s Notebook (Camel Leather)',
    model: 'Handcrafted Refillable Journal',
    description: 'Where every episode concept, bus ticket, and quick sketch starts before anything is typed into a computer.',
    whyILoveIt: 'The leather patinas with every sandstorm and coffee ring.',
    iconName: 'BookOpen'
  }
];

export interface ProjectTimelineItem {
  year: string;
  quarter: string;
  title: string;
  location: string;
  description: string;
}

export const TIMELINE_ITEMS: ProjectTimelineItem[] = [
  {
    year: '2026',
    quarter: 'Autumn',
    title: 'Wander & Talk Podcast Season 1 Launch',
    location: 'Sharjah & Dubai, UAE',
    description: 'Published first 6 audio field recordings and photo stories focusing on the natural geography and heritage routes of the UAE and Oman.'
  },
  {
    year: '2026',
    quarter: 'Spring',
    title: 'The Omani Border Overland Expedition',
    location: 'Sharjah to Muscat, Oman',
    description: '10-day bus and trekking expedition through the Hajar mountain passes, Muttrah souq, and coastal fishing outposts.'
  },
  {
    year: '2025',
    quarter: 'Winter',
    title: 'Mleiha Pre-Dawn Soundscape Study',
    location: 'Sharjah Desert',
    description: 'Field audio documentation of bio-acoustic silence and morning wind resonance in the protected archaeological desert valley.'
  },
  {
    year: '2025',
    quarter: 'Summer',
    title: 'Anatolian Crossroads Photo Essay',
    location: 'Cappadocia & Istanbul, Türkiye',
    description: 'Indie photo series examining how geological tuff architecture shaped subterranean community life over centuries.'
  },
  {
    year: '2024',
    quarter: 'Autumn',
    title: 'The 1-Dirham Abra Chronicles',
    location: 'Old Dubai Creek',
    description: 'Street photography project on the wooden abra ferrymen, spice merchants, and historic bakeries along Dubai Creek.'
  }
];
