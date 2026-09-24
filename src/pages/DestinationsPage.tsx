import React, { useState } from 'react';
import { Search, Compass, MapPin, Globe } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/DestinationCard';

interface DestinationsPageProps {
  onNavigate: (path: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onNavigate }) => {
  const [regionFilter, setRegionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = ['All', 'United Arab Emirates', 'Oman', 'Türkiye'];

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesRegion =
      regionFilter === 'All' ||
      (regionFilter === 'United Arab Emirates' && dest.country.includes('Emirates')) ||
      dest.country === regionFilter;

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      dest.name.toLowerCase().includes(q) ||
      dest.country.toLowerCase().includes(q) ||
      dest.tagline.toLowerCase().includes(q) ||
      dest.description.toLowerCase().includes(q);

    return matchesRegion && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl border-b border-[#EAE3D2] dark:border-[#223347] pb-8">
        <span className="text-xs font-mono tracking-widest uppercase text-[#2B6E70] dark:text-[#39888B] font-semibold">
          DESTINATION DIRECTORY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
          Explore by Region &amp; Terrain
        </h1>
        <p className="text-base sm:text-lg text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
          Comprehensive field notes, photography locations, local logistics, and companion podcast episodes curated from our overland journeys.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-[#F4EFE6] dark:bg-[#142030] p-4 sm:p-5 rounded-2xl border border-[#EAE3D2] dark:border-[#223347]">
        
        {/* Regions */}
        <div className="flex flex-wrap items-center gap-1.5">
          {regions.map((reg) => {
            const isSelected = regionFilter === reg;
            return (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#0F1B2B] dark:bg-[#E06D3B] text-white shadow-xs font-semibold'
                    : 'bg-white dark:bg-[#18283E] text-[#4A5E78] dark:text-[#94A9C4] border border-[#EAE3D2] dark:border-[#243954] hover:border-[#E06D3B]'
                }`}
              >
                {reg}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B85A6]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#0F1B2B] text-[#0F1B2B] dark:text-white placeholder-[#6B85A6] rounded-lg border border-[#D8CEB9] dark:border-[#223347] focus:outline-none focus:border-[#E06D3B]"
          />
        </div>

      </div>

      {/* Grid of Destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onSelect={(slug) => onNavigate(`destination-${slug}`)}
          />
        ))}
      </div>

    </div>
  );
};
