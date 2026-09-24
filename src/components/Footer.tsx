import React from 'react';
import { Compass, Headphones, Mail, Heart, Volume2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { isPlaying, currentEpisode, togglePlay } = useAudio();

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#EAE3D2] dark:border-[#223347] bg-[#F4EFE6] dark:bg-[#090F18] text-[#0F1B2B] dark:text-[#E6EDF5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <button
              onClick={() => handleNav('home')}
              className="text-left font-serif text-2xl font-bold tracking-tight text-[#0F1B2B] dark:text-white hover:text-[#E06D3B] transition-colors"
            >
              Wander &amp; Talk
            </button>
            <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
              Stories, sounds, and journeys from around the world. An independent travel journal and field-audio podcast documenting slow overland exploration.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6B85A6] dark:text-[#6B85A6] pt-1">
              <Compass className="w-3.5 h-3.5 text-[#2B6E70]" />
              <span>Sharjah &amp; Dubai · UAE</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6B85A6] dark:text-[#6B85A6] mb-4">
              Explore Journal
            </h3>
            <ul className="space-y-2.5 text-sm text-[#4A5E78] dark:text-[#94A9C4]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#E06D3B] transition-colors">
                  Home &amp; Featured
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-[#E06D3B] transition-colors">
                  Travel Essays &amp; Articles
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-[#E06D3B] transition-colors">
                  Destination Field Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('podcast')} className="hover:text-[#E06D3B] transition-colors">
                  Podcast Episodes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#E06D3B] transition-colors">
                  About the Creator &amp; Gear
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#E06D3B] transition-colors">
                  Get in Touch
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6B85A6] dark:text-[#6B85A6] mb-4">
              Featured Guides
            </h3>
            <ul className="space-y-2.5 text-sm text-[#4A5E78] dark:text-[#94A9C4]">
              <li>
                <button onClick={() => handleNav('destination-dubai-uae')} className="hover:text-[#E06D3B] transition-colors">
                  Dubai (Old Creek &amp; Street Food)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destination-sharjah-uae')} className="hover:text-[#E06D3B] transition-colors">
                  Sharjah (Mleiha Desert Dunes)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destination-hatta-uae')} className="hover:text-[#E06D3B] transition-colors">
                  Hatta (Hajar Mountain Ridges)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destination-abu-dhabi-uae')} className="hover:text-[#E06D3B] transition-colors">
                  Abu Dhabi (Mangroves &amp; Architecture)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destination-muscat-oman')} className="hover:text-[#E06D3B] transition-colors">
                  Muscat (Omani Coast &amp; Souqs)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destination-cappadocia-turkiye')} className="hover:text-[#E06D3B] transition-colors">
                  Cappadocia (Fairy Chimneys at Dawn)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Audio & Platforms */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6B85A6] dark:text-[#6B85A6] mb-4">
              Listen &amp; Subscribe
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#EAE3D2] dark:bg-[#142030] rounded-lg border border-[#D8CEB9] dark:border-[#223347]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-[#2B6E70] dark:text-[#39888B] flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5" />
                    Web Player Ready
                  </span>
                  {isPlaying && (
                    <span className="text-[11px] font-mono text-[#E06D3B] flex items-center gap-1">
                      <Volume2 className="w-3 h-3 animate-pulse" /> Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#0F1B2B] dark:text-white font-medium truncate">
                  {currentEpisode ? currentEpisode.title : 'Episode 01: Sunrise Over Sharjah'}
                </p>
                <button
                  onClick={togglePlay}
                  className="mt-2 w-full py-1.5 px-3 text-xs font-semibold rounded bg-[#0F1B2B] dark:bg-[#E06D3B] text-white hover:bg-[#243954] dark:hover:bg-[#C75525] transition-colors"
                >
                  {isPlaying ? 'Pause Audio' : 'Play Inside Browser'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-[#4A5E78] dark:text-[#94A9C4] pt-1">
                <span className="hover:text-[#0F1B2B] dark:hover:text-white cursor-pointer">Spotify</span>
                <span>·</span>
                <span className="hover:text-[#0F1B2B] dark:hover:text-white cursor-pointer">Apple Podcasts</span>
                <span>·</span>
                <span className="hover:text-[#0F1B2B] dark:hover:text-white cursor-pointer">YouTube Music</span>
                <span>·</span>
                <span className="hover:text-[#0F1B2B] dark:hover:text-white cursor-pointer">RSS Feed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-[#D8CEB9] dark:border-[#223347] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B85A6] dark:text-[#6B85A6]">
          <p>© {new Date().getFullYear()} Wander &amp; Talk. Independent travel stories &amp; field acoustics.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('about')} className="hover:text-[#0F1B2B] dark:hover:text-white transition-colors">
              Creator Note
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-[#0F1B2B] dark:hover:text-white transition-colors">
              Press &amp; Inquiries
            </button>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#E06D3B] inline fill-current" /> for slow travelers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
