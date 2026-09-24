import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Compass,
  CheckCircle2,
  BookOpen,
  Headphones,
  Navigation,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { BLOG_ARTICLES } from '../data/blogs';
import { PODCAST_EPISODES } from '../data/podcasts';
import { BlogCard } from '../components/BlogCard';
import { EpisodeCard } from '../components/EpisodeCard';
import { InteractiveMap } from '../components/InteractiveMap';

interface DestinationDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ slug, onNavigate }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const destination = DESTINATIONS.find((d) => d.slug === slug) || DESTINATIONS[0];
  
  const relatedArticles = BLOG_ARTICLES.filter((a) =>
    destination.relatedBlogSlugs.includes(a.slug)
  );

  const relatedEpisodes = PODCAST_EPISODES.filter((ep) =>
    destination.relatedEpisodeIds.includes(ep.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">
      
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
        <button
          onClick={() => onNavigate('destinations')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A5E78] dark:text-[#94A9C4] hover:text-[#0F1B2B] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#6B85A6] dark:text-[#94A9C4]">
          <span>{destination.region}</span>
          <span>·</span>
          <span>{destination.country}</span>
        </div>
      </div>

      {/* Hero Header & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Info */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-[#E06D3B] font-semibold bg-[#E06D3B]/10 px-3 py-1 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-[#E06D3B]" />
            <span>FIELD GUIDE · {destination.country}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#0F1B2B] dark:text-white leading-[1.1]">
            {destination.name}
          </h1>

          <p className="text-xl text-[#2B6E70] dark:text-[#39888B] font-serif italic">
            &ldquo;{destination.tagline}&rdquo;
          </p>

          <p className="text-base text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
            {destination.description}
          </p>

          {/* Key Facts Card */}
          <div className="p-5 rounded-xl bg-[#F4EFE6] dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#6B85A6] font-semibold">
              Travel Quick Facts:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[#6B85A6] block">Best Time to Visit:</span>
                <span className="font-semibold text-[#0F1B2B] dark:text-white">
                  {destination.bestTimeToVisit}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[#6B85A6] block">Coordinates:</span>
                <span className="font-mono font-semibold text-[#0F1B2B] dark:text-white">
                  {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Image Display */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-[#EAE3D2] dark:bg-[#1C2D42] aspect-4/3 w-full border border-[#EAE3D2] dark:border-[#243954]">
            <img
              src={destination.galleryImages[activeImageIndex] || destination.coverImage}
              alt={`${destination.name} photography`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/src/assets/images/hero_travel_journal_1790236025041.jpg';
              }}
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded">
              Photo {activeImageIndex + 1} of {destination.galleryImages.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2">
            {destination.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#E06D3B] scale-105 shadow-xs'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Highlights & Travel Notes Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        
        {/* Highlights */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E06D3B]" />
            <h3 className="font-serif text-xl font-bold text-[#0F1B2B] dark:text-white">
              Key Highlights &amp; Vantage Points
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-[#4A5E78] dark:text-[#94A9C4]">
            {destination.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2B6E70] dark:text-[#39888B] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Travel Notes */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#2B6E70] dark:text-[#39888B]" />
            <h3 className="font-serif text-xl font-bold text-[#0F1B2B] dark:text-white">
              Field Notes &amp; Practical Advice
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-[#4A5E78] dark:text-[#94A9C4]">
            {destination.travelNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <ChevronRight className="w-4 h-4 text-[#E06D3B] shrink-0 mt-0.5" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Interactive Cartography Map Component */}
      <InteractiveMap
        destination={destination}
        onNavigateToBlog={(blogSlug) => onNavigate(`blog-article-${blogSlug}`)}
      />

      {/* Related Blog Posts */}
      {relatedArticles.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-[#EAE3D2] dark:border-[#223347]">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono tracking-wider uppercase text-[#E06D3B] font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> FIELD ESSAYS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2B] dark:text-white">
                Articles About {destination.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((art) => (
              <BlogCard
                key={art.id}
                article={art}
                onSelect={(artSlug) => onNavigate(`blog-article-${artSlug}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Related Podcast Episodes */}
      {relatedEpisodes.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-[#EAE3D2] dark:border-[#223347]">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-wider uppercase text-[#2B6E70] dark:text-[#39888B] font-semibold flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5" /> FIELD ACOUSTICS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2B] dark:text-white">
              Podcast Episodes from {destination.name}
            </h2>
          </div>

          <div className="space-y-4">
            {relatedEpisodes.map((ep) => (
              <EpisodeCard
                key={ep.id}
                episode={ep}
                onSelectBlog={(blogSlug) => onNavigate(`blog-article-${blogSlug}`)}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
