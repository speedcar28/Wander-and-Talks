import React from 'react';
import {
  Compass,
  ArrowRight,
  Headphones,
  BookOpen,
  Sparkles,
  MapPin,
  Flame,
  Volume2
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogs';
import { DESTINATIONS } from '../data/destinations';
import { PODCAST_EPISODES } from '../data/podcasts';
import { BlogCard } from '../components/BlogCard';
import { DestinationCard } from '../components/DestinationCard';
import { EpisodeCard } from '../components/EpisodeCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredArticle = BLOG_ARTICLES.find((a) => a.featured) || BLOG_ARTICLES[0];
  const recentArticles = BLOG_ARTICLES.filter((a) => a.id !== featuredArticle.id).slice(0, 3);
  const featuredDestinations = DESTINATIONS.slice(0, 3);
  const featuredEpisodes = PODCAST_EPISODES.slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-24 pb-16">
      
      {/* 1. Full-Width Hero Section */}
      <section className="relative -mt-6 sm:-mt-8 rounded-b-3xl overflow-hidden bg-[#0F1B2B] text-white">
        {/* Background Image with Cinematic Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_travel_journal_1790236025041.jpg"
            alt="Traveler standing on desert dunes during golden hour sunrise"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-65 scale-105 animate-in fade-in duration-1000"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/src/assets/images/dest_sharjah_desert_1790236047311.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2B] via-[#0F1B2B]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1B2B]/80 via-transparent to-[#0F1B2B]/60" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pt-32 sm:pb-36 flex flex-col items-start justify-end min-h-[620px]">
          
          <div className="max-w-2xl space-y-6">
            {/* Ambient Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18283E]/80 backdrop-blur-md border border-[#E06D3B]/30 text-xs font-mono tracking-widest uppercase text-[#E9865A]">
              <Compass className="w-3.5 h-3.5 text-[#E06D3B]" />
              <span>Independent Travel Journal &amp; Podcast</span>
            </div>

            {/* Site Name & Catchy Editorial Tagline */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] text-balance">
                Wander &amp; Talk
              </h1>
              <p className="text-lg sm:text-xl text-[#B8C8DB] leading-relaxed font-normal max-w-xl">
                Stories, sounds, and slow journeys from the red dunes of Sharjah to the jagged heights of Hatta and the frankincense coast of Oman.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('blog')}
                className="px-6 py-3.5 rounded-xl bg-[#E06D3B] hover:bg-[#C75525] text-white font-semibold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Stories</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('podcast')}
                className="px-6 py-3.5 rounded-xl bg-[#18283E]/90 hover:bg-[#243954] text-white font-semibold text-sm flex items-center gap-2 border border-[#243954] backdrop-blur-md transition-all"
              >
                <Headphones className="w-4 h-4 text-[#39888B]" />
                <span>Listen to Episodes</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-[#94A9C4] font-mono">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#39888B]" /> 8+ Field Essays
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#E06D3B]" /> 6 Immersive Episodes
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> 6 Regional Guides
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Travel Blog Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-widest uppercase text-[#E06D3B] font-semibold">
              EDITOR&apos;S PICK
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
              Featured Story from the Field
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-semibold text-[#2B6E70] dark:text-[#39888B] hover:text-[#E06D3B] dark:hover:text-[#E9865A] inline-flex items-center gap-1 transition-colors"
          >
            Browse all 8 articles <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <BlogCard
          article={featuredArticle}
          onSelect={(slug) => onNavigate(`blog-article-${slug}`)}
          featured={true}
        />
      </section>

      {/* 3. Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-widest uppercase text-[#2B6E70] dark:text-[#39888B] font-semibold">
              WHERE TO EXPLORE
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
              Featured Destinations
            </h2>
          </div>
          <button
            onClick={() => onNavigate('destinations')}
            className="text-xs font-semibold text-[#2B6E70] dark:text-[#39888B] hover:text-[#E06D3B] dark:hover:text-[#E9865A] inline-flex items-center gap-1 transition-colors"
          >
            View all destinations <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onSelect={(slug) => onNavigate(`destination-${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 4. Latest Travel Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-widest uppercase text-[#E06D3B] font-semibold">
              JOURNAL DISPATCHES
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
              Latest Blog Articles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-semibold text-[#2B6E70] dark:text-[#39888B] hover:text-[#E06D3B] dark:hover:text-[#E9865A] inline-flex items-center gap-1 transition-colors"
          >
            View category filters <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((art) => (
            <BlogCard
              key={art.id}
              article={art}
              onSelect={(slug) => onNavigate(`blog-article-${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 5. Latest Podcast Episodes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-2xl bg-[#F4EFE6] dark:bg-[#142030] p-6 sm:p-10 border border-[#EAE3D2] dark:border-[#223347] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-[#E06D3B] font-semibold flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                PLAY DIRECTLY IN BROWSER
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
                Latest Podcast Episodes
              </h2>
            </div>
            <button
              onClick={() => onNavigate('podcast')}
              className="text-xs font-semibold text-[#2B6E70] dark:text-[#39888B] hover:text-[#E06D3B] dark:hover:text-[#E9865A] inline-flex items-center gap-1 transition-colors"
            >
              Open Podcast Studio <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {featuredEpisodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                onSelectBlog={(slug) => onNavigate(`blog-article-${slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter Subscription Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection />
      </section>

    </div>
  );
};
