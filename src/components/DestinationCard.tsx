import React from 'react';
import { MapPin, BookOpen, Headphones, ArrowRight } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (slug: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(destination.slug)}
      className="group cursor-pointer rounded-xl bg-white dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#E06D3B]/40 flex flex-col"
    >
      {/* Cover Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-[#EAE3D2] dark:bg-[#1C2D42]">
        <img
          src={destination.coverImage}
          alt={`${destination.name}, ${destination.country}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/hero_travel_journal_1790236025041.jpg';
          }}
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Title over image for instant visual punch */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#E9865A] block mb-0.5">
            {destination.region}
          </span>
          <h3 className="font-serif text-2xl font-bold tracking-tight">
            {destination.name}, <span className="font-normal text-white/85 text-lg">{destination.country}</span>
          </h3>
        </div>
      </div>

      {/* Description & Metrics */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4] line-clamp-2 leading-relaxed">
          {destination.tagline}
        </p>

        <div className="pt-3 border-t border-[#F4EFE6] dark:border-[#223347]/60 flex items-center justify-between text-xs">
          {/* Unboxed Resource Counts */}
          <div className="flex items-center gap-3 text-[#6B85A6] dark:text-[#94A9C4]">
            <span className="flex items-center gap-1 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-[#2B6E70] dark:text-[#39888B]" />
              {destination.articleCount} {destination.articleCount === 1 ? 'article' : 'articles'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-medium">
              <Headphones className="w-3.5 h-3.5 text-[#E06D3B]" />
              {destination.episodeCount} {destination.episodeCount === 1 ? 'episode' : 'episodes'}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 font-semibold text-[#0F1B2B] dark:text-[#E06D3B] group-hover:translate-x-1 transition-transform">
            Guide <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
