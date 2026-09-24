import React from 'react';
import { Play, Pause, X, RotateCcw, RotateCw, ExternalLink } from 'lucide-react';
import { useAudio, formatDuration } from '../context/AudioContext';

interface StickyMiniPlayerProps {
  onOpenPodcastPage: () => void;
}

export const StickyMiniPlayer: React.FC<StickyMiniPlayerProps> = ({ onOpenPodcastPage }) => {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    isMiniPlayerVisible,
    togglePlay,
    closeMiniPlayer,
    seek,
    skip
  } = useAudio();

  if (!currentEpisode || !isMiniPlayerVisible) {
    return null;
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <aside 
      aria-label="Audio player dock"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F1B2B]/95 text-white border-t border-[#243954] backdrop-blur-md shadow-2xl transition-all animate-in slide-in-from-bottom duration-300"
    >
      {/* Top Hairline Progress Bar (Interactive) */}
      <div 
        className="w-full h-1.5 bg-[#243954] cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = clickX / rect.width;
          seek(percentage * duration);
        }}
        title="Click to jump timeline"
      >
        <div
          className="h-full bg-[#E06D3B] transition-all duration-100"
          style={{ width: `${progressPercent}%` }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `calc(${progressPercent}% - 6px)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Thumbnail & Episode Title */}
        <div 
          onClick={onOpenPodcastPage}
          className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial cursor-pointer group"
          title="Open Podcast Page"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-md overflow-hidden bg-[#18283E] shrink-0 border border-[#243954]">
            <img
              src={currentEpisode.coverImage}
              alt={currentEpisode.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/src/assets/images/podcast_cover_art_1790236037002.jpg';
              }}
            />
          </div>

          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E9865A] font-semibold truncate">
                Ep 0{currentEpisode.episodeNumber}
              </span>
              <span className="hidden md:inline text-[10px] font-mono text-[#94A9C4] tabular-nums">
                {formatDuration(currentTime)} / {formatDuration(duration)}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-serif font-bold text-white group-hover:text-[#E06D3B] transition-colors truncate">
              {currentEpisode.title}
            </p>
          </div>
        </div>

        {/* Center: Play / Pause Controls & Quick Skips */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => skip(-15)}
            aria-label="Skip back 15 seconds"
            className="hidden xs:flex p-1.5 text-[#B8C8DB] hover:text-white rounded-md hover:bg-[#18283E] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E06D3B] hover:bg-[#C75525] text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => skip(15)}
            aria-label="Skip forward 15 seconds"
            className="hidden xs:flex p-1.5 text-[#B8C8DB] hover:text-white rounded-md hover:bg-[#18283E] transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Expand to Full Page & Close Mini Player */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenPodcastPage}
            aria-label="Open full podcast player"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#B8C8DB] hover:text-white bg-[#18283E] hover:bg-[#243954] rounded-md transition-colors border border-[#243954]"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Player</span>
          </button>

          <button
            onClick={closeMiniPlayer}
            aria-label="Close sticky mini-player"
            className="p-1.5 text-[#94A9C4] hover:text-white hover:bg-[#18283E] rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
};
