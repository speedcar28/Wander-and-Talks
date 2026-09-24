import React, { useState } from 'react';
import {
  Headphones,
  Radio,
  Rss,
  Music,
  Disc,
  Search,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { PODCAST_EPISODES } from '../data/podcasts';
import { AudioPlayer } from '../components/AudioPlayer';
import { EpisodeCard } from '../components/EpisodeCard';
import { useAudio } from '../context/AudioContext';

interface PodcastPageProps {
  onNavigate: (path: string) => void;
}

export const PodcastPage: React.FC<PodcastPageProps> = ({ onNavigate }) => {
  const { currentEpisode } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatformToast, setActivePlatformToast] = useState<string | null>(null);

  const featuredEpisode = currentEpisode || PODCAST_EPISODES[0];

  const filteredEpisodes = PODCAST_EPISODES.filter((ep) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      ep.title.toLowerCase().includes(q) ||
      ep.description.toLowerCase().includes(q) ||
      ep.locationName.toLowerCase().includes(q) ||
      ep.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handlePlatformClick = (platform: string) => {
    setActivePlatformToast(`Subscribed via ${platform}! Web player remains fully synchronized.`);
    setTimeout(() => setActivePlatformToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      
      {/* 1. Top Section: Podcast Cover & Overview */}
      <section className="rounded-2xl bg-white dark:bg-[#142030] p-6 sm:p-10 border border-[#EAE3D2] dark:border-[#223347] shadow-sm flex flex-col md:flex-row gap-8 items-center">
        
        {/* Podcast Cover Art */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-xl shrink-0 bg-[#0F1B2B] border border-[#243954]">
          <img
            src="/src/assets/images/podcast_cover_art_1790236037002.jpg"
            alt="Wander & Talk Podcast Cover Art"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/src/assets/images/hero_travel_journal_1790236025041.jpg';
            }}
          />
          <div className="absolute bottom-2 left-2 right-2 bg-[#0F1B2B]/90 backdrop-blur-xs py-1 px-2.5 rounded text-[10px] font-mono text-center text-[#E9865A]">
            HOSTED BY ZAYN AL-MANSOOR
          </div>
        </div>

        {/* Podcast Metadata & Description */}
        <div className="space-y-4 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E06D3B] font-semibold">
            <Radio className="w-3.5 h-3.5 text-[#E06D3B]" />
            <span>ORIGINAL AUDIO SERIES</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
            Wander &amp; Talk
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#2B6E70] dark:text-[#39888B] italic">
            Stories, sounds, and journeys from around the world.
          </p>

          <p className="text-sm sm:text-base text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed max-w-2xl">
            Recorded entirely in the field with stereo microphones. We capture the whispering dunes of Mleiha, the bustling early morning dhow traffic on Dubai Creek, and honest conversations on indie travel, photography, and culture.
          </p>

          {/* Follow Buttons for Platforms */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B85A6] block">
              Follow on external platforms or play directly in-browser:
            </span>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <button
                onClick={() => handlePlatformClick('Spotify')}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1DB954] text-white hover:bg-[#1AA34A] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Music className="w-3.5 h-3.5" />
                <span>Spotify</span>
              </button>

              <button
                onClick={() => handlePlatformClick('Apple Podcasts')}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#872ec4] text-white hover:bg-[#7424ab] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Apple Podcasts</span>
              </button>

              <button
                onClick={() => handlePlatformClick('YouTube Music')}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#FF0000] text-white hover:bg-[#D60000] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Disc className="w-3.5 h-3.5" />
                <span>YouTube Music</span>
              </button>

              <button
                onClick={() => handlePlatformClick('RSS Feed')}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#F4EFE6] dark:bg-[#18283E] text-[#0F1B2B] dark:text-white hover:bg-[#EAE3D2] dark:hover:bg-[#243954] border border-[#D8CEB9] dark:border-[#243954] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Rss className="w-3.5 h-3.5 text-[#E06D3B]" />
                <span>RSS Feed</span>
              </button>
            </div>
          </div>

          {/* Feedback Toast */}
          {activePlatformToast && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{activePlatformToast}</span>
            </div>
          )}

        </div>
      </section>

      {/* 2. Featured Episode with Working Custom Audio Player */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
            Current Playing Episode
          </h2>
          <span className="text-xs font-mono text-[#6B85A6]">
            Only one episode plays at a time
          </span>
        </div>

        <AudioPlayer episode={featuredEpisode} showCover={true} />
      </section>

      {/* 3. Developer / Production Note Info Box */}
      <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] flex items-start gap-3 text-xs text-[#4A5E78] dark:text-[#94A9C4]">
        <Info className="w-4 h-4 text-[#2B6E70] dark:text-[#39888B] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#0F1B2B] dark:text-white">
            Direct In-Browser Playback Enabled
          </p>
          <p>
            All audio plays natively using the HTML5 Audio standard with responsive scrubber, speed control, and live state tracking. To connect custom live MP3 streams, update the <code className="text-[#E06D3B] font-mono">audioUrl</code> properties in <code className="font-mono">src/data/podcasts.ts</code>.
          </p>
        </div>
      </div>

      {/* 4. Episode List Section (All 6+ Episodes) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-widest uppercase text-[#E06D3B] font-semibold">
              SEASON 01 ARCHIVE
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
              All Podcast Episodes ({PODCAST_EPISODES.length})
            </h2>
          </div>

          {/* Search Episode */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B85A6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search episodes..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#142030] text-[#0F1B2B] dark:text-white placeholder-[#6B85A6] rounded-lg border border-[#D8CEB9] dark:border-[#223347] focus:outline-none focus:border-[#E06D3B]"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              onSelectBlog={(blogSlug) => onNavigate(`blog-article-${blogSlug}`)}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
