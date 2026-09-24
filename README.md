# Wander & Talk — Travel Journal & Podcast Web App

A travel blog and podcast web application built with React, TypeScript, and Tailwind CSS.

---

## 🎧 Playing Podcast Episodes Inside the Website
Wander & Talk features a working audio player system that plays episodes directly inside the website using the native HTML5 Audio API.

### Audio Player Features:
- **Play / Pause** toggle with live state tracking
- **Scrubbable timeline bar**: Click or drag to seek any point in the episode
- **15-Second Jump Controls**: Skip back 15s or skip forward 15s
- **Volume & Mute Control**: Smooth slider and instant mute toggle
- **Playback Speed Selector**: `0.75x`, `1x`, `1.25x`, `1.5x`, `2x`
- **Episode Download**: Download episode notes and field audio details
- **Sticky Mini-Player**: Bottom floating playback dock that follows you as you navigate between stories without interrupting playback

---

## 📁 Where to Add Real Content

### 1. Adding Real Audio Files (`.mp3`)
Audio episodes are configured in `src/data/podcasts.ts`.
- **Option A (Local Files)**: Place your `.mp3` files in the `/public/audio/` directory (e.g., `/public/audio/episode-01.mp3`, `/public/audio/episode-02.mp3`) and point the `audioUrl` field to `/audio/episode-01.mp3`.
- **Option B (Hosted Streams / CDNs)**: Replace `audioUrl` with your remote podcast host link (e.g., `https://media.transistor.fm/xxx.mp3`, `https://cdn.buzzsprout.com/xxx.mp3`, or Cloud Storage URL).

> *Note: If a placeholder MP3 URL is not yet present on disk, Wander & Talk automatically uses a soothing ambient field acoustic synthesizer so playback, progress scrubbing, and timers work smoothly during development.*

---

### 2. Adding Real Blog Posts & Travel Essays
Blog articles are stored in `src/data/blogs.ts`.
To add a new article:
```typescript
{
  id: 'post-09',
  slug: 'my-new-travel-story',
  title: 'Your Article Title',
  subtitle: 'A compelling subheader',
  excerpt: 'A 2-sentence summary for article cards',
  coverImage: '/src/assets/images/your_cover_photo.jpg',
  author: {
    name: 'Your Name',
    avatar: '/src/assets/images/your_avatar.jpg',
    role: 'Travel Writer',
    bio: 'Your author bio here'
  },
  publishedAt: 'October 15, 2026',
  readTime: '6 min read',
  category: 'UAE', // 'UAE' | 'City Guides' | 'Nature' | 'Budget Travel' | 'Food' | 'Photography' | 'Travel Tips'
  location: {
    city: 'Dubai',
    country: 'UAE',
    coordinates: { lat: 25.2048, lng: 55.2708 }
  },
  tags: ['Desert', 'Photography', 'Slow Travel'],
  featured: false,
  relatedPodcastId: 'ep-01',
  content: {
    leadParagraph: 'Opening paragraph in italics...',
    sections: [
      {
        heading: 'Section Title',
        body: ['Paragraph 1...', 'Paragraph 2...'],
        pullQuote: 'A quote to highlight in the layout'
      }
    ],
    travelTips: ['Practical tip 1', 'Practical tip 2']
  }
}
```

---

### 3. Adding New Destinations
Destination guides are configured in `src/data/destinations.ts`.
You can specify:
- City, Country, and Region
- GPS Coordinates (`lat`, `lng`)
- Best season to visit
- Key highlights and practical advice
- Linked blog stories and podcast episodes

---

### 4. Adding Images & Photos
- Place image files in `/public/images/` or import them from `/src/assets/images/`.
- Ensure appropriate aspect ratios (`16:9` for heroes/headers, `4:3` for destination cards, `1:1` for podcast cover art).

---

## 🎨 Design System & Palette
- **Warm Sand Background**: Light `#FBF8F2` / Surface `#F4EFE6`
- **Deep Navy Base**: Canvas `#0F1B2B` / `#0D1520` (Dark mode)
- **Muted Teal**: `#2B6E70` (Nature & coordinate accents)
- **Sunset Orange**: `#E06D3B` (Primary actions & active audio waves)
- **Editorial Typography**: *Playfair Display* for headings and *Plus Jakarta Sans* for body prose.
