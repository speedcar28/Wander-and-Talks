import React, { useState } from 'react';
import {
  MapPin,
  Headphones,
  BookOpen,
  Navigation,
  Compass,
  Play,
  Pause,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { Destination, DestinationMapMarker } from '../types';
import { BLOG_ARTICLES } from '../data/blogs';
import { PODCAST_EPISODES } from '../data/podcasts';
import { useAudio } from '../context/AudioContext';

interface InteractiveMapProps {
  destination: Destination;
  onNavigateToBlog?: (slug: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  destination,
  onNavigateToBlog
}) => {
  const { currentEpisode, isPlaying, playEpisode, togglePlay } = useAudio();
  const markers = destination.mapMarkers || [];
  
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(
    markers.length > 0 ? markers[0].id : null
  );
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const selectedMarker = markers.find((m) => m.id === selectedMarkerId) || markers[0];

  const relatedBlog = selectedMarker?.blogSlug
    ? BLOG_ARTICLES.find((b) => b.slug === selectedMarker.blogSlug)
    : null;

  const relatedPodcast = selectedMarker?.episodeId
    ? PODCAST_EPISODES.find((ep) => ep.id === selectedMarker.episodeId)
    : null;

  const isCurrentAudioPlaying =
    relatedPodcast && currentEpisode?.id === relatedPodcast.id && isPlaying;

  const handleAudioAction = () => {
    if (!relatedPodcast) return;
    if (currentEpisode?.id === relatedPodcast.id) {
      togglePlay();
    } else {
      playEpisode(relatedPodcast, true);
    }
  };

  // Categories present in markers
  const categories = ['All', ...Array.from(new Set(markers.map((m) => m.category)))];

  const filteredMarkers = markers.filter((m) => {
    if (filterCategory === 'All') return true;
    return m.category === filterCategory;
  });

  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2B6E70] dark:text-[#39888B] font-semibold">
            <Compass className="w-4 h-4" />
            <span>INTERACTIVE FIELD CARTOGRAPHY</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2B] dark:text-white mt-1">
            Exploration Map &amp; Acoustic Points of Interest
          </h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-[#0F1B2B] dark:bg-[#E06D3B] text-white font-semibold shadow-xs'
                  : 'bg-[#F4EFE6] dark:bg-[#18283E] text-[#4A5E78] dark:text-[#94A9C4] border border-[#EAE3D2] dark:border-[#243954] hover:text-[#0F1B2B] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Top Map Canvas */}
        <div className="lg:col-span-7 bg-[#142233] text-white rounded-2xl border border-[#243954] p-6 shadow-xl relative min-h-[380px] sm:min-h-[460px] flex flex-col justify-between overflow-hidden">
          
          {/* Topographic Vector Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#2B6E70_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Decorative Topo Contour Curves */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-teal-400 fill-none"
            viewBox="0 0 500 400"
            preserveAspectRatio="none"
          >
            <path d="M-20,100 C150,200 350,50 520,180" strokeWidth="1.5" />
            <path d="M-20,220 C120,320 380,180 520,300" strokeWidth="1" />
            <path d="M-20,300 C200,380 320,260 520,380" strokeWidth="1" />
            <circle cx="250" cy="180" r="140" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>

          {/* Map Header Overlay */}
          <div className="relative z-10 flex items-center justify-between bg-[#0B131D]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-emerald-300 font-bold">{destination.name.toUpperCase()} GRID</span>
            </div>
            <div className="text-[11px] font-mono text-[#94A9C4]">
              {destination.coordinates.lat.toFixed(4)}° N · {destination.coordinates.lng.toFixed(4)}° E
            </div>
          </div>

          {/* Markers Field Container */}
          <div className="relative z-10 my-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMarkers.map((marker, idx) => {
              const isSelected = selectedMarker?.id === marker.id;
              return (
                <button
                  key={marker.id}
                  onClick={() => setSelectedMarkerId(marker.id)}
                  className={`text-left p-4 rounded-xl border transition-all relative flex items-start gap-3.5 group cursor-pointer ${
                    isSelected
                      ? 'bg-[#E06D3B]/20 border-[#E06D3B] ring-2 ring-[#E06D3B]/40 shadow-lg scale-[1.02]'
                      : 'bg-[#1C2D42]/80 hover:bg-[#1C2D42] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#E06D3B] text-white'
                        : 'bg-white/10 text-[#CBD5E1] group-hover:bg-white/20'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono uppercase text-[#E9865A] font-semibold">
                        {marker.category}
                      </span>
                      {marker.episodeId && (
                        <Headphones className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-sm font-semibold text-white truncate">
                      {marker.name}
                    </div>
                    <div className="text-[11px] text-[#94A9C4] line-clamp-1">
                      {marker.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Footer status */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#94A9C4] pt-2 border-t border-white/10">
            <span>Click any marker to inspect audio &amp; story logs</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E06D3B] flex items-center gap-1 transition-colors"
            >
              <span>Full Satellite Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Right / Selected POI Detail Flyout Card */}
        <div className="lg:col-span-5 bg-white dark:bg-[#142030] rounded-2xl border border-[#EAE3D2] dark:border-[#223347] p-6 shadow-md flex flex-col justify-between space-y-6">
          
          {selectedMarker ? (
            <div className="space-y-5">
              {/* Marker Badge & Coordinates */}
              <div className="flex items-center justify-between border-b border-[#EAE3D2] dark:border-[#223347] pb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase font-bold bg-[#2B6E70]/10 text-[#2B6E70] dark:text-[#39888B]">
                  {selectedMarker.category}
                </span>
                <span className="text-xs font-mono text-[#6B85A6] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E06D3B]" />
                  {selectedMarker.lat.toFixed(4)}° N, {selectedMarker.lng.toFixed(4)}° E
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#0F1B2B] dark:text-white leading-tight">
                  {selectedMarker.name}
                </h3>
                <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
                  {selectedMarker.description}
                </p>
              </div>

              {/* Linked Podcast Audio Card */}
              {relatedPodcast && (
                <div className="p-4 rounded-xl bg-[#0F1B2B] text-white border border-[#243954] space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#E9865A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5 text-[#E06D3B]" />
                      Recorded at this location
                    </span>
                    <span className="text-[11px] font-mono text-[#94A9C4]">
                      {relatedPodcast.duration}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white line-clamp-1">
                    {relatedPodcast.title}
                  </p>

                  <button
                    onClick={handleAudioAction}
                    className="w-full py-2 px-3 rounded-lg bg-[#E06D3B] hover:bg-[#C75525] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-98 cursor-pointer"
                  >
                    {isCurrentAudioPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause Field Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Play Episode ({relatedPodcast.duration})</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Linked Blog Story Card */}
              {relatedBlog && (
                <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-[#18283E] border border-[#EAE3D2] dark:border-[#243954] space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#2B6E70] dark:text-[#39888B] font-semibold uppercase">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Featured in Field Essay</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0F1B2B] dark:text-white line-clamp-2">
                    {relatedBlog.title}
                  </h4>
                  {onNavigateToBlog && (
                    <button
                      onClick={() => onNavigateToBlog(relatedBlog.slug)}
                      className="text-xs font-semibold text-[#E06D3B] hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <span>Read Story Guide</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-[#6B85A6]">
              Select a location marker on the left to see coordinates and multimedia.
            </div>
          )}

          {/* Open in Google Maps External button */}
          {selectedMarker && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedMarker.lat},${selectedMarker.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#18283E] text-[#0F1B2B] dark:text-white border border-[#D8CEB9] dark:border-[#243954] hover:border-[#E06D3B] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-[#2B6E70]" />
              <span>Get Directions to {selectedMarker.name}</span>
            </a>
          )}

        </div>

      </div>
    </div>
  );
};
