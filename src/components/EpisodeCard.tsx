import React from 'react';
import { Play, Pause, Clock, Calendar, MapPin, Volume2, Bookmark } from 'lucide-react';
import { PodcastEpisode } from '../types';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';

interface EpisodeCardProps {
  episode: PodcastEpisode;
  onSelectBlog?: (slug: string) => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onSelectBlog }) => {
  const { currentEpisode, isPlaying, playEpisode, togglePlay } = useAudio();
  const { isSubscribed, toggleSubscription } = useAuth();
  
  const isThisEpisodeActive = currentEpisode?.id === episode.id;
  const isThisEpisodePlaying = isThisEpisodeActive && isPlaying;
  const isSaved = isSubscribed(episode.id);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisEpisodeActive) {
      togglePlay();
    } else {
      playEpisode(episode, true);
    }
  };

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSubscription(episode.id);
  };

  return (
    <div
      onClick={() => playEpisode(episode, true)}
      className={`group cursor-pointer rounded-xl bg-white dark:bg-[#142030] border transition-all duration-300 p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between ${
        isThisEpisodeActive
          ? 'border-[#E06D3B] ring-1 ring-[#E06D3B]/20 shadow-md bg-gradient-to-r from-white to-[#FDF8F5] dark:from-[#142030] dark:to-[#1C2330]'
          : 'border-[#EAE3D2] dark:border-[#223347] hover:border-[#E06D3B]/40 hover:shadow-sm'
      }`}
    >
      {/* Artwork Thumbnail with Play Badge */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-[#EAE3D2] dark:bg-[#1C2D42]">
        <img
          src={episode.coverImage}
          alt={episode.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/podcast_cover_art_1790236037002.jpg';
          }}
        />
        
        {/* Play Overlay Button */}
        <button
          onClick={handlePlayClick}
          aria-label={isThisEpisodePlaying ? `Pause ${episode.title}` : `Play ${episode.title}`}
          className={`absolute inset-0 m-auto w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isThisEpisodePlaying
              ? 'bg-[#E06D3B] text-white scale-100 shadow-md'
              : 'bg-black/60 hover:bg-[#E06D3B] text-white backdrop-blur-xs scale-90 group-hover:scale-100'
          }`}
        >
          {isThisEpisodePlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* Episode Details */}
      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B85A6] dark:text-[#94A9C4]">
          <span className="font-mono font-semibold text-[#E06D3B] dark:text-[#E9865A]">
            EPISODE 0{episode.episodeNumber}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {episode.publishedAt}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {episode.duration}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-[#2B6E70] dark:text-[#39888B]">
            <MapPin className="w-3 h-3" />
            {episode.locationName}
          </span>
        </div>

        <h4 className="font-serif text-lg font-bold text-[#0F1B2B] dark:text-white group-hover:text-[#E06D3B] transition-colors leading-snug">
          {episode.title}
        </h4>

        <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4] line-clamp-2 leading-relaxed">
          {episode.description}
        </p>

        {/* Tags & Action links */}
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#6B85A6]">
            {episode.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>

          {episode.relatedBlogSlug && onSelectBlog && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectBlog(episode.relatedBlogSlug!);
              }}
              className="text-[#2B6E70] dark:text-[#39888B] hover:underline font-medium ml-auto"
            >
              Read companion essay →
            </button>
          )}
        </div>
      </div>

      {/* Right Action Button */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EAE3D2] dark:border-[#223347] w-full sm:w-auto">
        <button
          onClick={handleSubscribeClick}
          aria-label={isSaved ? "Saved to playlist" : "Save episode to playlist"}
          title={isSaved ? "Saved in your list" : "Save episode"}
          className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
            isSaved
              ? 'bg-[#E06D3B]/10 border-[#E06D3B] text-[#E06D3B]'
              : 'border-[#EAE3D2] dark:border-[#223347] text-[#6B85A6] hover:text-[#0F1B2B] dark:hover:text-white'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          <span className="sm:hidden">{isSaved ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={handlePlayClick}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            isThisEpisodePlaying
              ? 'bg-[#E06D3B] text-white shadow-sm'
              : 'bg-[#F4EFE6] dark:bg-[#18283E] text-[#0F1B2B] dark:text-white hover:bg-[#EAE3D2] dark:hover:bg-[#243954]'
          }`}
        >
          {isThisEpisodePlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Playing</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Listen</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
