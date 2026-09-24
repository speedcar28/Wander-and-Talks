import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Download,
  Share2,
  Check,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAudio, formatDuration } from '../context/AudioContext';
import { PodcastEpisode } from '../types';

interface AudioPlayerProps {
  episode?: PodcastEpisode | null;
  className?: string;
  showCover?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  episode,
  className = '',
  showCover = true
}) => {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    togglePlay,
    seek,
    skip,
    setVolume,
    toggleMute,
    setPlaybackRate,
    downloadEpisode,
    isSynthesizedFallbackActive,
    playEpisode
  } = useAudio();

  const [copied, setCopied] = useState(false);
  const [speedDropdownOpen, setSpeedDropdownOpen] = useState(false);

  const activeEpisode = episode || currentEpisode;

  if (!activeEpisode) {
    return null;
  }

  const isCurrentActive = currentEpisode?.id === activeEpisode.id;
  const isCurrentlyPlaying = isCurrentActive && isPlaying;

  const handleMainPlayToggle = () => {
    if (!isCurrentActive) {
      playEpisode(activeEpisode, true);
    } else {
      togglePlay();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSeconds = parseFloat(e.target.value);
    seek(targetSeconds);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const speeds = [0.75, 1, 1.25, 1.5, 2];
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`rounded-2xl bg-[#0F1B2B] text-white p-6 sm:p-8 shadow-xl border border-[#243954] transition-all relative overflow-hidden ${className}`}
    >
      {/* Subtle background ambient soundwave grid aesthetic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2B6E70]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E06D3B]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
        {/* Large Artwork */}
        {showCover && (
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shadow-lg shrink-0 bg-[#18283E] border border-[#243954]">
            <img
              src={activeEpisode.coverImage}
              alt={activeEpisode.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/src/assets/images/podcast_cover_art_1790236037002.jpg';
              }}
            />
            {isCurrentlyPlaying && (
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#E06D3B] text-[10px] font-mono font-bold tracking-wider flex items-center gap-1 shadow-xs">
                <Radio className="w-2.5 h-2.5 animate-pulse" /> LIVE
              </div>
            )}
          </div>
        )}

        {/* Player Controls & Episode Info */}
        <div className="flex-1 w-full space-y-4">
          
          {/* Header Metadata */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A9C4]">
              <span className="font-mono text-[#E9865A] font-semibold tracking-wider">
                FEATURED EPISODE · 0{activeEpisode.episodeNumber}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-[#39888B]" />
                {activeEpisode.duration}
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {activeEpisode.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#B8C8DB] line-clamp-2 leading-relaxed">
              {activeEpisode.description}
            </p>
          </div>

          {/* Synthesized / Live audio status feedback */}
          {isSynthesizedFallbackActive && isCurrentlyPlaying && (
            <div className="flex items-center gap-2 text-[11px] text-[#E9865A] bg-[#18283E]/80 border border-[#E06D3B]/30 rounded-md px-2.5 py-1">
              <Sparkles className="w-3 h-3 animate-spin" />
              <span>Playing field ambient soundscape synthesizer. Replace placeholder MP3 in data to stream custom audio.</span>
            </div>
          )}

          {/* Progress Bar & Timestamps */}
          <div className="space-y-1.5 pt-2">
            <div className="relative group flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 1725}
                step="0.5"
                value={currentTime}
                onChange={handleProgressChange}
                aria-label="Seek audio timeline"
                className="w-full h-2 rounded-lg bg-[#243954] accent-[#E06D3B] appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B]"
                style={{
                  background: `linear-gradient(to right, #E06D3B 0%, #E06D3B ${progressPercent}%, #243954 ${progressPercent}%, #243954 100%)`
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#94A9C4] tabular-nums">
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(duration)}</span>
            </div>
          </div>

          {/* Main Action Buttons Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            
            {/* Playback Controls (15s back, Play/Pause, 15s forward) */}
            <div className="flex items-center gap-3">
              {/* Skip Back 15s */}
              <button
                onClick={() => skip(-15)}
                aria-label="Skip back 15 seconds"
                title="Skip back 15s"
                className="p-2 text-[#B8C8DB] hover:text-white hover:bg-[#18283E] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B]"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Main Play / Pause */}
              <button
                onClick={handleMainPlayToggle}
                aria-label={isCurrentlyPlaying ? "Pause audio" : "Play audio"}
                className="w-12 h-12 rounded-full bg-[#E06D3B] hover:bg-[#C75525] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {isCurrentlyPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              {/* Skip Forward 15s */}
              <button
                onClick={() => skip(15)}
                aria-label="Skip forward 15 seconds"
                title="Skip forward 15s"
                className="p-2 text-[#B8C8DB] hover:text-white hover:bg-[#18283E] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B]"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="p-1.5 text-[#B8C8DB] hover:text-white rounded-md transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#E06D3B]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Adjust volume"
                className="w-20 h-1.5 rounded-lg bg-[#243954] accent-[#E06D3B] cursor-pointer"
              />
            </div>

            {/* Speed, Download, & Share Menu */}
            <div className="flex items-center gap-2">
              {/* Playback Speed dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSpeedDropdownOpen(!speedDropdownOpen)}
                  aria-label="Playback speed"
                  className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-[#18283E] hover:bg-[#243954] text-[#B8C8DB] hover:text-white transition-colors border border-[#243954]"
                >
                  {playbackRate}x
                </button>

                {speedDropdownOpen && (
                  <div className="absolute bottom-full mb-2 right-0 bg-[#142030] border border-[#243954] rounded-lg shadow-xl p-1 z-30 min-w-[70px] space-y-0.5">
                    {speeds.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setPlaybackRate(s);
                          setSpeedDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                          playbackRate === s
                            ? 'bg-[#E06D3B] text-white font-bold'
                            : 'text-[#B8C8DB] hover:bg-[#18283E] hover:text-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Download Episode Button */}
              <button
                onClick={() => downloadEpisode(activeEpisode)}
                aria-label="Download episode notes & audio info"
                title="Download episode"
                className="p-1.5 text-[#B8C8DB] hover:text-white hover:bg-[#18283E] rounded-md transition-colors border border-[#243954]"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Share Episode Link */}
              <button
                onClick={handleShare}
                aria-label="Share episode"
                title={copied ? "Link copied!" : "Share episode"}
                className="p-1.5 text-[#B8C8DB] hover:text-white hover:bg-[#18283E] rounded-md transition-colors border border-[#243954]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
