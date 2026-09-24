export type BlogCategory = 
  | 'All'
  | 'UAE' 
  | 'City Guides' 
  | 'Nature' 
  | 'Budget Travel' 
  | 'Food' 
  | 'Photography' 
  | 'Travel Tips';

export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  category: Exclude<BlogCategory, 'All'>;
  location: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  tags: string[];
  featured?: boolean;
  relatedPodcastId?: string;
  content: {
    leadParagraph: string;
    sections: {
      heading?: string;
      body: string[];
      image?: {
        url: string;
        caption: string;
      };
      pullQuote?: string;
    }[];
    travelTips?: string[];
  };
}

export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  subtitle: string;
  description: string;
  showNotes: string[];
  // IMPORTANT: Placeholder for real audio file or podcast host stream URL
  audioUrl: string;
  duration: string;
  durationSeconds: number;
  publishedAt: string;
  coverImage: string;
  tags: string[];
  locationName: string;
  featured?: boolean;
  relatedBlogSlug?: string;
  fileSizeMb?: number;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  articleCount: number;
  episodeCount: number;
  bestTimeToVisit: string;
  travelNotes: string[];
  highlights: string[];
  relatedBlogSlugs: string[];
  relatedEpisodeIds: string[];
}

export interface GearItem {
  id: string;
  category: 'Photography' | 'Podcast & Audio' | 'Travel Essentials';
  name: string;
  model: string;
  description: string;
  whyILoveIt: string;
  iconName?: string;
}
