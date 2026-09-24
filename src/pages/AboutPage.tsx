import React from 'react';
import {
  Camera,
  Mic,
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Heart,
  Volume2
} from 'lucide-react';
import { GEAR_ITEMS, TIMELINE_ITEMS } from '../data/gear';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const photoGear = GEAR_ITEMS.filter((g) => g.category === 'Photography');
  const audioGear = GEAR_ITEMS.filter((g) => g.category === 'Podcast & Audio');
  const travelGear = GEAR_ITEMS.filter((g) => g.category === 'Travel Essentials');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      
      {/* 1. Creator Introduction Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
        
        {/* Creator Portrait */}
        <div className="md:col-span-5 space-y-3">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#0F1B2B] aspect-3/4 border border-[#EAE3D2] dark:border-[#223347]">
            <img
              src="/src/assets/images/creator_portrait_1790236082709.jpg"
              alt="Zayn Al-Mansoor holding his travel camera"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/src/assets/images/hero_travel_journal_1790236025041.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-mono text-[#E9865A] uppercase tracking-wider block">
                CREATOR &amp; HOST
              </span>
              <h3 className="font-serif text-xl font-bold">Zayn Al-Mansoor</h3>
              <p className="text-xs text-[#B8C8DB]">Sharjah, UAE · Undergraduate Student</p>
            </div>
          </div>
        </div>

        {/* Story Prose */}
        <div className="md:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E06D3B] font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#E06D3B]" />
            <span>BEHIND THE JOURNAL</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1B2B] dark:text-white leading-tight">
            Hi, I&apos;m Zayn. A student traveler recording soundscapes &amp; stories.
          </h1>

          <p className="text-base text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
            I started <strong className="text-[#0F1B2B] dark:text-white font-semibold">Wander &amp; Talk</strong> out of my dorm room with a secondhand mirrorless camera, a single 35mm prime lens, and an insatiable curiosity for the places between official tourist stops.
          </p>

          <p className="text-base text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
            While most travel content focuses on luxury infinity pools and 5-second video clips, I wanted to build something slower and more tactile. A journal that pairs high-resolution documentary photography with genuine stereo field acoustics—the sound of 5 AM desert wind blowing through fossil rocks, the clattering of 1-dirham wooden abras on Dubai Creek, and honest conversations with weavers, bakers, and local historians.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#6B85A6] dark:text-[#94A9C4]">
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-[#2B6E70] dark:text-[#39888B]" /> 35mm Prime Specialist
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Mic className="w-3.5 h-3.5 text-[#E06D3B]" /> Binaural &amp; Stereo Field Audio
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> Overland &amp; Regional Bus Routes
            </span>
          </div>
        </div>

      </section>

      {/* 2. Gear & Equipment Section */}
      <section className="space-y-8 pt-8 border-t border-[#EAE3D2] dark:border-[#223347]">
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest uppercase text-[#2B6E70] dark:text-[#39888B] font-semibold">
            WHAT’S IN THE PACK
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
            Travel, Photography &amp; Audio Equipment
          </h2>
          <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4]">
            Every single piece of gear chosen after thousands of kilometers on dusty trails, buses, and overnight desert bivouacs.
          </p>
        </div>

        {/* Camera Gear */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#0F1B2B] dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#E06D3B]" />
            <span>Camera &amp; Photography Gear</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {photoGear.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-white dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-2.5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#E06D3B] uppercase tracking-wider block">
                    {item.model}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#0F1B2B] dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#4A5E78] dark:text-[#94A9C4] pt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F4EFE6] dark:border-[#223347] text-[11px] text-[#2B6E70] dark:text-[#39888B] italic">
                  &ldquo;{item.whyILoveIt}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio & Podcast Recording Gear */}
        <div className="space-y-4 pt-4">
          <h3 className="font-serif text-xl font-bold text-[#0F1B2B] dark:text-white flex items-center gap-2">
            <Mic className="w-5 h-5 text-[#2B6E70] dark:text-[#39888B]" />
            <span>Podcast Microphone &amp; Field Audio Tools</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {audioGear.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-white dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-2.5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#2B6E70] dark:text-[#39888B] uppercase tracking-wider block">
                    {item.model}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#0F1B2B] dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#4A5E78] dark:text-[#94A9C4] pt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F4EFE6] dark:border-[#223347] text-[11px] text-[#E06D3B] dark:text-[#E9865A] italic">
                  &ldquo;{item.whyILoveIt}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Essentials */}
        <div className="space-y-4 pt-4">
          <h3 className="font-serif text-xl font-bold text-[#0F1B2B] dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span>Backpack &amp; Travel Essentials</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {travelGear.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-white dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-2.5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#6B85A6] uppercase tracking-wider block">
                    {item.model}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#0F1B2B] dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#4A5E78] dark:text-[#94A9C4] pt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F4EFE6] dark:border-[#223347] text-[11px] text-[#6B85A6] italic">
                  &ldquo;{item.whyILoveIt}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 3. Timeline of Travel Projects */}
      <section className="space-y-8 pt-8 border-t border-[#EAE3D2] dark:border-[#223347]">
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest uppercase text-[#E06D3B] font-semibold">
            JOURNEY ARCHIVE
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
            Travel &amp; Production Timeline
          </h2>
        </div>

        <div className="relative border-l-2 border-[#EAE3D2] dark:border-[#223347] ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {TIMELINE_ITEMS.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#E06D3B] ring-4 ring-[#FBF8F2] dark:ring-[#0D1520]" />

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6B85A6] dark:text-[#94A9C4]">
                  <span className="font-bold text-[#E06D3B] dark:text-[#E9865A]">
                    {item.quarter} {item.year}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#2B6E70] dark:text-[#39888B]">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0F1B2B] dark:text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
