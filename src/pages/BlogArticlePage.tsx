import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Share2,
  Bookmark,
  Check,
  Headphones,
  Compass,
  Navigation,
  ExternalLink,
  Play,
  Pause,
  Radio,
  Sparkles
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogs';
import { PODCAST_EPISODES } from '../data/podcasts';
import { BlogCard } from '../components/BlogCard';
import { EpisodeCard } from '../components/EpisodeCard';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';

interface BlogArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ slug, onNavigate }) => {
  const { currentEpisode, isPlaying, playEpisode, togglePlay } = useAudio();
  const { isFavorite, toggleFavorite } = useAuth();
  
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const article = BLOG_ARTICLES.find((a) => a.slug === slug) || BLOG_ARTICLES[0];
  const relatedArticles = BLOG_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);
  
  const isSaved = isFavorite(article.slug);

  // Subtle reading progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight > 0) {
        const currentProgress = (window.scrollY / scrollableHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Dynamically filter related podcast episodes based on article's tags, direct id, and location
  const matchedPodcasts = useMemo(() => {
    const directMatch = article.relatedPodcastId
      ? PODCAST_EPISODES.filter((ep) => ep.id === article.relatedPodcastId)
      : [];

    const tagAndLocationMatches = PODCAST_EPISODES.filter((ep) => {
      if (directMatch.some((d) => d.id === ep.id)) return false;
      const hasCommonTag = ep.tags.some((t) => article.tags.includes(t));
      const hasLocationOverlap =
        ep.locationName.toLowerCase().includes(article.location.city.toLowerCase()) ||
        ep.locationName.toLowerCase().includes(article.location.country.toLowerCase()) ||
        article.location.city.toLowerCase().includes(ep.locationName.toLowerCase());
      return hasCommonTag || hasLocationOverlap;
    });

    return [...directMatch, ...tagAndLocationMatches];
  }, [article]);

  const primaryRelatedPodcast = matchedPodcasts.length > 0 ? matchedPodcasts[0] : null;
  const otherRelatedPodcasts = matchedPodcasts.slice(1);

  const isPrimaryActive = primaryRelatedPodcast && currentEpisode?.id === primaryRelatedPodcast.id;
  const isPrimaryPlaying = isPrimaryActive && isPlaying;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePlayPrimaryPodcast = () => {
    if (!primaryRelatedPodcast) return;
    if (isPrimaryActive) {
      togglePlay();
    } else {
      playEpisode(primaryRelatedPodcast, true);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">
      
      {/* Fixed Reading Progress Bar at Top */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#2B6E70] via-[#E06D3B] to-[#F59E0B] transition-all duration-100 ease-out shadow-xs"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
        <button
          onClick={() => onNavigate('blog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A5E78] dark:text-[#94A9C4] hover:text-[#0F1B2B] dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#6B85A6] hidden sm:inline mr-1">
            {Math.round(readingProgress)}% read
          </span>

          <button
            onClick={() => toggleFavorite(article.slug)}
            aria-label={isSaved ? "Saved to reading list" : "Save article"}
            title={isSaved ? "Saved to reading list" : "Save article"}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#E06D3B]/10 border-[#E06D3B] text-[#E06D3B]'
                : 'border-[#EAE3D2] dark:border-[#223347] text-[#6B85A6] hover:text-[#0F1B2B] dark:hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            aria-label="Share article link"
            title={copied ? "Link copied!" : "Share article"}
            className="p-2 rounded-lg border border-[#EAE3D2] dark:border-[#223347] text-[#6B85A6] hover:text-[#0F1B2B] dark:hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-6">
        
        {/* Category & Location */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B85A6] dark:text-[#94A9C4]">
          <span className="text-[#E06D3B] dark:text-[#E9865A] font-mono font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-[#2B6E70] dark:text-[#39888B] font-medium">
            <MapPin className="w-3.5 h-3.5" />
            {article.location.city}, {article.location.country}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1B2B] dark:text-white leading-[1.15] text-balance">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed font-normal">
          {article.subtitle}
        </p>

        {/* Author Bio Row */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#EAE3D2] dark:border-[#223347]">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border border-[#EAE3D2] dark:border-[#223347]"
          />
          <div>
            <h2 className="text-sm font-bold text-[#0F1B2B] dark:text-white">
              {article.author.name}
            </h2>
            <p className="text-xs text-[#6B85A6] dark:text-[#94A9C4]">
              {article.author.role} · Published {article.publishedAt}
            </p>
          </div>
        </div>

      </header>

      {/* Hero Cover Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg bg-[#EAE3D2] dark:bg-[#18283E] aspect-16/9 w-full">
        <img
          src={article.coverImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/hero_travel_journal_1790236025041.jpg';
          }}
        />
      </div>

      {/* Article Body Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-[#243954] dark:text-[#CBD5E1] leading-relaxed">
        
        {/* Lead paragraph */}
        <p className="text-lg sm:text-xl font-serif text-[#0F1B2B] dark:text-[#E6EDF5] leading-relaxed italic border-l-2 border-[#E06D3B] pl-5 my-6">
          {article.content.leadParagraph}
        </p>

        {/* Section blocks */}
        {article.content.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-5">
            {section.heading && (
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2B] dark:text-white pt-4">
                {section.heading}
              </h2>
            )}

            {section.body.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-base sm:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}

            {section.pullQuote && (
              <blockquote className="my-8 py-4 px-6 bg-[#F4EFE6] dark:bg-[#142030] border-l-4 border-[#2B6E70] rounded-r-xl">
                <p className="font-serif text-lg sm:text-xl font-bold italic text-[#0F1B2B] dark:text-white m-0">
                  &ldquo;{section.pullQuote}&rdquo;
                </p>
              </blockquote>
            )}

            {section.image && (
              <figure className="my-8 space-y-2">
                <div className="rounded-xl overflow-hidden bg-[#EAE3D2] dark:bg-[#18283E] shadow-sm">
                  <img
                    src={section.image.url}
                    alt={section.image.caption}
                    referrerPolicy="no-referrer"
                    className="w-full object-cover"
                  />
                </div>
                <figcaption className="text-xs text-[#6B85A6] dark:text-[#94A9C4] italic text-center">
                  {section.image.caption}
                </figcaption>
              </figure>
            )}
          </div>
        ))}

        {/* Interactive Coordinates / GPS Map Box */}
        <div className="my-10 p-6 rounded-2xl bg-[#F4EFE6] dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#2B6E70] dark:text-[#39888B]" />
              <h3 className="font-serif text-lg font-bold text-[#0F1B2B] dark:text-white m-0">
                Location &amp; Field Coordinates
              </h3>
            </div>
            <span className="text-xs font-mono text-[#6B85A6] uppercase tracking-wider">
              GPS Verified
            </span>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#0F1B2B] text-white p-6 border border-[#243954] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#E9865A]">
                LAT / LNG COORDINATES
              </span>
              <p className="font-mono text-base font-bold text-white tracking-wide">
                {article.location.coordinates?.lat.toFixed(4)}° N, {article.location.coordinates?.lng.toFixed(4)}° E
              </p>
              <p className="text-xs text-[#B8C8DB]">
                {article.location.city}, {article.location.country}
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${article.location.coordinates?.lat},${article.location.coordinates?.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#2B6E70] hover:bg-[#225C5E] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shrink-0 no-underline"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in External Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Practical Tips */}
          {article.content.travelTips && (
            <div className="pt-2 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B85A6] font-semibold">
                Field Notes &amp; Traveler Advice:
              </h4>
              <ul className="space-y-1.5 text-sm text-[#4A5E78] dark:text-[#94A9C4] pl-5 list-disc">
                {article.content.travelTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#EAE3D2] dark:border-[#223347]">
          <span className="text-xs font-mono text-[#6B85A6]">TAGS:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#2B6E70] dark:text-[#39888B] bg-white dark:bg-[#18283E] px-2.5 py-1 rounded-md border border-[#EAE3D2] dark:border-[#243954]"
            >
              #{tag}
            </span>
          ))}
        </div>

      </div>

      {/* Dynamically Filtered Related Podcast Section */}
      {primaryRelatedPodcast && (
        <section className="rounded-2xl bg-gradient-to-r from-[#0F1B2B] via-[#142030] to-[#18283E] text-white p-6 sm:p-8 border border-[#243954] shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E9865A] uppercase tracking-wider font-semibold">
              <Headphones className="w-4 h-4 text-[#E06D3B]" />
              <span>TAG-MATCHED COMPANION AUDIO</span>
            </div>
            <span className="text-[11px] font-mono text-[#94A9C4]">
              Ep. 0{primaryRelatedPodcast.episodeNumber}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                {primaryRelatedPodcast.title}
              </h3>
              <p className="text-sm text-[#B8C8DB] line-clamp-2 leading-relaxed">
                {primaryRelatedPodcast.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A9C4] font-mono pt-1">
                <span>Duration: {primaryRelatedPodcast.duration}</span>
                <span>·</span>
                <span>Recorded in {primaryRelatedPodcast.locationName}</span>
                <span>·</span>
                <span className="text-[#E9865A]">
                  Tags: {primaryRelatedPodcast.tags.slice(0, 3).join(', ')}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlayPrimaryPodcast}
              className="px-6 py-3.5 rounded-xl bg-[#E06D3B] hover:bg-[#C75525] text-white font-semibold text-sm flex items-center gap-3 transition-all shrink-0 shadow-md active:scale-95 cursor-pointer"
            >
              {isPrimaryPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Pause Episode</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Play Episode Here</span>
                </>
              )}
            </button>
          </div>

          {/* If additional related episodes match this story's tags/location */}
          {otherRelatedPodcasts.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase text-[#94A9C4] font-semibold">
                Additional Recommended Audio for this Journey:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otherRelatedPodcasts.map((ep) => (
                  <div
                    key={ep.id}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">{ep.title}</p>
                      <p className="text-[11px] text-[#94A9C4]">{ep.duration} · {ep.locationName}</p>
                    </div>
                    <button
                      onClick={() => playEpisode(ep, true)}
                      className="p-2 bg-[#2B6E70] hover:bg-[#225C5E] text-white rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Play episode"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Related Articles Section */}
      <section className="space-y-6 pt-8 border-t border-[#EAE3D2] dark:border-[#223347]">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-[#0F1B2B] dark:text-white">
            Related Travel Stories
          </h3>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-semibold text-[#2B6E70] dark:text-[#39888B] hover:text-[#E06D3B] transition-colors cursor-pointer"
          >
            View all stories →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((art) => (
            <BlogCard
              key={art.id}
              article={art}
              onSelect={(artSlug) => onNavigate(`blog-article-${artSlug}`)}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
